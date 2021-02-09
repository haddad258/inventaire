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
import axios from 'axios'
import { Actions } from 'react-native-router-flux';
import DropDownPicker from 'react-native-dropdown-picker';


export default class Formulaires extends Component {

  constructor(props) {
    super(props);
    state = {
      ancien_code: '',
      newcode: '',
      code_compte: '',
      compte_comptable: '',
      designation: '',
      categorie: '',
      date: '',
      code: '',
      location: '',
      state: '',
      serial_number: ''
    }
  }


  componentDidMount() {
    
    this.setState({ code_compte: this.props.Barcode.code_compte })
    this.setState({ ancien_code: this.props.Barcode.ancien_code })
    this.setState({ designation: this.props.Barcode.designation })
    this.setState({ categorie: this.props.Barcode.categorie })
    this.setState({ date: this.props.Barcode.date })
    this.setState({ location: this.props.location })
    this.setState({ state: '' })
    this.setState({ serial_number: '' })
    this.setState({ newcode: '' })





  }
  onClickListener = (viewId) => {
    //console.log(this.state)
    //Alert.alert("Alert", "send formulaire "+this.state.code);
    // Actions.Codelecteur({ location: this.props.location })
    if (!this.state.newcode) {
      Alert.alert("Alert", "choose new code ");

    } else {
      if (!this.state.serial_number) {
        Alert.alert("Alert", "choose serial_number ");

      } else {


        if (!this.state.state) {
          Alert.alert("Alert", "choose state ");

        } else {
          if (!this.state.categorie) {
            Alert.alert("Alert", "choose categorie ");

          } else {
            if (!this.state.code_compte) {
              Alert.alert("Alert", "choose code_compte ");

            } else {
              if (!this.state.designation) {
                Alert.alert("Alert", "choose designation ");

              } {
                if (!this.state.location) {
                  Alert.alert("Alert", "choose location ");
                  Actions.Chooselocation();

                } else {

                  axios.post("http://192.168.43.236:5000/api/v1/ancien_articles/", this.state).then((response) => {

                    if (!response.data.error) {
                      Alert.alert("Alert", "done ")
                      Actions.Codelecteur({ location: this.props.location })

                    } else {

                      Alert.alert("Alert", "error check information ");
                    }


                  }).catch(() => {
                    Alert.alert("Alert", "error check information ");


                  })
                }

              }

            }

          }

        }
      }
    }









  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.barecode} > old code</Text>
        <Text style={styles.barecodeancien} > {this.props.Barcode.ancien_code} </Text>
        <Text style={styles.barecode} > location </Text>

        <Text style={styles.barecodeancien} > {this.props.location} </Text>

        <Text style={styles.barecode} > new code</Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="new code"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(newcode) => this.setState({ newcode })} />

        </View>
        <Text style={styles.barecode}> code_compte</Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder={this.props.Barcode.code_compte}
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(code_compte) => this.setState({ code_compte })} />

        </View>
        <Text style={styles.barecode}> designation</Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder={this.props.Barcode.designation}
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(designation) => this.setState({ designation })} />

        </View>
        <Text style={styles.barecode}> categorie : {this.props.Barcode.categorie} </Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder={this.props.Barcode.categorie}
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(categorie) => this.setState({ categorie })} />

        </View>
        <Text style={styles.barecode}> date</Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder={this.props.Barcode.date}
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(date) => this.setState({ date })} />

        </View>

        <Text style={styles.barecode}> Serial number</Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="serial_number"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(serial_number) => this.setState({ serial_number })} />

        </View>
        <Text style={styles.barecode}> state</Text>
        <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />
        <DropDownPicker
          items={["Bonne etat", " moyenne etat", "mauvaise etat"].map(e => e)}
          containerStyle={{ height: 45, width: '100%' }}
          placeholder="select state"
          style={{ backgroundColor: '#fafafa', height: 100 }}
          dropDownStyle={{ height: 100, width: '100%' }}
          itemStyle={{
            width: '100%',
            height: 45
          }}
          min={0}
          max={10}

          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item, index) => {

            this.setState({ state: item })



          }}
        />


        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('sign_up')}>
          <Text style={styles.signUpText}>send formulaire</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => Actions.Chooselocation()}>
          <Text style={styles.signUpText}>choose other location</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => Actions.Listenewartice()}>
          <Text style={styles.signUpText}>Show liste new article</Text>
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
    backgroundColor: '#00b5ec',
  },
  sendButtonlcation: {
    backgroundColor: "#FF4DFF",
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
  barecode: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: 'bold'
  },
  barecodeancien: {
    fontSize: 30,
    color: "#000000",
    fontWeight: 'bold'
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
