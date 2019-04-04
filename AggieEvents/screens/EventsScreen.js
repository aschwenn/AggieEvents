import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';
import { Header } from 'react-native-elements';
import Colors from '../constants/Colors';
import { SearchBar } from 'react-native-elements';

export default class EventsScreen extends React.Component {
  static navigationOptions = {
    //title: 'Links',
    header: null
  };

  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

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
          <Header
            /* Title and header bar */
            //leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{
              text: 'Aggie Events',
              style: {
                color: '#000',
                fontWeight: 'bold',
                fontSize: 20,
              },
            }}
            rightComponent={{ icon: 'settings', color: 'rgba(96,100,109, 1)' }}
            containerStyle={{
              backgroundColor: '#fbfbfb',
            }}
          />
          <ScrollView>
            
            <SearchBar
              placeholder='Search for your event...'
              onChangeText={this.updateSearch}
              value={search}
              lightTheme
              round
              containerStyle={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderColor: 'transparent',
              }}
            />

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
});
