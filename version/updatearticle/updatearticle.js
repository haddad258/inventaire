// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to update the user

import React, { useState } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    TouchableOpacity,
    Icon,
    SafeAreaView,
    Text,
} from 'react-native';
import Mytextinput from '../pages/components/Mytextinput';
import Mybutton from '../pages/components/Mybutton';
import Mytext from '../pages/components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect } from 'react';
var LocationTable = require('./Location')()

//var listearticle = require('./listearti')()
var db = openDatabase({ name: 'UserDatabase.db' });

const updatearticle = ({ navigation, route }) => {
    let [inputUserId, setInputUserId] = useState('');
    let [code_compte, setcode_compte] = useState('');
    let [ancien_code, setancien_code] = useState('');
    let [designation, setdesignation] = useState('');
    let [categorie, setcategorie] = useState('');
    let [date, setdate] = useState('')
    let [status, setstatus] = useState('')
    let [serial_number, setserial_number] = useState('')
    let [compte_comptable, setcompte_comptable] = useState('');
    let [new_code, setnew_code] = useState('')
    let [location,setlocation] = useState('')

    let updateAllStates = (code_compte, ancien_code, designation, categorie, date, compte_comptable, article_id,new_code ,status ,serial_number ,location) => {
        setcode_compte(code_compte);
        setancien_code(ancien_code),
            setdesignation(designation);
        setcategorie(categorie);
        setdate(date);
        setcompte_comptable(compte_comptable)
        setInputUserId(article_id)
        setnew_code(new_code)
        setstatus(status)
        setserial_number(serial_number)
        setlocation(location)
    };

    useEffect(() => {
        console.log(route.params.articleupdate)
        var articleselected = route.params.articleupdate;
        updateAllStates(articleselected.code_compte, articleselected.ancien_code, articleselected.designation,

            articleselected.categorie, articleselected.date, articleselected.compte_comptable, articleselected.article_id ,articleselected.new_code , articleselected.status , articleselected.serial_number,articleselected.location
        )

    },[])


    let searchUser = () => {
        var articleselected;
        if (articleselected) {
            updateAllStates(articleselected.code_compte, articleselected.ancien_code, articleselected.designation,

                articleselected.categorie, articleselected.date, articleselected.compte_comptable
            )
        } else {
            alert('No article found');
        }

    };
    let updateUser = () => {

        if (!new_code) {
            alert('Please fill new_code');
            return;
        }
        if (!compte_comptable) {
            alert('Please fill compte_comptable');
            return;
        }
        if (!designation) {
            alert('Please fill designation');
            return;
        }
        if (!code_compte) {
            alert('Please fill code_compte');
            return;
        }
        if (!categorie) {
            alert('Please fill categorie');
            return;
        }
        if (!status) {
            alert('Please fill state');
            return;
        }
        if (!date) {
            alert('Please fill date');
            return;
        }
        // if (!serial_number) {
        //     alert('Please fill serial_number');
        //     return;
        // }
        if (!location) {
            alert('Please choose location');
            navigation.navigate('Chooselocation')
        }
     
        db.transaction(function (tx) {
            tx.executeSql(

                'INSERT INTO tablearticle (new_code ,compte_comptable ,serial_number ,status ,date ,categorie  ,designation  ,ancien_code  ,code_compte  ,location ) VALUES (?,?,?,?,?,?,?,?,?,?)',
                [new_code, compte_comptable, serial_number, status, date, categorie, designation, ancien_code, code_compte, location],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'You are Registered Successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => {


                                    db.transaction((tx) => {
                                        tx.executeSql(
                                          'DELETE FROM  tablearticle where article_id=?',
                                          [route.params.articleupdate.article_id],
                                          (tx, results) => {
                                            console.log('Results', results.rowsAffected);
                                            if (results.rowsAffected > 0) {
                                             
                                               navigation.navigate('Listenewartice')
                                    
                                              
                                            } else {
                                              alert('Please insert a valid User Id');
                                            }
                                          },
                                        );
                                      });
                                },
                                },
                            ],
                            { cancelable: false },
                        );
                    } else alert('Registration Failed');
                },
            );
        });



        /////////////////////////////////////////////////////////////////////////////////
        // db.transaction((tx) => {
        //   tx.executeSql(
        //     'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?',
        //     [code_compte, ancien_code, userAddress, inputUserId],
        //     (tx, results) => {
        //       console.log('Results', results.rowsAffected);
        //       if (results.rowsAffected > 0) {
        //         Alert.alert(
        //           'Success',
        //           'User updated successfully',
        //           [
        //             {
        //               text: 'Ok',
        //               onPress: () => navigation.navigate('HomeScreen'),
        //             },
        //           ],
        //           {cancelable: false},
        //         );
        //       } else alert('Updation Failed');
        //     },
        //   );
        // });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {/* <Text> Location :  <Mytext text={route.params.location} />  </Text> */}
                {/* <TouchableOpacity style={{ alignItems: 'center', backgroundColor: '#f05555',color: '#ffffff',width:'30%', height:"4%"}} onPress={()=>navigation.navigate('Chooselocation')}>
      <Text >change location</Text>
    </TouchableOpacity> */}

                <View style={{ flex: 1 }}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView
                            behavior="padding"
                            style={{ flex: 1, justifyContent: 'space-between' }}>
                          <Text> idarticle : <Mytext text={inputUserId} />  </Text>
                          <Text> Location : <Mytext text={location} />  </Text>
                          <DropDownPicker
                                 items={LocationTable.map(e =>  e.codelocal +" " + e.site + " " + e.local)}
                                containerStyle={{ height: 45, width: '100%' }}
                                placeholder="change location"
                                value={status}
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
                                    setlocation(item)



                                }}
                            />
                            {/* <Mytext
                                placeholder="Enter ancien code"
                                style={{ padding: 10 }}
                                disabled
                                value={'' + inputUserId}
                                onChangeText={(inputUserId) => setInputUserId(inputUserId)}
                            /> */}
                            <Mytextinput
                                placeholder="Enter new location"
                                value={'' + location}
                                onChangeText={(location) => setlocation(location)}
                                maxLength={10}
                                style={{ padding: 10 }}
                            />
                            {/* <Mybutton title="Search ancien article" customClick={searchUser} /> */}
                            <Mytextinput
                                placeholder="Enter ancien_code No"
                                value={'' + ancien_code}
                                onChangeText={(ancien_code) => setancien_code(ancien_code)}
                                maxLength={10}
                                style={{ padding: 10 }}
                            />
                            <Mytextinput
                                placeholder="Enter new_code No"
                                value={'' + new_code}
                                onChangeText={(new_code) => setnew_code(new_code)}
                                maxLength={10}
                                style={{ padding: 10 }}
                            />
                            <Mytextinput
                                placeholder="Enter compte_comptable No"
                                value={'' + compte_comptable}
                                onChangeText={(compte_comptable) => setcompte_comptable(compte_comptable)}
                                maxLength={10}
                                style={{ padding: 10 }}
                            />
                            <Mytextinput
                                placeholder="Enter designation "
                                value={'' + designation}
                                onChangeText={(designation) => setdesignation(designation)}
                                maxLength={10}
                                style={{ padding: 10 }}
                            />

                            <Mytextinput
                                placeholder="Enter code_compte"
                                value={code_compte}
                                style={{ padding: 10 }}
                                onChangeText={(code_compte) => setcode_compte(code_compte)}
                            />
                            <Mytextinput
                                placeholder="Enter categorie "
                                value={'' + categorie}
                                onChangeText={(categorie) => setcategorie(categorie)}
                                maxLength={10}
                                style={{ padding: 10 }}
                            />

                            <Mytextinput

                                placeholder="Enter etat "
                                value={'' + status}
                                onChangeText={(status) => setstatus(status)}
                                maxLength={10}
                                style={{ padding: 10 }}
                            />


                            <DropDownPicker
                                items={["Bonne etat", " moyenne etat", "mauvaise etat"].map(e => e)}
                                containerStyle={{ height: 45, width: '100%' }}
                                placeholder="select etat"
                                value={status}
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
                                    setstatus(item)



                                }}
                            />
                            <Mytextinput
                                placeholder="Enter date No"
                                value={'' + date}
                                onChangeText={(date) => setdate(date)}
                                maxLength={10}
                                style={{ padding: 10 }}
                            />
                            <Mytextinput
                                placeholder="Enter serial_number No"
                                value={'' + serial_number}
                                onChangeText={(serial_number) => setserial_number(serial_number)}
                                maxLength={10}
                                style={{ padding: 10 }}
                            />



                            <Mybutton title="save Article" customClick={updateUser} />
                        </KeyboardAvoidingView>
                    </ScrollView>
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
};

export default updatearticle;


