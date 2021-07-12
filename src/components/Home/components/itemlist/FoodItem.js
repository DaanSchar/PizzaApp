import { Text, TouchableOpacity, View , StyleSheet} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import * as React from "react";
import * as cartAction from "../../../../store/cart/cartAction";
import { connect } from "react-redux";
import colors from "../../../../../assets/colors/colors";


const FoodItem = ({addToCart, item}) => {

  const getItemPrice = (item) => {
    return Object.values(item.sizeOptions)[0]
  }

  const onClickAddButton = (item) => {
    item = {
      ...item,
      size: Object.keys(item.sizeOptions)[0],
      price: Object.values(item.sizeOptions)[0]
    }
    addToCart(item)
  }

  const renderItemSizeOptions = () => {
    return (
      Object.keys(item.sizeOptions).map((size) =>
        <Text key={size} style={styles.sizeText}>{size}</Text>)
    )
  }

  return (
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

          <TouchableOpacity style={styles.addButton} onPress={() => onClickAddButton(item)}>
            <Feather name='plus' size={20} />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addToCart: (item) => dispatch(cartAction.addToCart(item)),
  }
}

const mapStateToProps = (state, ownProps) => ({
  item: ownProps.item,
  navigation: ownProps.navigation
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodItem);


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

