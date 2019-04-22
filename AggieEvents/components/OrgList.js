import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { ListItem } from 'react-native-elements';

export default class OrgList extends React.Component {

  render() {
    const navigate = this.props.navigate;
    let orgs = this.props.orgs;

    /* This filter element actually isn't necessary on the frontend;
     * the backend should be taking care of this. However, in a pinch
     * it is nice to have to be able to perform fitlering in-app.
     */
    const show = this.props.show;

    if (!orgs) return (<View></View>);

    // Filter based on 'show'
    if (show) {
      if (show == 'subscribed') {
        // Filter out orgs that the user isn't subscribed to
        let filteredOrgs = [];
        orgs.forEach((o, i) => {
          if (o.subscribed) filteredOrgs.push(o);
        });
        orgs = filteredOrgs;
      }
      // if show == 'all', do nothing
    }

    return (
      orgs.map((l, i) => (
        <ListItem
          key={i}
          leftIcon={{name: l.icon}}
          title={l.name}
          titleStyle={styles.orgTitle}
          subtitle={l.subtitle}
          subtitleStyle={styles.orgSubTitle}
          contentContainerStyle={{height: 40}}
          style={styles.org}
          chevron
          onPress={() => {
            navigate('Org', {
              name: l.name,
              icon: l.icon,
              description: l.description,
              subscribed: l.subscribed,
              subtitle: l.subtitle,
              contact: l.contact,
              yearFounded: l.yearFounded,
              dues: l.dues,
              meetingLocations: l.meetingLocations,
              category: l.category,
              navigate: {navigate}
            });
          }}

        />
      ))
    )
  }
}

const styles = StyleSheet.create({
  org: {
    padding: '2%',
  },
  orgTitle: {
    fontSize: 18,
    color: Colors.almostBlack,
  },
  orgSubTitle: {
    color: Colors.lightGray,
  }, 
})