import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';
import { Button, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';


export default class EventDetails extends React.Component {
    static navigationOptions = {
        title: 'Event Details',

    };
    render() {

        const { navigation } = this.props;
        const eventName = navigation.getParam('eventName','untitled');
        const host = navigation.getParam('host','segmentation fault');

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
                        <Text style={styles.title}>{eventName}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.subtitle}>Hosted by </Text>
                            <Text style={styles.host}>{host}</Text>
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
        padding: '10%'
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
        paddingBottom: '2%'
    }
});