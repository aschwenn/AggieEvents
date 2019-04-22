import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Picker,
  Modal,
  TouchableHighlight
} from 'react-native';
import { LinearGradient } from 'expo';
import Colors from '../constants/Colors';
import { ListItem, SearchBar, Button, Icon } from 'react-native-elements';
import { DummyOrgs } from '../data/dummyData.json';
import OrgList from '../components/OrgList';
import Master from '../Master';
import Searchable from '../components/Searchable';

class SearchResults extends React.Component {
  render() {
    const navigate = this.props.navigate;

    // Show search results only if user is currently searching, else hide
    if (this.props.state.search == '') {
      return null;
    }
    else {
      return (
        <View>
          <Searchable
            navigate={navigate}
            searchType='orgs'
            query={this.props.state.search}
          ></Searchable>
        </View>
      )
    }
  }
}

class Discover extends React.Component {

  state = {
    category: 'All',
    tempCategory: 'All',
    modalVisible: false,
    discoverOrgs: [],
    fullDiscoverOrgs: [],
    orgShow: 'Show more',
    orgNo: (Master.WireframeMode)? DummyOrgs.length : this.getOrgs().length,
  };

  getOrgs(){
    // Make api call for orgs
    return [];
  }

  // Called when page is opening
  componentWillMount() {
    if (Master.WireframeMode){
      this.setState({discoverOrgs: DummyOrgs.slice(0,Master.DefaultListShow)});
    }
    else {
      // Query the database
      // .slice(0,Master.DefaultListShow)
    }
  }

  refreshDiscoverOrgs() {
    if (Master.WireframeMode){
      // Find all orgs matching the category
      let orgs = [];
      if (this.state.category == 'All'){
        this.setState({fullDiscoverOrgs: DummyOrgs});
        this.setState({orgShow: 'Show more'});
        this.setState({orgNo: DummyOrgs.length});
        this.setState({discoverOrgs: DummyOrgs.slice(0, Master.DefaultListShow)});
      }
      else {
        DummyOrgs.forEach((d) => {
          if (d.category == this.state.category){
            orgs.push(d);
          }
        });
        this.setState({fullDiscoverOrgs: orgs});
        this.setState({orgShow: 'Show more'});
        this.setState({orgNo: orgs.length});
        this.setState({discoverOrgs: orgs.slice(0, Master.DefaultListShow)});
      }      
    }
    else {
      // Query the database
    }
  }

  render() {
    const navigate = this.props.navigate;

    // Show Discover element only if user is not currently searching
    if (this.props.state.search != ''){
      return null;
    }
    else {
      return (
        <View>
          <View style={styles.discover}>
            <Text style={styles.discoverText}>
              Discover Organizations
            </Text>
          </View>
          
          <View style={{
            paddingLeft: '15%',
            paddingRight: '15%',
            paddingTop: '2%',
            paddingBottom: '2%'
          }}>
            <Button 
              title={'Category: ' + this.state.category}
              type='outline'
              titleStyle={{color: Colors.almostWhite}}
              buttonStyle={{borderColor: Colors.almostWhite, paddingBottom: '5%', paddingTop: '0%'}}
              containerStyle={{paddingTop: 0, paddingBottom: '2%'}}
              onPress={() => {
                let st = this.state;
                st.modalVisible = true;
                this.setState(st);
              }}
            />  
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{
              //marginTop: 200,
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
              }}>
              <View style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                padding: 20,
                borderRadius: 15,
                borderColor: Colors.almostBlack,
                borderWidth: 2,
                }}>
                <Text style={{
                  fontSize: 20,
                  textAlign: 'center',
                }}>Search by Category</Text>

                <View style={{
                  paddingTop: '5%',
                  paddingBottom: '5%',
                }}>
                  <Picker
                    selectedValue={this.state.tempCategory}
                    style={{
                      height: 44,
                      width: 250,
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({tempCategory: itemValue})
                    }
                    itemStyle={{
                      color: Colors.almostBlack,
                      height: 44,
                    }}  
                  >
                    <Picker.Item label='All' value='All' />
                    {
                      Master.AcceptedCategories.map((cat, i) => (
                          <Picker.Item label={cat} value={cat} key={i} />
                        )
                      )
                    }
                  </Picker>
                </View>
                
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <Button 
                    title={'Cancel'}
                    type='outline'
                    titleStyle={{color: 'black', fontSize: 20}}
                    buttonStyle={{borderColor: 'black', paddingBottom: '5%', paddingTop: '0%', borderWidth: 1}}
                    containerStyle={{padding: '5%'}}
                    onPress={() => {
                      let st = this.state;
                      st.modalVisible = false;
                      st.tempCategory = st.category;
                      this.setState(st);
                  }} />
                  <Button 
                    title={'OK'}
                    type='outline'
                    titleStyle={{color: Colors.almostBlack, fontSize: 20}}
                    buttonStyle={{borderColor: Colors.almostBlack, paddingBottom: '5%', paddingTop: '0%'}}
                    containerStyle={{padding: '5%'}}
                    onPress={() => {
                      let st = this.state;
                      st.modalVisible = false;
                      st.category = st.tempCategory;
                      this.setState(st);
                      this.refreshDiscoverOrgs();
                  }} />
                </View>

              </View>
            </View>
          </Modal>
          
          <OrgList
            orgs={this.state.discoverOrgs}
            navigate={navigate}
            show='all'
          ></OrgList>

          {((this.state.orgShow == 'Show more' &&
            this.state.orgNo > Master.DefaultListShow) ||
            this.state.orgShow == 'Show all' &&
            this.state.orgNo > (Master.DefaultListShow * 2)) ?

            <View style={{
              paddingLeft: '30%',
              paddingRight: '30%',
              paddingTop: '2%',
              paddingBottom: '2%'}}>
              <Button 
                title={this.state.orgShow}
                type='outline'
                titleStyle={{color: 'rgba(255,255,255,0.9)'}}
                buttonStyle={styles.button}
                onPress={() => {
                  if (this.state.orgShow == 'Show more'){
                    // Show 3 more events
                    let st = this.state;
                    st.discoverOrgs = (Master.WireframeMode)? DummyOrgs.slice(0,(Master.DefaultListShow * 2)) : this.getOrgs().slice(0,(Master.DefaultListShow * 2));
                    st.orgShow = 'Show all'
                    this.setState(st);
                  }
                  else {
                    // Show all events on a new page
                    navigate('ShowAll', {
                      list: this.state.fullDiscoverOrgs,
                      type: 'orgs',
                      details: {show: 'all'}
                      });
                    }
                  }}
                />
              </View>

            : null}
        </View>
      )
    }
  }
}

export default class OrgsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    if (Master.HideHeaders) {
      return {
        header: null
      }
    }
    else {
      return {
        title: 'Aggie Events',
        headerTitleStyle: {
          color: '#000',
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: Colors.tabBar,
        },
        headerBackTitle: null, // don't want length title, just use back button
        tintColor: 'black',
        headerRight: (
          <Button
            icon={
              <Icon
                name='settings'
                color={Colors.iconGray}
              />
            }
            buttonStyle={{
              backgroundColor: 'transparent',
              paddingRight: 14,
            }}
            onPress={() => {
              navigation.navigate('Settings');
            }}
          />
        )
      }
    }
  };


  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({
      search: search,
    });
  };

  render() {
    const { search } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: 'white', flex: 1 }} />
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
          <View>
            <LinearGradient
              colors={['rgba(255,255,255,0.4)','transparent']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: (Master.HideHeaders)? 100 : 0
              }}>
            </LinearGradient>
          </View>

          <View style={{paddingTop: (Master.HideHeaders)? '7%' : 0,}}>
            <SearchBar
              placeholder='Search student organizations...'
              onChangeText={this.updateSearch}
              value={search}
              lightTheme
              round
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderWidth: 0, //no effect
                shadowColor: 'white', //no effect
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
                paddingTop: (Master.HideHeaders)? '10%' : '2%',
                paddingBottom: (Master.HideHeaders)? '5%' : '2%',
              }}
              inputStyle={styles.searchInput}
              autoCorrect={false}
              inputContainerStyle={{backgroundColor: Colors.almostWhite}}
            />
          </View>

          <ScrollView>
              <SearchResults state={this.state} navigate={navigate}></SearchResults>
              <Discover state={this.state} navigate={navigate}></Discover>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchInput: {
    color: Colors.almostBlack,
  },
  discover: {
    paddingTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingBottom: '2%',
  },
  discoverText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: '2%'
  },


  // Copied from HomeScreen.js
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    color: 'white',
  },
  contentContainer: {
    //paddingTop: 80,
  },
  myFeed: {
    // Container for user's events feed
    paddingTop: '12%', // Use percentages instead of ints for scalability
    paddingBottom: '12%',
  },
  feedTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    fontWeight: "bold",
    padding: '6%',
  },
  eventsCard: {
    backgroundColor: 'transparent',
  },
  event: {
    padding: '2%',
  },
  eventTitle: {
    fontSize: 18,
    color: Colors.almostBlack,
  },
  eventSubTitle: {
    color: Colors.lightGray,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  getStartedText: {
    fontSize: 17,
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  button: {
    borderColor: 'white',
    paddingTop: '2%',
    paddingBottom: '8%'
    //width: '40%'
  },
});
