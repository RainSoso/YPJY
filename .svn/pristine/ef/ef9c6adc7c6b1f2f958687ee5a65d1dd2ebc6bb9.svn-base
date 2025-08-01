import { defHttp } from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/xtcz/cpTask/list',
  datalist = '/xtcz/cpTask/datalist',
  save = '/xtcz/cpTask/add',
  edit = '/xtcz/cpTask/edit',
  deleteOne = '/xtcz/cpTask/delete',
  deleteBatch = '/xtcz/cpTask/deleteBatch',
  importExcel = '/xtcz/cpTask/importExcel',
  exportXls = '/xtcz/cpTask/exportXls',
  queryById = '/xtcz/cpTask/queryById',
  qianshou = '/xtcz/cpTask/qianshou'
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

export const datalist = (params) =>
  defHttp.get({ url: Api.datalist, params });


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

export const queryById = (params) => {
  return defHttp.get({ url: Api.queryById, params });
}

export const qs = (params) => {
  return defHttp.get({ url: Api.qianshou, params });
}