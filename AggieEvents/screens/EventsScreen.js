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

class SearchResults extends React.Component {
  render() {
    const navigate = this.props.navigate;

    // Show search results only if user is currently searching, else hide
    if (this.props.state.search == '') {
      return null;
    }
    else {
      return (
        <View style={{paddingTop:30}}>
          <Text style={{textAlign:'center',fontSize:25,color:'white'}}>
            Backend should search for '{this.props.state.search}'
          </Text>
        </View>
      )
    }
  }
}

class Discover extends React.Component {
  render() {
    const navigate = this.props.navigate;

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
            events={DummyEvents}
            navigate={navigate}
          ></EventList>
        </View>
      )
    }
  }
}

export default class EventsScreen extends React.Component {
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
            <SearchBar    //doesnt do anything yet
              placeholder='Search campus events...'
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
              <SearchResults state={this.state} navigate={navigate}></SearchResults>
              <Discover state={this.state} navigate={navigate}></Discover>
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
});
