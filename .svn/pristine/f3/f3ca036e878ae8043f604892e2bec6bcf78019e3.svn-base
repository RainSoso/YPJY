<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
    <h2>【制剂品种信息】</h2>
    <table class="my-table mb-2">
      <colgroup>
        <col style="width:15%" />
        <col />
        <col style="width:15%" />
        <col />
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">批准文号</td>
        <td>{{ FormData.pzwh }}</td>
        <td class="text-blue font-600 text-right">原批准文号</td>
        <td>{{ FormData.ypzwh }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">社会信用代码</td>
        <td>{{ FormData.shxydm }}</td>
        <td class="text-blue font-600 text-right">制剂名称</td>
        <td>{{ FormData.zjmc }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">剂型</td>
        <td>{{ FormData.jx }}</td>
        <td class="text-blue font-600 text-right">规格</td>
        <td>{{ FormData.gg }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">有效期</td>
        <td>{{ FormData.yxq }}</td>
        <td class="text-blue font-600 text-right">批准文号有效期至</td>
        <td>{{ FormData.pzwhyxq && formatToDate(FormData.pzwhyxq) }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">申请人单位名称</td>
        <td>{{ FormData.qymc }}</td>
        <td class="text-blue font-600 text-right">申请人制剂配制地址</td>
        <td>{{ FormData.scdz }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">医疗机构制剂许可证编号</td>
        <td>{{ FormData.zsbh }}</td>
        <td class="text-blue font-600 text-right">发证日期</td>
        <td>{{ FormData.fzrq && formatToDate(FormData.fzrq) }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">发证机关</td>
        <td>{{ FormData.fzjg }}</td>
        <td class="text-blue font-600 text-right">生产状况</td>
        <td>{{ FormData.sczk && filterDictTextByCache('yppzSczk', FormData.sczk) || FormData.sczk }}</td>   
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">备注</td>
        <td colspan="3">{{ FormData.bz }}</td>
      </tr>
    </table>
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { formatToDate } from '/@/utils/dateUtil';
const FormData = ref({});
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
  FormData.value = data.record || {};
  setModalProps({ confirmLoading: false, width: 1000, footer: null });
});
function handleSubmit() {
  //关闭弹窗
  closeModal();
}
function attach(item) {
  let array = [];
  (item || '').split(';').forEach(str => {
    if (str) {
      array.push(str.split(',')[0]);
    }
  });;
  return array.join('\n');
}
</script>

<style lang="less" scoped>
</style>
