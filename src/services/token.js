import request from '@/utils/request';

const tokenUrl = '/api/v1/callup';
const dealApplyUrl = '/api/v1/caller/action';

export async function tokenList(params) {
  return request(`${tokenUrl}`, {
    method: `GET`,
    data: params,
  });
}

export async function deleteToken(params) {
  return request(`${tokenUrl}`, {
    method: `DELETE`,
    data: params,
  });
}

export async function createToken(params) {
  return request(`${tokenUrl}`, {
    method: `POST`,
    data: params,
  });
}

export async function updateToken(params) {
  return request(`${tokenUrl}/${params.callup_id}`, {
    method: `PATCH`,
    data: params,
  });
}

export async function dealApply(params) {
  return request(`${dealApplyUrl}`, {
    method: `PATCH`,
    data: params,
  });
}
