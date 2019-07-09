// Imports

import produce from "immer";

// Actions

const GET_LOGIN_TOKEN = "GET_LOGIN_TOKEN";
const SAVE_REVIEW = "SAVE_REVIEW";
const SAVE_STORE_INFO = "SAVE_STORE_INFO";

// Action Creators

function getLoginToken(LoginToken) {
  return {
    type: GET_LOGIN_TOKEN,
    LoginToken: LoginToken
  };
}

function saveReview(review) {
  return {
    type: SAVE_REVIEW,
    review: review
  };
}

function saveStoreInfo(storeInfo) {
  return {
    type: SAVE_STORE_INFO,
    storeInfo: storeInfo
  };
}

// Reducer

const initialState = {
  LoginToken: {},
  review: {},
  storeInfo: {}
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOGIN_TOKEN:
      return applyLogin(state, action);
    case SAVE_REVIEW:
      return applySaveReview(state, action);
    case SAVE_STORE_INFO:
      return applySaveStoreInfo(state, action);
    default:
      return state;
  }
}

// Reducer Functions

function applyLogin(state, action) {
  return produce(state, draft => {
    draft.LoginToken = action.LoginToken;
  });
}

function applySaveReview(state, action) {
  return produce(state, draft => {
    draft.review = action.review;
  });
}

function applySaveStoreInfo(state, action) {
  return produce(state, draft => {
    draft.storeInfo = action.storeInfo;
  });
}

// Exports

const actionCreators = {
  getLoginToken,
  saveReview,
  saveStoreInfo
};
export { actionCreators };

// Default

export default reducer;
