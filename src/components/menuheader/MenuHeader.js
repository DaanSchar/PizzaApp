import { SafeAreaView, TouchableOpacity, View, StyleSheet } from "react-native";
import MenuButton from "./MenuButton";
import Feather from "react-native-vector-icons/Feather";
import colors from "../../../assets/colors/colors";
import * as React from "react";

const MenuHeader = (props) => {
  return (
    <SafeAreaView>
      <View style={styles.headerWrapper}>
        <MenuButton navigation={props.navigation}/>
        <TouchableOpacity onPress={() =>  props.navigation.navigate('Shopping Cart')}>
          <Feather name='shopping-cart' size={24} color={colors.textDark}></Feather>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: colors.textLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'center',
    paddingBottom: 10,
  },
})

export default (MenuHeader);
