import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '事项标题',
    align:"center",
    dataIndex: 'sxTitle',
    width:'200px'
   },
   {
    title: '企业名称',
    align:"center",
    dataIndex: 'qymc',
    width:'240px'
   },
   {
    title: '状态',
    align:"center",
    dataIndex: 'state_dictText',
    width:'110px'
   },
   {
    title: '创建日期',
    align:"center",
    dataIndex: 'createTime',
    width:'200px'
   },
   {
    title: '内容',
    align:"center",
    dataIndex: 'contents'
   },
   
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "企业名称",
    field: 'qymc',
    component: 'Input',
    colProps: { span: 6 },
  }
];
//表单数据
export const formSchema: FormSchema[] = [
  
];



/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}