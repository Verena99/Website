import request from '@/utils/request';

export async function query(params) {
  return request(`/api/v1/user`, {
    method: `GET`,
    params: params,
  });
}

export async function queryCurrent(params) {
  return request(`/api/v1/user`, {
    method: `GET`,
    params: params,
  });
}

// 登陆
export async function login(params) {
  return request(`/api/v1/user/login`, {
    method: `GET`,
    data: params,
  });
}

// 注册
export async function register(params) {
  return request(`/api/v1/user/register`, {
    method: `POST`,
    data: params,
  });
}

// 修改用户信息
export async function changeUserInfo(params) {
  console.log(params);
  return request(`/api/v1/user/${params.user_id}`, {
    method: `PATCH`,
    data: params.data,
  });
}
