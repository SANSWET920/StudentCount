import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import PostScreen from "../screens/PostScreen";
import SettingsScreen from "../screens/SettingsScreen";
import UsersList from "../screens/UsersList";
import CreateUserScreen from "../screens/CreateUserScreen";
import UserDetailScreen from "../screens/UserDetailScreen";
import { createStackNavigator } from "@react-navigation/stack";
import MainRouter from "./MainRouter";
import { StyleSheet,Image, View,Text, TouchableOpacity} from "react-native";
import React from "react";


const Tab = createBottomTabNavigator();



const CustomTabBarButton =({children, onPress}) => (
   <TouchableOpacity 
   style={{
       top: -30,
       justifyContent: "center",
       alignItems: "center",
       ...styles.shadow
   }}
    onPress={onPress}
   >
    <View style={{
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: "#e32f45"
    }}>
        {children}
    </View>
   </TouchableOpacity>

);





const Tabs = () => {
    return(
        <Tab.Navigator
   tabBarOptions={{
     showLabel: false ,
   

 
  }}

         screenOptions={{
    headerShown: false,
    tabBarStyle: { position: 'absolute',bottom: 0,
       left: 0,
       right: 0,
       elevation: 0,
       backgroundColor: "#ffffff",
       height: 60,
       ...styles.shadow  
        },
  }}
        >
            <Tab.Screen 
            name="Home" 
            component={PostScreen}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{ alignItems: "center", justifyContent: "center", top: 0}}>
                       <Image 
                           source={require("../assets/icons/home.png")}
                           resizeMode="contain"
                           style={{
                               width: 25,
                               height: 25,
                               tintColor: focused ? "#e32f45" : "#748c94",
                           }}
                       />
                       <Text style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 11}}>
                           HOME
                       </Text>
                    </View>
                )
            }}
             />
        
            <Tab.Screen 
            name="Post" 
            component={CreateUserScreen}
            options={{
                tabBarIcon: ({focused}) => (
                    <Image 
                        source={require("../assets/icons/addd.png")}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: "#fff"
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props} />
                )
            }}
           
            />
            <Tab.Screen 
            name="Settings" 
            component={MainRouter}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{ alignItems: "center", justifyContent: "center", top: 0}}>
                       <Image 
                           source={require("../assets/icons/icons.png")}
                           resizeMode="contain"
                           style={{
                               width: 28,
                               height: 28,
                               tintColor: focused ? "#e32f45" : "#748c94",
                           }}
                       />
                       <Text style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 10}}>
                          USERS
                       </Text>
                    </View>
                )
            }}
            />
           
      

        </Tab.Navigator>
    
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})

export default Tabs;


