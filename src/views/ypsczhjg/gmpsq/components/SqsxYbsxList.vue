<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable">
       <template #title="{ record }">
           <a-button type="link" @click="toViewModel(record)" style="white-space:unset">{{ record.title }}</a-button>
      </template>
      
      <template  #tzsBh="{ record }">
           <span v-if="record.tzsBh">{{record.tzsBh}}</span> <span v-else>{{record.slbh}}</span>
      </template>
      
     <!--插槽:table标题-->
          <template #tableTitle>
          </template>
    </BasicTable>

  </div>
</template>

<script lang="ts" name="sqsx-sqsxSqsx" setup>
  import {ref, computed, unref, watch} from 'vue';
  import { useRoute } from 'vue-router';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage'
  import {columns,dbcolumns, searchFormSchema} from '../SqsxSqsx.data';
  import { CheckCircleOutlined } from '@ant-design/icons-vue';
  import {list,getImportUrl,getExportUrl,spjlList} from '../SqsxSqsx.api';
  import { getDictItems } from '/@/utils/dict/JDictSelectUtil';
  import { useGo } from '/@/hooks/web/usePage';
  import { propTypes } from '/@/utils/propTypes';
  const route = useRoute();
  const opts = computed(() => {
    let lastPath = route.path.split('/').pop(), res = {
      type: 'haveDone', api: list, columns: columns, params: { rm: 2 }, btnName: '查看'
    };
    if (lastPath == 'daib') {
      return {
        type: 'waiting', api: spjlList, columns: dbcolumns, params: { rm: 1 }, btnName: '未审核'
      };
    } else if (lastPath == 'all') {
      Object.assign(res, { type: 'all', params: {} });
    }
    return res;
  });

 const props = defineProps({
  dqbz: propTypes.string.def(''),
  sort: propTypes.string.def(''),
  state: propTypes.string.def(''),
  columns: propTypes.array.def(undefined),
  search: propTypes.array.def(undefined),
  rm: propTypes.string.def(''),
  isyw: propTypes.string.def(''),
});

  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            title: '申请事项',
            showIndexColumn: true,
            api: opts.value.api,
            columns: props.columns,
            showActionColumn: false,
            canResize:false,
            formConfig: {
               labelWidth: 120,
               schemas: props.search,
               autoSubmitOnEnter:true,
               showAdvancedButton:true,
               async resetFunc() {
                 //currentTag.value = '';
               }   
             },
            actionColumn: {
                width: 70,
             },
             defSort:{
             column:props.sort,
             order:'desc'
            },
             beforeFetch(params){
             if(!props.rm){
              params.rm = '2'
             } else{
              params.rm = props.rm;
             } 
             if(props.dqbz) params.dqbz = props.dqbz;
             if('1' == props.state) params.wsl = 'Y';
             if('2' == props.state) params.yzb = 'Y';
             if('3' == props.state || '4' == props.state) params.state = props.state;
            //  if(props.state) params.state = props.state;
             if('5' == props.state) params.yjc = 'Y';
             if('6' == props.state) params.ybj = 'Y';
             if('7' == props.state) params.ytg = 'Y';
             if(props.isyw) params.isyw = props.isyw;
             return params;
            }
        },
        exportConfig: {
             name:"申请事项",
             url: getExportUrl,
           },
           importConfig: {
             url: getImportUrl
           },
   })

   const [registerTable, {reload,getForm},{ rowSelection, selectedRowKeys }] = tableContext


   /**
    * 成功回调
    */
   function handleSuccess({isUpdate, values}) {
      reload();
   }
    
   function toViewModel(record: Recordable){
       if(record.sqxm != 'gmpxm'){
        go({ path: '/gmp/zbsy', query: { id: record.id, sfbl:'N'} });
       }else{
        go({ path: '/gmp/sy', query: { id: record.id ,sfbl:'N'} });
       }
       
   }
   const go = useGo();
   
   function godetils(record: Recordable){
    if(record.sqxm != 'gmpxm'){
      go({ path: '/gmp/zbsy', query: { id: record.sqsxSqsx.id,spid:record.id,sfbl:'Y'} });
    }else{
      if(opts.value.type === 'waiting'){
      go({ path: '/gmp/sy', query: { id: record.sqsxSqsx.id,spid:record.id,sfbl:'Y'} });
     }else{
      go({ path: '/gmp/sy', query: { id: record.id ,sfbl:'N'} });
     }
    }

   }

   
  watch(route, () => {
    reload();
  });
</script>
<style scoped>

</style>