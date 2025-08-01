import {defHttp} from '/@/utils/http/axios';

enum Api {
  getCdwjJbxx = '/ypjy/cdwj/getCdwjJbxx',
}

/**
 * 列表接口
 * @param params
 */
export const getCdwjJbxx = (params) =>
  defHttp.get({url: Api.getCdwjJbxx, params});
