import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeTabs from "./tabs";
import UsersList from '../screens/UsersList';
import UserDetailScreen from '../screens/UserDetailScreen';


const Stack = createStackNavigator();

const MainRouter = () => {

    return (
    
        <Stack.Navigator>
            <Stack.Screen 
                name={"SIGNIN"}
                component={UsersList}
                options={{
                    headerShown: false
                }}
            />
             <Stack.Screen 
             name="UserDetailScreen" 
             component={UserDetailScreen} 
             options={{ title: "User Details"}}/>
        </Stack.Navigator>
     
    );
}

export default MainRouter;