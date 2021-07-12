import { TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import colors from "../../../assets/colors/colors";
import * as React from "react";


const MenuButton = (props) => {

  const openDrawer = () => {
    props.navigation.openDrawer();
  }

  return (
    <TouchableOpacity onPress={() => openDrawer()}>
      <Feather name="menu" size={24} color={colors.textDark}/>
    </TouchableOpacity>
  )
}

export default  MenuButton;
