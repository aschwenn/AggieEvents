import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  DatePickerIOS,
  Dimensions,
  Alert,
  TouchableHighlight,
} from 'react-native';
import { LinearGradient } from 'expo';
import Colors from '../constants/Colors';
import Master from '../Master';

export default class EditEvent extends React.Component {
  static navigationOptions = {
    title: 'Edit Event',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: Colors.tabBar,
    },
  };

  state = {
    title: this.props.navigation.getParam('eventName', '').eventName,
    location: this.props.navigation.getParam('location', '').location,
    startDate: this.props.navigation.getParam('startDate', null).startDate,
    endDate: this.props.navigation.getParam('endDate', null).endDate,
    startTime: this.props.navigation.getParam('startTime', null).startTime,
    endTime: this.props.navigation.getParam('endTime', null).endTime,
    description: this.props.navigation.getParam('description', '').description,
    attributes: this.props.navigation.getParam('attributes', []).attributes,
  };
  navigate = this.props.navigation.getParam('navigate', null);

  height = 0;
  width = 0;

  formatDateString(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = (month < 10)? ('0' + month.toString()) : month.toString();
    day = (day < 10)? ('0' + day.toString()) : day.toString();
    return month + '-' + day + '-' + date.getFullYear();
  }

  formatTimeString(date) {
    let min;
    if (date.getMinutes() < 10) min = '0' + date.getMinutes().toString();
    else min = date.getMinutes().toString();
    let hour;
    if (date.getHours() < 10) hour = '0' + date.getHours().toString();
    else hour = date.getHours().toString();
    return '' + hour + min;
  }

  toDate(d, t) {
    d = d.toString().replace('-','/');
    d = d.toString().replace('-','/');
    let date = new Date(d);
    date.setHours(Math.floor(t / 100));
    date.setMinutes(t % 100);
    return date;
  }

  getToday() {
    let d = new Date();
    let min = d.getMinutes();
    let add = 5 - (min % 5);
    d.setMinutes(min + add);
    return d;
  }

  getInAYear() {
    let d = this.getToday()
    d.setFullYear(d.getFullYear() + 1);
    return d;
  }

  endTimeMinimum(){
    let d = this.toDate(this.state.startDate, this.state.startTime);
    d.setMinutes(d.getMinutes() + 5);
    return d;
  }

  cancelChanges(){
    Alert.alert(
      'Cancel changes',
      'Are you sure you want to continue?',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => this.props.navigation.goBack()}
      ],
      {cancelable: false},
    );
  }

  submitChanges(){
    if (Master.WireframeMode){
      Alert.alert(
        'Changes submitted',
        'Updated event "' + this.state.title + '"',
        [
          {text: 'OK', onPress: () => this.props.navigation.goBack()}
        ],
        {cancelable: false},
      );
    }
    else {
      // Make database call
    }
  }

  render(){
    var dim = Dimensions.get('window');
    this.height = dim.height;
    this.width = dim.width;
    console.log(this.height);
    
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
          <ScrollView style={styles.eventStyle}>
            <View style={{paddingBottom: 160}}>
              <View style={styles.editChunk}>
                <Text style={styles.title}>Event Title</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => this.setState({title: text})}
                  value={this.state.title}
                  maxLength={80}
                  autoCapitalize='words'
                  autoCorrect={true}
                  clearButtonMode='while-editing'
                />
              </View>
              <View style={styles.editChunk}>
                <Text style={styles.title}>Start Date</Text>
                <View style={styles.datepicker}>
                  <DatePickerIOS
                    date={this.toDate(this.state.startDate, this.state.startTime)}
                    onDateChange={(date) => {
                      this.setState({startDate: this.formatDateString(date)});
                      this.setState({startTime: this.formatTimeString(date)})
                    }}
                    minuteInterval={5}
                    mode='datetime'
                    minimumDate={this.getToday()}
                    maximumDate={this.getInAYear()}
                  />
                </View>
              </View>
              <View style={styles.editChunk}>
                <Text style={styles.title}>End Date</Text>
                <View style={styles.datepicker}>
                  <DatePickerIOS
                    date={this.toDate(this.state.endDate, this.state.endTime)}
                    onDateChange={(date) => {
                      this.setState({endDate: this.formatDateString(date)});
                      this.setState({endTime: this.formatTimeString(date)})
                    }}
                    minuteInterval={5}
                    mode='datetime'
                    minimumDate={this.endTimeMinimum()}
                    maximumDate={this.getInAYear()}
                  />
                </View>
              </View>
              <View style={styles.editChunk}>
                <Text style={styles.title}>Location</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => this.setState({location: text})}
                  value={this.state.location}
                  maxLength={80}
                  autoCapitalize='words'
                  autoCorrect={true}
                  clearButtonMode='while-editing'
                />
              </View>
              <View style={styles.editChunk}>
                <Text style={styles.title}>Description</Text>
                <TextInput
                  style={styles.textInput2}
                  onChangeText={(text) => this.setState({description: text})}
                  value={this.state.description}
                  maxLength={500}
                  autoCapitalize='words'
                  autoCorrect={true}
                  clearButtonMode='while-editing'
                  multiline = {true}
                  numberOfLines = {5}
                />
              </View>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <View style={{padding:'5%'}}>
                  <TouchableHighlight
                    style={styles.editButton}
                    onPress={() => this.cancelChanges()}
                  >
                    <Text style={styles.editButtonTitle}>Cancel</Text>
                  </TouchableHighlight>
                </View>
                <View style={{padding:'5%'}}>
                  <TouchableHighlight
                    style={styles.editButton}
                    onPress={() => this.submitChanges()}
                  >
                    <Text style={styles.editButtonTitle}>Submit</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'transparent',
      color: 'white',
  },
  eventStyle: {
    padding: '7%',
    flexWrap: 'wrap',
  },
  title: {
    color: 'white',
    fontSize: 20,
    textAlign: 'left',
    paddingTop: '2%',
    paddingBottom: '2%',
    flex: 1,
    textAlign: 'center',
  },
  editChunk: {
    paddingBottom: '3%',
    width: (this.width - (this.width * 0.14)),
  },
  textInput: {
    borderColor: 'rgba(0,0,0,0.8)',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  textInput2: {
    borderColor: 'rgba(0,0,0,0.8)',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    padding: 10,
    fontSize: 16,
    textAlign: 'left',
    width: (this.width - (this.width * 0.14)),
    textAlignVertical: 'top',
  },
  datepicker: {
    width: (this.width - (this.width * 0.14)),
    backgroundColor: 'white',
    padding: '1%',
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.8)',
    borderWidth: 2,
  },
  editButtonTitle: {
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 20,
    padding: '2%'
  },
  editButton: {
    paddingRight: '5%',
    paddingBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: '3%'
  }
});