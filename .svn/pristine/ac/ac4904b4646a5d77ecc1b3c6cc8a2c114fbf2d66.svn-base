import {defHttp} from '/@/utils/http/axios';
import {Modal} from 'ant-design-vue';

enum Api {
  list = '/ndbg/reportInfo/list',
  save='/ndbg/reportInfo/add',
  edit='/ndbg/reportInfo/edit',
  deleteOne = '/ndbg/reportInfo/delete',
  deleteBatch = '/ndbg/reportInfo/deleteBatch',
  importExcel = '/ndbg/reportInfo/importExcel',
  exportXls = '/ndbg/reportInfo/exportXls',
  queryById = '/ndbg/reportInfo/queryById',
  ckxxDrugs = '/ndbg/reportInfo/ckxxDrugs',
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

export const queryById = (params) =>
  defHttp.get({ url: Api.queryById, params });
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

export const ckxxDrugs = (params) =>
  defHttp.get({url: Api.ckxxDrugs, params});