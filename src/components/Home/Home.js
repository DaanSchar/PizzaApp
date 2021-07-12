import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";

import Feather from 'react-native-vector-icons/Feather'

import colors from "../../../assets/colors/colors";
import MenuButton from "../MenuButton";
import { connect, useDispatch } from "react-redux";
import * as cartActions from '../../store/cart/cartAction'
import store from "../../store/store";
import foodData from "../../../assets/data/foodData";
import CategoryFlatList from "./components/category/CategoryFlatList";
import ItemFlatList from "./components/ItemFlatList";
import SearchBar from "./components/SearchBar";



const Home = ({ navigation, selected, favorites}) => {

  return(
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentInsetAdjustmentBehavior={'automatic'}
      >

      {/* header */}
      <SafeAreaView>
        <View style={styles.headerWrapper}>

          <MenuButton navigation={navigation}/>
          <TouchableOpacity onPress={() =>  navigation.navigate('Shopping Cart')}>
            <Feather name='shopping-cart' size={24} color={colors.textDark}></Feather>
          </TouchableOpacity>

        </View>
      </SafeAreaView>

      {/* Titles */}
      <View style={styles.titleWrapper}>

        <Text style={styles.titleSubTitle}>Food</Text>
        <Text style={styles.titlesTitle}t>Delivery</Text>
      </View>

      {/* Search */}
      <SearchBar/>

      {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <View style={styles.categoriesListWrapper}>
          <CategoryFlatList/>
        </View>
      </View>

      {/*  Food Items */}
      <View style={styles.foodItemWrapper}>
        <Text style={styles.foodItemTitle}>{selected}</Text>
        {
          favorites.length === 0 && selected === 'Favorites' ? <Text style={styles.noFavItemsTitle}>No Favorites...</Text> : <ItemFlatList navigation={navigation}/>
        }
      </View>
    </ScrollView>
    </View>
  )

};

const mapStateToProps = ({ selectedCategory, favorites}) => ({
  selected: selectedCategory.selected,
  favorites: favorites.items,
})

export default connect(mapStateToProps)(Home);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerWrapper: {
    backgroundColor: colors.textLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'center',
    paddingBottom: 10,
  },
  titleWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  titleSubTitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: colors.textDark,
  },
  titlesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: colors.textDark,
    marginTop: 5,
  },
  categoriesWrapper: {
    marginTop: 30,
  },
  categoriesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    paddingHorizontal: 20,
  },
  categoriesListWrapper: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  foodItemWrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  foodItemTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  noFavItemsTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: colors.textLight,
    alignSelf: 'center',
    marginTop: 100,
  },
});
