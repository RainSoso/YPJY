<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
        <h2>【医药代理备案管理情况自查表】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">药品上市许可持有人</td>
                <td colspan="3">{{ FormData.cyrmc }}  ({{ FormData.shxydm }})</td>
            </tr>
              <tr>
                <td class="text-blue font-600 text-right">企业所在辖区</td>
                <td colspan="3">{{ FormData.qyszxq }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">管理工作负责人</td>
                <td>{{FormData.glfzr}}</td>
                <td class="text-blue font-600 text-right">联系电话</td>
                <td>{{FormData.lxdh }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">签约医药代表人数</td>
                <td>{{ FormData.qyrs }}</td>
                <td class="text-blue font-600 text-right">已备案医药代表人数</td>
                <td>{{ FormData.bars }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">聘用或授权医药代表情况</td>
                <td colspan="3">{{ FormData.yydbqk }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">医药代表培训情况</td>
                <td colspan="3">{{ FormData.yydbpx }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">工作打算</td>
                <td colspan="3">{{ FormData.gzds }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">填表人</td>
                <td>{{ FormData.tbr }}</td>
                <td class="text-blue font-600 text-right">填表人联系电话</td>
                <td>{{ FormData.tbrlxfs }}</td>
            </tr>  
            <tr>
                <td class="text-blue font-600 text-right">医药代表备案名单</td>
                <td colspan="3">
                   <MUpload :bisId="FormData.id" :disabled="true"/>
               </td>
            </tr>  
        </table>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';

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
