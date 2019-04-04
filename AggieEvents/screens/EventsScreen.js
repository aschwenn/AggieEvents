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
import { SearchBar } from 'react-native-elements';

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
            />
          </View>

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
