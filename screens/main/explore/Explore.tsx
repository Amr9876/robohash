import { StyleSheet } from 'react-native'
import React, { FunctionComponent } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UsersListScreen from './UsersListScreen';
import UserScreen from './UserScreen';
import { DocumentData } from 'firebase/firestore';

export type ParamList = {
  UsersList: undefined,
  User: { user: DocumentData }  
}

const Stack = createNativeStackNavigator<ParamList>();

const Explore: FunctionComponent = () => {

  return (
    <Stack.Navigator initialRouteName='UsersList' screenOptions={{headerShown: false}}>
      <Stack.Screen name='UsersList' component={UsersListScreen} />
      <Stack.Screen name='User' component={UserScreen} />
    </Stack.Navigator>
  )
}

export default Explore

const styles = StyleSheet.create({})