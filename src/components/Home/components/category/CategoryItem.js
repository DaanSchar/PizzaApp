import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import colors from "../../../../../assets/colors/colors";

const CategoryItem = (props) => {
  let { item } = props.item;
  let isSelected = props.selected === item.title;

  return(
    <View style={[styles.categoryItemWrapper, {
      backgroundColor: isSelected ? colors.primary : colors.white,
      marginLeft: item.id==='1' ? 20 : 0
    }]}>
      <Image source={item.image} style={styles.categoryItemImage}/>
      <Text style={styles.categoryItemTitle}>{item.title}</Text>
      <View style={[styles.categorySelectWrapper, {
        backgroundColor: isSelected ? colors.white : colors.secondary,
      }]}>
        <Feather name="chevron-right" size={8} style={styles.categorySelectIcon}  color={isSelected ? colors.black : colors.white}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  categoryItemWrapper: {
    marginRight: 20,
    borderRadius: 20,
  },
  categoryItemImage: {
    width: 60,
    height: 60,
    marginTop: 24,
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  categoryItemTitle: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    marginTop: 10,
  },
  categorySelectWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 26,
    width: 26,
    borderRadius: 26,
    marginBottom: 20,
  },
  categorySelectIcon: {
    alignSelf: 'center',
  },
})

export default CategoryItem;
