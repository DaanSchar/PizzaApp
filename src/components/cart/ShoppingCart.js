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
  Modal, TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import colors from "../../../assets/colors/colors";
import Feather from 'react-native-vector-icons/Feather'
import store from "../../store/store";
import BackButton from "../BackButton";
import * as cartActions from '../../store/cart/cartAction'
import { useDispatch } from "react-redux";
import connect from "react-redux/lib/connect/connect";

const ShoppingCart = ({ navigation, addToCart, removeFromCart , items, totalPrice, updateItemSize, addNote}) => {

  const [clicked, setClicked] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [notes, setNotes] =  useState('');

  const onClickAddButton = (item) => {
    addToCart(item);
  }

  const onClickRemoveButton = (item, index) => {
    removeFromCart(item, index);
  }

  const onClickEditButton = (index) => {
    setClicked(!clicked);
    setSelectedItemIndex(index);
  }

  const isEmpty = () => {
    if (items === undefined)
      return true;
    return Object.keys(items).length === 0
  }

  const onClickSizeOptions = (size) => {
    updateItemSize(selectedItemIndex, size);
  }

  const editNotes = (text) => {
    addNote(selectedItemIndex, text);
  }

  const renderSizeOptions = () => {

    let item = items[selectedItemIndex];

    if (item === undefined)
      return (null);

    return (
      Object.keys(item.sizeOptions).map((size) =>
        <TouchableOpacity key={size} style={[styles.sizeOptionButton, item.size === size ? { backgroundColor: colors.primary } : { }]} onPress={() => onClickSizeOptions(size)}>
          <Text style={styles.sizeText}>{size}</Text>
        </TouchableOpacity>)
    )
  }

  return (
      <View style={styles.container}>

        {/* edit window */}
        <Modal transparent={true} visible={clicked}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalItem}>

              <View style={styles.modalItemTopWrapper}>
                <View style={styles.modalTitleWrapper}>
                  <Feather style={styles.editIcon} name='edit' size={24} color={colors.textDark}/>
                  <Text style={styles.editOrderTitle}>Edit Order</Text>
                </View>
                <TouchableOpacity onPress={() => setClicked(!clicked)}>
                  <Feather style={styles.closeIcon} name='x' size={24} color={colors.textDark}/>
                </TouchableOpacity>
              </View>

              <View style={styles.selectSizeWrapper}>
                {renderSizeOptions()}
              </View>

              <View style={styles.noteWrapper}>
                <TextInput styles={styles.noteTextField} placeholder={"Notes"} onChangeText={text => editNotes(text) }>{items[selectedItemIndex] ? ('notes' in items[selectedItemIndex] ? items[selectedItemIndex].notes : null) : null}</TextInput>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.headerWrapper}>
          <BackButton navigation={navigation}/>
        </View>

        <View style={styles.titleWrapper}>
          <Text style={styles.titleHead}>Shopping Cart</Text>
          <TouchableOpacity onPress={() => { console.log(JSON.stringify(store.getState().cart, null, 2)); }}>
            <Text style={styles.titleSub}>Orders</Text>
          </TouchableOpacity>
        </View>


        {/* shows text if cart is empty */}
        {
          isEmpty() ? <Text style={styles.emptyCartTitle}>Cart is empty..</Text> : null
        }

        {/* item list */}
        <View style={styles.itemListWrapper}>

          <FlatList style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentInsetAdjustmentBehavior={'automatic'}
                    data={Object.entries(items).slice(0).reverse()}
                    keyExtractor={(item, index) => index}
                    renderItem={({ index }) => {

            let item=items[index];

            return (
              <View style={styles.itemWrapper}>

                <View style={styles.topSideWrapper}>

                  <View style={styles.titleItemWrapper}>
                    <Text style={styles.itemNameTitle}>{item.title} {item.size}</Text>
                    <Text style={styles.itemPriceTitle}>{item.price}$</Text>
                  </View>

                  <TouchableOpacity onPress={() => onClickEditButton(index)}>
                    <Feather style={styles.editIcon} name='edit' size={24} color={colors.textDark}/>
                  </TouchableOpacity>

                </View>

                {/*  function bar */}
                <View style={styles.functionsWrapper}>

                  <TouchableOpacity style={styles.removeButton} onPress={() => onClickRemoveButton(item, index)}>
                    <Feather name='trash-2' size={20}/>
                  </TouchableOpacity>


                  <TouchableOpacity style={styles.addButton} onPress={() => onClickAddButton(item)}>
                    <Feather name='plus' size={20}/>
                  </TouchableOpacity>
                </View>

              </View>
            )}}/>
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
      </View>
  )

}

let mapStateToProps = ({ cart }) => ({
  items: cart.items,
  totalPrice: cart.totalPrice,
})


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addToCart: (item) => dispatch(cartActions.addToCart(item)),
    removeFromCart: (item, index) => dispatch(cartActions.removeFromCart(item, index)),
    updateItemSize: (index, size) => dispatch(cartActions.updateItemSize(index, size)),
    addNote: (index, text) => dispatch(cartActions.addNote(index, text)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);


const styles = StyleSheet.create({
  flatList: {
  },
  modalItemTopWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeIcon: {
    marginLeft: 5,
    alignSelf: 'center',
  },
  sizeOptionButton: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
  },
  selectSizeWrapper: {
    marginTop: 30,
    marginHorizontal: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50,
  },
  editOrderTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: colors.textDark,
    marginRight: 16,
  },
  noteTextField: {
    marginBottom: 20,
    marginLeft: 30,
  },
  noteWrapper:{
    marginTop: 20,
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  modalItem: {
    marginHorizontal: 20,
    marginTop: 90,
    backgroundColor: colors.background,
    borderRadius: 20,
    flexDirection: 'column',
    paddingBottom: 30,
  },
  modalWrapper: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  container: {
    flex: 1,
  },
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
  titleWrapper: {
    marginTop: 10,
    marginBottom: 15,
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
  },
  itemListWrapper: {
    paddingHorizontal: 20,
    marginBottom: 280,
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
  bottomWrapper: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  totalPriceTitle: {
    marginTop: 20,
    fontFamily: 'Montserrat-SemiBold',
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
