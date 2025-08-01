<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
    <h2>【中药饮片生产销售情况】</h2>
    <table class="my-table mb-2">
      <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">药品批准文号</td>
        <td>{{ route.query?.drugApproveNo }}</td>
        <td class="text-blue font-600 text-right">药品名称</td>
        <td>{{ route.query?.drugName }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">执行标准</td>
        <td colspan="3">{{ Jbxx.zxbz }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">出口销量(千克（Kg）)</td>
        <td>{{ Jbxx.scsl }}</td>
        <td class="text-blue font-600 text-right">境内销量(千克（Kg）)</td>
        <td>{{ Jbxx.jlxssl }}</td>
      </tr>
    </table>
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { formatToDate } from '/@/utils/dateUtil';
import { getDictText } from '/@/utils/dict/JDictSelectUtil';
import { queryById } from '/@/views/ypsczhjg/ndbg/sale/DurgsSaleInfo.api';
import { getTextByCode } from '/@/utils/area/areaDataUtil';
import { useRoute } from 'vue-router';
const route = useRoute();
const getDictText1 = getDictText;
const formatToDate1 = formatToDate;
const getTextByCode1 = getTextByCode;
const Jbxx = ref({});
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  //重置表单
  await queryById({ id: data.record.id }).then((res) => {
     Jbxx.value=res;
    setModalProps({ confirmLoading: false, width: '50%', footer: null });
  });
});
function handleSubmit() {
  //关闭弹窗
  closeModal();
}
</script>

<style lang="less" scoped>
</style>
