<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable">
     <!--插槽:table标题-->
          <template #tableTitle>
            <!-- <a-space :wrap="true">
               <a-tag v-for="(item, idx) in tags" class="xl cursor-pointer" :color="item.color" :key="idx"
               @click="fastFitler(item)">
            <template #icon>
              <check-circle-outlined v-if="currentTag == item.value" />
            </template>{{ item.text }}
          </a-tag>
        </a-space> -->
          </template>
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)"/>
      </template>
      <template #title="{ record }">
        <a-button type="link" @click="toViewModel(record)" style="white-space:unset">{{ record.title }}</a-button>
      </template>
    </BasicTable>

  </div>
</template>

<script lang="ts" name="sqsx-sqsxSqsx" setup>
  import {ref, computed, unref, watch} from 'vue';
  import { useRoute } from 'vue-router';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage'
  import {columns,dbcolumns, searchFormSchema} from './SqsxSqsx.data';
  import { CheckCircleOutlined } from '@ant-design/icons-vue';
  import {list,getImportUrl,getExportUrl,spjlList} from './SqsxSqsx.api';
  import { getDictItems } from '/@/utils/dict/JDictSelectUtil';
  import { useGo } from '/@/hooks/web/usePage';
  import { propTypes } from '/@/utils/propTypes';

  const props = defineProps({
  dqbz: propTypes.string.def(''),
  rm: propTypes.string.def(''),
  isyw: propTypes.string.def(''),
  });
  const route = useRoute();
  const opts = computed(() => {
    let lastPath = route.path.split('/').pop(), res = {
      type: 'haveDone', api: list, columns: columns, params: { rm: 2 }, btnName: '查看'
    };
    if (lastPath == 'daib' || props.rm == '1') {
      return {
        type: 'waiting', api: spjlList, columns: dbcolumns, params: { rm: 1 }, btnName: '审核'
      };
    } else if (lastPath == 'all') {
      Object.assign(res, { type: 'all', params: {} });
    }
    return res;
  });
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            title: '申请事项',
            showIndexColumn: true,
            api: opts.value.api,
            columns: opts.value.columns,
            canResize:false,
            formConfig: {
               labelWidth: 120,
               schemas: searchFormSchema,
               autoSubmitOnEnter:true,
               showAdvancedButton:true,
             },
            actionColumn: {
                width: 70,
                ifShow: opts.value.type != 'all'
             },
             beforeFetch(params){
              Object.assign(params, opts.value.params);
              if(params.dqbz){
                params.dqbzs = params.dqbz[0];
                delete params.dqbz;
              }
              if(props.dqbz) params.dqbz = props.dqbz;
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

//    const tags = ref([]), currentTag = ref('');
//     getDictItems('sqsx_ybzt').then((res) => {
//     tags.value = res;
//    if(tags.value){
 
//    } 
//  }); 

// async function fastFitler(item) {
//   if (currentTag.value != item.value) {
//     currentTag.value = item.value;
//     await getForm().setFieldsValue({ dqbzs: item.value });
//   } else {
//     currentTag.value = '';
//     await getForm().setFieldsValue({ dqbzs: '' });
//   }
//   reload();
// }

   /**
    * 成功回调
    */
   function handleSuccess({isUpdate, values}) {
      reload();
   }

   const go = useGo();
   
   function godetils(record: Recordable){
    if(record.sqsxSqsx.source == '1'){
      go({ path: '/gmp/zbsy', query: { id: record.sqsxSqsx.id,spid:record.id,sfbl:'Y'} });
    }else {
      if(opts.value.type === 'waiting'){
      go({ path: '/gmp/sy', query: { id: record.sqsxSqsx.id,spid:record.id,sfbl:'Y'} });
    }else{
      go({ path: '/gmp/sy', query: { id: record.id ,sfbl:'N'} });
    }

    }

   }
   /**
      * 操作栏
      */
   function getTableAction(record){
       return [
         {
           label:'YS' == record.hjm? '预审': opts.value.btnName,
           onClick: godetils.bind(null, record),
         }
       ]
     }

function toViewModel(record: Recordable) {
  if(record.sqxm != 'gmpxm'){
    go({ path: '/gmp/zbsy', query: { id: record.id, sfbl:'N'} });
  }else{
    go({ path: '/gmp/sy', query: { id: record.id, sfbl: 'N' } });
  }
}

  watch(route, () => {
    reload();
  });
</script>
<style scoped>

</style>