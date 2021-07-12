import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import colors from "../../../../../assets/colors/colors";
import EditViewModal from "../EditViewModal";
import * as React from "react";
import { connect } from "react-redux";
import * as cartAction from "../../../../store/cart/cartAction";
import { useState } from "react";
import { setSelectedItem } from "../../../../store/cart/cartAction";


const FoodItem = ({ addToCart, removeFromCart, index, items, toggleModalVisible, setSelectedItem}) => {

  let item = items[index]

  const onClickAddButton = () => {
    addToCart(item);
  }

  const onClickRemoveButton = () => {
    removeFromCart(item, index);
  }

  const onClickEditButton = () => {
    toggleModalVisible();
    setSelectedItem(index);
  }

  return (
    <View style={styles.itemWrapper}>

      <View style={styles.topSideWrapper}>

        <View style={styles.titleItemWrapper}>
          <Text style={styles.itemNameTitle}>{item.title} {item.size}</Text>
          <Text style={styles.itemPriceTitle}>{item.price}$</Text>
        </View>

        <TouchableOpacity onPress={() => onClickEditButton()}>
          <Feather style={styles.editIcon} name='edit' size={24} color={colors.textDark}/>
        </TouchableOpacity>

      </View>

      {/*  function bar */}
      <View style={styles.functionsWrapper}>

        <TouchableOpacity style={styles.removeButton} onPress={() => onClickRemoveButton()}>
          <Feather name='trash-2' size={20}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={() => onClickAddButton()}>
          <Feather name='plus' size={20}/>
        </TouchableOpacity>

      </View>


    </View>
  )
}


const mapStateToProps = (state, ownProps) => ({
  items: state.cart.items,
  index: ownProps.index,
})

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(cartAction.addToCart(item)),
    removeFromCart: (item, index) => dispatch(cartAction.removeFromCart(item, index)),
    toggleModalVisible: () => dispatch(cartAction.toggleModalVisible()),
    setSelectedItem: (selected) => dispatch(cartAction.setSelectedItem(selected)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodItem);


const styles = StyleSheet.create({
  editIcon: {
    marginRight: 5,
    alignSelf: 'center',
  },
  itemWrapper: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    paddingTop: 20,
    marginTop: 20,
    borderRadius: 25,
  },
  topSideWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  titleItemWrapper: {
    flexDirection: 'column',
    marginLeft: 5,
  },
  itemNameTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: colors.textDark,
    width: '80%',
  },
  itemPriceTitle: {
    marginTop: 5,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: colors.textDark,
  },
  functionsWrapper: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  removeButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
})
