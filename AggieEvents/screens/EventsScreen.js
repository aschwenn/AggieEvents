import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo';
import { Button, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import { SearchBar } from 'react-native-elements';
import { DummyEvents } from '../data/dummyData.json';
import EventList from '../components/EventList';
import Master from '../Master';
import Searchable from '../components/Searchable';

class SearchResults extends React.Component {
  render() {
    const navigate = this.props.navigate;

    // Show search results only if user is currently searching, else hide
    if (this.props.state.search == '') {
      return null;
    }
    else {
      return (
        <View>
          <Searchable
            navigate={navigate}
            searchType='events'
            query={this.props.state.search}
          ></Searchable>
        </View>
      )
    }
  }
}

class Discover extends React.Component {

  state = {
    upcomingEvents: (Master.WireframeMode)? DummyEvents.slice(0,Master.DefaultListShow) : this.getEvents().slice(0,Master.DefaultListShow),
    eventShow: 'Show more',
    eventNo: (Master.WireframeMode)? DummyEvents.length : this.getEvents().length,
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

  render() {
    const navigate = this.props.navigate;

    discoverEvents = [];
    if (Master.WireframeMode){
      discoverEvents = DummyEvents;
    }
    else {
      // Query the database
    }

    // Show Discover element only if user is not currently searching
    if (this.props.state.search != ''){
      return null;
    }
    else {
      return (
        <View>
          <View style={styles.discover}>
            <Text style={styles.discoverText}>
              Happening This Week
            </Text>
          </View>

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
                    titleStyle={{color: 'rgba(255,255,255,0.9)', padding: 0}}
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
                          type: 'events',
                          title: 'This Week',
                        });
                      }
                    }}
                  />
                </View>

              : null}
        </View>
      )
    }
  }
}

export default class EventsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    if (Master.HideHeaders) {
      return {
        header: null
      }
    }
    else {
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
      }
    }
  };

  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({
      search: search,
    });
  };

  render() {
    const { search } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
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
          <View>
            <LinearGradient
              colors={['rgba(255,255,255,0.4)','transparent']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: (Master.HideHeaders)? 100 : 0
              }}>
            </LinearGradient>
          </View>

          <View style={{paddingTop: (Master.HideHeaders)? '7%' : 0,}}>
            <SearchBar
              placeholder='Search campus events...'
              onChangeText={this.updateSearch}
              value={search}
              lightTheme
              round
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderWidth: 0, //no effect
                shadowColor: 'white', //no effect
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
                paddingTop: (Master.HideHeaders)? '10%' : '2%',
                paddingBottom: (Master.HideHeaders)? '5%' : '2%',
              }}
              inputStyle={styles.searchInput}
              autoCorrect={false}
              inputContainerStyle={{backgroundColor: Colors.almostWhite}}
            />
          </View>

          <ScrollView>
            <View style={{paddingBottom: '10%'}}>
              <SearchResults state={this.state} navigate={navigate}></SearchResults>
              <Discover state={this.state} navigate={navigate}></Discover>
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
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  searchInput: {
    color: Colors.almostBlack,
  },
  discover: {
    paddingTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingBottom: '5%',
  },
  discoverText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: '2%'
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
  button: {
    borderColor: 'white',
    paddingTop: '2%',
    paddingBottom: '8%'
    //width: '40%'
  },
});
