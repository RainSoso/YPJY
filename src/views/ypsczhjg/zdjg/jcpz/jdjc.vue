<template>
    <yppzList v-bind="attrs" />
</template>
<script lang="ts" name="zdjg-jcpz-jdjc" setup>
import { ref } from 'vue';
import moment from 'moment';
import yppzList from '/@/views/ypsczhjg/jc/components/yppz-list.vue';
import { searchFormSchema } from '/@/views/ypsczhjg/ypyd/gcyppz/JcPzYpzcscjy.data';

const years: any = [];
for (let start = parseInt(moment(new Date()).format('YYYY')), i = start - 5; i < start + 2; i++) {
    years.push({ label: i, value: i + '' });
}

const attrs = ref({
    forceTags: ['A02A09A03']
    , showTags: false
    , showExport: false
    , showJdjc: true
    , searchFormSchema: [{
        label: '年度'
        , field: 'year'
        , component: 'Select'
        , componentProps: {
            allowClear: false
            , options: years
        }
        , defaultValue: moment(new Date()).format('YYYY')
        , colProps: { xxl: { span: 5 } }
    }, ...searchFormSchema]
    , columns: [{
        title: '年度', dataIndex: 'year', width: 80
    }, {
        title: '行政区划', dataIndex: 'areaCode', format: 'areaCode', width: 150, sorter: true
    },
    //  {
    //     title: '监督检查类型', dataIndex: 'jclx', width: 170, customRender() {
    //         return '专项检查 - 集采专项';
    //     }
    // }, 
    {
        title: '药品上市许可持有人', dataIndex: 'cyrmc', customRender({ record }) {
            return record.cyrmc || record.ypscqymc;
        }
    }, {
        title: '药品批准文号', dataIndex: 'yppzwh', width: 170, sorter: true
    }, {
        title: '药品通用名', dataIndex: 'yptymc', width: 200, sorter: true
    }, {
        title: '检查次数', dataIndex: 'jdjcNum', width: 110, sorter: true, slots: { customRender: 'jdjcNum'}
    }]
});

</script>
<style scoped>

</style>