import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, TextInput, ScrollView , Button, ActivityIndicator, Alert} from "react-native"
import firebase from '../database/firebase'


const UserDetailScreen = (props) => {

 const initialState = {
     id: "",
     name: "",
     Department: "",
     Section: "",
     Year: "",
     Boys: "",
     Girls: ""
 }
    const [user, setUser] =  useState(initialState);
    const [loading, setLoading] = useState(true);

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection("users").doc(id)
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({
            ...user,
            id: doc.id,
        });
        setLoading(false)
    };

    useEffect(() => {
        getUserById(props.route.params.userId);
   }, []);
   

   const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value});
};

  const deleteUser = async () => {
      const dbRef = firebase.db.collection("users").doc(props.route.params.userId);
      await dbRef.delete();
      props.navigation.goBack();
  }

 const updateUser = async () => {
     const dbRef = firebase.db.collection("users").doc(user.id);
     await dbRef.set({
         name: user.name,
         Department: user.Department,
         Section:  user.Section,
         Year:  user.Year,
         Boys:  user.Boys,
         Girls:  user.Girls
     })
     setUser(initialState)
     props.navigation.goBack();
 }

  const openConfirmationAlert = () => {
      Alert.alert("Remove The User", "Are you sure?", [
          {text: "Yes", onPress: () => deleteUser()},
          {text: "No", onPress: () => console.log(false)},

      ])
  }

 if (loading) {
    return (
        <View>
            <ActivityIndicator size="large" color="#9e9e9e"/>
        </View>
    );
}

  return (
    <ScrollView style={styles.container}>
    <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Name'
        value={user.name}
        onChangeText={(value) => handleChangeText("name", value)}
        />
    </View>
    <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Department'
        value={user.Department}
        onChangeText={(value) => handleChangeText("Department", value)}
        />
    </View>
    <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Section'
        value={user.Section}
        onChangeText={(value) => handleChangeText("Section",value)}
      />
    </View>
    <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Year'
        keyboardType="number-pad"
        value={user.Year}
        onChangeText={(value) => handleChangeText("Year",value)}
      />
    </View>
    <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Boys'
        keyboardType="number-pad"
        value={user.Boys}
        onChangeText={(value) => handleChangeText("Boys",value)}
      />
    </View>
    <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Girls'
        keyboardType="number-pad"
        value={user.Girls}
        onChangeText={(value) => handleChangeText("Girls",value)}
      />
    </View>
    
    <View >
        <Button color="#19AC52" title='Update User' onPress={() => updateUser()}/>
    </View>
    <View>
    <Button color="#E37399" title='Delete User' onPress={() => openConfirmationAlert()}/>
    </View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",

    },
});

export default UserDetailScreen