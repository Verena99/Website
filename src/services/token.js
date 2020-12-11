import request from '@/utils/request';
import { stringfy } from '@/utils/utils';

const tokenUrl = '/api/v1/callup';
const dealApplyUrl = '/api/v1/caller/action';
const queryApplicationUrl = '/api/v1/application';

export async function tokenList(params) {
  console.log(stringfy(params));
  return request(`${tokenUrl}?${stringfy(params)}`, {
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

export async function getApplications(params) {
  console.log(stringfy(params));
  return request(`${queryApplicationUrl}?${stringfy(params)}`, {
    method: `GET`,
    data: params,
  });
}
