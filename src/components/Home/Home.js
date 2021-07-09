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
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";

import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import categoriesData from "../../../assets/data/categoriesData";
import PizzaData from "../../../assets/data/foodData";
import colors from "../../../assets/colors/colors";
import SeafoodData from "../../../assets/data/SeafoodData";
import DrinksData from "../../../assets/data/DrinksData";
import CategoryItem from "./CategoryItem";
import MenuButton from "../MenuButton";
import { useDispatch } from "react-redux";
import * as cartActions from '../../store/cart/cartAction'
import store from "../../store/store";
import foodData from "../../../assets/data/foodData";



const Home = ({ navigation }) => {

  const [selected, setSelected] = useState('');
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();


  const favorites = store.getState().favorites.items;


  const addToCart = (item) => {
    dispatch(cartActions.addToCart(item));
  }

  const onClickAdd = (item) => {

    item = {
      ...item,
      size: Object.keys(item.sizeOptions)[0],
      price: Object.values(item.sizeOptions)[0]
    }

    addToCart(item)
  }

  // returns the data based on which category is selected
  const getItemData = () => {
    if (selected === '')
      return filterBySearch(foodData);

    if(selected === 'Favorites')
      return store.getState().favorites.items;

    return filterBySearch(filterByCategory(selected));
  }

  const filterByCategory = (selected) => {
    return foodData.filter((item) => item.category === selected);

  }

  const filterBySearch = (data) => {
    if (search.length === 0)
      return data;
    else
      return data.filter((item) => item.title.toLowerCase().search(search.toLowerCase()) > -1);
  }

  const getTitle = () => {
    return selected;
  }

  const getItemPrice = (item) => {
    return Object.values(item.sizeOptions)[0]
  }

  // sets the selected category item
  const selectCategoryItem = ({ item }) => {
    if (selected === item.title)
      setSelected('');
    else
      setSelected(item.title);
  }

  const renderItemSizeOptions = (item) => {

    return (
          Object.keys(item.sizeOptions).map((size) =>
          <Text key={size} style={styles.sizeText}>{size}</Text>)
        )
  }


  // returns a view component for the category item
  const renderCategoryItem = (item) => {
    return(
      <TouchableOpacity onPress={() => selectCategoryItem(item)}>
        <CategoryItem item={item} selected={selected}></CategoryItem>
      </TouchableOpacity>
    )
  };


  const openCart = () => {
    navigation.navigate('Shopping Cart');
  }


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
          <TouchableOpacity onPress={() => openCart()}>
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
      <View style={styles.searchWrapper}>
        <Feather name="search" size={16} color={colors.textDark}/>
        <View style={styles.search}>
          <TextInput style={styles.searchText} placeholder={"Search"} onChangeText={text => setSearch(text)}></TextInput>
        </View>
      </View>

    {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <View style={styles.categoriesListWrapper}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentInsetAdjustmentBehavior={'scrollableAxes'}
            data={categoriesData}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            horizontal={true}
          />

        </View>
      </View>

    {/*  Food Items */}
      <View style={styles.foodItemWrapper}>
        <Text style={styles.foodItemTitle}>{getTitle()}</Text>

        {/* shows text if favorites tab is empty */}
        {
          favorites.length === 0 && selected === 'Favorites' ? <Text style={styles.noFavItemsTitle}>No Favorites...</Text> : null
        }


        {getItemData().map((item) => (
          <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Details', { item: item })}>
          <View style={[styles.foodItemCardWrapper, {
            marginTop: item.id == '1' ? 10 : 20
          }]}>
            <View style={styles.itemWrapper}>
              <View style={styles.topSideWrapper}>

                <View style={styles.titleItemWrapper}>
                  <Text style={styles.itemNameTitle}>{item.title}</Text>
                  <Text style={styles.itemPriceTitle}>{getItemPrice(item)}$</Text>

                    <View style={styles.sizeWrapper}>
                      { renderItemSizeOptions(item) }
                    </View>


                </View>

                {/*  function bar */}
              </View>
              <View style={styles.functionsWrapper}>
                <View style={styles.rating}>
                  <Text style={styles.ratingText}>{ item.rating }</Text>
                  <Feather name='star'/>
                </View>

                <TouchableOpacity style={styles.addButton} onPress={() => onClickAdd(item)}>
                  <Feather name='plus'/>
                </TouchableOpacity>
              </View>

            </View>
          </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
    </View>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  foodItemCardWrapper: {
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingTop: 20,
  },
  functionsWrapper: {
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginLeft: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomWrapper: {
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
  sizeWrapper: {
     marginTop: 10,
  },
  titleWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  ratingText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: colors.textDark,
    marginRight: 5,
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
  searchWrapper:  {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  search: {
    flex: 1,
    marginLeft: 10,
    borderBottomColor: colors.textLight,
    borderBottomWidth: 2,
  },
  searchText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginBottom: 0,
    color: colors.textDark,
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
  rating: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: colors.textDark,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 15,
  },
  noFavItemsTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: colors.textLight,
    alignSelf: 'center',
    marginTop: 100,
  },
  sizeText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    color: colors.textLight,
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
});


export default Home;
