import React, { useEffect, useState }from 'react';
import {View , Text , ScrollView, Button,Alert,Image,Dimensions,StatusBar, FlatList, Animated, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView} from "react-native";
import firebase from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";
import UserDetailScreen  from './UserDetailScreen';

const { width, height } = Dimensions.get('screen');

const UsersList = (props) => {
  const [users, setUsers] = useState([]);

  const [totalBoysCount , setTotalBoysCount ] = useState(0);
  const [totalGirlsCount , setTotalGirlsCount ] = useState(0);

    useEffect(() => {
        firebase.db.collection("users").onSnapshot((querySnapshot) => {
          const users = [];

          let BoysCount = 0;
          let GirlsCount = 0;

            querySnapshot.docs.forEach((doc) => {
               const { name, Department, Section, Year, Boys, Girls } = doc.data();
               users.push({
                   id: doc.id,
                   name,
                   Department,
                   Section,
                   Year,
                   Boys,
                   Girls,
               });
               BoysCount = BoysCount + parseInt(Boys) 
               GirlsCount = GirlsCount + parseInt(Girls) 
             
            });
         
            setUsers(users)
            
            setTotalBoysCount((oldValue) => BoysCount)
            setTotalGirlsCount((oldValue1) => GirlsCount)
        });
    }, []);

    const results = totalBoysCount + totalGirlsCount



    const deleteUser = async () => {
        const dbRef = firebase.db.collection("users").get().then(documents => {
            documents.forEach(document => {
                document.ref.delete()
            }) 
        });
        props.navigation.navigate("UsersList")
    }


    const openConfirmationAlert = () => {
        Alert.alert("Remove The User", "Are you sure?", [
            {text: "Yes", onPress: () => deleteUser()},
            {text: "No", onPress: () => console.log(false)},
  
        ])
    }
    const SPACING = 20;
    const AVATAR_SIZE = 70;
    const BG_IMG="https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

  return (
   
 

<View>
    <Text>dfv</Text>
    <Text>{totalBoysCount}</Text>
        <Text>{totalGirlsCount}</Text>
       <Text>{results}</Text>
</View>



    
      
              
                  
  )
}

export default UsersList