<template>
  <sqsxShsx rm="1" isyw="Y" :columns="columns" :search="dclsearchFormSchema"></sqsxShsx>
</template>
<script lang="ts" name="gmpsp-dsh" setup>
import { BasicColumn, FormSchema } from '/@/components/Table';
import sqsxShsx from "/@/views/ypsczhjg/gmpsq/components/SqsxShsxList.vue";

const columns: BasicColumn[] = [{
  title: "受理编号", dataIndex: "slbh", width: 140, sorter: true
}, {
  title: "事项标题",
  dataIndex: "sqsxSqsx.title",
  sorter: true,
  slots: { customRender: "title" },
  ellipsis: false
}, {
  title: "申请企业名称",
  dataIndex: "sqsxSqsx.sqQymc",
  width: 300,
  sorter: true,
  defaultHidden: true
}, {
  title: "联系人",
  dataIndex: "sqsxSqsx.lxrmc",
  width: 80,
  sorter: true
}, {
  title: "联系人手机",
  dataIndex: "sqsxSqsx.lxrsjh",
  width: 120,
  sorter: true
}, {
  title: "提交时间",
  dataIndex: "sqsxSqsx.tjsj",
  width: 160,
  sorter: true,
  defaultHidden: true
}];

const dclsearchFormSchema: FormSchema[] = [{
  label: "", field: "dqbzs", component: "Input", show: false
}, {
  label: "受理编号", field: "bh1", component: "Input"
}, {
  label: "事项标题", field: "title", component: "Input"
}];
</script>
