import { connect } from "react-redux";
import * as searchAction from "../../../store/search/searchAction";
import { TextInput, View, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import colors from "../../../../assets/colors/colors";
import * as React from "react";

/**
 * TODO: Fix search bar styling.
 */

const SearchBar = ({ setText }) => {
  return (
    <View style={styles.searchWrapper}>
      <Feather name="search" size={16} color={colors.textDark}/>
      <View style={styles.search}>
        <TextInput style={styles.searchText} placeholder={"Search"} onChangeText={text => setText(text)}></TextInput>
      </View>
    </View>
  )
}

const mapStateToProps = ({homeSearchText}) => ({
  search: homeSearchText.text,
})

const mapDispatchToProps = (dispatch) => {
  return {
    setText: (text) => dispatch(searchAction.setText(text)),
  }
}

const styles = StyleSheet.create({
  searchWrapper:  {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  searchText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginBottom: 0,
    color: colors.textDark,
  },
  search: {
    marginLeft: 10,
    borderBottomColor: colors.textLight,
    borderBottomWidth: 2,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
