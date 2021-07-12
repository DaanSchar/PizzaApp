import { TouchableOpacity, View, StyleSheet } from "react-native";
import colors from "../../../../assets/colors/colors";
import Feather from "react-native-vector-icons/Feather";
import * as React from "react";
import { useEffect, useState } from "react";
import * as favActions from "../../../store/favorites/favAction";
import { connect } from "react-redux";


const FavButton = ({ favoriteItems, addToFav, removeFromFav, item}) => {

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(checkIfFavorite());
  }, [])

  const onClickFavButton = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite)
      addToFav(item);
    if (isFavorite)
      removeFromFav(item);
  }

  // checks if an item is already set as favorite
  const checkIfFavorite = () => {
    for (let i = 0; i < favoriteItems.length; i++)
      if (favoriteItems[i].title === item.title)
        return true;

    return false;
  }

  return (
    <TouchableOpacity onPress={() => onClickFavButton()}>
      <View style={[styles.favButton, isFavorite ? { backgroundColor: colors.primary } : { backgroundColor: null }]}>
        <Feather name='star' size={12} color={colors.white}/>
      </View>
    </TouchableOpacity>
  )
}


const mapStateToProps = (state, ownProps) => ({
  item: ownProps.item,
  favoriteItems: state.favorites.items,
})

const mapDispatchToProps = (dispatch) => {
  return {
    addToFav: (item) => dispatch(favActions.addToFav(item)),
    removeFromFav: (item) => dispatch(favActions.removeFromFav(item)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavButton);


const styles = StyleSheet.create({
  favButton: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
})
