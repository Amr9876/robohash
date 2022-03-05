import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FunctionComponent, useEffect } from 'react'
import { ParamList } from './Auth'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<ParamList, 'Home'>;

const HomeScreen: FunctionComponent<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: 'https://robohash.org/static/img/top_logo.png' }} resizeMode='stretch' />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginBtnText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerBtnText}>REGISTER</Text>
        </TouchableOpacity>  
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 150
  },
  btnContainer: { 
    marginTop: 50,
  },
  img: {
    width: 380,
    height: 300
  },
  loginBtn: {
    borderColor: '#0767f7',
    borderWidth: 1,
    borderRadius: 80,
    padding: 20
  },
  registerBtn: {
    borderColor: '#52f507',
    borderWidth: 1,
    borderRadius: 80,
    marginTop: 50,
    padding: 20
  },
  loginBtnText: {
    color: '#0767f7',
    fontSize: 25,
    letterSpacing: 5,
    textAlign: 'center'
  },
  registerBtnText: {
    color: '#52f507',
    fontSize: 25,
    letterSpacing: 5,
    textAlign: 'center'
  },
})