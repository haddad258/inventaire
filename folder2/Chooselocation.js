
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
import { Actions } from 'react-native-router-flux';
var LocationTable = require('./Location')()


export default class Chooselocation extends Component {

    constructor(props) {
        super(props);
        state = {
            email: '',
            password: '',
            location: ''
        }
    }

    componentDidMount() {

        console.log("LocationTable")
        this.setState({ location: '' })
    }
    onClickListener = (viewId) => {
        if (this.state.location) {
            console.log(this.state.location)
            Actions.Codelecteur({ location: this.state.location })
        } else {

            Alert.alert("Alert", "choose Lcation ");
        }

    }

createfile(){

    console.log("create file")
}


    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={{ uri: 'https://png.icons8.com/google/color/120' }} />
                <Text>  select location </Text>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/user/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="location"
                        underlineColorAndroid='transparent'
                        onChangeText={(location) => this.setState({ location })} />
                </View>

                <DropDownPicker
                    items={LocationTable.map(e => e.codelocal + " " + e.site + " " + e.local)}
                    containerStyle={{ height: 90, width: '100%' }}
                    placeholder="select location"
                    style={{ backgroundColor: '#fafafa', height: 100 }}
                    dropDownStyle={{ height: 100, width: '100%' }}
                    itemStyle={{
                        width: '100%',
                        height: 90
                    }}
                    min={0}
                    max={10}

                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={(item, index) => {
                        console.log(index)
                        console.log(item)
                        Actions.Codelecteur({ location: item })



                    }}
                />



                <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={() => this.onClickListener('login')}>
                    <Text style={styles.buttonText}>choose location</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.buttonContainer, styles.sendButtonnewarticle]} onPress={() => Actions.Listenewartice()}>
                    <Text style={styles.buttonText}>show list New article</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.buttonContainer, styles.sendButtonnewarticle]} onPress={() => this.createfile()}>
                    <Text style={styles.buttonText}>create</Text>
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
        width: '100%',
        height: 45,
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
        width: 100,
        borderRadius: 30,
    },
    sendButton: {
        width: '30%',
        backgroundColor: "#FF4500",
    },
    sendButtonnewarticle: {
        width: '30%',
        backgroundColor: "#00BFFF",
    },
   
    buttonText: {
        color: 'white',
    }
});
