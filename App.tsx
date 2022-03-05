import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import Main from './screens/main';
import Auth from './screens/auth'
import useUser from './hooks/useUser';
import { LogBox } from 'react-native';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase.config';

export type ParamList = {
  Main: undefined,
  Auth: undefined
}

const Stack = createNativeStackNavigator<ParamList>();

export default function App() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    LogBox.ignoreLogs(['Setting a timer', 'AsyncStorage has been extracted']);
    onAuthStateChanged(auth, res => {
      setUser(res!);
    })
  })

  return (
    <>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          
          {user ? 
            <Stack.Screen name='Main' component={Main} /> : 
            <Stack.Screen name='Auth' component={Auth} />}    

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
