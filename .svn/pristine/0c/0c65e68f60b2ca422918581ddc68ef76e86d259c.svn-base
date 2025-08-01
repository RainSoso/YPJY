<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" :defaultFullscreen="true"
    destroyOnClose @visible-change="visibleChange">
    <div class="h-full min-h-100px overflow-hidden">
      <a-row type="flex" :wrap="false" class="h-full">
        <a-col flex="400px" class="p-4 flex flex-col w-400px" v-if="collapsed">
          <div class="leading-46px bg-light-700 text-center font-600">材料列表</div>
          <div class="border border-light-800 flex-auto overflow-hidden">
            <ScrollContainer>
              <ul class="mx-0 -my-1px cl-list">
                <template v-for="(item, idx) in clList" :key="idx">
                  <li class="p-2 pr-3 border-t border-b:not-last border-light-800 bg-sky-100:hover cursor-pointer"
                    :title="item.clmc"
                    :class="[item.id === cldata.id ? 'bg-sky-100 actived' : (item.state == 1 ? 'bg-green1-100' : (item.state == 0 ? 'bg-red1-100' : ''))]"
                    @click="selectAttachment(item)" ref="clItem">
                    <a-icon icon="ant-design:check-circle-outlined" v-if="item.state == 1" :class="['!text-green-600']" />
                    <a-icon icon="ant-design:close-circle-outlined" v-if="item.state == 0" :class="['!text-red-600']" />
                    {{ item.clmc }}
                  </li>
                </template>
              </ul>
            </ScrollContainer>
          </div>
          <div class="pt-3">
            <a-form-item label="审查状态" class="!mb-3" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" v-if="iszd">
              <a-radio-group v-model:value="cldata.state" :options="options" />
            </a-form-item>
            <a-form-item label="审查意见" class="!mb-3" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" v-if="iszd">
              <a-textarea v-model:value="cldata.scyj" :auto-size="{ minRows: 2, maxRows: 5 }" />
            </a-form-item>
            <div class="text-center">
              <a-button type="primary" @click="handleCommit" style="margin-right: 8px;" v-if="iszd">保存</a-button>
              <a-popconfirm title="您确认全部通过吗?" ok-text="确认" cancel-text="取消" @confirm="allCommit">
              <a-button type="primary" v-if="iszd" :disabled="isAllApproved">全部通过</a-button>
              </a-popconfirm>
            </div>
          </div>
          <div class="pt-3">
            <table class="my-table">
              <tr>
                <th width="4%" class="text-blue font-600 text-center">审查人</th>
                <th width="3%" class="text-blue font-600 text-center">操作</th>
                <th width="8%" class="text-blue font-600 text-center">意见</th>
                <th width="6%" class="text-blue font-600 text-center">日期</th>
              </tr>
              <tr v-for="(item, index) in cldata.histories" :key="index">
                <td class="font-600 text-center">{{ item.scrmc }}</td>
                <td class="text-center">
                  <a-icon icon="ant-design:check-circle-outlined" v-if="item.state == 1" :class="['!text-green-600']" />
                   <a-icon icon="ant-design:close-circle-outlined" v-if="item.state == 0" :class="['!text-red-600']" />
                </td>
                <td class="font-600 text-center">{{ item.clyj }}</td>
                <td class="font-600 text-center">{{ item.createTime && formatToDate(item.createTime) }}</td>
              </tr>
            </table>
          </div>
        </a-col>
        <div style="display: flex;align-items: center;position: relative;">
        <a-button type="text" size="small" @click="toggleCollapse" class="bt-class">
            <a-icon :icon="collapsed ? 'ant-design:caret-left-outlined' : 'ant-design:caret-right-outlined'" />
        </a-button>
      </div>
        <a-col flex="auto" class="p-4 border-l border-light-800">
          <a-tabs class="h-full flex flex-col main-tabs" type="card" v-if="attachs.length > 0">
            <a-tab-pane class="h-full" v-for="(attach, index) in attachs" :key="index" :tab="attach.filename">
              <iframe :src="getPreviewUrl(attach.filePath, attach.filename)" class="w-full h-full border-0"></iframe>
            </a-tab-pane>
          </a-tabs>
          <div class="font-600 text-xl h-full flex items-center justify-center text-red-500" v-else>暂未上传相应材料！</div>
        </a-col>
      </a-row>
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref, watch, reactive, computed, nextTick } from 'vue';
import { ScrollContainer } from '/@/components/Container/index';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { querySqSxfj, cledit, queryHostory, allEdit } from '../SqsxSqsx.api';
import { getAttachmentList } from '/@/api/common/api';
import { useRoute } from 'vue-router';
import Tools from '/@/utils/tools';
import { useUserStore } from '/@/store/modules/user';
import { formatToDate } from '/@/utils/dateUtil';
import { isNullOrUnDef } from '/@/utils/is';
const route = useRoute();
const FormData = ref({});
const dqbzcode = ref('');
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
  FormData.value = data.record || {};
  dqbzcode.value = data.dqbz;
  querySqSxfj({ sxId: route.query?.id }).then((res) => {
    clList.value = res;
    nextTick(() => {
      if (route.query?.id) {
        const targetItem = clList.value.find((item) => item.id === FormData.value.id);
        const index = clList.value.indexOf(targetItem);
        if (index !== -1) {
          selectAttachment(clList.value[index]);
          const clItemRef = `$refs.clItem[${index}]`;
          nextTick(() => {
            if (clItemRef && this.$refs[clItemRef]) {
              this.$refs[clItemRef].click();
            }
          });
        }else{
          selectAttachment(clList.value[0]);
        }
      } 
    });
  });
  setModalProps({ confirmLoading: false, width: '80%', footer: null, wrapperProps: { scrollbarPadding: 0 } });
});
const userStore = useUserStore();
const options = ref([{ label: '通过', value: 1 }, { label: '不通过', value: 0 }]);
const cldata = ref({ id: '', clmc: '', state: 1, scyj: '', histories: [], spjlId: route.query?.spid });
const clList = ref([]);
const attachs = ref([]);
const emit = defineEmits(['register', 'success']);
const isreload = ref(false);
const collapsed = ref(true);

const isAllApproved = computed(() =>
    clList.value.every((item) => item.state === 1)
);
const iszd = computed(() =>
  route.query?.sfbl == 'Y' && dqbzcode.value == 'YS'
);

function selectAttachment(clList) {
  cldata.value = JSON.parse(JSON.stringify(clList));
  if (!cldata.value.state) cldata.value.state = 1;
  //if(isNullOrUnDef(cldata.value.state)) cldata.value.state = 1;
  getAttachmentList({ bisId: cldata.value.sqsxId, category: cldata.value.category }).then((res) => {
    attachs.value = res;
  });
  loadHostory();
}

function toggleCollapse() {
  collapsed.value = !collapsed.value;
}

function handleCommit() {
  cldata.value.spjlId = route.query?.spid;
  cledit(cldata.value).then(() => {
    clList.value.forEach(item => {
      if (item.id == cldata.value.id) {
        Object.assign(item, cldata.value);
      }
    });
    loadHostory();
  });
}
function allCommit(){
  allEdit({sxId:route.query?.id,spid:route.query?.spid}).then((res) =>{
    clList.value =  res;
  })
  // handleSubmit();
}
function visibleChange() {
  emit('success', isreload);
}
function handleSubmit() {
  //关闭弹窗
  closeModal();
}
function getPreviewUrl(filePath, filename) {
  let url = Tools.getToPreviewUrl(Tools.getAppInnerUrl() + '/ypsc-api/sys/common/static' + sfparam(filePath) + "?filename=" + filename);
  return url;
}
function loadHostory() {
  queryHostory({ sqclid: cldata.value.id }).then(res => {
    cldata.value.histories = res;
  })
}
function sfparam(item) {
  if (!/^\/.*/ig.test(item)) {
    return '/' + item;
  } else {
    return item;
  }
}
defineExpose({ formatToDate });
</script>

<style lang="less" scoped>
:deep(.main-tabs) {
  .ant-tabs-top-bar {
    margin-bottom: 0.75rem;
  }

  .ant-tabs-content {
    flex: 1;
  }
}
.bt-class {
  position: absolute;
left: -15px;
z-index: 1;
}

.cl-list {
  li {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  li.actived {
    white-space: unset;
  }
}</style>