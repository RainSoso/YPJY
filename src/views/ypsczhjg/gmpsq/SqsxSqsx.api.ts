import {defHttp} from '/@/utils/http/axios';
import {Modal} from 'ant-design-vue';

enum Api {
  list = '/sqsx/sqsxSqsx/list',
  save='/sqsx/sqsxSqsx/add',
  edit='/sqsx/sqsxSqsx/edit',
  tyBd = '/sqsx/sqsxSqsx/tyBd',
  deleteOne = '/sqsx/sqsxSqsx/delete',
  deleteBatch = '/sqsx/sqsxSqsx/deleteBatch',
  importExcel = '/sqsx/sqsxSqsx/importExcel',
  exportXls = '/sqsx/sqsxSqsx/exportXls',
  queryById = '/sqsx/sqsxSqsx/queryById',
  querySqSxfj = '/sqsx/sqsxSqsxCl/querySqSxfj',
  cledit = '/sqsx/sqsxSqsxCl/edit',
  allEdit = '/sqsx/sqsxSqsxCl/allEdit',
  spjlList = '/sqsx/sqsxSpjl/list',
  queryHostory = '/sqsx/sqsxSqsxCl/queryHostory',
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

export const spjlList = (params) =>
  defHttp.get({url: Api.spjlList, params});

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
export const sqsxsaveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}

export const queryById = (params) =>
  defHttp.get({url: Api.queryById, params});

export const tyBd = (params) => {
  return defHttp.post({url: Api.tyBd, params})
}

export const querySqSxfj = (params) =>
defHttp.get({url: Api.querySqSxfj, params});

export const cledit = (params) => {
  return defHttp.post({url: Api.cledit, params});
}

export const queryHostory = (params) =>
defHttp.get({url: Api.queryHostory, params});

export const allEdit = (params) => {
  return defHttp.post({url: Api.allEdit, params});
}