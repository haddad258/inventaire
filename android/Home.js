// import React from 'react'
// import { TouchableOpacity, Text } from 'react-native';
// import { Actions } from 'react-native-router-flux';

// const Home = () => {
//    const goToAbout = () => {
//       Actions.about()
//    }
//    return (
//       <TouchableOpacity style = {{ margin: 128 }} onPress = {goToAbout}>
//          <Text>This is HOME!</Text>
//       </TouchableOpacity>


//    )
// }
// export default Home


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import PickerModal from 'react-native-picker-modal-view';
import axios from 'axios'





export default class Home extends Component {

  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
      driver:[],
      Journey:[],
    }
  }

componentDidMount(){
  axios
  .get("http://192.168.1.134:3000/users/list")
  .then((response) => response.data)
  .then((data) => {
    this.setState({ driver: data.filter(drivers => drivers.descriminator !== "REGUSER") });
    // console.log(data.filter(drivers => drivers.descriminator != "REGUSER"));
    console.log(data)
  });

axios
  .get("http://192.168.1.134:3000/journey/list")
  .then((response) => response.data)
  .then((data) => {
    this.setState({ Journey: data.content });
    console.log(data);
  });
}

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }
   goToAbout = () => {
         Actions.Camera()
     }

  render() {
    const options = [{ value: 0, label: '0' },{ value: 1, label: '1' },{ value: 2, label: '2' }]
    return (
      <View style={styles.container}>
       {/*  <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/email.png'}}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}/>
        </View> 

        <TouchableOpacity style={styles.btnForgotPassword} onPress={() => this.onClickListener('restore_password')}>
            <Text style={styles.btnText}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>*/}



        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.goToAbout()}>
          <Text style={styles.loginText}>Qrcode</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.goToAbout()}>
          <Text style={styles.loginText}>Barcode</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const resizeMode = 'center';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:300,
    borderRadius:30,
    backgroundColor:'transparent'
  },
  btnForgotPassword: {
    height:15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom:10,
    width:300,
    backgroundColor:'transparent'
  },
  loginButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: 'white',
  },
  bgImage:{
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: 580,
    height: 400,
    justifyContent: 'center',
  },
  btnText:{
    color:"white",
    fontWeight:'bold'
  },
  image: {
   flex: 1,
   resizeMode,
   justifyContent: "center",
 },
});
                                            
