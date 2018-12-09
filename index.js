// import
import { createStore } from 'redux';

const lightDiv = document.getElementsByClassName('light')[0];
const switchButton = document.getElementById('switch-btn');

const counterHeadings = document.getElementsByTagName('h1')[0];
const plusButton = document.getElementById('plus-btn');
const minusButton = document.getElementById('minus-btn');

// action type
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// action creator
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increment = diff => ({ type: INCREMENT, diff });
const decrement = () => ({ type: DECREMENT });

// initial state
const initialState = {
  light: false,
  counter: 0
};

// reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        light: !state.light
      };
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + action.diff
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
}

// store
const store = createStore(reducer);

// render
const render = () => {
  const state = store.getState();
  const { light, counter } = state;
  if (light) {
    lightDiv.style.background = 'green';
    switchButton.innerText = 'off';
  } else {
    lightDiv.style.background = 'gray';
    switchButton.innerText = 'on';
  }
  counterHeadings.innerText = counter;
};
render();

// subscribe
store.subscribe(render);

// dispatch
switchButton.onclick = () => {
  store.dispatch(toggleSwitch());
};

plusButton.onclick = () => {
  store.dispatch(increment(5));
};

minusButton.onclick = () => {
  store.dispatch(decrement());
};
