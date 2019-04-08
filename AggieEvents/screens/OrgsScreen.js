import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo';
import Colors from '../constants/Colors';
import { List, ListItem, Tile, SearchBar, Button, Icon } from 'react-native-elements';
import { DummyOrgs } from '../data/dummyData.json';

export default class OrgsScreen extends React.Component {
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
    headerBackTitle: null, // don't want length title, just use back button
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
        //onPress={ }
      />
    )
  };

  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    const { navigate } = this.props.navigation;

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

          <View>
            <SearchBar    //doesnt do anything yet
              placeholder='Search student organizations...'
              onChangeText={this.updateSearch}
              value={search}
              lightTheme
              round
              containerStyle={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderColor: 'transparent',
              }}
              inputStyle={styles.searchInput}
            />
          </View>

          <ScrollView>

            <View>
              {
                DummyOrgs.map((l, i) => (
                <ListItem
                  key={i}
                  leftIcon={{name: l.icon}}
                  title={l.name}
                  titleStyle={styles.eventTitle}
                  subtitle={l.description}
                  subtitleStyle={styles.eventSubTitle}
                  style={styles.event}
                  chevron
                  onPress={() => {
                    navigate('Org', {
                      name: l.name,
                      icon: l.icon,
                      description: l.description,
                    });
                  }}

                />
              ))
              }

            </View>

          </ScrollView>

        </LinearGradient>
      </View>
    );
    }
}


const styles = StyleSheet.create({
  searchInput: {
    color: Colors.almostBlack,
  },


  // Copied from HomeScreen.js
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
