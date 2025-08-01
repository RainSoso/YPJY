<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" class="my-basic-table">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-space :wrap="true">
          <a-tag v-for="(item, idx) in qyTags" class="xl cursor-pointer" :color="item.color" :key="idx"
            @click="fastFitler(item)">
            <template #icon>
              <check-circle-outlined v-if="currentTag == item.value" />
            </template>{{ item.text }}
          </a-tag>
        </a-space>
      </template>
      <template #form-advanceBefore>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
      </template>

      <template #zjpz="{ record }">
        <a-button type="link" class="!px-0" @click="toyppz(record, '-')"> {{ record.yppz }} </a-button>
        /
        <a-button type="link" class="!px-0" @click="toyppz(record, '1')">{{ record.yppzZc }}</a-button>
      </template>
      <template #rcjg="{ record }">
        <a-button type="link" @click="torcjg(record)">{{ record.jdjc }}</a-button>
      </template>
      <template #zfcf="{ record }">
        <a-button type="link" @click="tozfcf(record)">{{ record.zfcf }}</a-button>
      </template>
      <template #cjy="{ record }">
        <a-button type="link" :class="0 < record.cjyBhg ? '!px-0' : ''" @click="tocy(record, '-')">
          {{ record.cjy }}
        </a-button>
        <template v-if="0 < record.cjyBhg">
          /
          <a-button type="link" class="!px-0" @click="tocy(record, '2')" danger ghost>{{ record.cjyBhg }}</a-button>
        </template>
        <!-- <a-button type="link" @click="tocy(record)">{{ record.cjy }}</a-button> -->
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" name="yqyd-yljgzjs" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { CheckCircleOutlined } from '@ant-design/icons-vue';
import { BasicTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage'
import { columns, getSearchFormSchema } from './list.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './list.api';
import { useGo } from '/@/hooks/web/usePage';
import { getLikeValue } from '/@/utils/area/areaDataUtil';
import { getDictItems } from '/@/utils/dict/JDictSelectUtil';
import Tools from '/@/utils/tools';

const route = useRoute();
//注册model
const [registerModal, { openModal }] = useModal();
//注册table数据
const { prefixCls, tableContext, onExportXls } = useListPage({
  tableProps: {
    title: 'TJXX',
    api: list,
    columns,
    canResize: false,
    showIndexColumn: true,
    formConfig: {
      labelWidth: 80,
      schemas: getSearchFormSchema(route.query?.year),
      autoSubmitOnEnter: true,
      showAdvancedButton: false,
      async resetFunc() {
        currentTag.value = '';
      }
    },
    actionColumn: {
      width: 80,
      fixed: 'right'
    },

    beforeFetch(params) {
      // if(route.params?.ylzjsfyc=='1'){
      //   params.ylzjsfyc=route.params?.ylzjsfyc||'';
      //   delete params.zslx;
      // }else if(route.params?.ylzjsfyc=='2'){
      //   params.ylzjsfyc=route.params?.ylzjsfyc||'';
      //   params.zslx='7'
      // }else{
      //   params.zslx = route.path?.endsWith('/yljgzjs') ? '7' : '6';
      // } 
      params.tc = route.params?.tc || '';
      params.zcpz = route.params?.zcpz || '';
      if (route.params?.ylzjsfyc) {
        const str = route.params.ylzjsfyc.split(',');
        params.ylzjsfyc = str[0];
        params.csdm = str[1];
        delete params.zslx;
        if (str[0] == '2') {
          params.zslx = '7'
        }

      } else {
        params.zslx = route.path?.endsWith('/yljgzjs') ? '7' : '6';
      }
      if (route.params?.dw) {
        const str = route.params.dw.split(',');
        params.dw = str[0];
        params.csdm = str[1];
        params.zslx = '7'
      }
      params.column = '12';
      params.zt = '0';
      if(route.query?.isYj){     
        params.isYj=route.query.isYj
        params.year=route.query.year
      } 
      params.xzqhdm = getLikeValue(route.query.xzqhdm || params.xzqhdm);
      if (Tools.getCurrentYear() == params.year) params.isValid = 'Y';
      delete params.column;
      delete params.order;
      return params;
    }
  },
  exportConfig: {
    name: "药品生产企业",
    url: getExportUrl,
    params: { zslx: '7',ylzj:route.params?.ylzjsfyc }
  },
  importConfig: {
    url: getImportUrl
  },
})

const qyTags = ref([]), currentTag = ref('');
getDictItems('zjQyTags').then((res) => {
  qyTags.value = res;
});

const go = useGo();
const [registerTable, { reload, getForm }, { rowSelection, selectedRowKeys }] = tableContext;

async function fastFitler(item) {
  if (currentTag.value != item.value) {
    currentTag.value = item.value;
    await getForm().setFieldsValue({ tags: '*,' + item.value + ',*' });
  } else {
    currentTag.value = '';
    await getForm().setFieldsValue({ tags: '' });
  }
  reload();
}
/**
 * 新增事件
 */
function handleAdd() {
  openModal(true, {
    isUpdate: false,
    showFooter: true,
  });
}


/**
 * 编辑事件
 */
function handleEdit(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true,
    showFooter: true,
  });
}
/**
 * 详情
*/
function handleDetail(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true,
    showFooter: false,
  });
}
/**
 * 删除事件
 */
async function handleDelete(record) {
  await deleteOne({ id: record.id }, reload);
}
/**
 * 批量删除事件
 */
async function batchHandleDelete() {
  await batchDelete({ ids: selectedRowKeys.value }, reload);
}
/**
 * 成功回调
 */
function handleSuccess({ isUpdate, values }) {
  reload();
}
/**
   * 操作栏
   */
function getTableAction(record) {
  return [
    {
      label: '详情',
      onClick: getGo.bind(null, record),
    }
  ]
}
function getGo(record: Recordable) {
  console.log(`/yqyd/yljgzjs/detail/${encodeURIComponent(record.qymc || '')}` + '/' + record.shxydm);
  go(`/yqyd/yljgzjs/detail/${encodeURIComponent(record.qymc || '')}` + '/' + record.shxydm);

}
function toyppz(record: Recordable, sczk) {
  go({ path: '/ypyd/yljgzj', query: { shxydm: record.shxydm, sczk: sczk != '-' ? sczk : undefined } });
}

function torcjg(record: Recordable) {
  go('/yw/rcjg/' + record.shxydm);
}

function tozfcf(record: Recordable) {
  go('/yw/zfcf/' + record.shxydm);
}
// function tocy(record: Recordable) {
//   go('/yw/ypcyjl/' + record.shxydm);
// }
function tocy(record: Recordable, jyjg) {
  go('/yw/ypcyjl/' + record.shxydm + '/' + jyjg);
}
</script>
<style scoped>
</style>
