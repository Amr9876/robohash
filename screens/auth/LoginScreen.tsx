import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FunctionComponent, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase.config';
import { ParamList } from './Auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<ParamList, 'Login'>

const LoginScreen: FunctionComponent<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submitHandler = () => {
    
    if(!email || !password) {
      Alert.alert('Error!', 'Please fill out all fields!', [{ text: 'OK' }]);
    }

    signInWithEmailAndPassword(auth, email, password)
    .then(result => {
      console.log('Logged in!!');
    })
    .catch(err => {
      Alert.alert('Error!', err.message.split('/')[1].replace(')', ''), [{ text: 'OK' }]);
    });

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput style={styles.txtInput} placeholder='Email' placeholderTextColor='#555555' value={email} onChangeText={text => setEmail(text)} />
      <TextInput style={styles.txtInput} placeholder='Password' placeholderTextColor='#555555' value={password} onChangeText={text => setPassword(text)} secureTextEntry />

      <TouchableOpacity style={styles.btn} onPress={submitHandler}>
        <Text style={styles.btnText}>SUBMIT</Text>
      </TouchableOpacity>

    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 100
  },
  title: {
    fontSize: 50,
    color: '#eee',
    fontFamily: 'monospace',
    letterSpacing: 3
  },
  txtInput: {
    borderWidth: 1,
    borderColor: '#eee',
    padding: 20,
    width: 300,
    color: '#eee',
    marginTop: 40
  },
  btn: {
    borderWidth: 1,
    borderColor: '#eee',
    padding: 20,
    width: 300,
    margin: 20,
    marginLeft: 20
  },
  btnText: {
    color: '#eee',
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 10
  },
})