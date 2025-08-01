<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable">
     <!--插槽:table标题-->
          <template #tableTitle>
            <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"  v-if="hasPermission(['gmp:jdzb:save'])"> 新增</a-button>
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
  import {columns,dbcolumns,jdzbcolumns,searchjdzbFormSchema} from './SqsxSqsx.data';
  import { CheckCircleOutlined } from '@ant-design/icons-vue';
  import {list,deleteOne,getImportUrl,getExportUrl,spjlList} from './SqsxSqsx.api';
  import { getDictItems } from '/@/utils/dict/JDictSelectUtil';
  import { useGo } from '/@/hooks/web/usePage';
  import { propTypes } from '/@/utils/propTypes';
  import {useModal} from '/@/components/Modal';
  import { useUserStore } from '/@/store/modules/user';
  import { usePermission } from '/@/hooks/web/usePermission';

  const userStore = useUserStore();
  const { hasPermission } = usePermission();
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
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            title: '申请事项',
            showIndexColumn: true,
            api: opts.value.api,
            columns: jdzbcolumns,
            canResize:false,
            formConfig: {
               labelWidth: 120,
               schemas: searchjdzbFormSchema,
               autoSubmitOnEnter:true,
               showAdvancedButton:true,
             },
            actionColumn: {
                width: 110,
                ifShow: opts.value.type != 'all'
             },
             beforeFetch(params){
              // params.source = '1';
              params.createBy = userStore.getUserInfo.username;
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

   function handleAdd() {
        go({path:'/gmp/zbsy',query:{ sfbl:'Y'} })
   }
   
   async function handleDelete(record) {
     await deleteOne({id: record.id}, reload);
   }

   /**
    * 成功回调
    */
   function handleSuccess({isUpdate, values}) {
      reload();
   }

   const go = useGo();
   
   function godetils(record: Recordable){
    if(record.state == 0 || record.dqbz == 'JCSH' || record.dqbz == 'ZZ'){
      go({ path: '/gmp/zbsy', query: { id: record.id ,sfbl:'Y'} });
    }else{
      go({ path: '/gmp/zbsy', query: { id: record.id ,sfbl:'N'} });
    }
   }
   /**
      * 操作栏
      */
   function getTableAction(record){
       return [
         {
           label:'0' == record.state? '修改': ('ZZ' == record.dqbz ? '制证' : ('JCSH' == record.dqbz ? '审核' : opts.value.btnName)),
           onClick: godetils.bind(null, record),
         }, {
             label: '删除',
             ifShow:record.state == '0',
             auth:'gmp:jdzb:delte',
             popConfirm: {
               title: '是否确认删除',
               confirm: handleDelete.bind(null, record),
             }
           }
       ]
     }

     
function toViewModel(record: Recordable) {
  go({ path: '/gmp/zbsy', query: { id: record.id, sfbl: 'N' } });
}

  watch(route, () => {
    reload();
  });
</script>
<style scoped>

</style>