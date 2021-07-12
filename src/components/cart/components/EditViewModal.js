import { Modal, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import colors from "../../../../assets/colors/colors";
import * as React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import * as cartActions from "../../../store/cart/cartAction";
import * as cartAction from "../../../store/cart/cartAction";


const EditViewModal = ({ addNote, updateItemSize, items, foodItemIndex, visible, toggleModalVisible}) => {

  const onClickSizeOptions = (size) => {
    updateItemSize(foodItemIndex, size);
  }

  const onClickCloseButton = () => {
    toggleModalVisible();
  }

  const editNotes = (text) => {
    addNote(foodItemIndex, text);
  }

  const renderSizeOptions = () => {

    let item = items[foodItemIndex];

    if (item === undefined)
      return (null);

    return (
      Object.keys(item.sizeOptions).map((size) =>
        <TouchableOpacity key={size} style={[styles.sizeOptionButton, item.size === size ? { backgroundColor: colors.primary } : { }]} onPress={() => onClickSizeOptions(size)}>
          <Text style={styles.sizeText}>{size}</Text>
        </TouchableOpacity>)
    )
  }

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.modalWrapper}>
        <View style={styles.modalItem}>

          {/* Top part */}
          <View style={styles.modalItemTopWrapper}>

            {/* Title */}
            <View style={styles.modalTitleWrapper}>
              <Feather style={styles.editIcon} name='edit' size={24} color={colors.textDark}/>
              <Text style={styles.editOrderTitle}>Edit Order</Text>
            </View>

            {/* Exit button */}
            <TouchableOpacity onPress={() => onClickCloseButton()}>
              <Feather style={styles.closeIcon} name='x' size={24} color={colors.textDark}/>
            </TouchableOpacity>

          </View>

          {/* size selection*/}
          <View style={styles.selectSizeWrapper}>
            {renderSizeOptions()}
          </View>

          {/* notes */}
          <View style={styles.noteWrapper}>
            <TextInput styles={styles.noteTextField} placeholder={"Notes"} onChangeText={text => editNotes(text) }>{items[foodItemIndex] ? ('notes' in items[foodItemIndex] ? items[foodItemIndex].notes : null) : null}</TextInput>
          </View>

        </View>
      </View>
    </Modal>
  )

}


const mapStateToProps = (state, ownProps) => ({
  foodItemIndex: ownProps.foodItemIndex,
  items: state.cart.items,
  visible: state.cart.modalIsVisible,
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateItemSize: (index, size) => dispatch(cartActions.updateItemSize(index, size)),
    addNote: (index, text) => dispatch(cartActions.addNote(index, text)),
    toggleModalVisible: () => dispatch(cartAction.toggleModalVisible()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditViewModal);


const styles = StyleSheet.create({
  modalItemTopWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeIcon: {
    marginLeft: 5,
    alignSelf: 'center',
  },
  sizeOptionButton: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
  },
  selectSizeWrapper: {
    marginTop: 30,
    marginHorizontal: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50,
  },
  editOrderTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: colors.textDark,
    marginRight: 16,
  },
  noteTextField: {
    marginBottom: 20,
    marginLeft: 30,
  },
  noteWrapper:{
    marginTop: 20,
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  modalItem: {
    marginHorizontal: 20,
    marginTop: 90,
    backgroundColor: colors.background,
    borderRadius: 20,
    flexDirection: 'column',
    paddingBottom: 30,
  },
  modalWrapper: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  editIcon: {
    marginRight: 5,
    alignSelf: 'center',
  },
})
