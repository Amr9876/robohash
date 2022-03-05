import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native'
import React, { FunctionComponent } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import RobotList from '../../components/RobotList'
import { FontAwesome5 } from '@expo/vector-icons';
import useUser from '../../hooks/useUser';

const HomeScreen: FunctionComponent = () => {

  const user = useUser();

  return (
    <>
      <SafeAreaView style={styles.contianer}>
        <Text style={styles.title}>My Robots</Text>  
        <View style={styles.icon}>
          <FontAwesome5 name="robot" size={50} color="#eee" />
        </View>
      </SafeAreaView>
      {user ? 
        user.robots.length === 0 ? 
          <Text style={styles.msg}>You dont have robots yet</Text> :
          <RobotList robots={user.robots} size={300} /> : 
          <ActivityIndicator size={100} color='#eee' />}
    </>
  )
}

const styles = StyleSheet.create({
  contianer: {
    display: 'flex',
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    color: '#eee',
    margin: 100,
    marginLeft: 50,
    fontFamily: 'monospace',
    letterSpacing: 5
  },
  icon: {
    marginTop: 90,
    marginLeft: -80
  },
  msg: {
    color: '#eee',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'monospace'
  }
})

export default HomeScreen