import { createAction, handleActions } from 'redux-actions';

const SET_SETTINGS = 'search/SET_SETTINGS';

const initialState = {
  scope: 'character', // 캐릭터 character || 모험단 adventure
  wordType: 'match', // 동일 단어 match || 전문 검색 full
  filter: 'true', // 100레벨 필터 true || false
};

export const setSettings = createAction(SET_SETTINGS, ({ type, option }) => ({
  type,
  option,
}));

export const search = handleActions(
  {
    [SET_SETTINGS]: (state, { payload: { type, option } }) => ({
      ...state,
      [type]: option,
    }),
  },
  initialState,
);
