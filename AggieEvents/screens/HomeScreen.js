import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo';
import { Button, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import { DummyEvents, DummyOrgs } from '../data/dummyData.json';
import EventList from '../components/EventList';
import OrgList from '../components/OrgList';

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
                events={DummyEvents}
                navigate={navigate}
              ></EventList>
            </View>

            <View style={styles.container}>
              <Text style={styles.feedTitle}>
                Subscriptions
              </Text>

              <OrgList
                orgs={DummyOrgs}
                navigate={navigate}
                show='subscribed'
              ></OrgList>
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
    paddingTop: '12%', // Use percentages instead of ints for scalability
    //paddingBottom: '12%',
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
