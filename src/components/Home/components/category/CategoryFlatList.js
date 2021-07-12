import { FlatList, TouchableOpacity } from "react-native";
import categoriesData from "../../../../../assets/data/categoriesData";
import * as React from "react";
import CategoryItem from "./CategoryItem";
import { useState } from "react";
import { connect } from "react-redux";
import * as categoryAction from '../../../../store/category/catAction'

const CategoryFlatList = ({ select, selected }) => {

  // sets the selected category item
  const selectCategoryItem = ({ item }) => {
    if (selected === item.title)
      select('')
    else
      select(item.title);
  }

  // returns the view components for the category item
  const renderCategoryItem = (item) => {
    return(
      <TouchableOpacity onPress={() => selectCategoryItem(item)}>
        <CategoryItem item={item} selected={selected}></CategoryItem>
      </TouchableOpacity>
    )
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentInsetAdjustmentBehavior={'scrollableAxes'}
      data={categoriesData}
      renderItem={renderCategoryItem}
      keyExtractor={item => item.id}
      horizontal={true}
    />
  )
}

const mapStateToProps = ({selectedCategory}) => ({
  selected: selectedCategory.selected,
})

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    select: (selected) => dispatch(categoryAction.select(selected))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFlatList);
