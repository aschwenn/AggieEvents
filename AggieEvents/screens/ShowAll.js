import React from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import EventList from '../components/EventList';
import OrgList from '../components/OrgList';
import { LinearGradient } from 'expo';
import Colors from '../constants/Colors';

export default class ShowAll extends React.Component {
  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const list = navigation.getParam('list', []);
    const type = navigation.getParam('type', null);
    const details = navigation.getParam('details', {});

    if (type == 'events'){
      return (
        <View style={{ flex: 1, }}>
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
            <ScrollView>
              <View style={{ paddingTop: '3%' }}>
                <EventList
                  events={list}
                  navigate={navigate}
                ></EventList> 
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
      )
    }
    else if (type == 'orgs'){
      if (details.show){ // safety
        return (
          <View style={{ flex: 1, }}>
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
              <ScrollView>
                <View style={{ paddingTop: '3%' }}>
                  <OrgList
                    orgs={list}
                    navigate={navigate}
                    show={details.show}
                  ></OrgList>
                </View>
              </ScrollView>
            </LinearGradient>
          </View>
        )
      }
      else {
        return (
          <View style={{ flex: 1, }}>
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
              <ScrollView>
                <View style={{ paddingTop: '3%' }}>
                  <OrgList
                    orgs={list}
                    navigate={navigate}
                    show='all'
                  ></OrgList>
                </View>
              </ScrollView>
            </LinearGradient>
          </View>
        )
      }      
    }
    else {
      return (<View></View>)
    }
  }
}