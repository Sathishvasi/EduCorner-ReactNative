import React, { Component } from 'react';
import { Container,Header, Content, Form, Item, Text,Input, Label,Left, Body, Right, Title,Button,Icon } from 'native-base';
import {AsyncStorage,Image,NetInfo,Alert,ImageBackground,Platform,StyleSheet,View} from 'react-native';
import firebase from 'firebase';
import { width, height, totalSize } from 'react-native-dimension';
// import { ConfirmDialog,Dialog } from 'react-native-simple-dialogs';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icons from 'react-native-vector-icons/dist/FontAwesome';

let key1 = [];
let key2 = [];
let ref1, ref2;

class Splash extends Component {

        constructor(props){  
            super(props);
            this.state = {
                netInfo: null
            }
        };

        callOut(){
            if(this.state.netInfo.type != "none"){
                ref1 = firebase.database().ref().child('/signup/');
                ref2 = firebase.database().ref().child('/homework-data/');
                ref1.on('value',(snapshot)=> {
                    snapshot.forEach(function(item) {
                        var itemVal = item.val();
                        key1.push(itemVal);
                    });  
                });
            
                ref2.on('value',(snapshot)=> {
                    snapshot.forEach(function(item) {
                        var itemVal = item.val();
                        key2.push(itemVal);
                    });  
                    AsyncStorage.setItem("userDetails",JSON.stringify(key1));
                    AsyncStorage.setItem("homeWorkDetails",JSON.stringify(key2));
                    this.props.navigation.navigate("Logout",{});
                });
            }
            else{
                this.props.navigation.navigate("NoNetwork",{});
            }
        }   

        componentWillMount(){
            NetInfo.getConnectionInfo().then((connectionInfo) => {
                this.setState({netInfo: connectionInfo});
                this.callOut();
            });
        }

    render(){
        return(
            <Container>          
                <ImageBackground source={require('../images/wallpaper.png')} style={styles.backgroundImg}>
                <Content>
                    <View>
                    <View style={styles.center}>
                    <Image style={styles.logo} source={require('../images/app-logo.png')}/>
                    </View>
                     
                     {/* <Icons name="circle-o-notch" size={30} color="white" /> */}
                     <View style={styles.center}>
                        <Text style={styles.title}>EDU CORNER</Text>
                     </View>
                     <View style={styles.center}>
                     <Image style={styles.loading} source={require('../images/splash.gif')}/>
                     </View>
                    </View>
                </Content>
                </ImageBackground>
            </Container>
        );
    }
}

export default Splash;

const styles = StyleSheet.create({
    logo: {
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 60,
        width: 230,
        height: 230,
        borderRadius: 130
    },
    loading: {
        marginTop: 120,
        width: 40,
        height: 40
    },
    center:{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImg: {
        flex: 1,
    },
    title: {
        marginTop: 25,
        fontFamily: "Magical-Stylish-Sans-Serif-Demo",
        fontSize: 28,
        // fontWeight: "bold",
        color: '#2d2d2d'
    }
  });

