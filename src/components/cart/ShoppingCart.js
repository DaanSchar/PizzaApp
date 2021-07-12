import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "../../../assets/colors/colors";
import Feather from 'react-native-vector-icons/Feather'
import BackButton from "../menuheader/BackButton";
import connect from "react-redux/lib/connect/connect";
import FoodItemFlatList from "./components/itemlist/FoodItemFlatList";
import EditViewModal from "./components/EditViewModal";

const ShoppingCart = ({ navigation, items, totalPrice, selectedItem}) => {

  const isEmpty = () => {
    if (items === undefined)
      return true;
    return Object.keys(items).length === 0
  }

  return (
      <View style={styles.container}>

        {/* top side*/}
        <View style={styles.topWrapper}>
          <BackButton navigation={navigation}/>
        </View>

        {/* titles */}
        <View style={styles.titleWrapper}>
          <Text style={styles.titleHead}>Shopping Cart</Text>
          <TouchableOpacity onPress={() => { console.log(JSON.stringify(items, null, 2)); }}>
            <Text style={styles.titleSub}>Orders</Text>
          </TouchableOpacity>
        </View>

        {/* shows text if cart is empty */}
        {isEmpty() ? <Text style={styles.emptyCartTitle}>Cart is empty..</Text> : null}

        {/* item list */}
        <View style={styles.itemListWrapper}>
          <FoodItemFlatList/>
        </View>


        {/* pre-checkout bottom part*/}
        {
          isEmpty() ? null :
          <View style={styles.bottomWrapper}>
            <Text style={styles.totalPriceTitle}>Total:  {totalPrice} $</Text>
              <TouchableOpacity style={styles.payButton}>
                <Text style={styles.payTitle}>Pay</Text>
                <Feather name='chevron-right' size={24} color={colors.white}/>
              </TouchableOpacity>
          </View>
        }

        {/* edit modal */}
        <EditViewModal foodItemIndex={selectedItem}/>
      </View>
  )
}


let mapStateToProps = ({ cart }) => ({
  items: cart.items,
  totalPrice: cart.totalPrice,
  selectedItem: cart.selectedItem
})

export default connect(mapStateToProps)(ShoppingCart);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topWrapper: {
    marginTop: 5,
    marginLeft: 5,
  },
  titleWrapper: {
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  titleHead: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: colors.textDark,
  },
  titleSub: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: colors.textDark,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  itemListWrapper: {
    paddingHorizontal: 20,
    flex: 1.0,
  },
  backButton: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.textLight,
  },
  emptyCartTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: colors.textLight,
    alignSelf: 'center',
    marginTop: 200,
  },
  bottomWrapper: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  totalPriceTitle: {
    marginTop: 20,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: colors.textDark,
  },
    payButton: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 50,
      backgroundColor: colors.primary,
      marginBottom: 20,
      paddingHorizontal: 100,
      flexDirection: 'row',
    },
    payTitle: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 25,
      color: colors.white,
    },

})
