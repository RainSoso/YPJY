<template>
   <rcjgquery sfgmp="1"  v-bind="attrs"></rcjgquery>
</template>
<script lang="ts" name="yw-rcjg-rcjggmp" setup>
import { ref, h } from 'vue';
import { useRoute } from 'vue-router';
import rcjgquery from '/@/views/ypsczhjg/yw/rcjg/components/rcjg-query.vue';
import { searchFormSchema ,getSearchFormSchema} from '/@/views/ypsczhjg/yw/rcjg/Tywrcjgjgjg.data';
const attrs = ref({
   // getSearchFormSchema: [{
   //    label: '检查单位'
   //    , field: 'jcdwzzjgdm'
   //    , component: 'JDictSelectTag'
   //    , componentProps: { dictCode: 'rcjgJcdw', stringToNumber: false }
   //    , colProps: { xxl: { span: 4 } }
   // }, ...getSearchFormSchema('2023')]
   // , 
   columns: [{
      title: '检查形式', dataIndex: 'jcxs_dictText', width: 140
   }, {
      title: '含GMP符合性检查', dataIndex: 'sfgmp_dictText', width: 140, customRender({ record: row }) {
         if (row.sfhgpgssq == '1') return '上市前';
         if (row.sfhgpgssh == '1') return '上市后';
         return row.sfgmp_dictText
      }
   }, {
      title: '企业名称', dataIndex: 'qymc'
   }, {
      title: '检查单位', dataIndex: 'jcdwmc', defaultHidden: true
   }, {
      title: '检查人', dataIndex: 'jcr', width: 160
   }, {
      title: '检查时间', dataIndex: 'jcsj', format: 'date|YYYY-MM-DD', width: 100
   }, {
      title: '综合评定结论', dataIndex: 'zhpdjl_dictText', width: 110
   }, {
      title: '缺陷数量', dataIndex: 'qxsl', width: 175, customRender({ record: row }) {
         return h('div', { style: { display: 'inline-flex', alignItems: 'center', textAlign: 'left', flexWrap: 'wrap', margin: '0 4px' } }, [
            h('div', { style: { width: '50%' } }, ['严重：', row.yzqxsl]),
            h('div', { style: { width: '50%' } }, ['主要：', row.zyqxsl]),
            h('div', { style: { width: '50%' } }, ['一般：', row.ybqxsl]),
            h('div', { style: { width: '50%' } }, ['未定义：', row.wdyqxsl])
         ]);
      }
   }]
});

</script>
<style scoped></style>