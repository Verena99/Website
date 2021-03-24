import request from '@/utils/request';

const HomeModel = {
  namespace: 'home',
  state: {
    search: {
      type: 0,
      content: '',
    },
    option: {},
    list: {
      total: 0,
      current: [],
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const { type, content } = payload;
      let api = '';
      let putType = '';
      switch (type) {
        case 0:
          api = `/api/v1/list`;
          putType = 'setList';
          break;
        case 1:
          api = `/api/v1/graph`;
          putType = 'setOption';
          break;
        default:
          break;
      }

      const response = yield call(request, api, {
        method: `POST`,
        data: content,
      });

      if (
        response &&
        response.status == 200 &&
        response.data.message == 'success'
      ) {
        yield put({
          type: putType,
          payload: response.data,
        });
      }
      return response;
    },
    *saveSearchType({ payload }, { put }){
      yield put({
        type: 'changeSearchType',
        payload: payload.currentType,
      });
    },
  },
  reducers: {
    changeSearchType(prevState, action) {
      return {
        search: {
          type:  action.payload,
          content: '',
        },
        option: {},
        list: {
          total: 0,
          current: [],
        },
      };
    },

    setOption(prevState, action) {
      const { center, nodes } = action.payload.graph;
      let data = [{ name: center, category: 0 }];
      let links = [];
      let categories = [0];

      for (let i in nodes) {
        links.push({ source: center, target: nodes[i] });
        data.push({ name: nodes[i], category: data.length });
        categories.push(categories.length);
      }

      console.log(data, links);

      const newOption = {
        tooltip: { show: false },
        series: [
          {
            type: 'graph',
            layout: 'force',
            roam: false,
            force: {
              edgeLength: 200,
              repulsion: 300,
            },
            draggable: false,
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  fontSize: '12rem',
                },
              },
            },
            symbolSize: 20,
            links,
            data,
            categories,
          },
        ],
      };

      return { ...prevState, option: newOption };
    },

    setList(prevState, action) {
      const newList = {
        total: action.payload.total,
        current: action.payload.list,
      };
      return { ...prevState, list: newList };
    },
  },
};
export default HomeModel;
