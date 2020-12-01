import { query, queryCurrent } from '@/services/user';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {
      name: '',
      caller_id: '',
    },
    userInfo: {
      name: 'LYF',
      phone: '18888888888',
      idType: '1',
      idNumber: '123456789',
      city: 'ShenYang',
      username: 'BALABALA',
      password: '888888',
    },
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent({ payload }, { call, put }) {
      // const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: payload,
      });
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
