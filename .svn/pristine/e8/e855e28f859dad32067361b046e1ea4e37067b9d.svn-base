<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
    <h2>【同通用名文号】</h2>
    <table class="my-table mb-2">
      <colgroup>
        <col style="width:15%" />
        <col />
        <col style="width:15%" />
        <col />
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">批准文号</td>
        <td>{{ FormData.yppzwh }}</td>
        <td class="text-blue font-600 text-right">药品通用名称</td>
        <td>{{ FormData.yptymc }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">药品类型</td>
        <td>{{ FormData.ypfl }}</td>
        <td class="text-blue font-600 text-right">剂型</td>
        <td>{{ FormData.jx }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">规格</td>
        <td>{{ FormData.ypgg }}</td>
        <td class="text-blue font-600 text-right">批准文号有效期</td>
        <td>{{ FormData.yppzwhyxq }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">药品生产单位</td>
        <td colspan="3">{{ FormData.ypscqymc }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">药品生产地址</td>
        <td colspan="3">{{ FormData.scdz }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">药品有效期</td>
        <td>{{ FormData.ypyxq }}</td>
        <td class="text-blue font-600 text-right">药品商品名</td>
        <td>{{ FormData.ypspmc }}</td>
      </tr>
    </table>
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { formatToDate } from '/@/utils/dateUtil';
const formatToDate1 = formatToDate;
const FormData = ref({});
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
  FormData.value = data.record || {};
  setModalProps({ confirmLoading: false, width: 1000, footer: null });
});
function handleSubmit() {
  //关闭弹窗
  closeModal();
}
</script>

<style lang="less" scoped>
</style>
