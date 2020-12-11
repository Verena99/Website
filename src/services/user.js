import request from '@/utils/request';
import { stringfy } from '@/utils/utils';

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

export async function login(params) {
  return request('/api/v1/user/login', {
    method: `POST`,
    data: params,
  });
}
