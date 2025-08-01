import {defHttp} from '/@/utils/http/axios';

enum Api {
  getCdwjid = '/ypjy/cdwj/getCdwjid',
}

/**
 * 列表接口
 * @param params
 */
export const getCdwjid = (params) =>
  defHttp.get({url: Api.getCdwjid, params});
