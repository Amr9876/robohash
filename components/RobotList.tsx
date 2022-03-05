import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FunctionComponent } from 'react'
import { IRobot } from '../data/robots'

type Props = {
  robots: IRobot[],
  size: number
}


const RobotList: FunctionComponent<Props> = ({ robots, size }) => {
  const sizeStyle = size > 100 ? { marginTop: -280, marginLeft: 40 } : { marginTop: -70, marginLeft: 100 } 
  const textStyle = (item: IRobot) => item.name.length > 5 ? { ...styles.txtSm, ...sizeStyle }: { ...styles.txtLg, ...sizeStyle  };
  
  return (
    <>
      <FlatList data={robots} renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Alert.alert('Robot\'s Name', item.name)}>
            <View style={{...styles.container, height: size}}>
              <Image style={{ ...styles.img, width: size, height: size }} source={{ uri: item.image }} resizeMode='cover' />
              <Text style={textStyle(item)}>{item.name.length > 5 ? `${item.name.slice(0, 5)} . . .` : item.name}</Text>
            </View>
          </TouchableOpacity>
        )} />
    </>
  )
}

export default RobotList

const styles = StyleSheet.create({
  container: {
    margin: 40,
    marginBottom: 10,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderRadius: 80,
    width: 300,
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
    fontSize: 23,
    letterSpacing: 2
  },
  img: {
    marginTop: -30
  },
})