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

export default class EventsScreen extends React.Component {
  static navigationOptions = {
    //title: 'Links',
    header: null
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: 'white', flex: 1 }} />
        <LinearGradient
          /* Background gradient on each page of the app */
          colors={['#ff416c', '#ff4b2b']}
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
              style: { color: '#000'},
            }}
            rightComponent={{ icon: 'settings', color: 'rgba(96,100,109, 1)' }}
            containerStyle={{
              backgroundColor: '#fbfbfb',
            }}
          />
          <ScrollView>
            
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
