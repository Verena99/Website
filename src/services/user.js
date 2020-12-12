import request from '@/utils/request';

export async function query(params) {
  return request(`/api/v1/user?${stringfy(params)}`, {
    method: `GET`,
  });
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryNotices() {
  return request('/api/notices');
}

// 登陆
export async function login(params) {
  return request(`/api/v1/user/login`, {
    method: `POST`,
    params: params,
  });
}

// 注册
export async function register(params) {
  return request(`/api/v1/user`, {
    method: `POST`,
    data: params,
  });
}
