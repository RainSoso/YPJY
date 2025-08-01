<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="60%">
        <h2>【药品GSP符合性信息查询】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">企业名称</td>
                <td>{{ FormData.companyName}}</td>
                <td class="text-blue font-600 text-right">受理编号</td>
                <td>{{ FormData.serial }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检查依据</td>
                <td>{{ FormData.inspectionBasis }}</td>
                <td class="text-blue font-600 text-right">经营方式</td>
                <td>{{ FormData.businessMethod }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检查人员</td>
                <td>{{ FormData.inspectorNames}}</td>
                <td class="text-blue font-600 text-right">实施单位</td>
                <td>{{ FormData.implementationUnit}}</td>
            </tr>
       
            <tr>
                <td class="text-blue font-600 text-right">检查开始时间</td>
                <td >{{ FormData.startTime && formatToDate1(FormData.startTime) }}</td>
                <td class="text-blue font-600 text-right">检查结束时间</td>
                <td >{{ FormData.finishTime && formatToDate1(FormData.finishTime) }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">任务来源</td>
                <td >{{ FormData.taskSource }}</td>
                <td class="text-blue font-600 text-right">经营地址</td>
                <td >{{ FormData.inspectionAddress }}</td>
            </tr> 
            <tr>
                <td class="text-blue font-600 text-right">仓库地址</td>
                <td colspan="3">{{ FormData.factoryAddress }}</td>
    
            </tr> 
            <tr>
                <td class="text-blue font-600 text-right">经营范围</td>
                <td colspan="3">{{ FormData.inspectionScope }}</td>

            </tr>
             <tr>
                <td class="text-blue font-600 text-right">被检单位综合评定情况简述</td>
                <td colspan="3">{{ FormData.situation }}</td>
               
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">综合评定结论</td>
                <td colspan="3">{{ FormData.result }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">会签时间</td>
                <td >{{ FormData.operateTime && formatToDate1(FormData.operateTime) }}</td>
                <!-- <td class="text-blue font-600 text-right">保存锁定</td>
                <td >{{ FormData.islock }}</td> -->
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">附件</td>
                <td colspan="3"> <MUpload :bisId="FormData.id" :disabled="true" :download="true"
                   category="" source="ypjygsp"/></td>
            </tr>
        </table>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { getDictText } from '/@/utils/dict/JDictSelectUtil';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { formatToDate } from '/@/utils/dateUtil';
import { getTextByCode } from '/@/utils/area/areaDataUtil';
import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';

const formatToDate1 = formatToDate;
const FormData = ref({});
const ZbData = ref([]);
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    FormData.value = data.record || {};
    FormData.value.startTime = substr(FormData.value.startTime,0,10);
    FormData.value.finishTime = substr(FormData.value.finishTime,0,10);
    FormData.value.operateTime = substr(FormData.value.operateTime,0,10);
    
    //ZbData.value = data.record.mx.records || [];
    setModalProps({ confirmLoading: false, width: 1000, footer: null });

});

function handleSubmit() {
    //关闭弹窗
    closeModal();
}
</script>

<style lang="less" scoped></style>
