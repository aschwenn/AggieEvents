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
import Master from '../Master';

export default class OrgDetails extends React.Component {

  state = {
    subscribed: {
      button: (this.props.navigation.getParam('subscribed', false))? 'solid' : 'outline',
      style: (this.props.navigation.getParam('subscribed', false))?
        {borderColor: 'white', backgroundColor: Colors.lightGray} : {borderColor:'white'},
      text: (this.props.navigation.getParam('subscribed', false))? 'Unsubscribe' : 'Subscribe',
    },
    subscribedStatus: this.props.navigation.getParam('subscribed', false)
  }

  toggleSubscribe(){
    let st = this.state;
    st.subscribedStatus = !st.subscribedStatus;
    if (!Master.WireframeMode) {
      // Send api request
    }
    else {
      if (st.subscribedStatus) {
        st.subscribed.button = 'solid';
        st.subscribed.style = {borderColor: 'white', backgroundColor: Colors.lightGray};
        st.subscribed.text = 'Unsubscribe';
      }
      else {
        st.subscribed.button = 'outline';
        st.subscribed.style = {borderColor:'white'};
        st.subscribed.text = 'Subscribe';
      }
    }
    this.setState(st);
  }

  renderDues(){
    const dues = this.props.navigation.getParam('dues', null);
    if (dues){
      if ((dues.year && !dues.semester) ||
          (!dues.year && dues.semester)){ // logical XOR
        return (
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subtitle2}>Dues: </Text>
            <Text style={styles.dues}>${dues.year} per {(dues.year)? 'year' : 'semester'}</Text>
          </View>
        )
      }
      else if (dues.year && dues.semester){
        return (
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.subtitle2}>Dues: </Text>
              <Text style={styles.dues}>${dues.year} per year</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.subtitle3}>Dues: </Text>
              <Text style={styles.dues}>${dues.semester} per semester</Text>
            </View>
          </View>
        )
      }
      else return null;
    }
    else return null;
  }

  render(){
    const { navigation } = this.props;
    const orgName = navigation.getParam('name','missing attribute');
    const icon = navigation.getParam('icon', null);
    const description = navigation.getParam('description', 'missing attribute');
    const subtitle = navigation.getParam('subtitle', null);
    const contact = navigation.getParam('contact', null);
    const yearFounded = navigation.getParam('yearFounded', null);
    const meetingLocations = navigation.getParam('meetingLocations', null);
    const category = navigation.getParam('category', null);

    return (
      <View style={styles.container}>
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
          <ScrollView style={styles.orgStyle}>
            <Text /* Org Name */
              style={styles.title}>
              {orgName}
            </Text>
            {(subtitle)? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            <View /* Subscribe Button */
              style={{
                paddingTop: '2%',
                paddingBottom: '2%',
              }}>
              <Button
                title={this.state.subscribed.text}
                type={this.state.subscribed.button}
                titleStyle={styles.buttonTitle}
                buttonStyle={this.state.subscribed.style}
                containerStyle={{paddingRight: '3%'}}
                onPress={() => {
                  this.toggleSubscribe();
                }}
              />
            </View>
            {
              this.renderDues()
            }
            {
              (yearFounded)? 
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.subtitle2}>Year Founded: </Text>
                <Text style={styles.dues}>{yearFounded}</Text>
              </View>
              : null
            }
            {
              (meetingLocations)?
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.subtitle2}>Meeting Locations: </Text>
                <Text style={styles.dues}>{meetingLocations}</Text>
              </View>
              : null
            }
            {
              (category)?
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.subtitle2}>Category: </Text>
                <Text style={styles.dues}>{category}</Text>
              </View>
              : null
            }
            <View /* Description */>
              <Text style={styles.subtitle}>About</Text>
              <Text style={styles.description}>
                {description}
              </Text>
            </View>
            {
              (contact)?
              <View>
                <Text style={styles.subtitle}>Contact Information</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.subtitle4}>Email: </Text>
                  <Text style={styles.contact}>{contact}</Text>
                </View>
              </View>
              : null
            }
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    color: 'white',
  },
  orgStyle: {
    // Container for user's events feed
    padding: '7%',
    flexWrap: 'wrap',
  },
  title: {
    textAlign: 'left',
    color: 'white',
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: '2%',
    paddingBottom: '1%'
  },
  subtitle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'left',
    paddingTop: '2%',
    paddingBottom: '2%',
    flex: 1,
  },
  description: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
    paddingTop: '2%',
    paddingBottom: '5%',
  },
  buttonTitle: {
    color: 'white',
    paddingLeft: 4,
    paddingBottom: '2%',
  },
  subtitle2: {
    color: Colors.almostWhite,
    fontSize: 20,
    textAlign: 'left',
    paddingTop: '0%',
    paddingBottom: '2%',
  },
  subtitle3: {
    color: 'transparent',
    fontSize: 20,
    textAlign: 'left',
    paddingTop: '0%',
    paddingBottom: '2%',
  },
  subtitle4: {
    color: Colors.almostWhite,
    fontSize: 16,
    textAlign: 'left',
    paddingTop: '0%',
    paddingBottom: '2%',
  },
  dues: {
    color: 'white',
    fontSize: 20,
    textAlign: 'left',
    paddingTop: '0%',
    paddingBottom: '2%',
  },
  contact: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
    paddingTop: '0%',
    paddingBottom: '2%',
  },
});