import {defHttp} from '/@/utils/http/axios';
import {Modal} from 'ant-design-vue';

enum Api {
  list = '/yw/rcjg/jgjg/list',
  save='/yw/rcjg/jgjg/add',
  edit='/yw/rcjg/jgjg/edit',
  deleteOne = '/yw/rcjg/jgjg/delete',
  deleteBatch = '/yw/rcjg/jgjg/deleteBatch',
  importExcel = '/yw/rcjg/jgjg/importExcel',
  exportXls = '/yw/rcjg/jgjg/exportXls',
  queryRcJg='/yw/rcjg/jgjg/queryRcJg',
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


//根据dmzj查对应的数据
export const queryRcJg = (params) => {
  return defHttp.get({url: Api.queryRcJg, params});
}

