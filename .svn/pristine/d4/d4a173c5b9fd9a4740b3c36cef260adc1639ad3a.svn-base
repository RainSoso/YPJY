<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="70%"
    :closeFunc="beforeClose">
    <h2>
      【药品委托销售（储存、运输）报告】
      <span v-if="FormData.category != '1'">【类别：{{ getDictText('wtbgBaseCategory', FormData.category) }}】</span>
    </h2>
    <table class="my-table mb-2">
      <colgroup>
        <col style="width:15%" />
        <col />
        <col style="width:15%" />
        <col />
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">企业名称（委托方)</td>
        <td>{{ FormData.qymc }}</td>
        <td class="text-blue font-600 text-right">许可证号（委托方)</td>
        <td>{{ FormData.xkzh }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">注册地址（委托方）</td>
        <td>{{ FormData.zcdz }}</td>
        <td class="text-blue font-600 text-right">法定代表人（委托方）</td>
        <td>{{ FormData.fddbr }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">委托品种范围</td>
        <td colspan="3">{{ FormData.wtpzfw }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">委托报告事项</td>
        <td colspan="3">{{ FormData.wtbgsx }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">企业名称（受托方）</td>
        <td>{{ FormData.stfqymc }}</td>
        <td class="text-blue font-600 text-right">许可证号（受托方）</td>
        <td>{{ FormData.xkzstf }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">注册地址（受托方）</td>
        <td>{{ FormData.stfzcdz }}</td>
        <td class="text-blue font-600 text-right">仓库地址（受托方）</td>
        <td>{{ FormData.stfckdz }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">委托销售</td>
        <td colspan="3">{{ FormData.wtxspz }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">委托储存</td>
        <td colspan="3">{{ FormData.wtcc }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">委托运输</td>
        <td colspan="3">{{ FormData.wtys }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">委托起止时间</td>
        <td colspan="3">{{ formatToDate(FormData.wtkssj) }} - {{ formatToDate(FormData.wtjssj) }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">已确认委托事项说明</td>
        <td colspan="3">{{ FormData.yqrwtsxsm }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">联系人</td>
        <td>{{ FormData.lxr }}</td>
        <td class="text-blue font-600 text-right">联系电话</td>
        <td>{{ FormData.lxdh }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">简要情况说明</td>
        <td colspan="3">{{ FormData.jyqksm }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">报告资料</td>
        <td colspan="3" class="left">
          <table class="my-table" style="table-layout:auto;">
            <thead>
              <tr>
                <th width="60" class="text-center">序号</th>
                <th>材料内容</th>
                <th>附件</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center">1</td>
                <td class="hidden-480 left">MAH批准证明文件 (仅委托销售提供) </td>
                <td class="hidden-480">
                  <MUpload :bisId="FormData.id || ''" :disabled="true" :download="true" category="wtf1" source="ypjyWtbg"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">2</td>
                <td class="hidden-480 left">营业执照、组织机构代码证 </td>
                <td class="hidden-480">
                  <MUpload :bisId="FormData.id || ''" :disabled="true" :download="true" category="wtf2" source="ypjyWtbg"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">3</td>
                <td class="hidden-480 left">药品生产许可证或药品经营许可证 </td>
                <td class="hidden-480">
                  <MUpload :bisId="FormData.id || ''" :disabled="true" :download="true" category="wtf3" source="ypjyWtbg"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">4</td>
                <td class="hidden-480 left">药品监管机构场地检查符合性证明文件或药品监管部门认为的其他证明性文件 </td>
                <td class="hidden-480">
                  <MUpload :bisId="FormData.id || ''" :disabled="true" :download="true" category="wtf4" source="ypjyWtbg"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">5</td>
                <td class="hidden-480 left">药品生产/经营（如有）场地主文件 </td>
                <td class="hidden-480">
                  <MUpload :bisId="FormData.id || ''" :disabled="true" :download="true" category="wtf5" source="ypjyWtbg"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">6</td>
                <td class="hidden-480 left">质量审核和评估报告 </td>
                <td class="hidden-480">
                  <MUpload :bisId="FormData.id || ''" :disabled="true" :download="true" category="wtf6" source="ypjyWtbg"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">7</td>
                <td class="hidden-480 left">质量协议文本原件 </td>
                <td class="hidden-480">
                  <MUpload :bisId="FormData.id || ''" :disabled="true" :download="true" category="wtf7" source="ypjyWtbg"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">8</td>
                <td class="hidden-480 left">真实性承诺声明 </td>
                <td class="hidden-480">
                  <MUpload :bisId="FormData.id || ''" :disabled="true" :download="true" category="wtf8" source="ypjyWtbg"/>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">受托方资料目录</td>
        <td colspan="3">
          <table class="my-table" style="table-layout:auto;">
            <thead>
              <tr>
                <th width="60" class="text-center"><span>序号</span></th>
                <th><span>材料内容</span></th>
                <th><span>附件</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center">1</td>
                <td class="hidden-480 left">药品委托销售（储存、运输） 申请表 (含双方签字盖章件)</td>
                <td class="hidden-480">
                  <MUpload :bisId="FormData.id || ''" :disabled="true" :download="true" category="stf1" source="ypjyWtbg"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">2</td>
                <td class="hidden-480 left">真实性承诺声明 </td>
                <td class="hidden-480">
                  <MUpload :bisId="FormData.id || ''" :disabled="true" :download="true" category="stf2" source="ypjyWtbg"/>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">监管部门补正意见</td>
        <td colspan="3">
          <div class="mb-2">{{ FormData.jgbmbzyj }}</div>
          <div v-if="FormData.auditBy || FormData.auditTel">联系人：{{ FormData.auditBy }}，联系电话：{{ FormData.auditTel }}</div>
        </td>
      </tr>
    </table>
    <template #footer>
      <div class="flex">
        <div class="flex-1 text-left">
          <a-button v-for="(item, idx) in lifeObjs" :key="idx" :type="item.id == FormData.id ? 'primary' : 'default'"
            @click="changeData(idx)">
            {{ item.ggbh || getDictText('wtbgState', item.state) }}
          </a-button>
        </div>
        <a-button @click="handleSubmit">关闭</a-button>
      </div>
    </template>
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
// import uploader from '/@/views/ypsczhjg/ndbg/components/uploader.vue';
import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';
import { getDictText } from '/@/utils/dict/JDictSelectUtil';
import { formatToDate } from '/@/utils/dateUtil';
import { list } from '/@/views/ypsczhjg/wtbg/WtbgBase.api';

const FormData = ref({}), lifeObjs = ref([]);
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
  FormData.value = data.record || {};
  let links = FormData.value.lifeLinks?.replace(/(^,+)|(,+$)/ig, '').split(',') || [];
  if (links.length || FormData.value.hasChanged == 'Y') {
    list({ pageSize: 1000, firstId: 0 < links.length ? links[0] : FormData.value.id }).then(data => {
      lifeObjs.value = data.records;
    });
  }
  setModalProps({ confirmLoading: false });
});
function changeData(idx) {
  FormData.value = lifeObjs.value[idx];
}
function beforeClose() {
  return new Promise((resolve) => {
    lifeObjs.value = [];
    resolve(true);
  });
}
function handleSubmit() {
  //关闭弹窗
  closeModal();
}

defineExpose({ getDictText, formatToDate });
</script>

<style lang="less" scoped></style>
