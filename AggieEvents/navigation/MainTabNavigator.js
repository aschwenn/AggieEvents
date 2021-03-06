import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import OrgsScreen from '../screens/OrgsScreen';
import Colors from '../constants/Colors';
import EventDetails from '../screens/EventDetails';
import OrgDetails from '../screens/OrgDetails';
import SettingsScreen from '../screens/SettingsScreen';
import ShowAll from '../screens/ShowAll';
import EditEvent from '../screens/EditEvent';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Event: EventDetails,
  Org: OrgDetails,
  Settings: SettingsScreen,
  ShowAll: ShowAll,
  EditEvent: EditEvent
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: {
    activeTintColor: Colors.background2,
    labelStyle: {
      fontSize: 12,
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

const EventsStack = createStackNavigator({
  Events: EventsScreen,
  Event: EventDetails,
  Org: OrgDetails,
  Settings: SettingsScreen,
  ShowAll: ShowAll,
  EditEvent: EditEvent
});

EventsStack.navigationOptions = {
  tabBarLabel: 'Events',
  tabBarOptions: {
    activeTintColor: Colors.background2,
    labelStyle: {
      fontSize: 12,
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'}
    />
  ),
};

const OrgsStack = createStackNavigator({
  Orgs: OrgsScreen,
  Org: OrgDetails,
  Event: EventDetails,
  Settings: SettingsScreen,
  ShowAll: ShowAll,
  EditEvent: EditEvent
});

OrgsStack.navigationOptions = {
  tabBarLabel: 'Organizations',
  tabBarOptions: {
    activeTintColor: Colors.background2,
    labelStyle: {
      fontSize: 12,
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  EventsStack,
  OrgsStack,
});
