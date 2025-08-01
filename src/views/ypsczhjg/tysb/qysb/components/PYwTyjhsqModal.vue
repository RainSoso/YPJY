<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="1200" @ok="handleSubmit">
    <div class="panel-heading">
      <div class="panel" style="margin-top: 20px"
        >企业信息 <a-button type="primary" @click="selectQy('qy')" style="float: right; margin-top: 5px" v-if="params.sbState < 20 || !params.sbState"> 企业选择</a-button></div
      >
    </div>
    <div class="table1">
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr>
          <td class="right tab_apply required">上市许可持有人企业名称</td>
          <td class="left">
            <a-input placeholder="请填写上市许可持有人企业名称" maxLength="100" v-model:value="params.qymc" :disabled="params.sbState >= 10" />
          </td>
          <td class="right tab_apply required">统一社会信用代码</td>
          <td class="left">
            <a-input placeholder="请填写统一社会信用代码" maxLength="100" v-model:value="params.shxydm" :disabled="params.sbState >= 10" />
          </td>
        </tr>
       
        <tr>
          <td class="right tab_apply required">计划生产年份</td>
          <td class="left">
            <a-select v-model:value="params.jhYear" style="width: 100px" :disabled="params.sbState >= 10">
              <a-select-option v-for="item in yearArray" :key="item" :value="item">{{ item }}年</a-select-option>
            </a-select>
          </td>
          <td class="right tab_apply required">计划表名</td>
          <td class="left" >
            <JDictSelectTag  v-model:value="params.jhTitle" placeholder="请选择计划表名" dictCode="tysc_title" :showChooseOption="false" :disabled="params.sbState >= 10"/>
          </td>
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
            <td class="left">
              <a-input placeholder="请填写生产药品名称" maxLength="100" v-model:value="params.scypmc" :disabled="!(params.sbState < 20)" />
            </td>
            <td class="right tab_apply required">药品批准文号（备案号）</td>
            <td class="left">
              <a-input placeholder="请填写药品批准文号（备案号）" maxLength="100" v-model:value="params.scyppzwh" :disabled="!(params.sbState < 20)" />
            </td>
          </tr>
          <tr>
            <td class="right tab_apply required" v-if="params.sbState < 20 || !params.sbState">生产信息（按规格添加）</td>
              <a-button type="primary" @click="openAdd" style=" margin-top: 2px" v-if="params.sbState < 20 || !params.sbState"> 生产信息添加</a-button>
          </tr> 
        </table>
        <a-table :dataSource="scpzList" :columns="columns" bordered style="width: 1180px;" v-if="scpzList.length>0">
          <template #action="{ record }">
            <span>
              <a @click="zhuijia(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="deleteOne(record)" v-if="params.sbState < 20 || !params.sbState">删除</a>
              <a @click="zhuijia(record)" v-if="params.sbState == 30">追加</a>
            </span> 
          </template>
        </a-table>
      </div>
    </div>

    <div v-if="params.jhTitle!=3">
      <div class="panel-heading">
        <div class="panel" style="margin-top: 20px"
          >生产信息<a-button type="primary" @click="selectQy('scpz')" style="float: right; margin-top: 5px" v-if="params.sbState < 20 || !params.sbState"> 品种选择</a-button></div
        >
      </div>
      <div class="table1">
        <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
          <tr>
            <td class="right tab_apply required">生产药品名称</td>
            <td class="left">
              <a-input placeholder="请填写生产药品名称" maxLength="100" v-model:value="params.scypmc" :disabled="!(params.sbState < 20)" />
            </td>
            <td class="right tab_apply required">药品批准文号（备案号）</td>
            <td class="left">
              <a-input placeholder="请填写药品批准文号（备案号）" maxLength="100" v-model:value="params.scyppzwh" :disabled="!(params.sbState < 20)" />
            </td>
          </tr>
          <tr>
            <td class="right tab_apply required">规格</td>
            <td class="left">
              <a-input placeholder="请填写规格" maxLength="100" v-model:value="params.ypgg" :disabled="!(params.sbState < 20)" />
            </td>
            <td class="right tab_apply required">单位</td>
            <td class="left">
              <a-input placeholder="请填写单位" maxLength="100" v-model:value="params.dw" :disabled="!(params.sbState < 20)" />
            </td>
          </tr>
          <tr>
            <td class="right tab_apply required">生产药品现有库存</td>
            <td class="left" colspan="3">
              <a-input placeholder="请填写企业生产药品现有库存" maxLength="100" v-model:value="params.scypkc" :disabled="!(params.sbState < 20)" />
            </td>
          </tr>
          <tr v-if="params.jhTitle==0">
            <td class="right tab_apply required">生产药品收购单位</td>
            <td class="left">
              <a-input placeholder="请填写企业生产药品收购单位" maxLength="100" v-model:value="params.sgdw" :disabled="!(params.sbState < 20)" />
            </td>
            <td class="right tab_apply required">生产药品收购数量</td>
            <td class="left">
              <a-input placeholder="请填写企业生产药品收购数量" maxLength="100" v-model:value="params.sgsl" :disabled="!(params.sbState < 20)" />
            </td>
          </tr>
          <tr>
            <td class="right tab_apply required">企业计划生产量</td>
            <td class="left">
              <a-input placeholder="请填写企业计划生产量" maxLength="100" v-model:value="params.qyJhscl" :disabled="!(params.sbState < 20)" />
            </td>
            <td class="right tab_apply required" v-if="params.sbState > 20">企业追加计划生产量</td>
            <td class="left" v-if="params.sbState >= 30">
              <a-input placeholder="请填写企业追加计划生产量" maxLength="100" v-model:value="params.qyJhsclZj" :disabled="params.sbState > 40" />
            </td>
          </tr>
          <tr v-if="params.sbState > 10">
            <td class="right tab_apply required">省局申报计划生产量</td>
            <td class="left"><a-input placeholder="请填写省局计划生产量" maxLength="100" v-model:value="params.sjJhscl" :disabled="!(params.sbState < 20)" /> </td>
            <td class="right tab_apply required" v-if="params.sbState > 40">省局申报追加计划生产量</td>
            <td class="left" v-if="params.sbState > 40"><a-input placeholder="请填写省局追加计划生产量" maxLength="100" v-model:value="params.sjJhsclZj" :disabled="!(params.sbState < 20)" /> </td>
          </tr>
          <tr v-if="params.sbState > 20">
            <td class="right tab_apply required">国家下达计划生产量</td>
            <td class="left"><a-input placeholder="请填写国家计划生产量" maxLength="100" v-model:value="params.gjJhscl" :disabled="!(params.sbState < 20)" /> </td>
            <td class="right tab_apply required" v-if="params.sbState > 50">国家下达追加计划生产量</td>
            <td class="left" v-if="params.sbState > 50"><a-input placeholder="请填写国家追加计划生产量" maxLength="100" v-model:value="params.gjJhsclZj" :disabled="params.sbState>60" /> </td>
          </tr>
          <tr>
            <td class="tab_apply required">上年度实际生产量(1-5月)</td>
            <td class="left"><a-input placeholder="请填写企业实际生产量(1-5月)" maxLength="100" v-model:value="params.sjscl1" :disabled="!(params.sbState < 20)" /> </td>
            <td class="tab_apply required" v-if="params.sbState >= 30">本年度实际生产量(1-5月)</td>
            <td class="left" v-if="params.sbState >= 30"><a-input placeholder="请填写企业实际生产量(1-5月)" maxLength="100" v-model:value="params.sjscl1" :disabled="params.sbState > 40" /> </td>
          </tr>
          <tr>
            <td class="tab_apply required">上年度实际生产量(6-9月)</td>
            <td class="left" colspan="3"><a-input placeholder="请填写企业实际生产量(6-9月)" maxLength="100" v-model:value="params.sjscl2" :disabled="!(params.sbState < 20)" /> </td>
          </tr>
          <tr>
            <td class="tab_apply required">上年度预计生产量(10-12月)</td>
            <td class="left" colspan="3"><a-input placeholder="请填写企业预计生产量(10-12月)" maxLength="100" v-model:value="params.sjscl4" :disabled="!(params.sbState < 20)" /> </td>
          </tr>
          <tr>
            <td class="tab_apply required" v-if="params.sbState >= 30">上年度实际生产量(10-12月)</td>
            <td class="left" colspan="3" v-if="params.sbState >= 30"
              ><a-input placeholder="请填写企业实际生产量(10-12月)" maxLength="100" v-model:value="params.sjscl3" :disabled="params.sbState > 40"
            /></td>
          </tr>
        </table>
      </div>
    </div>

    <div class="panel-heading">
      <div class="panel" style="margin-top: 20px"
        >需用原料药信息（公斤或立升）<a-button type="primary" @click="selectQy('yly')" style="float: right; margin-top: 5px" v-if="params.sbState < 20 || !params.sbState"> 原料药选择</a-button></div
      >
    </div>
    <div class="table1">
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr>
          <td class="right tab_apply required">需用原料药名称</td>
          <td class="left"><a-input placeholder="请填写需用原料药名称" maxLength="100" v-model:value="params.xyylymc" :disabled="!(params.sbState < 20)" /></td>
          <td class="right tab_apply required">原料药品批准文号（备案号）</td>
          <td class="left"><a-input placeholder="请填写原料药品批准文号（备案号）" maxLength="100" v-model:value="params.xyylypzwh" :disabled="!(params.sbState < 20)" /></td>
        </tr>
        <tr>
          <td class="tab_apply required">原料药供应单位</td>
          <td class="left"><a-input placeholder="请填写原料药供应单位" maxLength="100" v-model:value="params.gydwmc" :disabled="!(params.sbState < 20)" /></td>
          <td class="tab_apply required" v-if="params.sbState >= 30">追加原料药供应单位</td>
          <td class="left" v-if="params.sbState >= 30"><a-input placeholder="请填写追加原料药供应单位" maxLength="100" v-model:value="params.gydwmcZj" :disabled="params.sbState > 40" /></td>
        </tr>
        <tr>
          <td class="tab_apply required">企业原料药现有库存量</td>
          <td class="left" colspan="3"><a-input placeholder="请填写企业原料药现有库存量" maxLength="100" v-model:value="params.xyylykc" :disabled="!(params.sbState < 20)" /> </td>
        </tr>
        <tr>
          <td class="right tab_apply required">企业计划需用量</td>
          <td class="left"><a-input placeholder="请填写企业计划需用量" maxLength="100" v-model:value="params.qyXyylyjhsyl" :disabled="!(params.sbState < 20)" /> </td>
          <td class="right tab_apply required" v-if="params.sbState >= 30">企业追加计划需用量</td>
          <td class="left" v-if="params.sbState >= 30"><a-input placeholder="请填写企业追加计划需用量" maxLength="100" v-model:value="params.qyXyylyjhsylZj" :disabled="params.sbState > 40" /> </td>
        </tr>
        <tr>
          <td class="right tab_apply required" v-if="params.sbState > 10">省局申报计划需用量</td>
          <td class="left" v-if="params.sbState > 10"><a-input placeholder="请填写省局申报计划需用量" maxLength="100" v-model:value="params.sjXyylyjhsyl" :disabled="!(params.sbState < 20)" /> </td>
          <td class="right tab_apply required" v-if="params.sbState > 40">省局申报追加计划需用量</td>
          <td class="left" v-if="params.sbState > 40"
            ><a-input placeholder="请填写省局申报追加计划需用量" maxLength="100" v-model:value="params.sjXyylyjhsylZj" :disabled="params.sbState > 50" />
          </td>
        </tr>
        <tr>
          <td class="right tab_apply required" v-if="params.sbState > 20">国家下达计划需用量</td>
          <td class="left" v-if="params.sbState > 20">
            <a-input placeholder="请填写国家下达计划需用量" maxLength="100" v-model:value="params.gjXyylyjhsyl" :disabled="!(params.sbState < 20)"/> </td>
          <td class="right tab_apply required" v-if="params.sbState > 50">国家下达追加计划需用量</td>
          <td class="left" v-if="params.sbState > 50"
            ><a-input placeholder="请填写国家下达追加计划需用量" maxLength="100" v-model:value="params.gjXyylyjhsylZj" :disabled="params.sbState > 60" />
          </td>
        </tr>
        <tr>
          <td class="tab_apply required">上年度实际需用量(1-5月)</td>
          <td class="left" ><a-input placeholder="请填写企业实际需用量(1-5月)" maxLength="100" v-model:value="params.xyylysjsyl1" :disabled="!(params.sbState < 20)" /> </td>
          <td class="tab_apply required" v-if="params.sbState >= 30">本年度实际需用量(1-5月)</td>
          <td class="left"  v-if="params.sbState >= 30"><a-input placeholder="请填写企业实际需用量(1-5月)" maxLength="100" v-model:value="params.xyylysjsyl5" :disabled="params.sbState >40 " /> </td>
        </tr>
        <tr>
          <td class="tab_apply required">上年度实际需用量(6-9月)</td>
          <td class="left" colspan="3"><a-input placeholder="请填写企业实际需用量(6-9月)" maxLength="100" v-model:value="params.xyylysjsyl2" :disabled="!(params.sbState < 20)" /> </td>
        </tr>
        <tr>
          <td class="tab_apply required">本年度预计需用量(10-12月)</td>
          <td class="left" colspan="3"><a-input placeholder="请填写企业预计需用量(10-12月)" maxLength="100" v-model:value="params.xyylysjsyl4" :disabled="!(params.sbState < 20)" /> </td>
        </tr>
        <tr>
          <td class="tab_apply required" v-if="params.sbState >= 30">上年度实际需用量(10-12月)</td>
          <td class="left" colspan="3" v-if="params.sbState >= 30"><a-input placeholder="请填写企业实际需用量(10-12月)" maxLength="100" v-model:value="params.xyylysjsyl3" :disabled="params.sbState >=50" /> </td>
        </tr>
        
      </table>
      <div class="panel-heading">
        <div class="panel" style="margin-top: 20px">备注信息</div>
    </div>
    <div class="table1">
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr>
          <td class="tab_apply required">备注</td>
          <td class="left" colspan="3"><a-textarea placeholder="请填写备注" maxLength="100" v-model:value="params.remark" :disabled="!(params.sbState < 20)" /> </td>
        </tr>
        <tr>
          <td class="tab_apply required" v-if="params.sbState > 30">追加备注</td>
          <td class="left" colspan="3" v-if="params.sbState > 30"><a-textarea placeholder="请填写追加备注" maxLength="100" v-model:value="params.remarkZj" :disabled="!(params.sbState < 50)" /> </td>
        </tr>
      </table>
    </div>
     
    </div>
    <div class="panel-heading" v-if="isUpdate" >
        <div class="panel" style="margin-top: 20px">附件</div>
    </div>
    <div class="table1" v-if="isUpdate">
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr v-if="params.fj">
          <td class="tab_apply required">文件名</td>
          <td class="left">{{fjName}}</td>
          <td class="tab_apply required">操作</td>
          <td class="left">
            <a-button type="link" @click="toDownload(item)">下载</a-button>
            <a-button type="link" @click="toPreview(item)">预览</a-button>
          </td>
        </tr>
        <tr v-else>  
          <td class="tab_apply required">操作</td>
          <td class="left" colspan="3">
            <!-- <a-button type="link" @click="toDownload(item)">上传附件</a-button> -->
            上传附件
          </td>       
        </tr>
      </table>
    </div>
  </BasicModal>
   <!-- 表单区域 -->
  <selectScpzModal @register="registerScpzModal" @getSelectResult="getSelectResult"></selectScpzModal>
  <selectYlyModal @register="registerYlyModal" @getSelectResult="getSelectResult"></selectYlyModal>
  <selectQyModal @register="registerQyModal" @getSelectResult="getSelectResult"></selectQyModal>
  <a-modal v-model:visible="visible" title="添加信息" @ok="handleOk" width="1100px">
    <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
          <tr>
            <td class="right tab_apply required">生产药品名称</td>
            <td class="left">
              {{ scpz.scypmc }}
            </td>
          </tr>
          <tr>
            <td class="right tab_apply required">规格</td>
            <td class="left">
              <a-input placeholder="请填写规格" maxLength="100" v-model:value="scpz.ypgg" :disabled="!(params.sbState < 20)"/>
            </td>
            <td class="right tab_apply required">单位</td>
            <td class="left">
              <a-input placeholder="请填写单位" maxLength="100" v-model:value="scpz.dw" :disabled="!(params.sbState < 20)"/>
            </td>
          </tr>
          <tr>
            <td class="right tab_apply required">原料需用量/单个</td>
            <td class="left">
              <a-input placeholder="请填写生产药品生产单个所需原料用量" maxLength="100" v-model:value="scpz.xyl" :disabled="!(params.sbState < 20)"/>
            </td>
            <td class="right tab_apply required">生产药品现有库存</td>
            <td class="left">
              <a-input placeholder="请填写企业生产药品现有库存" maxLength="100" v-model:value="scpz.scypkc" :disabled="!(params.sbState < 20)"/>
            </td>
          </tr>
          <tr>
            <td class="right tab_apply required">企业计划生产量</td>
            <td class="left">
              <a-input placeholder="请填写企业计划生产量" maxLength="100" v-model:value="scpz.qyJhscl" :disabled="!(params.sbState < 20)"/>
            </td>
            <td class="right tab_apply required" v-if="params.sbState > 20">企业追加计划生产量</td>
            <td class="left" v-if="params.sbState >= 30">
              <a-input placeholder="请填写企业追加计划生产量" maxLength="100" v-model:value="scpz.qyJhsclZj" :disabled="params.sbState >40"/>
            </td>
          </tr>
          <tr>
            <td class="tab_apply required">备注</td>
            <td class="left" colspan="3"><a-textarea placeholder="请填写备注" maxLength="100" v-model:value="scpz.remarks" :disabled="!(params.sbState < 20)"/> </td>
          </tr>
        </table>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
import { saveOrUpdate } from '../PYwTyjhsq.api';
import { useModal } from '/@/components/Modal';
import selectScpzModal from './selectScpzModal.vue';
import selectYlyModal from './selectYlyModal.vue';
import selectQyModal from './selectQyModal.vue';
import Tools from '/@/utils/tools';
import { getAppEnvConfig } from '/@/utils/env';
import { downloadByUrl } from '/@/utils/file/download';
import { message } from 'ant-design-vue';
import {defHttp} from '/@/utils/http/axios';

// Emits声明
const emit = defineEmits(['register', 'success']);
const currentYear = ref(Tools.getCurrentYear());
const yearArray = computed(() => Tools.getYearArray(currentYear.value));
const scpzList=ref([]);
const scpz=ref({});
const visible=ref<boolean>(false);
const isEdit=ref<boolean>(false)
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
  {
    title: '操作',
    key: 'action',
    width: '80px',
    slots: { customRender: 'action' },
  },
          
]

const [registerScpzModal, { openModal: openPzModal }] = useModal();
const [registerQyModal, { openModal: openQyModal }] = useModal();
const [registerYlyModal, { openModal: openYlyModal }] = useModal();
const isUpdate = ref(true);
const params = ref({});
const accept=ref('.jpg,.jpeg,.png,.gif,.bmp,.doc,.docx,.pdf')
const fjName=ref();
const { VITE_GLOB_DOMAIN_URL } = getAppEnvConfig();
const item=ref([])
//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  //重置表单
  params.value = {};
  scpzList.value=[];
  params.value.jhYear = currentYear.value;
  params.value.id = data.id;
  params.value.sbState = data.sbState;
  setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
  isUpdate.value = !!data?.isUpdate;
  if (unref(isUpdate)) {
    //表单赋值
    let formdata = JSON.parse(JSON.stringify(data));
    params.value = formdata.record;
    scpzList.value=formdata.record.items;
    if(params.value.fj){
      fjName.value=formdata.record.fj.split(",")[0]
      item.value=params.value.fj.split(",");
    }
  }
});
//设置标题
const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
//表单提交事件
async function handleSubmit(v) {
  try {
    params.value.items=unref(scpzList);
    let values = params.value;
    setModalProps({ confirmLoading: true });
    //提交表单
    await saveOrUpdate(values, isUpdate.value);
    //关闭弹窗
    closeModal();
    //刷新列表
    emit('success');
  } finally {
    setModalProps({ confirmLoading: false });
  }
}

function deleteOne(record){
  let arr=[];
  for(let i=0;i<scpzList.value.length;i++){
    if(scpzList.value[i].ypgg!=record.ypgg){
      arr.push(scpzList.value[i])
    }
  }
  scpzList.value=arr;
}


function selectQy(lx) {
  if (lx == 'qy') {
    openQyModal(true, {
      showFooter: true,
    });
  }
  if (lx == 'scpz') {
    openPzModal(true, {
      showFooter: true,
    });
  }
  if (lx == 'yly') {
    openYlyModal(true, {
      showFooter: true,
    });
  }
}

function getSelectResult(text) {
  if (text.yppzwh) params.value.scyppzwh = text.yppzwh;
  if (text.yptymc) params.value.scypmc = text.yptymc;
  if (text.ypgg) params.value.ypgg = text.ypgg;
  if(text.bzjx&&text.bzjx=="原料药")params.value.ypgg = "原料药";

  if (text.shxydm) params.value.shxydm = text.shxydm;
  if (text.lxdh) params.value.lxrPhone = text.lxdh;
  if (text.xzqhdm) params.value.areaCode = text.xzqhdm;
  if (text.zsbh) params.value.ypscxkzbh = text.zsbh;
  if (text.zcdz) params.value.zcdz = text.zcdz;
  if (text.lxr) params.value.lxr = text.lxr;
  if (text.sjhm) params.value.dbrPhone = text.sjhm;
  if (text.fddbr) params.value.qyfddbr = text.fddbr;
  if (text.qymc) params.value.qymc = text.qymc;
}

function openAdd(){
  if(!params.value.scypmc){
    return message.info("请先填写药品名称")
  }
  scpz.value.scypmc=params.value.scypmc;
  scpz.value.scyppzwh=params.value.scyppzwh;
  visible.value=true;
}

function zhuijia(record){
  scpz.value=record;
  visible.value=true;
  isEdit.value=true;
}

function handleOk(){
  if(isEdit.value){
    let values =unref(scpz.value); 
   defHttp.post({url:"/yw/tysb/pYwTyjhsq/itemsEdit" ,params: values})
  }else{
    for(let i=0;i<scpzList.value.length;i++){
      if(scpz.value.ypgg==scpzList.value[i].ypgg){
        return message.info("添加失败：该药品规格已经添加过")
      }
    }
    scpzList.value.push(unref(scpz));
  }
  visible.value=false;
  scpz.value={};
  isEdit.value=false;
}

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