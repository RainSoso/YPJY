<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
    <h2>【药品制剂生产销售情况】</h2>
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
        <td class="text-blue font-600 text-right">规格</td>
        <td>{{ Jbxx.gg }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">生产（进口）数量</td>
        <td>{{ Jbxx.scsl }}</td>
        <td class="text-blue font-600 text-right">生产 (进口)数量单位</td>
        <td>{{ Jbxx.scsldw }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">境内销售数量</td>
        <td>{{ Jbxx.jlxssl }}</td>
        <td class="text-blue font-600 text-right">境内销售单位</td>
        <td>{{ Jbxx.jnxssldw }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">是否有出口</td>
        <td colspan="3">{{ Jbxx.sfyck && filterDictTextByCache('yes_no',Jbxx.sfyck) || Jbxx.sfyck}}</td>
      </tr>
    </table>
    <h2>【出口情况】</h2>
    <table class="my-table mb-2">
      <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
      </colgroup>
      <tr v-for="(item, index) in ckqkList" :key="index">
        <td class="text-blue font-600 text-right">出口国家/地区</td>
        <td>{{ item.ckgj }}</td>
        <td class="text-blue font-600 text-right">出口销售</td>
        <td>{{ item.qty }}</td>
        <td class="text-blue font-600 text-right">常用单位</td>
        <td>{{ item.unit }}</td>
      </tr>
    </table>
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { formatToDate } from '/@/utils/dateUtil';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { queryById } from '/@/views/ypsczhjg/ndbg/sale/DurgsSaleInfo.api';
import { getTextByCode } from '/@/utils/area/areaDataUtil';
import { useRoute } from 'vue-router';
const route = useRoute();
const formatToDate1 = formatToDate;
const getTextByCode1 = getTextByCode;
const Jbxx = ref({});
const ckqkList = ref([]);
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  //重置表单
  await queryById({ id: data.record.id }).then((res) => {
     Jbxx.value=res;
     console.log(Jbxx.value);
     try {
       ckqkList.value=JSON.parse(Jbxx.value.ckqkJson);
     } catch (error) {
       ckqkList.value=[];
     }    
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
