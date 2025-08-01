import {defHttp} from '/@/utils/http/axios';
import {Modal} from 'ant-design-vue';

enum Api {
  list = '/qysczk/ywQySczkLog/list',
  save='/qysczk/ywQySczkLog/add',
  edit='/qysczk/ywQySczkLog/edit',
  deleteOne = '/qysczk/ywQySczkLog/delete',
  deleteBatch = '/qysczk/ywQySczkLog/deleteBatch',
  importExcel = '/qysczk/ywQySczkLog/importExcel',
  exportXls = '/qysczk/ywQySczkLog/exportXls',
  fcqyzk='/qysczk/ywQySczkLog/addfc',
  tcqyzk='/qysczk/ywQySczkLog/addtc',
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

export const fcqyzk = (params) => {
  return defHttp.post({url: Api.fcqyzk, params});
}
export const tcqyzk = (params) => {
  return defHttp.post({url: Api.tcqyzk, params});
}