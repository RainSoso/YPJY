import {defHttp} from '/@/utils/http/axios';
import {Modal} from 'ant-design-vue';

enum Api {
  list = '/qyda.rcjgjbxx/rcjgjbxx/list',
  save='/qyda.rcjgjbxx/rcjgjbxx/add',
  edit='/qyda.rcjgjbxx/rcjgjbxx/edit',
  deleteOne = '/qyda.rcjgjbxx/rcjgjbxx/delete',
  deleteBatch = '/qyda.rcjgjbxx/rcjgjbxx/deleteBatch',
  importExcel = '/qyda.rcjgjbxx/rcjgjbxx/importExcel',
  exportXls = '/qyda.rcjgjbxx/rcjgjbxx/exportXls',
  listMx = '/qyda.rcjgjcxmx/rcjgjcxmx/listMx',
  getZxjcbglistPage = '/qyda.rcjgjbxx/rcjgjbxx/getZxjcbglistPage',
  getZxTitle = '/qyda.rcjgjbxx/rcjgjbxx/getZxTitle',
  RcjgjbxxListJcry = '/qyda.rcjgjbxx/rcjgjbxx/RcjgjbxxListJcry',
  listTz = '/qyda.rcjgjbxx/rcjgjbxx/listTz',
  listFxpgbg = '/qyda.rcjgjbxx/rcjgjbxx/listFxpgbg',
  listJhwcqk = '/qyda.rcjgjbxx/rcjgjbxx/listJhwcqk',
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;
/**
 * 列表接口
 * @param params
 */
export const list = (params) =>
  defHttp.get({url: Api.list, params});

export const listTz = (params) =>
  defHttp.get({url: Api.listTz, params});

export const listFxpgbg = (params) =>
  defHttp.get({url: Api.listFxpgbg, params});  
  
export const listJhwcqk = (params) =>
  defHttp.get({url: Api.listJhwcqk, params});  
     
export const RcjgjbxxListJcry = (params) =>
  defHttp.get({url: Api.RcjgjbxxListJcry, params});
  
export const listMx = (params) =>
  defHttp.get({url: Api.listMx, params});
  
export const getZxjcbglistPage = (params) =>
  defHttp.get({url: Api.getZxjcbglistPage, params});  
  
export const getZxTitle = (params) =>
  defHttp.get({url: Api.getZxTitle, params});  
  
/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 * @param handleSuccess
 */
export const batchDelete = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * 保存或者更新
 * @param params
 * @param isUpdate 是否是更新数据
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}
