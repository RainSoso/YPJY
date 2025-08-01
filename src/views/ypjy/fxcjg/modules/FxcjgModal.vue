<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="非现场监管详情" @ok="handleSubmit" width="80%">
        <table class="my-table">
            <colgroup>
            <col style="width:10%" />
            <col />
            <col style="width:20%" />
            <col />
            </colgroup>
            <tbody>
            <tr>
                <td class="text-blue font-600 text-right">社会信用代码</td>
                <td>{{ Info.shxydm }}</td>
                <td class="text-blue font-600 text-right">企业名称</td>
                <td>{{ Info.qymc }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检查编号</td>
                <td>{{ Info.jcbh }}</td>
                <td class="text-blue font-600 text-right">计划编号</td>
                <td>{{ Info.jhbh }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">方案名称</td>
                <td>{{ Info.famc }}</td>
                <td class="text-blue font-600 text-right">检查日期</td>
                <td>{{ Info.jcsj }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检查类别</td>
                <td colspan="3">{{ Info.jclb }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检查依据</td>
                <td colspan="3s">{{ Info.jcyj }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检查行为名称</td>
                <td>{{ Info.jcxw }}</td>
                <td class="text-blue font-600 text-right">检查结论</td>
                <td>{{ Info.jcjl }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">现场检查情况</td>
                <td colspan="3">{{ Info.xcjcqk }}</td>
            </tr> 
            <tr>
                <td class="text-blue font-600 text-right">检查结果类型</td>
                <td>{{getDictText('fxcjg_jcjglx',Info.jcjglx)}} </td>
                <td class="text-blue font-600 text-right">检查人员</td>
                <td>{{ Info.jcry }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">其他需要说明的问题</td>
                <td colspan="3">{{ Info.qtxysmwt }}</td>
            </tr>
            </tbody>
        </table>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { getDictText } from '/@/utils/dict/JDictSelectUtil';
import { formatToDate } from '/@/utils/dateUtil';
import { getTextByCode } from '/@/utils/area/areaDataUtil';

const formatToDate1 = formatToDate;
const Info = ref({});
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    debugger
    Info.value = data.record || {};
    setModalProps({ confirmLoading: false, width: 1000, footer: null });
});
function getAreaName(text) {
  return text === '429000' ? '汉江分局' : getTextByCode(text).replace(/(市|土家族苗族自治州)$/g, '分局');
}
function handleSubmit() {
    //关闭弹窗
    closeModal();
}
</script>

<style lang="less" scoped></style>
