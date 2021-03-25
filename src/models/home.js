import request from '@/utils/request';

const HomeModel = {
  namespace: 'home',
  state: {
    search: {
      searchType: 0,
      content: '',
    },
    option: {},
    list: {
      total: 0,
      current: [],
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      const { content } = payload;
      const currentType = yield select(state => state.home.search.searchType);
      console.log('currentType: ', currentType);
      let api = '';
      let putType = '';
      switch (currentType) {
        case 0:
          api = `/api/key`;
          putType = 'setList';
          break;
        case 1:
          api = `/api/graph`;
          putType = 'setOption';
          break;
        default:
          break;
      }

      const response = yield call(request, api, {
        method: `POST`,
        data: {search: content},
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
    *saveSearchContent({ payload }, { put }){
      yield put({
        type: 'changeSearchContent',
        payload: payload.content,
      })
    }
  },
  reducers: {
    changeSearchType(prevState, action) {
      console.log('change type:', action.payload);
      return {...prevState,
        search: {
          searchType: action.payload,
          content: prevState.search.content, 
        },
        option: {},
        list: {
          total: 0,
          current: [],
        },
      };
    },

    changeSearchContent(prevState, action) {
      console.log('change content: ', action.payload);
      return {...prevState, search: { content: action.payload, searchType: prevState.search.searchType}}
    },

    setOption(prevState, action) {
      const { fromId, nodes } = action.payload.graph;
      let data = [{ name: fromId, category: 0 }];
      let links = [];
      let categories = [0];

      for (let i in nodes) {
        links.push({ source: fromId, target: nodes[i].toId, name: nodes[i].rel });
        data.push({ name: nodes[i].toId, category: data.length });//节点分类, 数字代表categories中的索引
        categories.push(categories.length);
      }

      // console.log(data, links);

      const newOption = {
        tooltip: { show: false },//鼠标放上去会有显示
        series: [
          {
            type: 'graph',
            layout: 'force',
            roam: true,//漫游
            scale:true,
            //move:true,
            edgeSymbol: ['none', 'arrow'],
            edgeLabel: {
              normal: {
                  show: true,
                  formatter: function (x) {
                      return x.data.name;
                  }
              }
          },

            force: {
              edgeLength: [100, 200],
              repulsion: 2000,
            },
            draggable: true,//可拖拽
            label: {
              normal: {
                show: true,

                textStyle: {
                  fontSize: '12rem',
                },
              },
            },
            symbolSize: 60,//球大小
            links,
            data,
            categories,
          },
        ],
      };

      return { ...prevState, option: newOption };//把prevState展开，若逗号后东西的键有跟前面重复的会覆盖
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
