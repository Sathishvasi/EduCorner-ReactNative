
import React, { Component } from 'react';
import { Container,Header, Content, Form, Item, Text,Input, Label,Left, Body, Right, Title,Button } from 'native-base';
import {Image,Platform,StyleSheet,View} from 'react-native';
import LoginScreen from './activities/LoginScreen'
import Settings from './activities/Settings'
import Signup from './activities/Signup'
import UserDetails from './activities/UserDetails'
import Profile from './activities/Profile'
import ModifyHW from './activities/ModifyHW'
import Splash from './activities/Splash'
import NoNetwork from './activities/NoNetwork'
import firebase from 'firebase';
// type Props = {};
import { DrawerNavigator,DrawerItems } from 'react-navigation';


// const AppStackNavigator = createStackNavigator({
//   LoginScreen:{
//     screen: LoginScreen,
//     navigationOptions: {
//       header: null,
//     }
//   },
//   Settings:{
//     screen: Settings,
//     navigationOptions: () => ({
//       title: `Assign homework`,
//       headerStyle: {
//         backgroundColor: '#f5fcff',
//       },
//       headerTintColor: '#000000',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }),
//   },
//   Signup:{
//     screen: Signup,
    // navigationOptions: () => ({
    //   title: `Fill your details`,
    //   headerStyle: {
    //     backgroundColor: '#f5fcff',
    //   },
    //   headerTintColor: '#000000',
    //   headerTitleStyle: {
    //     fontWeight: 'bold',
    //   },
    // }),
  //   navigationOptions: {
  //     header: null,
  //   }
  // },
  // UserDetails:{
  //   screen: UserDetails,
    // navigationOptions: () => ({
    //   title: `User Details`,
    //   headerStyle: {
    //     backgroundColor: '#f5fcff',
    //   },
    //   headerTintColor: '#000000',
    //   headerTitleStyle: {
    //     fontWeight: 'bold',
    //   },
    // }),
//     navigationOptions: {
//       header: null,
//     }
//   }
// }, {headerMode: 'screen'});

const CustomDrawerImage = (props) => (
  <Container>
    <Header style={{height: 200,backgroundColor: 'white'}}>
      <Body>
        <Image
        style={styles.drawerImage}
        source={require('./images/app-logo.png')}/>
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props}/>
    </Content>
  </Container>
)

const DrawerExample = DrawerNavigator({
  NoNetwork:{
    screen: NoNetwork,
    navigationOptions: {
      drawerLabel: () => null,
      drawerLockMode: 'locked-closed'
    }
  },
  Splash:{
    screen: Splash,
    navigationOptions: {
      drawerLabel: () => null,
      drawerLockMode: 'locked-closed'
    }
  },
  Signup:{
    screen: Signup,
    navigationOptions: {
      drawerLabel: () => null,
      drawerLockMode: 'locked-closed'
    }
  },
  ModifyHW:{
    screen: ModifyHW,
    navigationOptions: {
      drawerLabel: () => null,
      drawerLockMode: 'locked-closed'
    }
  },
  Settings:{
    screen: Settings,
    navigationOptions: {
      drawerLabel: () => null,
      drawerLockMode: 'locked-closed'
    }
  },
  Home:{
    screen: UserDetails
  },
  Profile:{
    screen: Profile,
    drawerLockMode: 'locked-closed'
  },
  Logout: {
    screen: LoginScreen,
    navigationOptions: {
      drawerLockMode: 'locked-closed'
    }
  }
},
{
  drawerPosition: 'left',
  initialRouteName: 'Splash',
  contentComponent: CustomDrawerImage
  // drawerBackgroundColor: 'black',
  // drawerWidth: 200
});

export default class App extends Component{

  componentWillMount(){
    var config = {
        apiKey: "AIzaSyCxyNFemDquZKNug9s7Gj5rBPtMMTDTf8U",
        authDomain: "home-work-fadc2.firebaseapp.com",
        databaseURL: "https://home-work-fadc2.firebaseio.com",
        projectId: "home-work-fadc2",
        storageBucket: "home-work-fadc2.appspot.com",
        messagingSenderId: "771532336991"
      };
      firebase.initializeApp(config);
}

  render() {
    return (
      // <AppStackNavigator/>
      <DrawerExample/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
});





