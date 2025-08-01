import { defHttp } from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/xtcz/cpEvent/list',
  allList = '/xtcz/cpEvent/allList',
  save = '/xtcz/cpEvent/add',
  edit = '/xtcz/cpEvent/edit',
  deleteOne = '/xtcz/cpEvent/delete',
  deleteBatch = '/xtcz/cpEvent/deleteBatch',
  importExcel = '/xtcz/cpEvent/importExcel',
  exportXls = '/xtcz/cpEvent/exportXls',
  exportWord = '/xtcz/cpEvent/exportWord',
  chuslist = '/xtcz/cpEvent/chuslist',
  qylist = '/jc/qy/jbxx/listYpjy',
  qytagslist = '/jc/qy/jbxx/listYpjy',
  queryById = '/xtcz/cpEvent/queryById',
  addCpEvent = '/xtcz/cpEvent/addCpEvent',
  batchSend = '/xtcz/cpEvent/batchSend',
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

export const getExportWordUrl = Api.exportWord;
/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;
/**
 * 列表接口
 * @param params
 */
export const list = (params) =>
  defHttp.get({ url: Api.list, params });

export const allList = (params) =>
  defHttp.get({ url: Api.allList, params });

export const chuslist = (params) =>
  defHttp.get({ url: Api.chuslist, params });

export const qylist = (params) =>
  defHttp.get({ url: Api.qylist, params });

export const qytagslist = (params) =>
  defHttp.get({ url: Api.qylist, params });

/**
 * 删除单个
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
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
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * 批量发送
 * @param params
 */
export const batchSend = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认发送',
    content: '是否发送选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.batchSend, data: params }, { joinParamsToUrl: true }).then(() => {
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
  return defHttp.post({ url: url, params });
}

export const queryById = (params) => {
  return defHttp.get({ url: Api.queryById, params });
}

export const addCpEvent = (params) => {
  return defHttp.post({ url: Api.addCpEvent, params });
}