import React, { Component } from 'react';
import { Container,Header, Content, Form, Item, Text,Input, Label,Left, Body, Right, Title,Button } from 'native-base';
import {Image,ImageBackground,Platform,StyleSheet,View,AsyncStorage} from 'react-native';
import Settings from './Settings';
import firebase from 'firebase';
import { width, height, totalSize } from 'react-native-dimension';
import { DrawerNavigator } from 'react-navigation';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Fonts } from '../src/utils/Fonts'
// import { ConfirmDialog,Dialog } from 'react-native-simple-dialogs';


let keys = [];
let getDetails;


class LoginScreen extends Component {


  static navigationOptions = {
    drawerIcon: (
        <Icons name="sign-out" size={26} color="blue" />
    )
  }

  constructor(props){  
    super(props);
    this.state = {
      showAlert: false,
      visible: false,
      users: null,
      credentials: {
        login: "",
        pwd: ""
      }
    }


    AsyncStorage.getItem("userDetails").then((value) =>{
      this.setState({users: value});
      this.userDataLoaded();
    }).done();
    
  };
 
  userDataLoaded (){
    keys = JSON.parse(this.state.users);
  }

  checkSignup (){
    this.props.navigation.navigate("Signup",{});
    // this.props.navigation.openDrawer();
  }

  getInput(text, field){
    let newCredentials = Object.assign(this.state.credentials);
    newCredentials[text] = field;
    this.setState({
      credentials: newCredentials,
    })
  }

  

    render(){
      // const { navigation } = this.props;
      // const ruser = navigation.getParam('ruser', 'NO-ID');
      // const rpwd = navigation.getParam('rpwd', 'some default value');

      // const DEVICE_WIDTH = Dimensions.get('window').width;
      // const DEVICE_HEIGHT = Dimensions.get('window').height;
      // alert(DEVICE_HEIGHT);

        return(

 <Container>

    <ImageBackground source={require('../images/wallpaper.png')}
        style={styles.backgroundImg}>
  


      <Content>
      <View style={styles.center}>
        <Image resizeMode='contain' style={styles.alignContent} source={require('../images/spinner.gif')} />
      </View>
        <Text style={styles.welcome}>EDU CORNER</Text>
        {/* <Icons name="home" style={{height:24, width:24}} color="#000" /> */}
        {/* <Icons name="home" size={30} color="#000" /> */}
        <Form>
          <Item style={styles.inputWidth} floatingLabel>
            <Label>Username</Label>
            <Input onChangeText={this.getInput.bind(this,'login')}/>
          </Item>
          <Item style={styles.inputWidth} floatingLabel>
            <Label>Password</Label>
            <Input secureTextEntry onChangeText={this.getInput.bind(this,'pwd')}/>
          </Item>
        </Form>

        <View style={styles.center}>
          <Button style={styles.buttonCenter1} onPress={()=>this.checkLogin()}>
            <Text> Login </Text>
          </Button>
        </View>

        <View style={styles.center}>
          <Button style={styles.buttonCenter2} onPress={()=>this.checkSignup()}>
            <Text> Create account </Text>
          </Button>
        </View>

        {/* <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} /> */}
      </Content>
      </ImageBackground>
                      <AwesomeAlert
                        show={this.state.showAlert}
                        showProgress={false}
                        title="Invalid Login"
                        // message="Registered Successfully"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        contentContainerStyle={styles.dialogSize}
                        // cancelText="No, cancel"
                        confirmText="      OK      "
                        confirmButtonColor="#a50000"
                        // onCancelPressed={() => {
                        //     this.setState({showAlert: false});
                        // }}
                        onConfirmPressed={() => {
                          this.setState({showAlert: false});
                        }}
                        onDismiss={()=>{
                            this.setState({showAlert: false});
                        }}
                        />
    </Container>);
        
    }
    checkLogin(){
      // alert(keys.length)
      var flag = 0;
      if(keys.length == 0){
        alert("No values");
      }
      else{
        for (i=0; i < keys.length; i++) {
            if(this.state.credentials.login == keys[i].user && this.state.credentials.pwd == keys[i].pwd){
              if(keys[i].role == "admin"){
                this.props.navigation.navigate("Settings",{
                  // login: this.state.credentials.login,
                  // pwd: this.state.credentials.pwd
                });
              }
              else if(keys[i].role == "user"){

                AsyncStorage.setItem('name',keys[i].user)
                AsyncStorage.setItem('email',keys[i].email)
                AsyncStorage.setItem('phone',keys[i].phone)

                this.props.navigation.navigate("Home",{pageLoad: "first-load"});
              }
                flag = 1;
            }
        }
        if(flag == 0){
          // alert("Invalid Login");
          this.setState({showAlert:true});
        }
      }
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    backgroundImg: {
      flex: 1,
    },
    welcome: {
      alignSelf: 'center',
      fontFamily: 'Magical-Stylish-Sans-Serif-Demo',
      fontSize: 25
      
    },
    inputWidth: {
      width: width(95)
    },
    dialogSize:{
      width: width(60)
  },
  center:{
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
},
    buttonCenter1: {
      justifyContent: 'center',
      width: 200,
      marginTop: 40,
      fontFamily: 'Magical-Stylish-Sans-Serif-Demo',
      borderRadius: 30
    },
    buttonCenter2: {
      justifyContent: 'center',
      width: 200,
      marginTop: 25,
      fontFamily: 'Magical-Stylish-Sans-Serif-Demo',
      borderRadius: 30
    },
    alignContent: {
      // marginLeft: width(7),
      height: 270
    }
  });

