import { createAction, handleActions } from 'redux-actions';

const SET_POST = 'post/SET_POST';

const initialState = {
  title: '',
  markdown: '',
};

export const setPost = createAction(SET_POST, ({ title, markdown }) => ({
  title,
  markdown,
}));

export const post = handleActions(
  {
    [SET_POST]: (state, { payload: { title, markdown } }) => ({
      ...state,
      title: title,
      markdown: markdown,
    }),
  },
  initialState,
);
