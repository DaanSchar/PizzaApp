import { TouchableOpacity, View , StyleSheet} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import colors from "../../assets/colors/colors";
import * as React from "react";


const MenuButton = (props) => {

  const navigation = props.navigation;

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={styles.styling}>
        <Feather name='chevron-left' size={12} color={colors.textDark}/>
      </View>
    </TouchableOpacity>
  )
}

export default  MenuButton;

const styles = StyleSheet.create({
  styling: {
    borderColor: colors.textLight,
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
  }
})
