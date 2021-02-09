// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, { Component } from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import  Mytextinput from './components/Mytextinput'

import {openDatabase} from 'react-native-sqlite-storage';
import axios from 'axios';

var db = openDatabase({name: 'UserDatabase.db'});


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      urlbackend:"http://192.168.0.55:3007/getall"
    };
  }
 componentDidMount(){
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM tablearticle', [], (tx, results) => {
      var temp = [];
      for (let i = 0; i < results.rows.length; ++i)
        temp.push(results.rows.item(i));
      this.setState({ data: temp })

    });
  });
 }
 sendlist =()=>{
console.log(this.state.urlbackend)
axios.post(this.state.urlbackend , this.state.data).then((response)=>{

  console.log(response.data)
  alert(response.data)
}).catch(()=>{

  alert("not send check your server")
})

 }

 showcolums = ()=>{
  
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='tablearticle'",
      [],
      function (tx, res) {
        console.log('item:', res.rows.length);
        alert("table created")
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS tablearticle', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS tablearticle(article_id INTEGER PRIMARY KEY AUTOINCREMENT, new_code VARCHAR(45),compte_comptable  VARCHAR(45),serial_number VARCHAR(45),status VARCHAR(45),date VARCHAR(45),categorie  VARCHAR(45),designation VARCHAR(45) ,ancien_code VARCHAR(45) ,code_compte VARCHAR(45), dateAdd VARCHAR(45),location VARCHAR(45))',
            [], 
          );
        }
      },
    );
  });

}

  render(){
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Text> {this.state.data.length} articles </Text>
          <View style={{flex: 1}}>
          <Mybutton
              title="sync with server"
              customClick={() => this.showcolums()}
              />
               <Mytextinput
                  placeholder= " enter url server"
                  value={(this.state) ?  this.state.urlbackend : " "}
                  onChangeText={(urlbackend) => this.setState({ urlbackend })}
                  style={{padding: 10}}
                />
               <Mybutton
              title="send to server"
              customClick={() => this.sendlist()}
              />
            {/* <Mybutton
              title="Register"
              customClick={() => navigation.navigate('Register')}
            />
            <Mybutton
              title="Update"
              customClick={() => navigation.navigate('Update')}
            />
            <Mybutton
              title="View"
              customClick={() => navigation.navigate('View')}
            />
            <Mybutton
              title="View All"
              customClick={() => navigation.navigate('ViewAll')}
            />
            <Mybutton
              title="Delete"
              customClick={() => navigation.navigate('Delete')}
            />
             <Mybutton
              title="showancienn"
              customClick={() => showcolums()}
            /> */}
             
          </View>
          {/* <Text style={{fontSize: 18, textAlign: 'center', color: 'grey'}}>
            Example of SQLite Database in React Native
          </Text>
          <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
            www.aboutreact.com
          </Text> */}
        </View>
      </SafeAreaView>
    );
  }
};

export default HomeScreen;
