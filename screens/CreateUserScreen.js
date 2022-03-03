import React, { useState }from 'react'
import {View , Text, Button , TextInput, ScrollView, StyleSheet, TouchableOpacity,Image}  from "react-native"
import firebase from "../database/firebase";

const CreateUserScreen = (props) => {
    const [state, setState] = useState({
        name: "",
        Department: "",
        Section: "",
        Year: "",
        Boys: "",
        Girls: "",
    });

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value});
    };

    const SaveNewUser = async () => {
         if (state.name === '') {
           alert("Please enter all the inputs")
         } else {
             try {
                await firebase.db.collection("users").add({
                    name: state.name,
                    Department: state.Department,
                    Section: state.Section,
                    Year: state.Year,
                    Boys: state. Boys,
                    Girls: state.Girls,

                })
            props.navigation.goBack();
         } catch (error) {
             console.log(error);
        }
    }
 }

    

  return (
  <ScrollView style={styles.container}>
  <View style={{flexDirection: "row"}}>
    <TouchableOpacity
                    style={{ justifyContent: 'center', width: 50,  }}
                    onPress={() => props.navigation.goBack()}
                >
                    <Image
                        source={require("../assets/icons/back_arrow.png")}
                        style={{
                            width: 20,
                            height: 20,
                           
                        }}
                    />
    </TouchableOpacity>
    <Text style={{fontSize: 20, fontWeight: "bold",letterSpacing:2, left:55}}>UPLOAD</Text>
    </View>

      <View style={styles.inputGroup}>
          <TextInput 
          placeholder='Please Enter Your Name'
          onChangeText={(value) => handleChangeText("name", value)}
          />
      </View>
      <View style={styles.inputGroup}>
          <TextInput 
          placeholder='Department'
          onChangeText={(value) => handleChangeText("Department", value)}
          />
      </View>
      <View style={styles.inputGroup}>
          <TextInput 
          placeholder='Section'
          onChangeText={(value) => handleChangeText("Section",value)}
        />
      </View>
      <View style={styles.inputGroup}>
          <TextInput 
          placeholder='Year'
          keyboardType="number-pad"
          onChangeText={(value) => handleChangeText("Year",value)}
        />
      </View>
      <View style={styles.inputGroup}>
          <TextInput 
          placeholder='Boys'
          keyboardType="number-pad"
          onChangeText={(value) => handleChangeText("Boys",value)}
        />
      </View>
      <View style={styles.inputGroup}>
          <TextInput 
          placeholder='Girls'
          keyboardType="number-pad"
          onChangeText={(value) => handleChangeText("Girls",value)}
        />
      </View>

      <View >
          <Button title='Save User' onPress={() => SaveNewUser()}/>
      </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
       
    },
    inputGroup: {
        flex: 1,
        padding: 5,
        marginBottom: 20,
        borderBottomWidth: 2,
        top:20,
        borderBottomColor: "#cccccc"
    }
})

export default CreateUserScreen