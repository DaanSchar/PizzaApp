import { connect } from "react-redux";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import * as React from "react";
import foodData from "../../../../assets/data/foodData";
import store from "../../../store/store";
import * as cartAction from "../../../store/cart/cartAction";
import colors from "../../../../assets/colors/colors";


const ItemFlatList = ({ navigation, selected, search, addToCart}) => {


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

  const renderItemSizeOptions = (item) => {
    return (
      Object.keys(item.sizeOptions).map((size) =>
        <Text key={size} style={styles.sizeText}>{size}</Text>)
    )
  }

  const getItemPrice = (item) => {
    return Object.values(item.sizeOptions)[0]
  }

  const onClickAdd = (item) => {
    item = {
      ...item,
      size: Object.keys(item.sizeOptions)[0],
      price: Object.values(item.sizeOptions)[0]
    }
    addToCart(item)
  }


  return (
    <View>{
      getItemData().map((item) => (
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
                    {renderItemSizeOptions(item)}
                  </View>


                </View>

                {/*  function bar */}
              </View>
              <View style={styles.functionsWrapper}>
                <View style={styles.rating}>
                  <Text style={styles.ratingText}>{item.rating}</Text>
                  <Feather name='star' />
                </View>

                <TouchableOpacity style={styles.addButton} onPress={() => onClickAdd(item)}>
                  <Feather name='plus' size={20} />
                </TouchableOpacity>
              </View>

            </View>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemFlatList);


const styles = StyleSheet.create({
  foodItemCardWrapper: {
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingTop: 20,
  },
  functionsWrapper: {
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginLeft: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeWrapper: {
    marginTop: 10,
  },
  ratingText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: colors.textDark,
    marginRight: 5,
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
})
