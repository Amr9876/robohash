import { StyleSheet, Text, View } from 'react-native'
import React, { FunctionComponent } from 'react'

type Props = {
  char: string
}

const Avatar: FunctionComponent<Props> = ({ char }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{char}</Text>
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
  container: {  
    backgroundColor: '#555555',
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: '#eee',
    fontSize: 30
  }
})