import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import colors from "../../../assets/colors/colors";
import { connect, useDispatch } from "react-redux";
import CategoryFlatList from "./components/category/CategoryFlatList";
import ItemFlatList from "./components/itemlist/FoodItemFlatList";
import SearchBar from "./components/SearchBar";
import MenuHeader from "../menuheader/MenuHeader";



const Home = ({ navigation, selected, favorites}) => {

  return(
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentInsetAdjustmentBehavior={'automatic'}
      >

        {/* header */}
        <MenuHeader navigation={navigation}/>

        {/* Titles */}
        <View style={styles.titleWrapper}>
          <Text style={styles.titleSubTitle}>Food</Text>
          <Text style={styles.titlesTitle}t>Delivery</Text>
        </View>

        {/* Search Bar */}
        <View>
          <SearchBar/>
        </View>

        {/* Categories */}
        <View style={styles.categoriesWrapper}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <View style={styles.categoriesListWrapper}>
            <CategoryFlatList/>
          </View>
        </View>

        {/* Food Items */}
        <View style={styles.foodItemWrapper}>
          <Text style={styles.foodItemTitle}>{selected}</Text>
          {
            favorites.length === 0 && selected === 'Favorites' ?
            <Text style={styles.noFavItemsTitle}>No Favorites...</Text> : <ItemFlatList navigation={navigation}/>
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
