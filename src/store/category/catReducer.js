const initialState = {
  selected: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT':
      return select(state, action.selected);
  }
  return state;
};

const select = (state, selected) => {

  return {
    selected: selected,
  }

}
