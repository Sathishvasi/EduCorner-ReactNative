import React, { Component } from 'react';
import { Container,Header, Content, Form, Item, Text,Input, Label,Left, Body, Right, Title,Button,Icon,ListItem,List } from 'native-base';
import {Image,ImageBackground,Platform,StyleSheet,View,AsyncStorage} from 'react-native';
import firebase from 'firebase';
import { width, height, totalSize } from 'react-native-dimension';
import { DrawerNavigator } from 'react-navigation';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
let keys = [];
let ref;

export default class Profile extends Component {
    
  componentDidMount() {
    AsyncStorage.getItem("name").then((value) => {
        this.setState({"name": value});
    }).done();

    AsyncStorage.getItem("email").then((value) => {
      this.setState({"email": value});
    }).done();

    AsyncStorage.getItem("phone").then((value) => {
      this.setState({"phone": value});
    }).done();
  }

  static navigationOptions = {
    drawerIcon: (
        <Icons name="user" size={26} color="blue" />
    )
  }

        constructor(){ 
            super();
            this.state = {
            }
          };
    
    backIndex(){
        this.props.navigation.navigate("Home",{pageLoad: "profile-nav"});
    }
    
    render(){
        return(
            <Container>
                 <ImageBackground source={require('../images/wallpaper.png')} style={styles.backgroundImg}>
                <Header>
          <Left>
            <Button transparent onPress={()=>this.backIndex()}>
              <Icon name='ios-arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Your Profile</Title>
          </Body>
          <Right />
        </Header>

           
                <Content>

            <List style={styles.welcome}>
            <ListItem>
              <Text>Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.name}</Text>
            </ListItem>
            <ListItem>
              <Text>Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.email}</Text>
            </ListItem>
            <ListItem>
              <Text>Phone:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.phone}</Text>
            </ListItem>
            </List>

         

                </Content>
                </ImageBackground>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      // flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      paddingTop: 20
    },
    backgroundImg: {
        flex: 1,
        // resizeMode: 'stretch', // or 'stretch'
      },
      buttonCenter1: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50
      },
      inputWidth: {
        width: width(95),
        borderBottomColor: 'black'
      },
      buttonCenter2: {
        justifyContent: 'center',
        width: 200,
        marginLeft: width(27),
        borderRadius: 30
      },
    alignContent: {
        marginLeft: width(7),
        height: 270
      }
  });

