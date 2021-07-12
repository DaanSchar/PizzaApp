import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import colors from "../../../../assets/colors/colors";
import { connect } from "react-redux";
import * as cartActions from '../../../store/cart/cartAction'
import * as favActions from '../../../store/favorites/favAction'
import BackButton from "../../menuheader/BackButton";
import store from "../../../store/store";
import { useEffect, useState } from "react";

const Details = ({route, navigation, addToCart, addToFav, removeFromFav}) => {

  /**
   *  TODO: Fix unFavorite functionality
   *  TODO: Clean this up
   */

  let { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [selected, setSelected] = useState(Object.keys(item.sizeOptions)[0]);


  useEffect(() => {
    setIsFavorite(checkIfFavorite());
    onClickSizeOptions(Object.keys(item.sizeOptions)[0])
  }, [])


  const onClickOrderButton = () =>{
    onClickSizeOptions(selected);
    addToCart(item);
  }

  // toggles the item's favorite status [true/false]
  const onClickFavButton = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite)
      addToFav(item);
    if (isFavorite)
      removeFromFav(item);
  }

  // checks if an item is already set as favorite
  const checkIfFavorite = () => {
    let favorites = store.getState().favorites.items;

    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].title === item.title) {
        return true;
      }
    }
    return false;
  }

  const onClickSizeOptions = (sizeOption) =>
  {
    setSelected(sizeOption)
    item = {
      ...item,
      size: sizeOption,
      price: item.sizeOptions[sizeOption],
    }
  }

  const renderSizeOptions = () => {
    return (
        Object.keys(item.sizeOptions).map((size) =>
        <TouchableOpacity key={size} style={[styles.sizeOptionButton, selected === size ? { backgroundColor: colors.primary } : { }]} onPress={() => onClickSizeOptions(size)}>
          <Text style={styles.sizeText}>{size}</Text>
        </TouchableOpacity>)
    )
  }

  const getItemPrice = (item, size) => {
    return item.sizeOptions[size];
  }


  return(
    <ScrollView>
      <View style={styles.container}>
        {/*  header */}
        <SafeAreaView>
          <View style={styles.headerWrapper}>

            <BackButton navigation={navigation}/>

            <TouchableOpacity onPress={() => onClickFavButton()}>
              <View style={[styles.favButton, isFavorite ? { backgroundColor: colors.primary } : { backgroundColor: null }]}>
                <Feather name='star' size={12} color={colors.white}/>
              </View>
            </TouchableOpacity>

          </View>
        </SafeAreaView>

        {/*  Titles */}
        <View style={styles.titlesWrapper}>
          <Text style={styles.title}>{item.title}</Text>
        </View>

        {/*  Price*/}
        <View style={styles.priceWrapper}>
          <Text style={styles.priceText}>${getItemPrice(item, selected)}</Text>
        </View>

        {/*  Food info */}
        <View style={styles.infoWrapper}>
          <View style={styles.infoLeftWrapper}>

            <View style={styles.infoItemWrapper}>

              <Text style={styles.infoItemTitle}>Size</Text>
              <View style={styles.sizeOptionWrapper}>
                {
                  renderSizeOptions()
                }
              </View>

            </View>

          </View>
        </View>


        {/*  OrderButton */}
        <TouchableOpacity onPress={() => onClickOrderButton()}>
          <View style={styles.orderWrapper}>
            <Text style={styles.orderText}>Place an Order</Text>
            <Feather name="chevron-right" size={18} color={colors.black}/>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

let mapStateToProps = ({cart, favorites}) => ({
    items: cart.items,
    favorites: favorites.items,
  }
)

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addToCart: (item) => dispatch(cartActions.addToCart(item)),
    addToFav: (item) => dispatch(favActions.addToFav(item)),
    removeFromFav: (item) => dispatch(favActions.removeFromFav(item)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  favButton: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  titlesWrapper: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: colors.textDark,
    width: '60%',
  },
  sizeOptionWrapper: {
    marginTop: 5,
    flexDirection: 'row',
  },
  sizeOptionButton: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
  },
  priceWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  priceText: {
    color: colors.price,
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
  },
  infoWrapper: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLeftWrapper: {
    paddingLeft: 20,
  },
  infoItemWrapper: {
    marginBottom: 20,
  },
  infoItemTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: colors.textLight,
  },
  infoItemText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: colors.textDark,
  },
  itemImage: {
    resizeMode: "contain",
    marginLeft: 40,
  },
  ingredientsWrapper: {
    marginTop: 40,
  },
  ingredientsTitle: {
    paddingHorizontal: 20,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: colors.textDark,
  },
  ingredientsListWrapper: {
    paddingVertical: 20,
  },
  ingredientsImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 15,
    backgroundColor: colors.white,
    marginLeft: 7.5,
    marginRight: 7.5,
  },
    ingredientsImage: {
      resizeMode: 'contain',
  },
  orderWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: colors.primary,
    marginBottom: 20,
  },
  orderText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    marginRight: 6,
  },
})
