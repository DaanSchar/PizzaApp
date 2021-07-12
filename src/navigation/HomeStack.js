
import 'react-native-gesture-handler';
import * as React from 'react';
import Home from "../components/Home/Home";
import Details from "../components/details/Details";
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingCart from '../components/cart/ShoppingCart'

const Stack = createStackNavigator();

// contains the Home scene inside a Stack Navigator
export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false, }}/>
      <Stack.Screen name="Details" component={Details} options={{ headerShown: false, }}/>
      <Stack.Screen name='Shopping Cart' component={ShoppingCart} options={{ headerShown: false}}/>
    </Stack.Navigator>
  )
}
