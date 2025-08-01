import { defHttp } from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";
import api from 'ant-design-vue/lib/notification';

const { createConfirm } = useMessage();

enum Api {
  list = '/ypjy/tYwJcjhJcqk/list',
  listWcqk = '/ypjy/tYwJcjhJcqk/listWcqk',
  save = '/ypjy/tYwJcjhJcqk/add',
  edit = '/ypjy/tYwJcjhJcqk/edit',
  deleteOne = '/ypjy/tYwJcjhJcqk/delete',
  deleteBatch = '/ypjy/tYwJcjhJcqk/deleteBatch',
  importExcel = '/ypjy/tYwJcjhJcqk/importExcel',
  exportXls = '/ypjy/tYwJcjhJcqk/exportXls',
  getJhmcByZxjc = '/ypjy/tYwJcjhJcqk/getJhmcByZxjc'
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
  defHttp.get({ url: Api.list, params });
export const listWcqk = (params) =>
  defHttp.get({ url: Api.listWcqk, params });

export const getJhmcByZxjc = (params) =>
  defHttp.get({ url: Api.getJhmcByZxjc, params });
    
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
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
}
