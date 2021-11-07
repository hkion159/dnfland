import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import { search } from '../search';
import { post } from '../post';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default:
      const combineReducer = combineReducers({ search, post }); // 이 안에 리듀서 넣기
      return combineReducer(state, action);
  }
};

export default rootReducer;
