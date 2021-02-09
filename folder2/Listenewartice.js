import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ScrollView,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AwesomeAlert from 'react-native-awesome-alerts';

import axios from 'axios';


export default class Listenewartice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      showAlert: false,
      userSelected:[],
      data:[]
    };
  }
  showAlert = (item) => {
    console.log(item.id)
    this.setState({
      showAlert: true
    });
   
  };
  deletitem(item){
   // console.log("item todele",item.id)
     axios.delete("http://192.168.43.236:5000/api/v1/ancien_articles/" + item.id).then(() => {
    
        var array = [...this.state.data];
        var index = array.indexOf(item)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ data: array });
        }
        this.hideAlert();


    }).catch(()=>{

        Alert.alert("alert", "not deeted")
    })

  }
  hideAlert = (item) => {



    this.setState({
      showAlert: false
    });
  };
  componentDidMount(){
    axios.get("http://192.168.43.236:5000/api/v1/ancien_articles").then((response)=>{

    this.setState({data: response.data})
    })
}

  clickEventListener = (item) => {
    this.setState({userSelected: item}, () =>{
      this.setModalVisible(true);
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.followButtonnewarticle} onPress={()=> Actions.Chooselocation()}>
                  <Text style={styles.followButtonText}>new articles</Text>  
                </TouchableOpacity>
          
        <FlatList 
          style={styles.userList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id.toString();
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
              <View style={styles.cardContent}>
              <Text> new code : <Text style={styles.name}>  {item.newcode}</Text>  </Text>
                
                <Text> code_compte: <Text style={styles.name}>  {item.code_compte}</Text>  </Text>
                <Text> location : <Text style={styles.position}>  {item.newcode}</Text>  </Text>
                <Text> state : <Text style={styles.position}>  {item.state}</Text>  </Text>
                <Text> serial_number : <Text style={styles.position}>  {item.serial_number}</Text>  </Text>


                <TouchableOpacity style={styles.followButton} onPress={()=> this.clickEventListener(item)}>
                  <Text style={styles.followButtonText}>Show</Text>  
                </TouchableOpacity>
                <TouchableOpacity style={styles.deletButton} onPress={() => this.showAlert(item)}>
                      <Text style={styles.followButtonText}>delete  </Text>
                      <AwesomeAlert
                        show={this.state.showAlert}
                        showProgress={false}
                        title="Delete article"
                        message="Do you delete this article"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="No, cancel"
                        confirmText="Yes, delete it"
                        confirmButtonColor="#DD6B55"
                        onCancelPressed={() => {
                          this.hideAlert(item);
                        }}
                        onConfirmPressed={() => {
                          this.deletitem(item);
                        }}
                      />
                    </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}}/>

        <Modal
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}>

          <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              <View style={styles.popupContent}>
                <ScrollView contentContainerStyle={styles.modalInfo}>
                    <Image style={styles.image} source={{uri: this.state.userSelected.image}}/>
                    <Text style={styles.name}>{this.state.userSelected.name}</Text>
                    <Text style={styles.position}>{this.state.userSelected.position}</Text>
                    <Text style={styles.about}>{this.state.userSelected.about}</Text>
                </ScrollView>
              </View>
              <View style={styles.popupButtons}>
                <TouchableOpacity onPress={() => {this.setModalVisible(false) }} style={styles.btnClose}>
                  <Text style={styles.txtClose}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
    backgroundColor:"#eeeeee"
  },
  header:{
    backgroundColor: "#00CED1",
    height:200
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
    flex:1,
  },
  detailContent:{
    top:80,
    height:500,
    width:Dimensions.get('screen').width - 90,
    marginHorizontal:30,
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  userList:{
    flex:1,
  },
  deletButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#FF0000",
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:90,
    height:90,
    borderRadius:45,
  },



  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '46%',
    padding: 10,
    flexDirection:'row'
  },

  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#008080",
    fontWeight:'bold'
  },
  position:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
  about:{
    marginHorizontal:10
  },

  followButton: {
    marginTop:10,
    height:35,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  followButtonnewarticle: {
    marginTop:10,
    height:35,
    width:150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  
 /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 30
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height:250,
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent:'center'
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose:{
    height:20,
    backgroundColor:'#20b2aa',
    padding:20
  },
  modalInfo:{
    alignItems:'center',
    justifyContent:'center',
  }
});
                                            