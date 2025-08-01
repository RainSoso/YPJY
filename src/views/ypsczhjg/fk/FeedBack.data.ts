import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useUserStore } from '/@/store/modules/user';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
const userStore = useUserStore();
export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    width: 500
  },
  {
    title: '联系人',
    dataIndex: 'contacts',
    width: 160
  },
  {
    title: '联系电话',
    dataIndex: 'contactNumber',
    width: 180
  },
  {
    title: '反馈内容',
    dataIndex: 'content',
    defaultHidden: true,
  },
  {
    title: '回复内容',
    dataIndex: 'replyContent',
    defaultHidden: true,
  },
  {
    title: '回复人',
    dataIndex: 'replyBy',
    defaultHidden: true,
  },
  {
    title: '回复时间',
    dataIndex: 'replyDate',
    defaultHidden: true,
  },
  {
    title: '状态，1待处理2已处理',
    dataIndex: 'state',
    defaultHidden: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '标题',
    field: 'title',
    component: 'JInput'
  },
  {
    label: '联系人',
    field: 'contacts',
    component: 'JInput'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false }, {
    label: '标题',
    field: 'title',
    component: 'Input',
    rules: [{ required: true, message: '请输入标题!' }]
  }, {
    label: '联系人',
    field: 'contacts',
    component: 'Input',
    defaultValue: userStore.getUserInfo?.realname,
    colProps: {
      span: 10,
    },
  }, {
    label: '联系电话',
    field: 'contactNumber',
    component: 'Input',
    defaultValue: userStore.getUserInfo?.phone,
    colProps: {
      offset: 2,
      span: 10,
    },
  }, {
    label: '反馈内容',
    field: 'content',
    component: 'JEditor',
  }, {
    label: '回复内容',
    field: 'replyContent',
    component: 'Input',
    show: false,
  }, {
    label: '回复人',
    field: 'replyBy',
    component: 'Input',
    show: false,
  }, {
    label: '回复时间',
    field: 'replyDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
    show: false,
  }, {
    label: '状态，1待处理2已处理',
    field: 'state',
    component: 'InputNumber',
    defaultValue: '1',
    show: false,
  }
];
