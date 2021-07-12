import { connect } from "react-redux";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import * as React from "react";
import foodData from "../../../../../assets/data/foodData";
import store from "../../../../store/store";
import * as cartAction from "../../../../store/cart/cartAction";
import colors from "../../../../../assets/colors/colors";
import FoodItem from "./FoodItem";


const FoodItemFlatList = ({ navigation, selected, search, addToCart}) => {


  // returns the data based on which category is selected
  const getItemData = () => {
    if (selected === '')
      return filterBySearch(foodData);

    if(selected === 'Favorites')
      return store.getState().favorites.items;

    return filterBySearch(filterByCategory(selected));
  }

  const filterBySearch = (data) => {
    if (search.length === 0)
      return data;
    else
      return data.filter((item) => item.title.toLowerCase().search(search.toLowerCase()) > -1);
  }

  const filterByCategory = (selected) => {
    return foodData.filter((item) => item.category === selected);
  }

  return (
    <View>{
      getItemData().map((item, index) => (
        <TouchableOpacity key={index} onPress={() => navigation.navigate('Details', { item: item })}>
          <FoodItem item={item}/>
        </TouchableOpacity>
      ))}
    </View>
  )
}


const mapStateToProps = (state, ownProps) => ({
  selected: state.selectedCategory.selected,
  search: state.homeSearchText.text,
  navigation: ownProps.navigation
})

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addToCart: (item) => dispatch(cartAction.addToCart(item)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodItemFlatList);


