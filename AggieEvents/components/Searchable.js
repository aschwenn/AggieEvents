import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import EventList from '../components/EventList';
import OrgList from '../components/OrgList';
import Master from '../Master';
import { DummyOrgs, DummyEvents } from '../data/dummyData.json';

export default class Searchable extends React.Component {

  searchEvents(query){
    if (Master.WireframeMode){
      // Use dummy data
      return this.search(query, DummyEvents);
    }
    else {
      // Query the database
      return [];
    }
  }

  searchOrgs(query){
    if (Master.WireframeMode){
      // Use dummy data
      return this.search(query, DummyOrgs);
    }
    else {
      // Query the database
      return [];
    }
  }

  /* Search implementation on the frontend.
   * This is completed on the backend, but the clientside search
   * is used when demoing the application as a frontend wireframe.
   * This code can be reused in Node with the addition of db calls.
  */
  search(query, list){
    let results = [];

    // Split query by spaces
    let queries = query.split(" ");

    list.forEach((item) => {
      match = true;
      queries.forEach((q) => {
        if (!item.name.toLowerCase().includes(q.toLowerCase())){
          if (item.host){
            if (!item.host.toLowerCase().includes(q.toLowerCase())){
              match = false;
            }
          }
          else {
            match = false;
          }
        }
      });

      if (match) results.push(item);
    });

    return results;
  }

  render() {
    const navigate = this.props.navigate;
    const searchType = this.props.searchType;
    const query = this.props.query;

    if (searchType == 'events'){
      // Search among events
      return (
        <View>
          <View style={styles.results}>
            <Text style={styles.titleText}>
              Results for "{query}"
            </Text>
          </View>
          <EventList
            navigate={navigate}
            events={this.searchEvents(query)}
          ></EventList>
        </View>
      )
    }
    else if (searchType == 'orgs'){
      // Search among orgs
      return (
        <View>
          <View style={styles.results}>
            <Text style={styles.titleText}>
              Results for "{query}"
            </Text>
          </View>
          <OrgList
            navigate={navigate}
            orgs={this.searchOrgs(query)}
            show='all' // options: all | subscribed
          ></OrgList>
        </View>
      )
    }
    else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  results: {
    paddingTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingBottom: '5%',
  },
  titleText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: '2%'
  },
});