<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
        <h2>【基本信息】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">药品批准文号/注册证号</td>
                <td>{{ FormData.drugApproveNo }}</td>
                <td class="text-blue font-600 text-right">药品通用名称</td>
                <td>{{ FormData.goodName }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">剂型</td>
                <td>{{ FormData.dosageType }}</td>
                <td class="text-blue font-600 text-right">规格</td>
                <td>{{ FormData.specifications }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">商品名</td>
                <td>{{ FormData.goodName }}</td>
                <td class="text-blue font-600 text-right">生产/进口批次</td>
                <td>{{ FormData.jkpc }}</td>
           </tr>
            <tr>
                <td class="text-blue font-600 text-right">年度内是否生产</td>
                <td colspan="3">{{ FormData.isProduct && filterDictTextByCache('SFBZ-1',FormData.isProduct ) || FormData.isProduct}}</td>
            </tr>
             <tr>
                <td class="text-blue font-600 text-right">处方</td>
                <td colspan="3">{{ FormData.cf }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">管理属性</td>
                <td colspan="3"> <a-checkbox-group v-model:value="checkedList" :options="plainOptions" disabled/></td>
            </tr>
        </table>
 <!-- <a-checkbox-group v-model:value="checkedList" :options="plainOptions" disabled>
  </a-checkbox-group> -->
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref , defineComponent, reactive, toRefs} from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { formatToDate } from '/@/utils/dateUtil';
import {BasicForm, useForm} from '/@/components/Form/index';
import {formSchemaTWO} from '/@/views/ypsczhjg/ndbg/report/DrugsGgInfo.data';
import { useRoute } from 'vue-router';
const route = useRoute();
const formatToDate1 = formatToDate;
const FormData = ref({});
const checkedList = ref ([]);
const plainOptions = [
  { label: '国家基本药物', value: '1' },
  { label: '国家集采中选药品', value: '2' },
  { label: '通过一致性评价', value: '3' },
  { label: '短缺药品（国家短缺药品清单和国家临床必需易短缺药品重点监测清单目录药品）', value: '4' },
  { label: '儿童用药', value: '5' },
  { label: 'OTC（非处方药）', value: '6' },
  { label: '特殊药品（麻醉药品、精神药品、医疗用毒性药品、放射性药品、药品类易制毒化学品）', value: '7' },
  { label: '不适用', value: '8' },
];


const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    FormData.value = data.record || {};
    checkedList.value = FormData.value.glsx?.split(',');
    setModalProps({ confirmLoading: false, width: 1000, footer: null });
});
function handleSubmit() {
    //关闭弹窗
    closeModal();
}
</script>

<style lang="less" scoped>
</style>
