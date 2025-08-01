<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" width="1200px">
    <div class="panel-heading">
      <div class="panel" style="margin-top: 20px">企业信息 </div>
    </div>
    <div class="table1">
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr>
          <td class="right tab_apply required">上市许可持有人企业名称</td>
          <td class="left">{{params.qymc}}</td>  
          <td class="right tab_apply required">统一社会信用代码</td>
          <td class="left" >{{params.shxydm}}</td>  
        </tr>
        <tr>
          <td class="right tab_apply required">计划生产年份</td>
          <td class="left">{{params.jhYear}}</td> 
          <td class="right tab_apply required">计划表名</td>
          <td class="left" >{{params.jhTitle_dictText}}</td> 
        </tr>
      </table>
    </div>
  

    <div v-if="params.jhTitle==3">
      <div class="panel-heading">
        <div class="panel" style="margin-top: 20px">生产信息
          <a-button type="primary" @click="selectQy('scpz')" style="float: right; margin-top: 5px" v-if="params.sbState < 20 || !params.sbState"> 品种选择</a-button>
          
        </div>
      </div>
      <div class="table1">
        <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
          <tr>
            <td class="right tab_apply required">生产药品名称</td>
            <td class="left">{{params.scypmc}}</td> 
            <td class="right tab_apply required">药品批准文号（备案号）</td>
            <td class="left">{{params.scyppzwh}}</td>
          </tr>
          
        </table>
        <a-table :dataSource="scpzList" :columns="columns" bordered style="width: 1180px;" v-if="scpzList.length>0">
          
        </a-table>
      </div>
    </div>


    <div v-if="params.jhTitle!=3">
    <div class="panel-heading" >
      <div class="panel" style="margin-top: 20px">生产信息</div>
    </div>
    <div class="table1">
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr>
          <td class="right tab_apply required">生产药品名称</td>
          <td class="left">{{params.scypmc}}</td> 
          <td class="right tab_apply required">药品批准文号（备案号）</td>
          <td class="left">{{params.scyppzwh}}</td>
        </tr>
        <tr>
          <td class="right tab_apply required">规格</td>
          <td class="left">{{params.ypgg}}</td> 
          <td class="right tab_apply required">单位</td>
          <td class="left">{{params.dw}}</td> 
        </tr>
        <tr>
          <td class="right tab_apply required">生产药品现有库存</td>
          <td class="left" colspan="3">{{params.scypkc}}</td> 
        </tr>
        <tr>
          <td class="right tab_apply required">生产药品收购单位</td>
          <td class="left">{{params.sgdw}}</td> 
          <td class="right tab_apply required">生产药品收购数量</td>
          <td class="left">{{params.sgsl}}</td> 
        </tr>
        <tr>
          <td class="right tab_apply required">企业计划生产量</td>
          <td class="left">{{params.qyJhscl}}</td> 
          <td class="right tab_apply required">企业追加计划生产量</td>
          <td class="left">{{params.qyJhsclZj}}</td> 
        </tr>
        <tr>
          <td class="right tab_apply required">省局申报计划生产量</td>
          <td class="left">{{params.sjJhscl}}</td>
          <td class="right tab_apply required">省局申报追加计划生产量</td>
          <td class="left">{{params.sjJhsclZj}}</td> 
        </tr>
        <tr>
          <td class="right tab_apply required">国家下达计划生产量</td>
          <td class="left">{{params.gjJhscl}}</td> 
          <td class="right tab_apply required">国家下达追加计划生产量</td>
          <td class="left">{{params.gjJhsclZj}}</td> 
        </tr>
        <tr >
          <td class="tab_apply required">上年度（{{params.jhYear-1}}年）实际生产量(1-5月)</td>
          <td class="left" >{{params.sjscl1}}</td> 
          <td class="tab_apply required">本年度（{{params.jhYear}}年）实际生产量(1-5月)</td>
          <td class="left" >{{params.sjscl5}}</td> 
        </tr>
        <tr >
          <td class="tab_apply required">上年度（{{params.jhYear-1}}年）实际生产量(6-9月)</td>
          <td class="left"  colspan="3">{{params.sjscl2}}</td> 
        </tr>
        <tr >
          <td class="tab_apply required">上年度（{{params.jhYear-1}}年）预计生产量(10-12月)</td>
          <td class="left" colspan="3">{{params.sjscl4}}</td> 
        </tr>
        <tr >
          <td class="tab_apply required">上年度（{{params.jhYear-1}}年）实际生产量(10-12月)</td>
          <td class="left" colspan="3">{{params.sjscl3}}</td> 
        </tr>
      </table>
    </div>
  </div>

    <div class="panel-heading" >
      <div class="panel" style="margin-top: 20px">需用原料药信息（公斤或立升）</div>
    </div>
    <div class="table1" >
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr>
          <td class="right tab_apply required">需用原料药名称</td>
          <td class="left">{{params.xyylymc}}</td> 
          <td class="right tab_apply required">原料药品批准文号（备案号）</td>
          <td class="left">{{params.xyylypzwh}}</td> 
        </tr>
        <tr>
          <td class="tab_apply required">企业原料药现有库存量</td>
          <td class="left" colspan="3">{{params.xyylykc}}</td> 
        </tr>
        <tr>
          <td class="tab_apply required">原料药供应单位</td>
          <td class="left">{{params.gydwmc}}</td>      
          <td class="tab_apply required">追加原料药供应单位</td>
          <td class="left">{{params.gydwmcZj}}</td> 
        </tr>
        <tr>  
          <td class="right tab_apply required">企业计划需用量</td>
          <td class="left">{{params.qyXyylyjhsyl}}</td>
          <td class="right tab_apply required">企业追加计划需用量</td>
          <td class="left">{{params.qyXyylyjhsylZj}}</td> 
        </tr>
        <tr>
          <td class="right tab_apply required">省局申报计划需用量</td>
          <td class="left">{{params.sjXyylyjhsyl}}</td> 
          <td class="right tab_apply required">省局申报追加计划需用量</td>
          <td class="left">{{params.sjXyylyjhsylZj}}</td> 
        </tr>
        <tr>
          <td class="right tab_apply required">国家下达计划需用量</td>
          <td class="left">{{params.gjXyylyjhsyl}}</td> 
          <td class="right tab_apply required" >国家下达追加计划需用量</td>
          <td class="left">{{params.gjXyylyjhsylZj}}</td> 
        </tr>
        <tr >
          <td class="tab_apply required">上年度（{{params.jhYear-1}}年）实际需用量(1-5月)</td>
          <td class="left" >{{params.xyylysjsyl1}}</td> 
          <td class="tab_apply required">本年度（{{params.jhYear}}年）实际需用量(1-5月)</td>
          <td class="left" >{{params.xyylysjsyl5}}</td> 
        </tr>
        <tr >
          <td class="tab_apply required">上年度（{{params.jhYear-1}}年）实际需用量(6-9月)</td>
          <td class="left" colspan="3">{{params.xyylysjsyl2}}</td> 
        </tr>
        <tr>
          <td class="tab_apply required">上年度（{{params.jhYear-1}}年）预计需用量(10-12月)</td>
          <td class="left" colspan="3">{{params.xyylysjsyl4}}</td> 
        </tr>
        <tr>
          <td class="tab_apply required">上年度（{{params.jhYear-1}}年）实际需用量(10-12月)</td>
          <td class="left" colspan="3">{{params.xyylysjsyl3}}</td> 
        </tr>
      </table>
    </div>
    <div class="panel-heading">
        <div class="panel" style="margin-top: 20px">备注信息</div>
    </div>
    <div class="table1">
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr>
          <td class="tab_apply required">备注</td>
          <td class="left" colspan="3">{{params.remark}}</td>   
        </tr>
        <tr>
          <td class="tab_apply required">追加备注</td>
          <td class="left" colspan="3">{{params.remarkZj}}</td>   
        </tr>
      </table>
    </div>
    <div class="panel-heading" v-if="params.fj">
        <div class="panel" style="margin-top: 20px">附件</div>
    </div>
    <div class="table1" v-if="params.fj">
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr>
          <td class="tab_apply required">文件名</td>
          <td class="left">{{fjName}}</td>
          <td class="tab_apply required">操作</td>
          <td class="left">
            <a-button type="link" @click="toDownload(item)">下载</a-button>
            <a-button type="link" @click="toPreview(item)">预览</a-button>
          </td>
        </tr>
        <tr>         
        </tr>
      </table>
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import Tools from '/@/utils/tools';
import { getAppEnvConfig } from '/@/utils/env';
import { downloadByUrl } from '/@/utils/file/download';

const scpzList=ref([]);
const columns=[
  {
    title: '药品规格',
    align: "center",
    dataIndex: 'ypgg',
    width: '150px'
  },
  {
    title: '单位',
    align: "center",
    dataIndex: 'dw',
    width: '80px'
  },
  {
    title: '需用量（单个）',
    align: "center",
    dataIndex: 'xyl',
    width: '80px'
  },
  {
    title: '现有库存',
    align: "center",
    dataIndex: 'scypkc',
    width: '80px'
  },
  {
    title: '计划生产量',
    align: "center",
    dataIndex: 'qyJhscl',
    width: '80px'
  },
  {
    title: '追加生产量',
    align: "center",
    dataIndex: 'qyJhsclZj',
    width: '80px'
  },
  {
    title: '备注',
    align: "center",
    dataIndex: 'remarks',
    width: '80px'
  },
]
const isUpdate = ref(true);
const params = ref({});
const fjName=ref();
const { VITE_GLOB_DOMAIN_URL } = getAppEnvConfig();
const item=ref([])
//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  //重置表单
  params.value = {};
  scpzList.value=[];
  setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
  isUpdate.value = !!data?.isUpdate;
  if (unref(isUpdate)) {
    //表单赋值
    let formdata= JSON.parse(JSON.stringify(data))
    params.value=formdata.record;
    scpzList.value=formdata.record.items;
    if(params.value.fj){
      fjName.value=formdata.record.fj.split(",")[0]
      item.value=params.value.fj.split(",");
    }
  }
});
//设置标题
const title = '详情';
function toPreview(item) {
  let url = Tools.getAppInnerUrl() + '/ypsc-api/sys/common/static' + sfparam(item[1]) + "?filename=" + item[0];
  Tools.toPreview(url);
}
function toDownload(item) {
  downloadByUrl({
    url: VITE_GLOB_DOMAIN_URL + '/sys/common/static'+ sfparam(item[1]) + "?filename=" + item[0],
    fileName: item[0],
    target: '_blank',
  });
}
function sfparam(item){
  if(!/^\/.*/ig.test(item)){
    return '/'+item;
  }else{
    return item;
  }
   
}
</script>

<style lang="less" scoped>
.table1 {
  margin-bottom: 20px;
}

.panel {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 15px;
}

.panel-heading {
  padding: 0px 0px 0px 15px;
  height: 42px;
  line-height: 42px;
  margin-top: 20px;
  background-image: none;
  background-color: #eee5de;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  /* border:1px solid #BEBEBE; */
}

.table-striped tr {
  width: 100%;
  padding: 30px 0;
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

.table-striped td {
  border: 1px solid #ddd;
  padding: 8px;
  line-height: 1.42857143;
  text-align: center;
}

.table-striped .tab_apply {
  width: 200px;
  vertical-align: middle;
  color: #0986b0;
  font-weight: bold;
}

.table-striped .left {
  text-align: left;
}

.table-striped > tr:nth-child(odd) > td,
.table-striped > tr:nth-child(odd) > th {
  background-color: #f9f9f9;
}

.table-striped tr {
  width: 100%;
  padding: 30px 0;
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

.table-striped td {
  border: 1px solid #ddd;
  padding: 8px;
  line-height: 1.42857143;
  text-align: center;
}

.table-striped .tab_apply {
  width: 200px;
  vertical-align: middle;
  color: #0986b0;
  font-weight: bold;
  text-align: right;
}

.tab_apply {
  width: 200px;
  vertical-align: middle;
  color: #0986b0;
  font-weight: bold;
  text-align: right;
}

.table-striped .left {
  text-align: left;
}

.table-striped > tr:nth-child(odd) > td,
.table-striped > tr:nth-child(odd) > th {
  background-color: #f9f9f9;
}
/** 时间和数字输入框样式 */
:deep(.ant-input-number) {
  width: 100%;
}

:deep(.ant-calendar-picker) {
  width: 100%;
}
</style>