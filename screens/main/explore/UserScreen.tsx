import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { FunctionComponent } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ParamList } from './Explore'
import Avatar from '../../../components/Avatar';
import RobotList from '../../../components/RobotList';

type Props = NativeStackScreenProps<ParamList, 'User'>;

const UserScreen: FunctionComponent<Props> = ({ route }) => {

  const user = route.params.user;

  return (
    <View style={styles.container}>

      {user ? (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Avatar char={user.email.substring(0, 1).toUpperCase()!} />

            <Text style={styles.username}>{user.name}</Text>
          </View>

          <View style={styles.robotsContainer}>
            {user.robots.length > 0 ? 
              <RobotList robots={user.robots} size={100} /> : 
              <Text style={styles.msg}>This user doesnt have robots</Text>}
          </View>
        </>
      ) : <ActivityIndicator size={100} color='#eee' />}
    </View>
  )
}

export default UserScreen

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
  robotsContainer: {
    marginLeft: -50,
    marginTop: 20,
    width: 600
  },
  msg: {
    color: '#eee',
    fontSize: 15,
    fontFamily: 'monospace',
    marginTop: 20,
    marginLeft: 10
  }
})