import { createAction, handleActions } from 'redux-actions';

const LOAD_USER = 'search/LOAD_USER';

export const loadUser = createAction(LOAD_USER, (userId) => userId);

const initialState = {
  searchLoading: false,
};

export function* setUserSaga(action) {
  yield;
}

const test = 'test';
export const tester = createAction(test);

export const user = handleActions(
  {
    [LOAD_USER]: (state, action) => state,
    [test]: (state, action) => {
      console.log('ang');
    },
  },
  initialState,
);
