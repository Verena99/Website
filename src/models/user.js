import {
  query,
  queryCurrent,
  login,
  register,
  changeUserInfo,
} from '@/services/user';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {
      name: 'user2',
      user_id: 2,
    },
    userInfo: {
      name: 'LYF',
      phone: '18888888888',
      idType: '1',
      credential_number: '123456789',
      city: 2,
      sso_name: 'BALABALA',
      password: 888888,
    },
  },
  effects: {
    *fetchUser({ payload }, { call }) {
      const response = yield call(query, payload);
      return response;
    },

    *fetchCurrent({ payload }, { call }) {
      const response = yield call(queryCurrent, payload);
      return response;
    },

    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      if (response) {
        const current = {};
        current.name = payload.sso_name;
        current.caller_id = response.caller_id;
        yield put({
          type: 'saveCurrentUser',
          payload: payload,
        });
      }
      return response;
    },

    *register({ payload }, { call, put }) {
      const response = yield call(register, payload);
      if (response) {
        const current = {};
        current.name = payload.sso_name;
        current.caller_id = response.id;
        yield put({
          type: 'saveCurrentUser',
          payload: payload,
        });
      }
      return response;
    },

    *changeUserInfo({ payload }, { call }) {
      const response = yield call(changeUserInfo, payload);
      return response;
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
