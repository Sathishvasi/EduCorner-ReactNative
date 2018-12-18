import React, { Component } from 'react';
import {Title,Body, Card, CardItem, Form, Button,Textarea,Icon,Picker,Item,Container, Content, DatePicker, Text,Label,Header,Left,Right } from 'native-base';
import {Image,Platform,StyleSheet,View,ImageBackground,AsyncStorage} from 'react-native';
import firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import { width, height, totalSize } from 'react-native-dimension';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
let homework = [];

export default class UserDetails extends Component {

    static navigationOptions = {
        drawerIcon: (
            // <Image source = {require('../images/logo.png')}/>
            <Icons name="home" size={26} color="blue" />
        )
    }

    constructor(props) {

        const { navigation } = props;
        // const p_user = navigation.getParam('user', 'some default value');
        // const p_email = navigation.getParam('email', 'some default value');
        // const p_phone = navigation.getParam('phone', 'some default value');

        const p_load = navigation.getParam('pageLoad', '');

        super(props);
        this.state = { 
            users: null,
            visible: true,
            isAvail: false
        };

        // alert(p_load)
        // if(p_load == "first-load"){
            // this.setState({
            //     visible: true
            // })
            AsyncStorage.getItem("homeWorkDetails").then((value) =>{
                this.setState({users: value});
                this.userDataLoaded();
            }).done();
            
            setInterval(()=>{
                this.setState({
                  visible: false
                })
            },3000);
        // }
    }

    userDataLoaded (){
        homework = JSON.parse(this.state.users);
        // console.log("*******HOME WORK********");
        // console.log(homework.length);
        // alert(JSON.stringify(homework.length));
        if(homework.length == 0){
            this.state.isAvail = true;
        }
    }
    callDrawer(){
        this.props.navigation.openDrawer();
    }


    render() {

        var NoContent = function(valueappend){
            if(valueappend){
                return("No contents available")
            }
            // alert(valueappend)
        }
        return(
            
        <Container>
             <ImageBackground source={require('../images/wallpaper.png')} style={styles.backgroundImg}>
        <Header>
          <Left>
            <Button transparent >
              <Icon name='menu' onPress={()=>this.callDrawer()}/>
            </Button>
          </Left>
          <Body>
            <Title>Homework Details</Title>
          </Body>
          <Right />
        </Header>
            <Content>
                    <Text>{NoContent(this.state.isAvail)}</Text>
                { 
                    homework.map((item, index)=>{
                        {
                            // if (item.date == undefined) {
                            //     alert(JSON.stringify(item.date))
                            //     this._renderMessage();
                            // }else{
                                return (
                                    <Card>
                                    <CardItem key={index}>
                                        <View>
                                            <Text style={{fontWeight: 'bold'}}>Date: {item.date}</Text>
                                            <Text>Subject: {item.subject}</Text>
                                            <Text>Homework: {item.homework}</Text>
                                        </View>
                                    </CardItem>
                                    </Card>
                                )
                            // }
                        }

                    })
                }
            <Spinner visible={this.state.visible} textContent={"Homework contents loading..."} textStyle={{color: '#FFF'}} />
            </Content>
            </ImageBackground>
        </Container>
            );  
    }
}

const styles = StyleSheet.create({
    backgroundImg: {
        flex: 1,
      },
});
