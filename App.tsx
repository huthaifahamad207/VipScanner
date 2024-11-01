import React from 'react';
import {Platform} from 'react-native';

import HomeScreen from './screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScannerScreen from './screens/ScannerScreen';
import ManageUserScreen from './screens/ManageUserScreen';
import MangeUserQrScreen from './screens/MangeUserQrScreen';
import {UserProvider} from './screens/UserContext';

const Stack = createNativeStackNavigator();

const App = () => {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      enableScreens(true);
    }
  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ScannerScreen"
            component={ScannerScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ManageUserScreen"
            component={ManageUserScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="MangeUserQrScreen"
            component={MangeUserQrScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
