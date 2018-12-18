import React, { Component } from 'react';
import { Container,Header, Content, Form, Item, Text,Input, Label,Left, Body, Right, Title,Button,Icon } from 'native-base';
import {Image,NetInfo,Alert,ImageBackground,Platform,StyleSheet,View} from 'react-native';
import firebase from 'firebase';
import { width, height, totalSize } from 'react-native-dimension';
// import { ConfirmDialog,Dialog } from 'react-native-simple-dialogs';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Splash extends Component {

        constructor(props){  
            super(props);
            this.state = {
                netInfo: null
            }
        };

        reloadScreen(){
            this.props.navigation.navigate("Splash",{});
        }

    render(){
        return(
            <Container>          
                <ImageBackground source={require('../images/wallpaper.png')} style={styles.backgroundImg}>
                <Content>
                    <View>
                        <View style={styles.center}>
                        <Image style={styles.logo} source={require('../images/no-internet.png')}/>
                        </View>

                        <View style={styles.center}>
                            <Text style={styles.title}>No Internet connection</Text>
                        </View>

                        <View style={styles.center}>
                        <Button style={styles.buttonCenter} onPress={()=>this.reloadScreen()}>
                            <Text> Try Again </Text>
                        </Button> 
                        </View>
                    </View>
                </Content>
                </ImageBackground>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        marginTop: 100,
    },
    backgroundImg: {
        flex: 1,
    },
    title:{
        marginTop: 25,
        fontFamily: "Magical-Stylish-Sans-Serif-Demo",
        fontSize: 28,
        // fontWeight: "bold",
        color: '#2d2d2d'
    },
    center:{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: 30
    }
  });

