import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Button, Icon, Divider } from 'react-native-elements';
import Colors from '../constants/Colors';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: Colors.tabBar,
    },
  }

  version = '1.0.0';
  
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              containerStyle={styles.contactIcon}
              name='person'
              color={Colors.almostBlack}
              size={26}
            />
            <Text style={styles.user}>Firstname Lastname</Text>
          </View>
          <Button 
            title='Log Out'
            type='outline'
            titleStyle={{color: Colors.background1}}
            buttonStyle={{borderColor: Colors.background1}}
            containerStyle={{paddingTop: '5%', paddingBottom: '1%'}}
            onPress={() => {
              Alert.alert(
                'Log Out',
                'Are you sure you want to continue?',
                [
                  {text: 'No', style: 'cancel'},
                  {text: 'Yes'}
                ],
                {cancelable: false},
              );
            }}
          />
          <View style={{
            paddingTop: '10%',
            paddingBottom: '10%'
          }}>
            <Divider style={{
              backgroundColor: Colors.almostBlack,
            }} />
          </View>

          <Button 
            title='About this project'
            type='outline'
            titleStyle={{color: Colors.lightGray}}
            buttonStyle={{borderColor: Colors.lightGray}}
            containerStyle={{paddingTop: '5%', paddingBottom: '1%'}}
            onPress={ async () => {
              WebBrowser.openBrowserAsync('https://github.com/aschwenn/AggieEvents');
            }}
          />

          <View style={{
            paddingTop: '10%',
            paddingBottom: '10%'
          }}>
            <Divider style={{
              backgroundColor: Colors.almostBlack,
            }} />
          </View>
          <View style={{paddingTop: '10%'}}>
            <Text style={styles.version}>
              Aggie Events - Version {this.version}
            </Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: '10%',
  },
  user: {
    color: Colors.almostBlack,
    fontSize: 26,
    textAlign: 'left',
    paddingTop: '2%',
    paddingBottom: '2%',
    flex: 1
  },
  text: {
    color: Colors.almostBlack,
    fontSize: 20,
    textAlign: 'left',
    paddingTop: '2%',
    paddingBottom: '2%',
    flex: 1
  },
  contactIcon: {
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingRight: '5%'
  },
  version: {
    color: Colors.almostBlack,
    fontSize: 16,
    textAlign: 'left',
    paddingTop: '2%',
    paddingBottom: '2%',
    flex: 1
  },
});