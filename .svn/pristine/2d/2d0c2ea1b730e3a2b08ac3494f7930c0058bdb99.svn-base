<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
        <h2>【生产地址信息】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">药品批准文号/注册证号</td>
                <td>{{ route.query?.drugApproveNo }}</td>
                <td class="text-blue font-600 text-right">药品通用名称</td>
                <td>{{ route.query?.drugName  }}</td>
            </tr>
              <tr>
                <td class="text-blue font-600 text-right">规格</td>
                <td colspan="3">{{ FormData.gg }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">是否是分包装文号</td>
                <td>{{ FormData.sffwbz  && filterDictTextByCache('SFBZ-1',FormData.sffwbz ) || FormData.sffwbz}}</td>
                <td class="text-blue font-600 text-right">分包装企业名称</td>
                <td>{{ FormData.fbzqymc }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">受托生产企业社会信用代码</td>
                <td>{{ FormData.yppzxxScdzxxStscqyshxydm }}</td>
                <td class="text-blue font-600 text-right">分包装企业社会信用代码</td>
                <td>{{ FormData.yppzxxScdzxxFbzxxQyshxydm }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">分包装药品批准文号注册证号</td>
                <td>{{ FormData.yppzxxScdzxxFbzxxYppzwh }}</td>
                <td class="text-blue font-600 text-right">分包装药品备案号</td>
                <td>{{ FormData.yppzxxScdzxxFbzxxBah }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产类型</td>
                <td colspan="3">{{ FormData.sclx  && filterDictTextByCache('ndbgSclx',FormData.sclx ) || FormData.sclx}}</td>
            </tr>
            <tr v-if="FormData.sclx == '1'">
                <td class="text-blue font-600 text-right">委托类型</td>
                <td colspan="3">{{ FormData.yppzxxScdzxxJnw  && filterDictTextByCache('ndbgWtlx',FormData.yppzxxScdzxxJnw ) || FormData.yppzxxScdzxxJnw}}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">规格</td>
                <td colspan="3">{{ FormData.gg }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产企业名称</td>
                <td colspan="3">{{ FormData.scqlmc }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产地址</td>
                <td colspan="3">{{ FormData.scdz }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产车间</td>
                <td>{{ FormData.sccj }}</td>
                <td class="text-blue font-600 text-right">生产线</td>
                <td>{{ FormData.scx }}</td>
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
import { useRoute } from 'vue-router';
const route = useRoute();
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
