import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo';
import { Button, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import { DummyEvents, DummyOrgs } from '../data/dummyData.json';
import EventList from '../components/EventList';
import OrgList from '../components/OrgList';
import Master from '../Master';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Aggie Events',
      headerTitleStyle: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
      },
      headerStyle: {
        backgroundColor: Colors.tabBar,
      },
      headerBackTitle: null, // don't want length title, just use back button
      tintColor: 'black',
      headerRight: (
        <Button
          icon={
            <Icon
              name='settings'
              color={Colors.iconGray}
            />
          }
          buttonStyle={{
            backgroundColor: 'transparent',
            paddingRight: 14,
          }}
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
      )
    };
  };

  state = {
    upcomingEvents: (Master.WireframeMode)? DummyEvents.slice(0,Master.DefaultListShow) : this.getEvents().slice(0,Master.DefaultListShow),
    myOrgs: (Master.WireframeMode)? DummyOrgs.slice(0,Master.DefaultListShow) : this.getOrgs().slice(0,Master.DefaultListShow),
    eventShow: 'Show more',
    orgShow: 'Show more',
    eventNo: (Master.WireframeMode)? DummyEvents.length : this.getEvents().length,
    orgNo: (Master.WireframeMode)? this.getDummyOrgLength() : this.getOrgs().length,
  };

  getEvents(){
    // Make api call for events

    // Use async JS and catch block for error handling
    return fetch(Master.ServerURL + 'getEvents', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 12345,
        type: 'myUpcoming',
        query: null
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      this.showError(error);
    });
  }

  getOrgs(){
    // Make api call for orgs
    return [];
  }

  getDummyOrgLength(){
    // Used for wireframe mode to select only subscribed orgs
    let count = 0;
    DummyOrgs.forEach((o) => {
      if (o.subscribed) count += 1;
    });
    return count;
  }

  getDummyOrgsSubscribed() {
    let orgs = [];
    DummyOrgs.forEach((o) => {
      if (o.subscribed) orgs.push(o);
    });
    return orgs;
  }

  showError(err){
    Alert.alert(
      'Network error',
      err,
      [
        {text: 'OK'}
      ],
      {cancelable: false},
    );
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: 'white', flex: 1 }} />
        <LinearGradient
          /* Background gradient on each page of the app */
          colors={[Colors.background1, Colors.background2]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            
            <View style={styles.myFeed}>
              <Text style={styles.feedTitle}>
                My Upcoming Events
              </Text>

              <EventList
                events={this.state.upcomingEvents}
                navigate={navigate}
              ></EventList>

              {((this.state.eventShow == 'Show more' &&
                this.state.eventNo > Master.DefaultListShow) ||
                this.state.eventShow == 'Show all' &&
                this.state.eventNo > (Master.DefaultListShow * 2)) ?

                <View style={{
                    paddingLeft: '30%',
                    paddingRight: '30%',
                    paddingTop: '2%',
                    paddingBottom: '2%'}}>
                  <Button 
                    title={this.state.eventShow}
                    type='outline'
                    titleStyle={{color: 'rgba(255,255,255,0.9)'}}
                    buttonStyle={styles.button}
                    onPress={() => {
                      if (this.state.eventShow == 'Show more'){
                        // Show 3 more events
                        let st = this.state;
                        st.upcomingEvents = (Master.WireframeMode)? DummyEvents.slice(0,(Master.DefaultListShow * 2)) : this.getEvents().slice(0,(Master.DefaultListShow * 2));
                        st.eventShow = 'Show all'
                        this.setState(st);
                      }
                      else {
                        // Show all events on a new page
                        navigate('ShowAll', {
                          list: (Master.WireframeMode)? DummyEvents : this.getEvents(),
                          type: 'events'
                        });
                      }
                    }}
                  />
                </View>

              : null}

            </View>

            <View style={styles.subscriptions}>
              <Text style={styles.feedTitle}>
                Subscriptions
              </Text>

              <OrgList
                orgs={this.state.myOrgs}
                navigate={navigate}
                show='subscribed'
              ></OrgList>

              {((this.state.orgShow == 'Show more' &&
                this.state.orgNo > Master.DefaultListShow) ||
                this.state.orgShow == 'Show all' &&
                this.state.orgNo > (Master.DefaultListShow * 2)) ?

                <View style={{
                    paddingLeft: '30%',
                    paddingRight: '30%',
                    paddingTop: '2%',
                    paddingBottom: '2%'}}>
                  <Button 
                    title={this.state.orgShow}
                    type='outline'
                    titleStyle={{color: 'rgba(255,255,255,0.9)'}}
                    buttonStyle={styles.button}
                    onPress={() => {
                      if (this.state.orgShow == 'Show more'){
                        // Show 3 more events
                        let st = this.state;
                        st.myOrgs = (Master.WireframeMode)? this.getDummyOrgsSubscribed().slice(0,(Master.DefaultListShow * 2)) : this.getOrgs().slice(0,(Master.DefaultListShow * 2));
                        st.orgShow = 'Show all'
                        this.setState(st);
                        console.log(this.state.myOrgs);
                      }
                      else {
                        // Show all events on a new page
                        navigate('ShowAll', {
                          list: (Master.WireframeMode)? DummyOrgs : this.getOrgs(),
                          type: 'orgs',
                          details: {show: 'subscribed'}
                        });
                      }
                    }}
                  />
                </View>

              : null}

            </View>

          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    color: 'white',
  },
  contentContainer: {
    //paddingTop: 80,
  },
  myFeed: {
    // Container for user's events feed
    paddingTop: '6%', // Use percentages instead of ints for scalability
    //paddingBottom: '12%',
  },
  subscriptions: {
    paddingBottom: '12%'
  },
  feedTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    fontWeight: "bold",
    padding: '6%',
  },
  event: {
    padding: '2%',
  },
  eventTitle: {
    fontSize: 18,
    color: Colors.almostBlack,
  },
  eventSubTitle: {
    color: Colors.lightGray,
  }, 
  homeScreenFilename: {
    marginVertical: 7,
  },
  getStartedText: {
    fontSize: 17,
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    borderColor: 'white',
    paddingTop: '2%',
    paddingBottom: '8%'
    //width: '40%'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
});
