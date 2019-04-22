import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo';
import { Button, Icon, Divider } from 'react-native-elements';
import Colors from '../constants/Colors';
import Master from '../Master';

class DateTime extends React.Component {
    formatTime(time){
        if (time){
            if (parseInt(time, 10) < 1300){
                // AM
                if (time.substring(2,4) == '00'){
                    // On the hour
                    time2 = parseInt(time.substring(0,2),10);
                    return time2.toString() + ' AM';
                }
                else {
                    // Includes minutes
                    time2 = parseInt(time.substring(0,2),10);
                    return time2.toString() + ':' + time.substring(2,4) + ' AM';
                }
            }
            else {
                // PM
                if (time.substring(2,4) == '00'){
                    time2 = parseInt(time.substring(0,2),10) - 12;
                    return time2.toString() + ' PM';
                }
                else {
                    // Includes minutes
                    time2 = parseInt(time.substring(0,2),10) - 12;
                    return time2.toString() + ':' + time.substring(2,4) + ' PM';
                }            
            }
        }
        else {
            return 'null';
        }
    }

    formatDate(dayofWeek, date){
        if (date){
            switch(dayofWeek){
                case 0: day = 'Sun'; break;
                case 1: day = 'Mon'; break;
                case 2: day = 'Tue'; break;
                case 3: day = 'Wed'; break;
                case 4: day = 'Thu'; break;
                case 5: day = 'Fri'; break;
                case 6: day = 'Sat'; break;
                default: day = dayofWeek.toString();
            }
            monthNum = date.substring(0,2);
            switch(monthNum){
                case '01': month = 'Jan'; break;
                case '02': month = 'Feb'; break;
                case '03': month = 'Mar'; break;
                case '04': month = 'Apr'; break;
                case '05': month = 'May'; break;
                case '06': month = 'Jun'; break;
                case '07': month = 'Jul'; break;
                case '08': month = 'Aug'; break;
                case '09': month = 'Sep'; break;
                case '10': month = 'Oct'; break;
                case '11': month = 'Nov'; break;
                case '12': month = 'Dec'; break;
                default: month = 'null month';
            }
            dayToString = parseInt(date.substring(3,5),10);
            return day + ', ' + month + ' ' + dayToString.toString() + ', ' + date.substring(6,10);
        }
        else {
            return 'null date';
        }
    }

    render() {
        const startDate = this.props.startDate;
        const endDate = this.props.endDate;
        const startTime = this.props.startTime;
        const endTime = this.props.endTime;
        const startDayofWeek = this.props.startDayofWeek;
        const endDayofWeek = this.props.endDayofWeek;

        startTimeFormatted = this.formatTime(startTime);
        endTimeFormatted = this.formatTime(endTime);

        // Reformat the date and time
        if (startDate == endDate){
            // If event is only on one day
            dateFormatted = this.formatDate(startDayofWeek, startDate);

            return (
                <View style={{flexDirection: 'row'}}>
                    <Icon style={styles.datetimeIcon}
                        name='access-time'
                        color='white'
                        size={20}
                    ></Icon>
                    <Text style={styles.datetimeText}> {dateFormatted} </Text>
                    <Text style={styles.subtitle2}>at</Text>
                    <Text style={styles.datetimeText}> {startTimeFormatted}</Text>
                    <Text style={styles.subtitle2}>-</Text>
                    <Text style={styles.datetimeText}>{endTimeFormatted}</Text>
                </View>
            );
        }
        else {
            // If event spans two or more days
            startDateFormatted = this.formatDate(startDayofWeek, startDate);
            endDateFormatted = this.formatDate(endDayofWeek, endDate);

            // If it spans multiple days, remove the day of the week string
            // ...i's too much to fit on one line
            startDateFormatted = startDateFormatted.substring(4);
            endDateFormatted = endDateFormatted.substring(4);

            return (
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Icon style={styles.datetimeIcon}
                            name='access-time'
                            color='white'
                            size={20}
                        ></Icon>
                        <Text style={styles.datetimeText}> {startDateFormatted} </Text>
                        <Text style={styles.subtitle2}>at</Text>
                        <Text style={styles.datetimeText}> {startTimeFormatted}</Text>
                        <Text style={styles.subtitle2}> to</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Icon style={styles.datetimeIcon}
                            name='access-time'
                            color='transparent'
                            size={20}
                        ></Icon>
                        <Text style={styles.datetimeText}> {endDateFormatted} </Text>
                        <Text style={styles.subtitle2}>at</Text>
                        <Text style={styles.datetimeText}> {endTimeFormatted}</Text>
                        <Text style={styles.subtitle2}></Text>
                    </View>
                </View>  
            );
        }        
    }
}

export default class EventDetails extends React.Component {
    static navigationOptions = {
        title: 'Event Details',
        headerStyle: {
            backgroundColor: Colors.tabBar,
        },
    };

    state = {
        going: {
            button: (this.props.navigation.getParam('RSVP', 'null')=='going')? 'solid' : 'outline',
            style: (this.props.navigation.getParam('RSVP', 'null')=='going')?
                {borderColor:'white',backgroundColor:Colors.goingButton} : {borderColor:'white',}
        },
        maybe: {
            button: (this.props.navigation.getParam('RSVP', 'null')=='maybe')? 'solid' : 'outline',
            style: (this.props.navigation.getParam('RSVP', 'null')=='maybe')?
            {borderColor:'white',backgroundColor:Colors.maybeButton} : {borderColor:'white',}
        },
        notGoing: {
            button: (this.props.navigation.getParam('RSVP', 'null')=='notGoing')? 'solid' : 'outline',
            style: (this.props.navigation.getParam('RSVP', 'null')=='notGoing')?
            {borderColor:'white',backgroundColor:Colors.notGoingButton} : {borderColor:'white',}
        },
        rsvped: {
            going: this.props.navigation.getParam('going',-1),
            interested: this.props.navigation.getParam('interested',-1),
        }
    }

    going = () => {
        this.setState({
            going: {
                button: 'solid',
                style: {borderColor:'white',backgroundColor:Colors.goingButton}
            },
            maybe: {
                button: 'outline',
                style: {borderColor:'white',}
            },
            notGoing: {
                button: 'outline',
                style: {borderColor:'white',}
            },
            rsvped: {
                going: (this.props.navigation.getParam('RSVP', 'null')=='going')?
                    this.props.navigation.getParam('going',-1) : this.props.navigation.getParam('going',-1) + 1,
                interested: (this.props.navigation.getParam('RSVP', 'null')=='maybe')?
                    this.props.navigation.getParam('interested',-1) - 1 : this.props.navigation.getParam('interested',-1),
            }
        })
        if (!Master.WireframeMode) {
            // Make api request
        }
    }

    maybe = () => {
        this.setState({
            going: {
                button: 'outline',
                style: {borderColor:'white',}
            },
            maybe: {
                button: 'solid',
                style: {borderColor:'white',backgroundColor:Colors.maybeButton}
            },
            notGoing: {
                button: 'outline',
                style: {borderColor:'white',}
            },
            rsvped: {
                going: (this.props.navigation.getParam('RSVP', 'null')=='going')?
                    this.props.navigation.getParam('going',-1) - 1 : this.props.navigation.getParam('going',-1),
                interested: (this.props.navigation.getParam('RSVP', 'null')=='maybe')?
                    this.props.navigation.getParam('interested',-1) : this.props.navigation.getParam('interested',-1) + 1,
            }
        })
        if (!Master.WireframeMode) {
            // Make api request
        }
    }

    notGoing = () => {
        this.setState({
            going: {
                button: 'outline',
                style: {borderColor:'white',}
            },
            maybe: {
                button: 'outline',
                style: {borderColor:'white',}
            },
            notGoing: {
                button: 'solid',
                style: {borderColor:'white',backgroundColor:Colors.notGoingButton}
            },
            rsvped: {
                going: (this.props.navigation.getParam('RSVP', 'null')=='going')?
                    this.props.navigation.getParam('going',-1) - 1 : this.props.navigation.getParam('going',-1),
                interested: (this.props.navigation.getParam('RSVP', 'null')=='maybe')?
                    this.props.navigation.getParam('interested',-1) - 1 : this.props.navigation.getParam('interested',-1),
            }
        })
        if (!Master.WireframeMode) {
            // Make api request
        }
    }

    render() {
        const { navigation } = this.props;
        const eventName = navigation.getParam('eventName','missing attribute');
        const host = navigation.getParam('host','missing attribute');
        const location = navigation.getParam('location','missing attribute');
        const startDate = navigation.getParam('startDate', 'missing attribute');
        const endDate = navigation.getParam('endDate', 'missing attribute');
        const startTime = navigation.getParam('startTime', 'missing attribute');
        const endTime = navigation.getParam('endTime', 'missing attribute');
        const startDayofWeek = navigation.getParam('startDayofWeek', 'missing attribute');
        const endDayofWeek = navigation.getParam('endDayofWeek', 'missing attribute');
        const description = navigation.getParam('description', 'missing attribute');
        const attributes = navigation.getParam('attributes', 'missing attribute');
        //const RSVP = navigation.getParam('RSVP', 'null');

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
                        <View style={{paddingBottom: 50}}>
                            <Text /* Event Name */
                                style={styles.title}>
                                {eventName}
                            </Text>
                            <View /* Host organization */
                                style={{
                                    flexDirection: 'row', 
                                    //flexWrap: 'wrap',
                                }}>
                                <Text style={styles.subtitle}>Hosted by </Text>
                                <Text style={styles.host}
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                >{host}</Text>
                            </View>
                            <DateTime /* Date and time of event */
                                startDate={startDate}
                                endDate={endDate}
                                startDayofWeek={startDayofWeek}
                                endDayofWeek={endDayofWeek}
                                startTime={startTime}
                                endTime={endTime}
                            ></DateTime>
                            <View /* Location */
                                style={{flexDirection: 'row'}}>
                                <Icon style={styles.locationIcon}
                                    name='location-on'
                                    color='white'
                                    size={20}
                                ></Icon>
                                <Text style={styles.locationText}> {location}</Text>
                            </View>
                            <View /* RSVP Buttons */
                                style={{
                                    flexDirection: 'row',
                                    paddingTop: '2%',
                                    paddingBottom: '0%',
                                }}>
                                <Button
                                    icon={
                                        <Icon
                                            name='check'
                                            size={15}
                                            color='white'
                                        />
                                    }
                                    title='Going'
                                    type={this.state.going.button}
                                    titleStyle={styles.rsvpButtonTitle}
                                    buttonStyle={this.state.going.style}
                                    containerStyle={{paddingRight: '3%'}}
                                    onPress={this.going}
                                />
                                <Button
                                    icon={
                                        <Icon
                                            name='help-outline'
                                            size={15}
                                            color='white'
                                        />
                                    }
                                    title='Maybe'
                                    type={this.state.maybe.button}
                                    titleStyle={styles.rsvpButtonTitle}
                                    buttonStyle={this.state.maybe.style}
                                    containerStyle={{paddingRight: '3%'}}
                                    onPress={this.maybe}
                                />
                                <Button
                                    icon={
                                        <Icon
                                            name='clear'
                                            size={15}
                                            color='white'
                                        />
                                    }
                                    title='Not Going'
                                    type={this.state.notGoing.button}
                                    titleStyle={styles.rsvpButtonTitle}
                                    buttonStyle={this.state.notGoing.style}
                                    onPress={this.notGoing}
                                />
                            </View>
                            <View // Attendees
                                style={{
                                    flexDirection: 'row',
                                    paddingTop: '2%',
                                    paddingBottom: '0%',
                                }}>
                                <Text style={styles.attendees}>{this.state.rsvped.going}</Text>
                                <Text style={styles.subtitle2}> going, </Text>
                                <Text style={styles.attendees}>{this.state.rsvped.interested}</Text>
                                <Text style={styles.subtitle2}> interested</Text>
                            </View>
                            {/*<View style={{paddingTop:'2%',paddingBottom:'2%'}}>
                                <Divider style={{backgroundColor:Colors.almostWhite}}></Divider>
                            </View>*/}
                            <View /* Description */>
                                <Text style={styles.subtitle}>About</Text>
                                <Text style={styles.description}>
                                    {description}
                                </Text>
                                <View>
                                    {
                                        attributes.map((a,i) => (
                                            <View style={styles.attribute} key={i}>
                                                <Icon style={styles.attributeIcon}
                                                    name='check'
                                                    color='white'
                                                    size={20}
                                                ></Icon>
                                            <Text style={styles.attributeText}> {a}</Text>
                                        </View>
                                        ))
                                    }
                                </View>
                            </View>
                        </View>
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
    contentContainer: {
        //paddingTop: 80,
    },
    eventStyle: {
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
        color: Colors.almostWhite,
        textAlign: 'left',
        fontSize: 20,
        paddingTop: '2%',
        paddingBottom: '2%'
    },
    host: {
        color: 'white',
        fontSize: 20,
        textAlign: 'left',
        paddingTop: '2%',
        paddingBottom: '2%',
        flex: 1,
    },
    locationIcon: {
        textAlign: 'left',
        paddingTop: '2%',
        paddingBottom: '2%',
    },
    locationText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'left',
        paddingTop: '0%',
        paddingBottom: '2%',
    },
    datetimeIcon: {
        textAlign: 'left',
        paddingTop: '2%',
        paddingBottom: '2%',
    },
    datetimeText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'left',
        paddingTop: '0%',
        paddingBottom: '2%',
    },
    subtitle2: {
        color: Colors.almostWhite,
        fontSize: 20,
        textAlign: 'left',
        paddingTop: '0%',
        paddingBottom: '2%',
    },
    description: {
        color: 'white',
        fontSize: 16,
        textAlign: 'left',
        paddingTop: '2%',
        paddingBottom: '5%',
    },
    attribute: {
        paddingTop: '1%',
        paddingBottom: '1%',
        flexDirection: 'row'
    },
    attributeIcon: {
        textAlign: 'left',
        paddingTop: '2%',
        paddingBottom: '2%',
    },
    attributeText: {
        textAlign: 'left',
        paddingTop: '0.5%',
        paddingBottom: '2%',
        color: 'white',
        fontSize: 16
    },
    rsvpButtonTitle: {
        color: 'white',
        paddingLeft: 4,
        paddingBottom: '2%',
    },
    attendees: {
        color: 'white',
        fontSize: 20,
        textAlign: 'left',
        paddingTop: '0%',
        paddingBottom: '2%',
    },
});