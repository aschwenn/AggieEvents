import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { ListItem } from 'react-native-elements';
import Master from '../Master';
import { DummyOrgs } from '../data/dummyData.json';

export default class EventList extends React.Component {

  isManagedByUser(host) {
    if (Master.WireframeMode){
      for (let i = 0; i < DummyOrgs.length; i++){
        if (DummyOrgs[i].name == host){
          if (DummyOrgs[i].manage) return true;
          return false;
        }
      }
      return false;
    }
    else {
      // Make server calls
    }
  }

  render() {
    const navigate = this.props.navigate;
    let events = this.props.events;

    if (!events) return (<View></View>);

    // Add RSVP icons to list elements
    let newEvents = [];
    events.forEach((e, i) => {
      if (e.RSVP == 'going'){
        e.icon = 'check';
        e.iconColor = Colors.goingButton;
      }
      else if (e.RSVP == 'maybe'){
        e.icon = 'help-outline';
        e.iconColor = Colors.maybeButton;
      }
      else if (e.RSVP == 'notGoing'){
        e.icon = 'clear';
        e.iconColor = Colors.notGoingButton2;
      }
      else {
        e.iconColor = null;
      }
      if (this.isManagedByUser(e.host)){
        e.icon = 'build';
        e.iconColor = Colors.managedEvent;
      }
      newEvents.push(e);
    });
    events = newEvents;

    return (
      events.map((l, i) => (
        <ListItem
          key={i}
          leftIcon={{ name: l.icon, color: l.iconColor }}
          title={l.name}
          titleStyle={styles.eventTitle}
          subtitle={l.host}
          subtitleStyle={styles.eventSubTitle}
          style={styles.event}
          contentContainerStyle={{height: 40}}
          chevron
          onPress={() => {
            navigate('Event', {
              eventName: l.name,
              icon: l.icon,
              host: l.host,
              location: l.location,
              startDate: l.startDate,
              endDate: l.endDate,
              startDayofWeek: l.startDayofWeek,
              endDayofWeek: l.endDayofWeek,
              startTime: l.startTime,
              endTime: l.endTime,
              description: l.description,
              going: l.going,
              interested: l.interested,
              attributes: l.attributes,
              RSVP: l.RSVP,
              navigate: {navigate}
            });
          }}
          //badge={{value:null}}
        />
      ))
    )
  }
}

const styles = StyleSheet.create({
  event: {
    padding: '2%',
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    color: Colors.almostBlack,
  },
  eventSubTitle: {
    color: Colors.lightGray,
  }, 
})