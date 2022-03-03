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
    const SPACING = 10;
    const AVATAR_SIZE = 65;
    const BG_IMG="https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

  return (
    <ScrollView>
    <View style={{flex:1, backgroundColor: "#fff", padding: SPACING, 
    paddingTop : 50,
    paddingBottom: 90
    }}>




    <Image source={{ uri: BG_IMG }}
      style={StyleSheet.absoluteFillObject}
      blurRadius={80}
     />
     
     <Text style={{ color: "#000000",  fontSize:20, fontWeight: "bold",
              
        }}>
             LIST OF USERS
         </Text>



    
       {
           users.map(user => {
               return (
                   <TouchableOpacity key={user.id} bottomDivider onPress={() => {
                       props.navigation.navigate("UserDetailScreen", {
                           userId: user.id
                       })
                  }}     style={{top: 30}} >
                        <View style={{ flexDirection: "row", padding: SPACING, marginBottom: SPACING, backgroundColor: 'rgba(255,255,255,0.8)' ,borderRadius: 16, 
                        
                        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 10,
},
shadowOpacity: .3,
shadowRadius: 20,

elevation: 150,
                        
                         }}>
                        <Image source={{uri: "https://storage.jewheart.com/content/users/avatars/1606/avatar_1606_500.jpg?1558623487"}}
                        style={{ width: AVATAR_SIZE, height:AVATAR_SIZE, borderRadius: AVATAR_SIZE, marginRight: SPACING / 2}}
                            
                        />
                        <View >
                        
                            <Text style={{fontSize:20, fontWeight: "bold"}}>{user.name}</Text>
                         
                        
                      
                            <Text style={{fontSize:18, opacity: .7}}>{user.Department}</Text>
                            
                            <Text style={{fontSize:14, opacity: .8 , color: "#0099cc"}}>{user.Section}</Text>
                           
                        </View>
                        </View> 
                   </TouchableOpacity>
               );
           })
       }
</View>
    </ScrollView>
    
 
  )
}

export default UsersList