import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { FunctionComponent } from 'react'
import Avatar from '../../components/Avatar'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.config'
import * as App from '../../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import useUser from '../../hooks/useUser'

type Props = NativeStackScreenProps<App.ParamList, 'Main'>;

const ProfileScreen: FunctionComponent<Props> = ({ navigation }) => {
  const user = useUser();

  const logoutHandler = () => {
    signOut(auth)
    .then(() => {
      console.log('Logged out!');
    })
  }

  return (
    <View style={styles.container}>

      {user ? (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Avatar char={user.email.substring(0, 1).toUpperCase()!} />

            <Text style={styles.username}>{user.name}</Text>
          </View>

          <TouchableOpacity style={styles.btn} onPress={logoutHandler}>
            <Text style={styles.btnTxt}>LOGOUT</Text>
          </TouchableOpacity>
        </>
      ) : <ActivityIndicator size={100} color='#eee' />}
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    padding: 80
  },
  username: {
    color: '#eee',
    marginTop: 5,
    marginLeft: 20,
    fontFamily: 'monospace',
    fontSize: 40,
    letterSpacing: 3
  },
  btn: {
    borderWidth: 1,
    borderColor: '#ff8888',
    marginTop:  30,
    height: 70
  },
  btnTxt: {
    color: '#ff8888',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 20
  }
})