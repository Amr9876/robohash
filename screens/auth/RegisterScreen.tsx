import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FunctionComponent, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase.config';
import { ParamList } from './Auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

type Props = NativeStackScreenProps<ParamList, 'Register'>

const RegisterScreen: FunctionComponent<Props> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const submitHandler = () => {
    
    if(!username || !email || !password || !confirmPassword) {
      Alert.alert('Error!', 'Please fill out all fields!', [{ text: 'OK' }]);
    }

    if(password !== confirmPassword){
      Alert.alert('Error!', 'Password and confirm password doesn\'t match!', [{ text: 'OK' }]);
    }

    if(password === confirmPassword && !password && !confirmPassword) {

      createUserWithEmailAndPassword(auth, email, password)
      .then(user => {
        const usersRef = collection(db, 'users');
        const usersDocRef = doc(usersRef, auth.currentUser?.uid);
        setDoc(usersDocRef, { email, name: username, photoURL: username.substring(0, 1).toUpperCase() });
        navigation.navigate('Home');
      })
      .catch(err => {
        Alert.alert('Error!', err.message.split('/')[1].replace(')', ''), [{ text: 'OK' }]);
      });
      
    }


  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput style={styles.txtInput} placeholder='Username' placeholderTextColor='#555555' value={username} onChangeText={text => setUsername(text)} />
      <TextInput style={styles.txtInput} placeholder='Email' placeholderTextColor='#555555' value={email} onChangeText={text => setEmail(text)} />
      <TextInput style={styles.txtInput} placeholder='Password' placeholderTextColor='#555555' value={password} onChangeText={text => setPassword(text)} secureTextEntry />
      <TextInput style={styles.txtInput} placeholder='Confirm Password' placeholderTextColor='#555555' value={confirmPassword} onChangeText={text => setConfirmPassword(text)} secureTextEntry />

      <TouchableOpacity style={styles.btn} onPress={submitHandler}>
        <Text style={styles.btnText}>SUBMIT</Text>
      </TouchableOpacity>

    </View>
  )
}

export default RegisterScreen

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