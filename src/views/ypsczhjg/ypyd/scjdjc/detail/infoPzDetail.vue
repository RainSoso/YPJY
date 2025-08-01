<template>
  <div ref="bodyEl" class="bg-white m-4 p-4">
    <h2 class="flex items-center justify-center text-center text-2xl font-600 p-4">
      {{title}}（{{isYj}}:{{num}}）
    </h2>
    <div>
            <a-row >
                  <a-form-item label="药品批准文号" :label-col="{ span: 7 }" :wrapper-col="{ span: 6 }">
                    <a-input placeholder="药品批准文号" v-model:value="pzwh" style="margin-right: 8px;width: 220px;"/>
                  </a-form-item>
                  <a-form-item label="药品通用名称" :label-col="{ span: 7 }" :wrapper-col="{ span: 6 }">
                    <a-input placeholder="药品通用名称" v-model:value="mc" style="margin-right: 8px;width: 220px;"/>
                  </a-form-item>
              <a-button type="primary" @click="handleSearch">搜索</a-button>
            </a-row>
    </div>
    <a-table :columns="columns" :data-source="data" size="middle" bordered :pagination="pagination" :loading="loading" @change="handleTableChange">
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
import { defineComponent, h ,ref,unref} from 'vue';
import { ColumnProps } from 'ant-design-vue/es/table/interface';
import { useRoute } from 'vue-router';
import { defHttp } from '/@/utils/http/axios';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import TywrcjgxqDetils from '/@/views/ypsczhjg/yw/rcjg/modules/TywrcjgxqDetils.vue'
import { useModal } from '/@/components/Modal';
const [registerModal, { openModal }] = useModal();
const data = ref([]);
const isYj=ref("");
const num=ref("");
const title=ref("");
const loading=ref(true);
const pagination=ref({
  total: 0,
  pageSize: 10,//每页中显示10条数据
  pageNo:1,
})
export default defineComponent({
  components: { TywrcjgxqDetils},
  setup() {
    const route = useRoute();
    const pzwh = ref('');
    const mc = ref('');
    const columns: ColumnProps[] = [
      {
        title: '企业名称',
        align:"center",
        dataIndex: 'qymc',
        customRender:({ text, record }) => {
          const obj = {
            children: text,
            props: {} as any,
          }; 
         
          if(record.rowSpan){
            obj.props.rowSpan = parseInt(record.rowSpan,10); 
          } 
          return obj;
        }
      },
      {
        title: '品种名称',
        align:"center",
        dataIndex: 'yptymc',
        customRender:({ text, record }) => {
          const obj = {
            children: text,
            props: {} as any,
          }; 
         
          if(record.pzRowSpan){
            obj.props.rowSpan = parseInt(record.pzRowSpan,10); 
          } 
          return obj;
        }
      },
      
      {
        title: '检查时间',
        align:"center",
        dataIndex: 'jcsj',
        width:110
      },
      {
        title: '检查人',
        align:"center",
        dataIndex: 'jcr',
      },
      {
        title: '检查结论',
        align:"center",
        dataIndex: 'zhpdjl',
        customRender: function (text) {
          return filterDictTextByCache("jdjcZhpdjl", text.text)
        },
        width:110
      },
      {
        title: '缺陷数量',
        align:"center",
        dataIndex: '',
        customRender({ record: row }) {
          if(row.jcsj){
            return h('div', { style: { display: 'inline-flex', alignItems: 'center', textAlign: 'left', flexWrap: 'wrap', margin: '0 4px' } }, [
                  h('div', { style: { width: '50%' } }, ['严重：', row.yzqxsl]),
                  h('div', { style: { width: '50%' } }, ['主要：', row.zyqxsl]),
                  h('div', { style: { width: '50%' } }, ['一般：', row.ybqxsl]),
                  h('div', { style: { width: '50%' } }, ['未定义：', row.wdyqxsl])
            ]); 

          }else{
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
        title: '操作', align: 'center',
        key: 'action',
        slots: { customRender: 'action' },
        width: 70
      },
    ];
    
    getList(route.query);

    function handleTableChange(pag){
      pagination.value.pageNo=pag.current;
      getList(route.query);
    }

    const handleSearch = () => { 
      getList(route.query);
    };

    function getList(params){
      loading.value = true;
      data.value=[];
      params.pageNo=pagination.value.pageNo;
      params.pageSize=pagination.value.pageSize;
      if(params.isYj==='0')isYj.value='应检品种';
      if(params.isYj==='1')isYj.value='已检品种';   
      if(params.isYj==='11')isYj.value='未检品种';
      if(params.title){
        title.value=params.title
        if(params.title==="重点检查类别情况"){ 
          let a={
            title: '应检次数',
            align:"center",
            customRender:({ record }) => {
              let lx="";
              if(record){  
                if(params.jclx==="gmp")lx='GMP符合性检查(次/年):'+record.gmpyj;
                if(params.jclx==="zx")lx='专项检查(次/年):'+record.zxyj;
                if(params.jclx==="yy")lx='有因检查(次/年):'+record.yyyj;
                if(params.jclx==="ywjj")lx='药物警戒检查(次/年):'+record.ywjj;
              }
              const obj = {
              children: lx,
              props: {} as any,
              }; 
              if(record.pzRowSpan){
                obj.props.rowSpan = parseInt(record.pzRowSpan,10); 
              } 
              return obj;
            },
            width:160
          }
          columns.splice(2,0,a);
        }
      }
      if(params.num)num.value=params.num
      if (pzwh.value) params.wh = unref(pzwh.value);
      if (mc.value) params.mc = unref(mc.value);
      defHttp.get({url:"/jc/yw/jdjc/getPzDetail",params:params}).then((res)=>{
        data.value=res.records;
        pagination.value.total=res.total;
        pagination.value.pageNo=1;
        loading.value=false
      });

      params.wh = '';
      params.mc = '';
    }

    function openDetailModel(record){
      openModal(true, {
        record,
        isUpdate: true,
        showFooter: true,
      });
    }
    return {
      data,
      isYj,
      columns,
      title,
      num,
      pagination,
      getList,
      handleTableChange,
      openDetailModel,
      registerModal,
      pzwh,
      mc,
      handleSearch,
      loading,
    };
  },
});
</script>