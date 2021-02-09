
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
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';



export default class About extends Component {

  constructor(props) {
    super(props);
    state = {
      client: '',
      code_qr: '',
      formulaire: '',
      position: '',
      driver: [],
      Journey: [],
      Message:''
    }
  }

  componentDidMount() {

    console.log(this.props.cameratest)

    this.setState({ code_qr: this.props.cameratest })

   




  }

  onClickListener = (viewId) => {
   // Alert.alert("Alert", "Button pressed " + viewId);
   // 


//    {
//     "latitude":22,
//     "longitude":9,
//     "message":"client injoiniable",
//     "status":"FAILED",
//     "digitalLink": ""
// }
console.log(this.state.Message)
//    axios.post("localhost:3000/position/create/635d8c40-4ebe-11eb-8e41-df0cafddd424/7ab839b0-4a8d-11eb-a7f7-7516e81e50b8" ,this.state).then((response)=>{

// console.log(response)

//    })
  }

  render() {

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={{ uri: 'https://png.icons8.com/google/color/120' }} />
        <Text style={styles.name}> Qrcode to send  :</Text>
        <Text style={styles.price}>{this.props.cameratest}</Text>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/user/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="client"
            underlineColorAndroid='transparent'
            onChangeText={(client) => this.setState({ client })} />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="driver"
            underlineColorAndroid='transparent'
            onChangeText={(driver) => this.setState({ driver })} />
        </View>


        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/speech-bubble/ultraviolet/50' }} />
          <TextInput style={[styles.messageInput]}
            placeholder="journey"
            underlineColorAndroid='transparent'
            onChangeText={(journey) => this.setState({ journey })} />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/speech-bubble/ultraviolet/50' }} />
          <TextInput style={[styles.messageInput]}
            placeholder="position"
            underlineColorAndroid='transparent'
            onChangeText={(position) => this.setState({ position })} />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/speech-bubble/ultraviolet/50' }} />
          <TextInput style={[styles.messageInput]}
            placeholder="formulaire"
            underlineColorAndroid='transparent'
            onChangeText={(formulaire) => this.setState({ formulaire })} />
        </View>

        <View style={styles.inputContainermessage}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/speech-bubble/ultraviolet/50' }} />
          <TextInput style={[styles.messageInput]}
            placeholder="Message"
            underlineColorAndroid='transparent'
            onChangeText={(Message) => this.setState({ Message })} />
        </View>
        {/* <DropDownPicker
          items={this.state.Journey.map(e => e.id)}
          containerStyle={{ height: 60, width: '100%' }}
          placeholder="select DRIVER"
          style={{ backgroundColor: '#fafafa', height: 100 }}
          dropDownStyle={{ height: 60, width: '100%' }}
          itemStyle={{
            width: '100%',
            height: 60
          }}
          min={0}
          max={10}

          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item, index) => {
            console.log(index)
            console.log(item)
            //Actions.Codelecteur({ location: item })
          }}
        /> */}
        <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.buttonText}>Send</Text>
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
    backgroundColor: '#DCDCDC',
  },
  logo: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputContainermessage: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 350,
    height: 90,
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
  price: {
    marginTop: 10,
    fontSize: 18,
    color: "green",
    fontWeight: 'bold'
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: 'bold'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 100,
    borderRadius: 30,
  },
  sendButton: {
    backgroundColor: "#FF4500",
  },
  buttonText: {
    color: 'white',
  }
});
