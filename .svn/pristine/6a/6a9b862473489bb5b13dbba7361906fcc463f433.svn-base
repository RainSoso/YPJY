import {defHttp} from '/@/utils/http/axios';
import {Modal} from 'ant-design-vue';

enum Api {
  list = '/wtbg/wtbgBase/list',
  queryNotBase = '/wtbg/wtbgBase/queryNotBase',
  save='/wtbg/wtbgBase/add',
  edit='/wtbg/wtbgBase/edit',
  deleteOne = '/wtbg/wtbgBase/delete',
  deleteBatch = '/wtbg/wtbgBase/deleteBatch',
  importExcel = '/wtbg/wtbgBase/importExcel',
  exportXls = '/wtbg/wtbgBase/exportXls',
  exportBase = '/wtbg/wtbgBase/exportBase',
}

/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;

export const getExportUrl = Api.exportXls;
/**
 * 列表接口
 * @param params
 */
export const list = (params) =>
  defHttp.get({url: Api.list, params});

export const queryNotBase = (params) =>
  defHttp.get({url: Api.queryNotBase, params});
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

export const exportBase = (params) =>
defHttp.get({url: Api.exportBase, params});
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
