import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios'


export default class Codelecteur extends Component {

  constructor(props) {
    super(props);
    state = {
      Barcode: '',

    }
  }

  onClickListener = () => {
    console.log(this.state)
    if (!this.state) {
      Actions.Formulaires({ Barcode: {            
        code_compte:"",
        ancien_code:"notavailble",
        designation:"",
        categorie:"",
        date:"",
        serial_number: "",
        state: ""
      },location:this.props.location
    })
    } else {
      axios.get('http://192.168.43.236:5000/api/v1/ancien_articles/'+this.state.Barcode).then((response) => {

        console.log(response.data)
        this.setState({ code: response.data.code })
       Actions.Formulaires({ Barcode: response.data ,location:this.props.location})


      }).catch(() => {
        Actions.Formulaires({ Barcode: {            
            code_compte:" ",
            ancien_code:"notavailble",
            designation:" ",
            categorie:" ",
            date:" ",
            serial_number: " ",
            state: " "
          }
        })
       })

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> {this.props.location} </Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="Barcode"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(Barcode) => this.setState({ Barcode })} />
        </View>



        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener()}>
          <Text style={styles.signUpText}>check code</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => Actions.Chooselocation()}>
                    <Text style={styles.signUpText}>choose other location</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => Actions.Listenewartice()}>
                    <Text style={styles.signUpText}>Show list new article</Text>
                </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: '100%',
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  signupButton: {
    backgroundColor: "#FF4DFF",
  },
  signUpText: {
    color: 'white',
  }
});
