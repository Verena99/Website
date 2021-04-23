import request from '@/utils/request';

export async function getSearchOption(params) {
  return request(`/api/searchOption`, {
    method: `GET`,
    params: params,
  });
}