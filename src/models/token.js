import {
  tokenList,
  deleteToken,
  createToken,
  updateToken,
} from '@/services/token';
const TokenModel = {
  namespace: 'token',
  state: {},
  effects: {
    *tokenList({ payload }, { call }) {
      const response = yield call(tokenList, payload);
      return response;
    },

    *deleteToken({ payload }, { call }) {
      const response = yield call(deleteToken, payload);
      return response;
    },

    *createToken({ payload }, { call }) {
      const response = yield call(createToken, payload);
      return response;
    },

    *updateToken({ payload }, { call }) {
      const response = yield call(updateToken, payload);
      return response;
    },
  },
};
export default TokenModel;
