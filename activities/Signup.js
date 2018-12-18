import React, { Component } from 'react';
import { Container,Header, Content, Form, Item, Text,Input, Label,Left, Body, Right, Title,Button,Icon } from 'native-base';
import {AsyncStorage,Alert,ImageBackground,Platform,StyleSheet,View} from 'react-native';
import firebase from 'firebase';
import { width, height, totalSize } from 'react-native-dimension';
// import { ConfirmDialog,Dialog } from 'react-native-simple-dialogs';
import AwesomeAlert from 'react-native-awesome-alerts';

let key = [];
let ref;

export default class Signup extends Component {

        constructor(props){  
            super(props);
            this.state = {
              showAlert: false,
              showFill: false,
              netInfo: null,
              net: false,
              SignupDetails: {
                user: "",
                email: "",
                phone: "",
                pwd: ""
              }
            }
          };


    getInput(text, field){
        let newDetail = Object.assign(this.state.SignupDetails);
        newDetail[text] = field;
        this.setState({
            SignupDetails: newDetail,
        })
    }

    backIndex(){
        this.props.navigation.navigate("Logout",{});
    }
    register(){
        if(this.state.SignupDetails.user != "" && this.state.SignupDetails.pwd != "" && this.state.SignupDetails.email !="" && this.state.SignupDetails.phone != ""){


            firebase.database().ref('signup/').push(
                {
                    user: this.state.SignupDetails.user,
                    pwd: this.state.SignupDetails.pwd,
                    email: this.state.SignupDetails.email,
                    phone: this.state.SignupDetails.phone,
                    role: "user"
                }
            ).then(() => {
                // this.setState({showAlert: true});
            }).catch((error) => {
                console.log(error);
            });

            ref = firebase.database().ref().child('/signup/');
            ref.on('value',(snapshot)=> {
                snapshot.forEach(function(item) {
                    var itemVal = item.val();
                    key.push(itemVal);
                });  
                AsyncStorage.setItem("userDetails",JSON.stringify(key));
                this.setState({showAlert: true});
            });

        }else{
            this.setState({showFill: true});
        }
    }

    render(){
        const { navigation } = this.props;
        const login = navigation.getParam('login', 'NO-ID');
        const pwd = navigation.getParam('pwd', 'some default value');
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
            <Title>Fill your Details</Title>
          </Body>
          <Right />
        </Header>

           
                <Content>


                <Form style={styles.welcome}>
                <Item style={styles.inputWidth} stackedLabel>
                    <Label>Username</Label>
                    <Input onChangeText={this.getInput.bind(this,'user')}/>
                </Item>

                <Item style={styles.inputWidth} stackedLabel>
                    <Label>Email</Label>
                    <Input onChangeText={this.getInput.bind(this,'email')}/>
                </Item>

                <Item style={styles.inputWidth} stackedLabel>
                    <Label>Phone no</Label>
                    <Input onChangeText={this.getInput.bind(this,'phone')}/>
                </Item>

                <Item style={styles.inputWidth} stackedLabel>
                    <Label>Password</Label>
                    <Input secureTextEntry onChangeText={this.getInput.bind(this,'pwd')}/>
                </Item>
                
                </Form>

                <View style={styles.center}>
                <Button style={styles.buttonCenter} onPress={()=>this.register()}>
                    <Text> Register </Text>
                </Button>
                </View>

                </Content>
                </ImageBackground>

                        <AwesomeAlert
                        show={this.state.showAlert}
                        showProgress={false}
                        title="Success"
                        message="Registered Successfully"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        contentContainerStyle={styles.dialogSize}
                        // cancelText="No, cancel"
                        confirmText="      OK      "
                        confirmButtonColor="#008000"
                        // onCancelPressed={() => {
                        //     this.setState({showAlert: false});
                        // }}
                        onConfirmPressed={() => {
                            this.props.navigation.navigate("Logout",{});
                        }}
                        onDismiss={()=>{
                            this.setState({showAlert: false});
                        }}
                        />

                        <AwesomeAlert
                        show={this.state.showFill}
                        showProgress={false}
                        title="Fill all the fields"
                        // message="Registered Successfully"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        contentContainerStyle={styles.dialogSize}
                        // cancelText="No, cancel"
                        confirmText="     OK     "
                        confirmButtonColor="#4050b5"
                        // onCancelPressed={() => {
                        //     this.setState({showAlert: false});
                        // }}
                        onConfirmPressed={() => {
                            this.setState({showFill: false});
                        }}
                        onDismiss={()=>{
                            this.setState({showFill: false});
                        }}
                        />

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    dialogSize:{
        width: width(60)
    },
    welcome: {
      paddingTop: 50
    },
    backgroundImg: {
        flex: 1,
      },
      inputWidth: {
        width: width(95),
        borderBottomColor: 'black'
      },
      buttonCenter: {
        justifyContent: 'center',
        width: 200,
        borderRadius: 30,
        marginTop: 50
      },
      center:{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
  });

