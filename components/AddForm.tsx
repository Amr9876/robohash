import { Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, GestureResponderEvent, Keyboard, ImageBackground } from 'react-native'
import React, { FunctionComponent, useState } from 'react'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import useUser from '../hooks/useUser';
import { auth, db } from '../firebase.config';

const AddForm: FunctionComponent = () => {
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [errMessage, setErrMessage] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const user = useUser();

  const generateHandler = (event: GestureResponderEvent) => {
    event.preventDefault();
    Keyboard.dismiss();

    if(name.length === 0) {
      setErrMessage('Please provide us your robot name');
      setIsCompleted(false);
      setImage('')
    }

    if(name.length > 0) {
      setImage(`https://robohash.org/${name}`.split(' ').join(''))
      setIsCompleted(false);
      setErrMessage('')
    }
  }
  
  const bindText = (text: string) => {
    setName(text);
    setErrMessage('');
    setIsCompleted(false);
  }
  
  const saveImage = () => { 
    const usersRef = collection(db, 'users');
    const usersDocRef = doc(usersRef, auth.currentUser!.uid);

    (async() => {
      const snapshot = await getDoc(usersDocRef);

      const data = snapshot.data();

      if(data){
        await setDoc(usersDocRef, { 
          ...data, 
          robots: [ ...data.robots, { 
            id: data.robots.length + 1,
            image: `https://robohash.org/${name}`,
            name
           }] 
        })
      }
    })()

    setIsCompleted(true);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <TextInput style={styles.textInput} placeholder='Name Your Robot' placeholderTextColor='#555555' value={name} onChangeText={text => bindText(text)} />
      
      {errMessage.length > 0 && <Text style={styles.err}>{errMessage}</Text>}
      {isCompleted && <Text style={styles.successMsg}>Saved!!</Text>}

      <TouchableOpacity style={styles.btn} onPress={e => generateHandler(e)}>
        <Text style={styles.btnText}>GENERATE</Text>
      </TouchableOpacity>


      {image.length > 0 && (
        <TouchableOpacity onPress={saveImage}>
          <ImageBackground style={styles.img} source={{uri: image}} resizeMode='cover'>
              <Text style={styles.imgText}>SAVE</Text>
          </ImageBackground>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 100
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#eee',
      padding: 20,
      width: 300,
      color: '#eee',
      marginLeft: 50
    },
    btn: {
      marginTop: 30,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#88ff88',
      padding: 20,
      width: 300,
      marginLeft: 50
    },
    btnText: {
      color: '#88ff88',
      fontFamily: 'monospace',
      letterSpacing: 5
    },
    img: {
      width: 300,
      height: 300,
      borderWidth: 1,
      borderRadius: 100,
      borderColor: 'transparent',
      backgroundColor: '#111111',
      marginTop: 80,
      marginLeft: 50
    },
    imgText: {
      fontSize: 50,
      fontFamily: 'monospace',
      textAlign: 'center',
      color: '#eee',
      letterSpacing: 20,
      marginTop: 110,
      fontWeight: 'bold'
    },
    err: {
      color: '#ff8888',
      marginTop: 30,
      marginLeft: 50
    },
    successMsg: {
      color: '#88ff88',
      marginTop: 20,
      marginLeft: 140,
      fontSize: 30,
    }
})

export default AddForm