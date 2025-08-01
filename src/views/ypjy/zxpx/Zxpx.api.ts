import {defHttp} from '/@/utils/http/axios';
import {Modal} from 'ant-design-vue';

enum Api {
  list = '/ypjy.zxpx/zxpx/list',
  save='/ypjy.zxpx/zxpx/add',
  edit='/ypjy.zxpx/zxpx/edit',
  deleteOne = '/ypjy.zxpx/zxpx/delete',
  deleteBatch = '/ypjy.zxpx/zxpx/deleteBatch',
  importExcel = '/ypjy.zxpx/zxpx/importExcel',
  exportXls = '/ypjy.zxpx/zxpx/exportXls',
  fabu = '/ypjy.zxpx/zxpx/fabu',
  xiaxian = '/ypjy.zxpx/zxpx/xiaxian',
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

export const fabu = (params,handleSuccess) => {
    return defHttp.get({url: Api.fabu, params}, {joinParamsToUrl: true}).then(() => {
      handleSuccess();
    });
  }
export const xiaxian = (params,handleSuccess) => {
  return defHttp.get({url: Api.xiaxian, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}  
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
