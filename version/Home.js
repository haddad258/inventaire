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
import AwesomeAlert from 'react-native-awesome-alerts';
import { openDatabase } from 'react-native-sqlite-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import Mytextinput from './pages/components/Mytextinput'

import axios from 'axios'
var db = openDatabase({ name: 'UserDatabase.db' });
var LocationTable = require('./Location/Location')()



export default class Listenewartice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      showAlert: false,
      userSelected: [],
      data: [],
      articlequantite: 0,
      locationsearch: "",
      searchbyid: ""
    };
  }
  showAlert = (item) => {
    console.log(item.id)
    this.setState({
      showAlert: true
    });

  };
  deletitem(item) {
    // console.log("item todele",item.id)

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  tablearticle where article_id=?',
        [item.article_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {

            var array = [...this.state.data];
            var index = array.indexOf(item)
            if (index !== -1) {
              array.splice(index, 1);
              this.setState({ data: array });
            }


          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });



  }

  // componentDidUpdate() {
  //   db.transaction((tx) => {
  //     tx.executeSql('SELECT * FROM tablearticle', [], (tx, results) => {
  //       var temp = [];
  //       for (let i = 0; i < results.rows.length; ++i)
  //         temp.push(results.rows.item(i));
  //       this.setState({ data: temp })
  //     });
  //   });
  // }
  hideAlert = () => {

    this.setState({
      showAlert: false
    });
    this.setState({
      showAlert: false
    });
    this.setState({
      showAlert: false
    });
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tablearticle', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        this.setState({ data: temp })
        this.setState({
          showAlert: false
        });
      });
    });

    this.setState({
      showAlert: false
    });
  };
  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tablearticle', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        this.setState({ data: temp })
        this.setState({ articlequantite: temp.length })
        this.setState({ locationsearch: "total" })
        this.setState({ searchbyid:"" })

      });
    });
  }


  filtertable(item) {
    console.log(item)
    console.log(this.state.data.filter(e => e.location === item))
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tablearticle', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        this.setState({ data: temp.filter(e => e.location === item) })
        this.setState({ articlequantite: temp.filter(e => e.location === item).length })
        this.setState({ locationsearch: item })

      });
    });
    //this.setState({data:this.state.data.filter(e => e.location === item)})

  }
  allarticle() {
    this.componentDidMount()
  }
  clickEventListener = (item) => {
    this.setState({ userSelected: item }, () => {
      this.setModalVisible(true);
    });
  }

  setModalVisible(visible) {
    console.log(this.state.data)
    this.setState({ modalVisible: visible });
  }
  updatearticle(item) {
    this.props.navigation.navigate("updatearticle", { articleupdate: item })
    // console.log(item)
  }

  render() {
    return (
      <View style={styles.container}>

<View style={{flexDirection: "row" ,marginLeft:20 ,marginRight:20}}>
    
    <TouchableOpacity style={styles.followButtonnewarticle} onPress={() => this.props.navigation.navigate('Chooselocation')}>
          <Text style={styles.followButtonText}>new articles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.followButtonnewarticle} onPress={() => this.props.navigation.navigate('HomeScreen')}>
          <Text style={styles.followButtonText}>paramters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.followButtonnewarticle} onPress={() => this.allarticle()}>
          <Text style={styles.followButtonText}>All</Text>
        </TouchableOpacity>
</View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.followButtonTextquantite}>Qunatité : {this.state.articlequantite} article(s) : {this.state.locationsearch} </Text>
        </View>
       

        <Mytextinput
          placeholder=" enter filter location"
          value={(this.state) ? this.state.searchbyid : " "}
          onChangeText={(searchbyid) => this.setState({ searchbyid })}
          style={{ padding: 10 }}
        />
        <TouchableOpacity style={styles.followButtonnewarticle} onPress={() =>  this.filtertable(this.state.searchbyid)}>
          <Text style={styles.followButtonText}>filter location</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>


          <DropDownPicker
            items={LocationTable.map(e => e.codelocal + " " + e.site + " " + e.local)}
            containerStyle={{ height: 45, width: '100%' }}
            placeholder="select location"
            style={{ backgroundColor: '#fafafa', height: 100 }}
            dropDownStyle={{ height: 100, width: '100%' }}
            itemStyle={{
              width: '100%',
            }}
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10,
              borderColor: '#007FFF',
              borderWidth: 1,
            }}
            min={0}
            max={10}

            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={(item, index) => {
              console.log(index)
              console.log(item)
              //  Actions.Codelecteur({ location: item })
              this.filtertable(item)
              //this.setState({location:item})

            }}
          />

        </View>



        <FlatList
          style={styles.userList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.article_id.toString();
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.card} >
                <View style={styles.cardContent}>
                  <Text> new code : <Text style={styles.name}>  {item.new_code}</Text>  </Text>
                  <Text> code_compte: <Text style={styles.name}>  {item.code_compte}</Text>  </Text>
                  <Text> location : <Text style={styles.name}>  {item.location}</Text>  </Text>
                  <Text> categorie : <Text style={styles.position}>  {item.categorie}</Text>  </Text>
                  <Text> serial_number : <Text style={styles.position}>  {item.serial_number}</Text>  </Text>
                  <Text> etat : <Text style={styles.position}>  {item.status}</Text>  </Text>



                  <View style={{flexDirection: "row" ,marginLeft:20 ,marginRight:20}}>
                  <TouchableOpacity style={styles.followButton} onPress={() => this.updatearticle(item)}>
                    <Text style={styles.followButtonText}>update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deletButton} onPress={() => this.deletitem(item)}>
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
                </View>
              </TouchableOpacity>
            )
          }} />

        <Modal
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}>

          <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              <View style={styles.popupContent}>
                <ScrollView contentContainerStyle={styles.modalInfo}>
                  <Image style={styles.image} source={{ uri: this.state.userSelected.image }} />
                  <Text style={styles.name}>{this.state.userSelected.name}</Text>
                  <Text style={styles.position}>{this.state.userSelected.position}</Text>
                  <Text style={styles.about}>{this.state.userSelected.about}</Text>
                </ScrollView>
              </View>
              <View style={styles.popupButtons}>
                <TouchableOpacity onPress={() => { this.setModalVisible(false) }} style={styles.btnClose}>
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
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#eeeeee"
  },
  header: {
    backgroundColor: "#00CED1",
    height: 200
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
    flex: 1,
  },
  detailContent: {
    top: 80,
    height: 500,
    width: Dimensions.get('screen').width - 90,
    marginHorizontal: 30,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: "#ffffff"
  },
  userList: {
    flex: 1,
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
    marginLeft: 20,
    marginTop: 10
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },



  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    flexBasis: '46%',
    padding: 10,
    flexDirection: 'row'
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: "#008080",
    fontWeight: 'bold'
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: "#696969"
  },
  about: {
    marginHorizontal: 10
  },

  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  followButtonTextquantite: {
    color: "#000000",
    fontSize: 20,
  },
  followButtonnewarticle: {
    height: 35,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#00BFFF",
    marginLeft:10
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
    height: 250,
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent: 'center'
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose: {
    height: 20,
    backgroundColor: '#20b2aa',
    padding: 20
  },
  modalInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
