import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { UploadTypeEnum } from "/@/components/Form/src/jeecg/components/JUpload";
import Tools from '/@/utils/tools';

export const columns: BasicColumn[] = [{
  title: '姓名', dataIndex: 'realname', width: 150
}, {
  title: '所属部门', dataIndex: 'departName'
}, {
  title: '手机', dataIndex: 'phone', width: 120
}, {
  title: '座机', dataIndex: 'telephone', width: 120
}, {
  title: '工作分工', dataIndex: 'jobContent', defaultHidden: true
}, {
  title: '职务', dataIndex: 'post', slots: { customRender: 'post' }, defaultHidden: true
}, {
  title: '更新时间', dataIndex: 'updateTime', width: 165
}];

export const searchFormSchema: FormSchema[] = [{
  label: '姓名', field: 'realname', component: 'JInput', colProps: { span: 6 }
}, {
  label: '手机', field: 'phone', component: 'JInput', colProps: { span: 6 },
}];

export const formSchema: FormSchema[] = [{
  label: '', field: 'id', component: 'Input', show: false
}, {
  field: 'realname', component: 'Input', label: '姓名', required: true,
  colProps: { span: 12 }
}, {
  label: '手机', field: 'phone', component: 'Input',
  rules: [{ pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/, message: '手机号码格式有误' }],
  colProps: { span: 12 }
}, {
  label: '座机', field: 'telephone', component: 'Input',
  rules: [{ pattern: /^0\d{2,3}-[1-9]\d{6,7}$/, message: '请输入正确的座机号码' }],
  colProps: { span: 12 }
}, {
  label: '性别', field: 'sex', component: 'JDictSelectTag',
  componentProps: { dictCode: 'sex', placeholder: '请选择性别', stringToNumber: true, },
  colProps: { span: 12 }
}, {
  label: '生日', field: 'birthday', component: 'DatePicker',
  componentProps: { valueFormat: 'YYYY-MM-DD' },
  colProps: { span: 12 }
}, {
  label: '所属部门', field: 'orgCode', component: 'Input',
  show: false
}, {
  label: '电子邮箱', field: 'email', component: 'Input',
  rules: rules.rule('email', false)
}, {
  label: '工号', field: 'workNo', component: 'Input',
  colProps: { span: 12 }
}, {
  label: '排序号', field: 'sort', component: 'InputNumber',
  colProps: { span: 12 },
  show: () => Tools.isSysAdmin()
}, {
  field: 'avatar', component: 'JUpload', label: '头像', helpMessage: '最多上传1张图片',
  componentProps: { fileType: UploadTypeEnum.image, maxCount: 1 },
  show: false
}, {
  label: '职务', field: 'post', component: 'JSelectPosition',
  componentProps: { rowKey: 'code', labelKey: 'name' },
  show: false
}];
