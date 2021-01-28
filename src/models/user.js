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
      username: 'default',
      user_id: 'default',
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
      if (
        response &&
        response.status == 200 &&
        response.data.message == 'success'
      ) {
        const current = {};
        current.username = payload.username;
        current.user_id = response.data.user_id;
        yield put({
          type: 'saveCurrentUser',
          payload: current,
        });
      }
      return response;
    },

    *register({ payload }, { call, put }) {
      const response = yield call(register, payload);
      return response;
    },

    *changeUserInfo({ payload }, { call }) {
      const response = yield call(changeUserInfo, payload);
      return response;
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      console.log(action);
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
