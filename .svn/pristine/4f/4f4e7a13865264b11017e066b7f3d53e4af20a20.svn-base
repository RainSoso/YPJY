<template>
  <div  class="bg-white m-4 p-4">
    <h2 class="flex items-center justify-center text-center text-2xl font-600 p-4">
      {{ title }}（{{ isYj }}:{{ num }}）
    </h2>
    <div>
      <a-row >
            <a-form-item label="社会信用代码" :label-col="{ span: 7 }" :wrapper-col="{ span: 6 }">
              <a-input placeholder="社会信用代码" v-model:value="shxydm" style="margin-right: 8px;width: 220px;"/>
            </a-form-item>
            <a-form-item label="企业名称" :label-col="{ span: 7 }" :wrapper-col="{ span: 8 }">
              <a-input placeholder="企业名称" v-model:value="qymc" style="margin-right: 8px;width: 220px;"/>
            </a-form-item>
            <a-button type="primary" @click="handleSearch" style="margin-left: 20px;">搜索</a-button>
      </a-row>           
    </div>
    <a-table :columns="columns" :data-source="data" size="middle" bordered :loading="loading" :pagination="pagination"
      @change="handleTableChange">
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #action="{ record }">
        <span v-if="record.jcsj">
          <a @click="openDetailModel(record)">详情</a>
        </span>
      </template>
    </a-table>
  </div>
  <TywrcjgxqDetils @register="registerModal"></TywrcjgxqDetils>
</template>
<script lang="ts">
import { defineComponent, h, ref, unref, createVNode } from 'vue';
import { Button,Tag } from 'ant-design-vue';
import { ColumnProps } from 'ant-design-vue/es/table/interface';
import { useRoute } from 'vue-router';
import { defHttp } from '/@/utils/http/axios';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import TywrcjgxqDetils from '/@/views/ypsczhjg/yw/rcjg/modules/TywrcjgxqDetils.vue'
import { useModal } from '/@/components/Modal';
import { useGo } from '/@/hooks/web/usePage';

const [registerModal, { openModal }] = useModal();
const data = ref([]);
const isYj = ref("")
const num = ref("")
const title = ref("")
const loading=ref(true)
const pagination = ref({
  total: 0,
  pageSize: 10,//每页中显示10条数据
  pageNo: 1,
})
export default defineComponent({
  components: { TywrcjgxqDetils },
  setup() {
    const go = useGo();
    const route = useRoute();
    const shxydm = ref('');
    const qymc = ref('');
    const columns: ColumnProps[] = [
      {
        title: '企业名称',
        align: "center",
        dataIndex: 'qymc',
        customRender: ({ text, record }) => {
          const obj = {
            children: [record.sczk == '0'?createVNode(Tag, { color: 'red'}, '停产') : '',createVNode(Button, { type: 'link', class: 'qyxx-btn !px-0', onClick: () => toQyDetial(record) }, () => text || '')],
            // children: text,
            props: {} as any,
          };

          if (record.rowSpan) {
            obj.props.rowSpan = parseInt(record.rowSpan, 10);
          }
          return obj;
        },
      },
      {
        title: '检查时间',
        align: "center",
        dataIndex: 'jcsj',
        width: 110
      },
      {
        title: '检查人',
        align: "center",
        dataIndex: 'jcr',
      },
      {
        title: '检查结论',
        align: "center",
        dataIndex: 'zhpdjl',
        customRender: function (text) {
          return filterDictTextByCache("jdjcZhpdjl", text.text)
        },
        width: 110
      },
      {
        title: '缺陷数量',
        align: "center",
        dataIndex: '',
        customRender({ record: row }) {
          if (row.jcsj) {
            return h('div', { style: { display: 'inline-flex', alignItems: 'center', textAlign: 'left', flexWrap: 'wrap', margin: '0 4px' } }, [
              h('div', { style: { width: '50%' } }, ['严重：', row.yzqxsl]),
              h('div', { style: { width: '50%' } }, ['主要：', row.zyqxsl]),
              h('div', { style: { width: '50%' } }, ['一般：', row.ybqxsl]),
              h('div', { style: { width: '50%' } }, ['未定义：', row.wdyqxsl])
            ]);

          } else {
            return null;
          }
        },
        width: 175
      },
      // {
      //   title: '检查报告',
      //   align:"center",
      //   dataIndex: '',
      //   width:500,
      //   customRender({ record: row }) {
      //       if(row.jcsj){
      //         return h('div', { style: { } }, [
      //             h('div', { style: { width: '500px'} }, ['检查报告正文：',   row.jcbgzw?row.jcbgzw.split(',/')[0]:"无"]),  
      //             h('div', { style: { width: '500px' } }, ['中和评定报告书：', row.zhpdbg?row.zhpdbg.split(',/')[0]:"无"]),
      //             h('div', { style: { width: '500px' } }, ['整改报告：', row.localZgbg?row.localZgbg.split(',/')[0]:"无"])
      //         ]); 
      //       }else{
      //         return null;
      //       } 
      //   }  
      // },
      {
        title: '操作',
        key: 'action', align: 'center',
        slots: { customRender: 'action' },
        width: 70
      },
    ];


    getList(route.query);

    function handleTableChange(pag) {
      pagination.value.pageNo = pag.current;
      getList(route.query);
    }

    const handleSearch = () => {
      getList(route.query);
    };


    function getList(params) {
      loading.value = true;
      data.value=[];
      params.pageNo = pagination.value.pageNo;
      params.pageSize = pagination.value.pageSize;
      if (params.isYj) isYj.value = '应检企业';
      if (params.isYj === '1' || params.isYj === '2' || params.isYj === '3' || params.isYj === '4' || params.isYj === '5') isYj.value = '已检企业';
      if (params.isYj === '11' || params.isYj === '22' || params.isYj === '33' || params.isYj === '44' || params.isYj === '55') isYj.value = '未检企业';
      if (params.isYj === '99') isYj.value = '停产企业';
      if (params.num) num.value = params.num
      if (params.title) title.value = params.title
      if (shxydm.value) params.dm = unref(shxydm.value);
      if (qymc.value) params.mc = unref(qymc.value);
      if (params.yppzlx && columns.length === 6 && params.showYpmc != 'false') {
        let a = {
          title: '药品通用名称',
          align: "center",
          dataIndex: 'yptymc',
          customRender: ({ text, record }) => {
            if (text) {
              let a = text.split(',');
              let b = [];

              a.forEach(el => {
                b.push(h('div', { style: { width: '100%' } }, ['', el]));
              });
              text = h('div', { style: { alignItems: 'center', textAlign: 'left', flexWrap: 'wrap' } }, b);
            }

            const obj = {
              children: text,
              props: {} as any,
            };
            if (record.rowSpan) {
              obj.props.rowSpan = parseInt(record.rowSpan, 10);
            }
            return obj;
          },
          width: 200
        };
        columns.splice(1, 0, a);
      }

      defHttp.get({ url: "/jc/yw/jdjc/getQyDetail", params: params }).then((res) => {
        data.value = res.records;
        pagination.value.total = res.total;
        pagination.value.pageNo = 1;
        loading.value=false;
      });
      params.mc = '';
      params.dm = '';
    }

    function openDetailModel(record) {
      openModal(true, {
        record,
        isUpdate: true,
        showFooter: true,
      });
    }

    function toQyDetial(record) {
      go({ path: `/yqyd/ypsc/TJcQyJbxxList/${record.qymc}/${record.shxydm}` })
    }
    return {
      data,
      isYj,
      columns,
      num,
      pagination,
      title,
      getList,
      handleTableChange,
      openDetailModel,
      registerModal,
      qymc,
      shxydm,
      loading,
      handleSearch,
    };
  },
});
</script>