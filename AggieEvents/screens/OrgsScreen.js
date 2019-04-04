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
import { Tile } from 'react-native-elements';

export default class OrgsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
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
            <Tile
              title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
              featured
              caption="Some Caption Text"
            />
          </ScrollView>

        </LinearGradient>
      </View>
    );
  }
}
