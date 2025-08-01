import {defHttp} from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";
import Tools from '/@/utils/tools';

const { createConfirm } = useMessage();

enum Api {
  list = '/yw/tysb/pYwTyjhsq/list',
  tjList = '/yw/tysb/pYwTyjhsq/tjList',
  save='/yw/tysb/pYwTyjhsq/add',
  edit='/yw/tysb/pYwTyjhsq/edit',
  deleteOne = '/yw/tysb/pYwTyjhsq/delete',
  deleteBatch = '/yw/tysb/pYwTyjhsq/deleteBatch',
  importExcel = '/yw/tysb/pYwTyjhsq/importExcel',
  exportXls = '/yw/tysb/pYwTyjhsq/exportXls',
  qylist='/yw/tysb/pYwTyjhsq/qylist',
  queryTree='/yw/tysb/pYwTyjhsq/queryTree'
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
export const qylist = (params) =>
  defHttp.get({url: Api.qylist, params});
export const queryTree = (params) =>
  defHttp.get({url: Api.queryTree, params}); 
export const tjList = (params) =>
  defHttp.get({url: Api.tjList, params});

/**
 * 删除单个
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
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
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}
