import { FormSchema } from '/@/components/Form'
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [{
    title: '姓名', dataIndex: 'realname', width: 150
}, {
    title: '工号', dataIndex: 'workNo', width: 100, defaultHidden: true
}, {
    title: '部门', dataIndex: 'departName'
}, {
    title: '工作分工', dataIndex: 'jobContent'
}, {
    title: '职务', dataIndex: 'post', slots: { customRender: 'post' }, defaultHidden: true
}, {
    title: '手机', dataIndex: 'phone', width: 120
}, {
    title: '座机', dataIndex: 'telephone', width: 120
}];

export const searchFormSchema: FormSchema[] = [{
    label: '姓名', field: 'realname', component: 'Input', colProps: { span: 6 }
}, {
    label: '手机', field: 'phone', component: 'Input', colProps: { span: 6 },
}];
