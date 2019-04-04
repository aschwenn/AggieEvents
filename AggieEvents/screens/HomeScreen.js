import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';
import { Button, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import { Card, Divider, ListItem } from 'react-native-elements'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Aggie Events',
    headerTitleStyle: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: Colors.tabBar,
    },
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
          console.log('Settings clicked!');
        }}
      />
    )
  };

  myEvents = [
    {
      name: 'Breakaway',
      icon: 'people',
      location: 'Reed Arena',
      host: 'Breakaway Host'
    },
    {
      name: 'Football Game',
      host: 'BTHO t.u.', // need to make sure to esscape quotes on backend
      icon: 'art-track',
      location: 'Kyle Field'
    },
    {
      name: 'Microsoft Interview Prep',
      host: 'Texas A&M Computing Society (TACS)',
      icon: 'book',
      location: 'HRBB 113'
    }
    // more events here
  ];

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

              <View>
                {
                  // Contains list of events from user's subscription
                  this.myEvents.map((l, i) => (
                    <ListItem
                      key={i}
                      //leftAvatar={{ source: { uri: l.avatar_url } }}
                      leftIcon={{ name: l.icon }}
                      title={l.name}
                      titleStyle={styles.eventTitle}
                      subtitle={l.host}
                      subtitleStyle={styles.eventSubTitle}
                      style={styles.event}
                      chevron
                      onPress={() => {
                        navigate('Event', {
                          eventName: l.name,
                          icon: l.icon,
                          host: l.host
                        });
                      }}
                      //badge={{value:1}}
                    />
                  ))
                }
              </View>
            </View>            

          </ScrollView>
        </LinearGradient>
      </View>
    );
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
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
    paddingBottom: '12%',
  },
  feedTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    fontWeight: "bold",
    padding: '6%',
  },
  eventsCard: {
    backgroundColor: 'transparent',
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
