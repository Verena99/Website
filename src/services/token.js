import request from '@/utils/request';

const tokenUrl = '/api/v1/callup';
const dealApplyUrl = '/api/v1/caller/action';
const queryApplicationUrl = '/api/v1/application';

// 获取召集令列表
export async function tokenList(params) {
  return request(`${tokenUrl}`, {
    method: `GET`,
    params: params,
  });
}

// 删除召集令
export async function deleteToken(params) {
  return request(`${tokenUrl}`, {
    method: `DELETE`,
    data: params,
  });
}

// 创建召集令
export async function createToken(params) {
  return request(`${tokenUrl}`, {
    method: `POST`,
    data: params,
  });
}

// 更新召集令
export async function updateToken(params) {
  return request(`${tokenUrl}/${params.callup_id}`, {
    method: `PATCH`,
    data: params.data,
  });
}

// 接受、拒绝召集令
export async function dealApply(params) {
  return request(`${dealApplyUrl}`, {
    method: `PATCH`,
    data: params,
  });
}

export async function getApplications(params) {
  return request(`${queryApplicationUrl}`, {
    method: `GET`,
    params: params,
  });
}
