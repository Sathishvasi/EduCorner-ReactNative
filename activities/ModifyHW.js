import React, { Component } from 'react';
import {Title,Body, Card, CardItem, Form, Button,Textarea,Icon,Picker,Item,Container, Content, DatePicker, Text,Label,Header,Left,Right } from 'native-base';
import {Image,Platform,StyleSheet,View,ImageBackground,AsyncStorage} from 'react-native';
import firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import { width, height, totalSize } from 'react-native-dimension';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import AwesomeAlert from 'react-native-awesome-alerts';
let homework = [];
let ref;
let globalProps = "";



export default class ModifyHW extends Component {

    constructor(props) {

        const { navigation } = props;
        globalProps = props;
        // const p_user = navigation.getParam('user', 'some default value');
        // const p_email = navigation.getParam('email', 'some default value');
        // const p_phone = navigation.getParam('phone', 'some default value');

        const p_load = navigation.getParam('pageLoad', 'some-content');

        super(props);
        this.state = { 
            visible: true,
            removeID: "",
            showAlert: false
        };
        ref = firebase.database().ref().child('/homework-data/');

        if(p_load == "first-load"){
            
            ref.once('value',function(snap) {
                          
                snap.forEach(function(item) {
                    var itemVal = item.val();
                    const hkey={
                        id: item.key
                    }
                    Object.assign(itemVal,hkey);
                    // alert(JSON.stringify(itemVal))
                    homework.push(itemVal);
                });  
            });
        }

        setInterval(()=>{
            this.setState({
              visible: false
            })
        },4000);
    }



    confirmDelete(itemID){
        this.setState({removeID: itemID});
        this.setState({showAlert: true});
    }

    backIndex(){
        this.props.navigation.navigate("Settings");
    }


    deleteHW(){
        var that = this;
        ref.child(this.state.removeID).remove(function(error) {
            if (error) {
              alert("Database error");
            }else{
                that.backIndex();
            }
        });  
    }
    
    render() {

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
            <Title>Customise HW</Title>
          </Body>
          <Right />
        </Header>

                        
            <Content >
                { 
                    homework.map((item, index)=>{
                        return (
                            <Card>
                            <CardItem key={index}>
                                <View>
                                    <Text style={{display: 'none'}}>ID: {item.id}</Text>
                                    <Text style={{fontWeight: 'bold'}}>Date: {item.date}</Text>
                                    <Text>Subject: {item.subject}</Text>
                                    <Text>Homework: {item.homework}</Text>
                                </View>

                                {/* <Right> */}
                                    {/* <Icon name="arrow-forward" /> */}
                                    <Icons onPress={()=>this.confirmDelete(item.id)} style={{position: 'absolute', right: 15}} name="trash" size={20} color="red" />
                                {/* </Right> */}

                            </CardItem>
                            </Card>
                        )
                    })
                }

            </Content>
            </ImageBackground>
            <Spinner visible={this.state.visible} textContent={"Homework contents loading..."} textStyle={{color: '#FFF'}} />
                    <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Confirm"
                    message="Are you sure want to delete this Home work"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    contentContainerStyle={styles.dialogSize}
                    cancelText="    Cancel    "
                    confirmText="      OK      "
                    confirmButtonColor="#4050b5"
                    onCancelPressed={() => {
                        this.setState({showAlert: false});
                    }}
                    onConfirmPressed={() => {
                        this.deleteHW();
                    }}
                    onDismiss={()=>{
                        this.setState({showAlert: false});
                    }}
                    />
        </Container>
            );  
    }
}

const styles = StyleSheet.create({
    backgroundImg: {
        flex: 1,
    },
    dialogSize:{
        width: width(80)
    },
});
