<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" class="my-basic-table">
      <!--插槽:table标题-->
      <template #tableTitle v-if="showTags">
        <MCategoryFilter v-model:value="currentTag" pcode="A02" @change="fastFitler" />
      </template>
      <template #form-advanceBefore>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls" class="mr-2"> 导出</a-button>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"
          v-if="hasPermission(['jc:pz:ypzcscjy:add'])"> 新增</a-button>
        <div class="float-right text-base mt-4px">注：行背景色标识集采级别
          <span v-for="item in levelsList">
            <span :class="item.colorStr" style="padding: 5px; color: #fff; font-size: 16px;">{{ item.levels }}</span>
          </span>
        </div>
      </template>

      <template #cjqk="{ record }">
        <span v-if="record.cjcs > 0">今年已抽</span>
        <span v-else-if="record.cjcs3 > 0">近3年已抽</span>
      </template>
      <template #jnCjqk="{ record }">
        <a-button type="link" v-if="record.cjcs > 0" @click="toJnCjqk(record)">{{ record.cjcs }}次</a-button>
      </template>
      <template #scztqk="{ record }">
        <a-button type="link" @click="toJnCjqk(record)"></a-button>
      </template>

      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <JcPzYppzModal @register="registerModal" @success="handleSuccess"></JcPzYppzModal>
  </div>
</template>

<script lang="ts" name="ypyd-gcyppz" setup>
import { ref, computed, unref } from 'vue';
import { useRoute } from 'vue-router';
import { CheckCircleOutlined } from '@ant-design/icons-vue';
import { BasicTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { useModal } from '/@/components/Modal';
import { useGo } from '/@/hooks/web/usePage';
import { getColumns, getSearchFormSchema } from './JcPzYpzcscjy.data';
import { list, getImportUrl, getExportUrl } from './JcPzYpzcscjy.api';
import JcPzYppzModal from './JcPzYppzModal.vue';
import { usePermission } from '/@/hooks/web/usePermission';
import MCategoryFilter from '/@/components/Custom/MCategoryFilter.vue';
import { defHttp } from '/@/utils/http/axios';
import { columnRender } from '/@/utils/dict/dictUtils';

const jcxxList = ref([]);
const levelsList = ref([]);

const rowColor = (record, idx) => {
  let m = new Map()
  m.set("国家级", 0)
  m.set("国采接续", 10)
  m.set("国采第一接续", 11)
  m.set("国采第三接续", 13)
  m.set("省际联盟", 20)
  m.set("省级", 30)
  m.set("地市联盟", 40)
  m.set("地市", 50)

  let s = ""
  let col = ""
  if (jcxxList.value) {
    jcxxList.value.forEach(element => {
      if (record.yppzwh == element.pzwh) {
        if (col) {
          if (m.get(col) > m.get(element.levels)) {
            col = element.levels;
          }
        } else {
          col = element.levels;
        }
      }
    });
  }

  if (levelsList.value) {
    levelsList.value.forEach(el => {
      if (el.levels == col) {
        s = el.colorStr;
      }
    });
  }
  return s;
}
const go = useGo();
const route = useRoute();
const { hasPermission } = usePermission();
//注册model
const [registerModal, { openModal }] = useModal();
//注册table数据
const { tableContext, onExportXls } = useListPage({
  tableProps: {
    showIndexColumn: true,
    rowKey: 'yppzwh',
    api: list,
    columns: getColumns(false, route.query?.showJnCjqk == 'true'),
    rowClassName: rowColor,
    canResize: false,
    formConfig: {
      labelWidth: 80,
      autoAdvancedCol: 4,
      schemas: getSearchFormSchema(route),
      autoSubmitOnEnter: true,
      showAdvancedButton: false,
      async resetFunc() {
        currentTag.value = '';
      },
      actionColOptions: {
        span: 24,
        xxl: 24,
        xl: 24,
        lg: 24
      },
    },
    actionColumn: {
      width: 110,
      fixed: 'right',
    },
    defSort: {
      column: 'areaCode',
      order: 'asc',
    },
    beforeFetch(params) {
      params.pzzt = '1';
      if (route.params?.cy) {
        params.cy = route.params.cy;
      }
      if (route.params?.tz) {
        params.tz = route.params.tz;
      }
      if (route.params?.sfzcpz) {
        params.sfzcpz = route.params.sfzcpz;
      }
      if (route.params?.sfzs) {
        params.sfzs = route.params.sfzs;
      }
      /* 首页在产品种钻取 */
      if (route.params.zc != null) {
        const str = route.params.zc.split(',');
        params.xzqhdm = str[1];
        params.sczk = '1';
      } else {
        params.sczk = (route.params?.sczk != '-' && route.params?.sczk) || params.sczk || '';
      }
      if (route.params.pzwh != null) {
        const str = route.params.pzwh.split(',');
        params.ypfl = '3';
        params.xzqhdm = str[1];
      }
      /* 首页特殊药品批准文号钻取 */
      if (route.params?.tsyp) {
        const str = route.params.tsyp.split(',');
        params.tsyp = str[0];
        params.xzqhdm = str[1];
      }
      /* 首页药品生产企业批准文号钻取 */
      if (route.params?.qz) {
        const str = route.params.qz.split(',');
        params.qz = str[0];
        params.xzqhdm = str[1];
      }
      if (route.params?.ypfl) {
        const str = route.params.ypfl.split(',');
        params.ypfl = str[0];
        params.xzqhdm = str[1];
      }
      if (route.params?.jc) {
        params.tags = '*,A02A09A03,*';
        const str = route.params.jc.split(',');
        if (null != str[1]) {
          params.xzqhdm = str[1];
        }
      }
      params.jc = route.params?.jc || '';
      params.wh = route.params?.wh || '';
      if(route.query?.sczk){
        params.sczk = route.query?.sczk || '';
      }
      params.forceTags = route.query?.forceTags || '';
      params.delFlag = 0;
      if (route.query?.isCyr == 'true') params.cyrshxydm = route.params?.shxydm || '';
      else params.shxydm = route.params?.shxydm || '';
      if (route.query?.isCyr) params.isCyr = route.query?.isCyr;
      if (route.query?.year) params.year = route.query?.year;
      if (route.query?.wfhj) params.wfhj = route.query.wfhj;
      if (route.query?.scfl) params.scfl = route.query.scfl;
      if (route.query?.zszt) params.zszt = route.query.zszt;
      if (route.query?.xzqhdm) {
        params.xzqhdm = route.query.xzqhdm;
      }
      if (route.query?.yppzlx) {
        params.year = route.query.year;
        params.xzqhdm = route.query.xzqhdm;
        params.yppzlx = route.query.yppzlx;
        params.isYj = route.query.isYj;
        params.pzfw = '1';
        if (route.query.yppzlx == 'swzpyp') {
          params.tags = '*,A02A05,*';
        }
      }
      getJcxxList();
      return params;
    },
  },
  exportConfig: {
    name: '国产药品品种',
    url: getExportUrl,
    params: {
      zc: route.params?.zc,
      qz: route.params?.qz,
      tsyp: route.params?.tsyp,
      swzp: route.params?.pzwh,
      ypfl: route.params?.ypfl,
      cy: route.params?.cy,
      jczc: route.params.sfzcpz,
      jczs: route.params.sfzs,
      wfhj: route.query?.wfhj,
      xzqhdm: route.query?.xzqhdm,
    },
  },
  importConfig: {
    url: getImportUrl,
  },
});

const [registerTable, { reload, getForm }, { rowSelection, selectedRowKeys }] = tableContext;

const currentTag = ref('');
const showTags = ref(route.query?.showTags != 'false');
async function fastFitler(item) {
  let val = item.length ? item[0].code : '';
  await getForm().setFieldsValue({ tags: val ? '*,' + item[0].code + '*' : '' });
  reload();
}

function getJcxxList() {
  defHttp.get({ url: "/jc/pz/jcxx/jcxxList", params: {} }).then((res) => {
    jcxxList.value = res.jcxxList;
    let list = res.levelsList;
    let colorList = ["bg-red-300", "bg-blue-300", "bg-yellow-300", "bg-green-300", "bg-orange-300", "bg-purple-300", "bg-gray-300", "bg-brown-300"];
    for (var i = 0; i < list.length; i++) {
      list[i].colorStr = colorList[i]
    }
    levelsList.value = list;
  })
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
  go(`/ypyd/detail/${encodeURIComponent(record.yppzwh || '')}`);
}
function toJnCjqk(record: Recordable) {
  go({ path: '/jgyw/ypcj', query: { pzwh: record.yppzwh } });
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
      label: '编辑',
      auth: 'jc:pz:ypzcscjy:edit',
      onClick: handleEdit.bind(null, record),
    },
    {
      label: '详情',
      onClick: handleDetail.bind(null, record),
    },
  ];
}
</script>
<style lang="less" scoped>
:deep(.bg-red-300) {
  td {
    background-color: rgba(252, 165, 165, 1);
  }
}

:deep(.bg-blue-300) {
  td {
    background-color: hsl(224, 93%, 82%);
  }
}

:deep(.bg-yellow-300) {
  td {
    background-color: rgb(252, 250, 165);
  }
}

:deep(.bg-green-300) {
  td {
    background-color: rgb(165, 252, 172);
  }
}

:deep(.bg-white-300) {
  td {
    background-color: #ffffff;
  }
}

:deep(.bg-orange-300) {
  td {
    background-color: rgb(243, 252, 165);
  }
}

:deep(.bg-purple-300) {
  td {
    background-color: rgb(249, 165, 252);
  }
}

:deep(.bg-gray-300) {
  td {
    background-color: rgb(179, 173, 173);
  }
}

:deep(.bg-brown-300) {
  td {
    background-color: rgb(82, 29, 29);
  }
}</style>
