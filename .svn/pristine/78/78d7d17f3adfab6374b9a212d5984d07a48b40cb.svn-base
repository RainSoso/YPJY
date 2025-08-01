import {defHttp} from '/@/utils/http/axios';
import {Modal} from 'ant-design-vue';

enum Api {
  list = '/ypjy.Fxpgbg/fxpgbg/list',
  save='/ypjy.Fxpgbg/fxpgbg/add',
  edit='/ypjy.Fxpgbg/fxpgbg/edit',
  deleteOne = '/ypjy.Fxpgbg/fxpgbg/delete',
  deleteBatch = '/ypjy.Fxpgbg/fxpgbg/deleteBatch',
  importExcel = '/ypjy.Fxpgbg/fxpgbg/importExcel',
  exportXls = '/ypjy.Fxpgbg/fxpgbg/exportXls',
  getDepart = '/ypjy.Fxpgbg/fxpgbg/getDepart',
  getFileList = '/sys/attachment/list',
  getUpdateScorce = '/ypjy.Fxpgbg/fxpgbg/getUpdateScorce',
  shangbao = '/ypjy.Fxpgbg/fxpgbg/shangbao',
  huitui = '/ypjy.Fxpgbg/fxpgbg/huitui',
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
  
export const getDepart = (params) =>
  defHttp.get({url: Api.getDepart, params});

export const getUpdateScorce = (params) =>
  defHttp.get({url: Api.getUpdateScorce, params});  

export const getFileList = (params) =>
  defHttp.get({url: Api.getFileList, params});

export const shangbao = (params,handleSuccess) =>
  defHttp.get({url: Api.shangbao, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
export const huitui = (params,handleSuccess) =>
  defHttp.get({url: Api.huitui, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });  
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
