import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React, { FunctionComponent } from 'react'
import useUsers from '../../../hooks/useUsers'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ParamList } from './Explore'
import Avatar from '../../../components/Avatar'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import { auth } from '../../../firebase.config'

type Props = NativeStackScreenProps<ParamList, 'UsersList'>;

const UsersListScreen: FunctionComponent<Props> = ({ navigation }) => {
  const users = useUsers()?.filter(x => x.id !== auth.currentUser?.uid);

  const sizeStyle = { marginTop: -70 } 
  const textStyle = (item: QueryDocumentSnapshot<DocumentData>) => item.data().name.length > 5 ? { ...styles.txtSm, ...sizeStyle }: { ...styles.txtLg, ...sizeStyle  };

  return (
    <View>
      {users ? (
        <FlatList data={users} renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('User', { user: item.data() })}>
              <View style={{ ...styles.container, height: 100 }}>
                <View style={{ marginTop: -10 }}>
                  <Avatar char={item.data().name.substring(0, 1)} />
                </View>
                <Text style={textStyle(item)}>{item.data().name.length > 5 ? `${item.data().name.slice(0, 5)} . . .` : item.data().name}</Text>
              </View>
            </TouchableOpacity>
          )
        }} />
      ) : (
        <ActivityIndicator size={100} color='#eee' />
      )}
    </View>
  )
}

export default UsersListScreen

const styles = StyleSheet.create({
  container: {
    margin: 40,
    marginBottom: 10,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderRadius: 80,
    width: 350,
    padding: 20
  },
  txtLg: {
    color: '#eee',
    marginLeft: 100,
    fontSize: 30,
    letterSpacing: 3
  },
  txtSm: {
    color: '#eee',
    marginLeft: 70,
    fontSize: 20,
    letterSpacing: 2
  },
})