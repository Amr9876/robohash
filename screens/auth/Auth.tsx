import React, { FunctionComponent } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';

export type ParamList = {
  Home: undefined,
  Login: undefined,
  Register: undefined
}

const Stack = createNativeStackNavigator<ParamList>();

const Auth: FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default Auth