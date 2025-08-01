<template>
    <jczx dqbz="JCZX" rm="2" :columns="columns" :search="searchFormSchema" sort="slsj"></jczx>
</template>
<script lang="ts" name="gmpsp-jczxlist" setup>
import jczx from './components/SqsxYbsxList.vue';
import { columnRender } from '/@/utils/dict/dictUtils';
import { getDictItems } from '/@/utils/dict/JDictSelectUtil';
import { defineComponent, ref, unref } from 'vue';

const columns: BasicColumn[] = [{
  title: '受理编号', dataIndex: 'slsj', width: 160,customRender({record}) {
    return record.slbh;
  }, sorter: true
}, {
  title: '通知书编号', dataIndex: 'tzsBh', width: 160, sorter: true, defaultHidden: true
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
},{
  title: '当前步骤', dataIndex: 'dqbzs', width: 160, sorter: true, defaultHidden: true
}];

const searchFormSchema: FormSchema[] = [
  {
    label: '', field: 'dqbzs', component: 'Input', show: false,
  },
 {
    label: '受理编号',
    field: 'slbh',
    component: 'JInput'
  },
  {
    label: '事项标题',
    field: 'title',
    component: 'JInput'
  },
];

</script>
