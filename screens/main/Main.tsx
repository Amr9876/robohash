import { StatusBar } from 'react-native'
import React, { FunctionComponent } from 'react'
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import Explore from './explore';
import AddScreen from './AddScreen';
import ProfileScreen from './ProfileScreen';

export type ParamList = {
  Home: undefined,
  Add: undefined,
  Explore: undefined,
  Profile: undefined
}

const Tab = createBottomTabNavigator<ParamList>();

const homeOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ color }) => <Ionicons name="ios-home-outline" size={24} color={color} />
}

const addOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" size={24} color={color} />
}

const exploreOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />
}

const profileOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ color }) => <Ionicons name="person-circle-outline" size={24} color={color} />
}

const screenOptions: BottomTabNavigationOptions = { 
  tabBarShowLabel: false,
  headerShown: false,
  tabBarActiveTintColor: '#0c49f0',
  lazy: false
}

const Main: FunctionComponent = () => {
  return (
    <>     
      <Tab.Navigator screenOptions={screenOptions} initialRouteName='Home'>
        <Tab.Screen name='Home' component={HomeScreen} options={homeOptions} />
        <Tab.Screen name='Explore' component={Explore} options={exploreOptions} />
        <Tab.Screen name='Add' component={AddScreen} options={addOptions}/>
        <Tab.Screen name='Profile' component={ProfileScreen} options={profileOptions}/>
      </Tab.Navigator>
      <StatusBar barStyle='light-content' />
    </>
  )
}

export default Main