import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import store from './components/store/store'
import { Provider} from 'react-redux';

import HomeStack from "./components/Home/HomeStack";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
       <Drawer.Navigator initialRouteName='HomeStack'>
         <Drawer.Screen name='Delivery' component={HomeStack}/>
       </Drawer.Navigator>
     </NavigationContainer>
    </Provider>

  );
}

