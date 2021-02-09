// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to view all the user*/

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Mybutton from './components/Mybutton';


var db = openDatabase({ name: 'UserDatabase.db' });

const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tablearticle', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  }, []);
let consolelogist =()=>{
console.log("hello")
axios.post("http://192.168.0.55:5000/api/v1/ancien_articles" , flatListItems ).then(Response=>{
  console.log(Response)
})

}
  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text>Id: {item.user_id}</Text>
        <Text>Name: {item.new_code}</Text>
        <Text>Contact: {item.new_code}</Text>
        <Text>Address: {item.new_code}</Text>
        <Text>Address: {item.compte_comptable}</Text> 
<Text>Address: {item.serial_number }</Text> 
<Text>Address: {item.status }</Text> 
<Text>Address: {item.new_code }</Text> 
<Text>Address: {item.date }</Text> 
<Text>Address: {item.categorie}</Text> 
<Text>Address: {item.designation}</Text> 
<Text>Address: {item.ancien_code  }</Text> 
<Text>Address: {item.code_compte }</Text> 
 <Text>Address: {item.dateAdd }</Text> 
<Text>Address: {item.location }</Text> 
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
        <Mybutton title="Submit" customClick={consolelogist} />
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          Example of SQLite Database in React Native
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUser;