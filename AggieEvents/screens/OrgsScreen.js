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
import { ListItem, SearchBar, Button, Icon } from 'react-native-elements';
import { DummyOrgs } from '../data/dummyData.json';
import OrgList from '../components/OrgList';
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
            searchType='orgs'
            query={this.props.state.search}
          ></Searchable>
        </View>
      )
    }
  }
}

class Discover extends React.Component {
  render() {
    const navigate = this.props.navigate;

    discoverOrgs = [];
    if (Master.WireframeMode){
      discoverOrgs = DummyOrgs;
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
              Discover Organizations
            </Text>
          </View>

          <OrgList
              orgs={discoverOrgs}
              navigate={navigate}
              show='all' // options: all | subscribed
            ></OrgList>
        </View>
      )
    }
  }
}

export default class OrgsScreen extends React.Component {
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
              placeholder='Search student organizations...'
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
            />
          </View>

          <ScrollView>
              <SearchResults state={this.state} navigate={navigate}></SearchResults>
              <Discover state={this.state} navigate={navigate}></Discover>
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
