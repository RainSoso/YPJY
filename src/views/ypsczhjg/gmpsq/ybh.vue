<template>
  <wsl state="3" :columns="columns" :search="searchFormSchema"></wsl>
</template>
<script lang="ts" name="gmpsp-yth" setup>
import { columnRender } from '/@/utils/dict/dictUtils';
import wsl from './components/SqsxYbsxList.vue';

const columns: BasicColumn[] = [{
title: '申报编号', dataIndex: 'bh', width: 160, sorter: true
}, {
title: '事项标题', dataIndex: 'title', sorter: true, slots: { customRender: 'title' }, ellipsis: false
}, {
title: '申请企业名称', dataIndex: 'sqQymc', width: 300, sorter: true, defaultHidden: true
}, {
title: '联系人', dataIndex: 'lxrmc', width: 80, sorter: true
}, {
title: '联系人手机', dataIndex: 'lxrsjh', width: 120, sorter: true
}, {
title: '提交时间', dataIndex: 'tjsj', width: 160, sorter: true, defaultHidden: true
}, {
title: '状态', dataIndex: 'dqbz', width: 75,
customRender: ({ text, record }) => columnRender(text ? 'sqsx_currentstep' : 'sqsx_state', text || record.state)
}];


const searchFormSchema: FormSchema[] = [
{
  label: '', field: 'dqbzs', component: 'Input', show: false,
},
{
  label: '申报编号',
  field: 'bh1',
  component: 'Input'
},
{
  label: '事项标题',
  field: 'title',
  component: 'JInput'
},
];
</script>
