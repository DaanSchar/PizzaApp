import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import colors from "../../../assets/colors/colors";
import Feather from 'react-native-vector-icons/Feather'
import store from "../../store/store";
import BackButton from "../BackButton";
import * as cartActions from '../../store/cart/cartAction'
import { useDispatch } from "react-redux";
import CartItem from "../../store/cart/CartItem";
import connect from "react-redux/lib/connect/connect";

const ShoppingCart = ({ navigation, addToCart, removeFromCart , items, totalPrice}) => {


  const onClickAddButton = (item) => {
    addToCart(item);
  }

  const onClickRemoveButton = (item, index) => {
    removeFromCart(item, index);
  }

  const isEmpty = () => {
    if (items === undefined)
      return true;
    return Object.keys(items).length === 0
  }


  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.headerWrapper}>
          <BackButton navigation={navigation}/>
        </View>

        <View style={styles.titleWrapper}>
          <Text style={styles.titleHead}>Shopping Cart</Text>
          <TouchableOpacity onPress={() => { console.log(store.getState().cart); }}>
            <Text style={styles.titleSub}>Orders</Text>
          </TouchableOpacity>
        </View>


        {/* shows text if cart is empty */}
        {
          isEmpty() ? <Text style={styles.emptyCartTitle}>Cart is empty..</Text> : null
        }

        {/* item list */}
        <View style={styles.itemListWrapper}>
          {
            isEmpty() ? null : Object.entries(items).map(([index, item]) =>
            (
              <View key={index} style={styles.itemWrapper}>
              <View style={styles.topSideWrapper}>

                <View style={styles.titleItemWrapper}>
                  <Text style={styles.itemNameTitle}>{item.title} {item.size}</Text>
                  <Text style={styles.itemPriceTitle}>{item.price}$</Text>

                </View>

              {/*  function bar */}
              </View>
                <View style={styles.functionsWrapper}>

                  <TouchableOpacity style={styles.removeButton} onPress={() => onClickRemoveButton(item, index)}>
                    <Feather name='minus'/>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.quantityContainer}>
                    <Text style={styles.itemQuantityTitle}>Add notes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.addButton} onPress={() => onClickAddButton(item)}>
                    <Feather name='plus'/>
                  </TouchableOpacity>
                </View>

              </View>
            ))}
        </View>

        {/* pre-checkout bottom part*/}
        { isEmpty() ? null :
          <View style={styles.bottomWrapper}>
            <Text style={styles.totalPriceTitle}>Total:  {totalPrice} $</Text>
              <TouchableOpacity style={styles.payButton}>
                <Text style={styles.payTitle}>Pay</Text>
                <Feather name='chevron-right' size={24} color={colors.white}/>
              </TouchableOpacity>
          </View>
        }

      </View>
    </ScrollView>
  )

}

const mapStateToProps = ({ cart }) => ({
  items: cart.items,
  totalPrice: cart.totalPrice,
})


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addToCart: (item) => dispatch(cartActions.addToCart(item)),
    removeFromCart: (item, index) => dispatch(cartActions.removeFromCart(item, index)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemWrapper: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    paddingTop: 20,
    marginBottom: 20,
    borderRadius: 25,
  },
  titleWrapper: {
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  titleHead: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: colors.textDark,
  },
  titleSub: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: colors.textDark,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'center',
    paddingBottom: 10,
  },
  itemListWrapper: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  topSideWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  titleItemWrapper: {
    flexDirection: 'column',
    marginLeft: 5,
  },
  itemNameTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: colors.textDark,
  },
  itemPriceTitle: {
    marginTop: 5,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: colors.textDark,
  },
  itemQuantityTitle: {
    marginTop: 3,
    fontFamily: 'Montserrat-Medium',
    fontSize: 17,
    color: colors.textDark,
  },
  quantityContainer: {
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 13,
    backgroundColor: colors.white,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: colors.primary,
  },
  itemImage: {
    width: 210,
    height: 125,
    resizeMode: 'contain',
  },
  backButton: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.textLight,
  },
  emptyCartTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: colors.textLight,
    alignSelf: 'center',
    marginTop: 200,
  },
  functionsWrapper: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  removeButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  bottomWrapper: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  totalPriceTitle: {
    marginTop: 40,fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: colors.textDark,
  },
    payButton: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 50,
      backgroundColor: colors.primary,
      marginBottom: 20,
      paddingHorizontal: 100,
      flexDirection: 'row',
    },
    payTitle: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 25,
      color: colors.white,
    },

})
