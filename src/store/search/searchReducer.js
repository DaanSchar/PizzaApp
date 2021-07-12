const initialState = {
  text: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TEXT':
      return setText(state, action.text);
  }
  return state;
};

const setText = (state, text) => {
  return {
    text: text,
  }
}
