import React, { Component } from 'react';
import { Right,Title, Left, Header, Body, Card, CardItem, Form, Button,Textarea,Icon,Picker,Item,Container, Content, DatePicker, Text,Label } from 'native-base';
import {Platform,StyleSheet,View} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import firebase from 'firebase';
import AwesomeAlert from 'react-native-awesome-alerts';
// import { ConfirmDialog } from 'react-native-simple-dialogs';

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            showFill: false,
            assigned: false,
            chosenDate: new Date(),
            message: "",
            selected2: undefined,
            hwData: {
              date: new Date(),
              subject: "",
              homework: ""
            }
        };
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({ 
            chosenDate: newDate,
        });

        let newDetail = Object.assign(this.state.hwData);
        newDetail['date'] = newDate.toString().substr(4, 12);
    }
    onValueChange2(text,field) {
        this.setState({
          selected2: field,
          message: ""
        });

        let newDetail = Object.assign(this.state.hwData);
        newDetail[text] = field;
    }

    backIndex(){
      this.props.navigation.navigate("Logout");
    }

    clearFields(){
      this.setState({
        selected2: "",
        hwData:{
          homework: ""
        }
      });
      this.setDate = this.setDate.bind(this);
    }

    customise(){
      // this.props.navigation.navigate("ModifyHW");
      this.props.navigation.navigate("ModifyHW",{pageLoad: "first-load"});
    }
    render() {
        const { navigation } = this.props;
        const login = navigation.getParam('login', 'NO-ID');
        const pwd = navigation.getParam('pwd', 'some default value');
        return (
          <Container>
            <Header>
          <Left>
            <Button transparent onPress={()=>this.backIndex()}>
              <Icon name='ios-arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Assign homework</Title>
          </Body>
          <Right />
          </Header>
            <Content>

          <Item stackedLabel>
            {/* <Input onChangeText={this.getInput.bind(this,'login')}/> */}
            <DatePicker
                defaultDate={new Date(2018, 4, 4)}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select your date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setDate}
                />
          </Item>

              <Item stackedLabel>
                <Text onChangeText={this.getInput.bind(this,'date')}>
                  Your Date: {this.state.chosenDate.toString().substr(4, 12)}
                </Text>
              </Item>

                {/* <Item stackedLabel> */}
                    {/* <Label>Select subject:</Label> */}
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="Select your Subject"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this,'subject')}
                // onChangeText={this.getInput.bind(this,'subject')}
              >
                <Picker.Item label="Select Subject" value="" />
                <Picker.Item label="Tamil" value="Tamil" />
                <Picker.Item label="English" value="English" />
                <Picker.Item label="Maths" value="Maths" />
                <Picker.Item label="Science" value="Science" />
                <Picker.Item label="Social" value="Social" />
              </Picker>
            </Item>


        <Content padder>
          <Form>
           {/* onChangeText={(text) => this.setState({email: text})} */}
            <Textarea placeholder="Type your Homework" value={this.state.hwData.homework} rowSpan={5} bordered 
            onChangeText={(text) => 
              this.getInput('homework',text)
            }/>
          </Form>
        </Content>


        <View style={styles.alignCenter}>
          <Button style={styles.buttonCenter} onPress={()=>this.submitData()}>
            <Text> Submit details </Text>
          </Button>
        </View>

        <View style={styles.alignCenter}>
          <Button style={styles.buttonCenter} onPress={()=>this.customise()}>
            <Text>Customise HW</Text>
          </Button>
        </View>

            </Content>

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

                        <AwesomeAlert
                        show={this.state.assigned}
                        showProgress={false}
                        title="Sucess"
                        message="Your Homework assigned to students"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        contentContainerStyle={styles.dialogSize2}
                        confirmText="     OK     "
                        confirmButtonColor="#008000"
                        onConfirmPressed={() => {
                          this.clearFields();
                          this.setState({assigned: false});
                        }}
                        onDismiss={()=>{
                            this.setState({assigned: false});
                        }}
                        />

          </Container>
        );
      }

      getInput(text, field){
        let newDetail = Object.assign(this.state.hwData);
        newDetail[text] = field;

        this.setState({
          hwData: newDetail,
        })
      }

      submitData(){
        if(this.state.hwData.subject != "" && this.state.hwData.homework !=""){
        firebase.database().ref('homework-data/').push(
            {
                date: this.state.chosenDate.toString().substr(4, 12),
                subject: this.state.hwData.subject,
                homework: this.state.hwData.homework,
            }
        ).then(() => {
            console.log("DATA INSERTED");
            this.setState({assigned: true});
        }).catch((error) => {
            console.log(error);
        });
      }
      else{
        this.setState({showFill: true});
      }
    }
}

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  dialogSize:{
    width: width(60)
  },
  dialogSize2:{
    width: width(70)
  },
  buttonCenter: {
    justifyContent: 'center',
    width: 200,
    borderRadius: 30,
    marginTop: 40
  }
  });
