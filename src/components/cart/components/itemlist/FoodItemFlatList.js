import { FlatList, StyleSheet, View } from "react-native";
import * as React from "react";
import { connect } from "react-redux";
import FoodItem from "./FoodItem";
import EditViewModal from "../EditViewModal";

const FoodItemFlatList = ({ items }) => {

  return (
    <FlatList style={styles.flatList}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentInsetAdjustmentBehavior={'automatic'}
      data={Object.entries(items)}
      keyExtractor={(item, index) => index}
      renderItem={({ item, index }) => {
        return(
          <View>
            <FoodItem item={item[1]} index={index}/>
          </View>
      )}}
    />
  )
}


const mapStateToProps = (state) => ({
  items: state.cart.items,
})

export default connect(mapStateToProps)(FoodItemFlatList);


const styles = StyleSheet.create({
  flatList: {
  },
})
