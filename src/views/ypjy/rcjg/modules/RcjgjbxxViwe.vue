<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
        <h2>【{{ FormData.bdmc }}】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">监管编号</td>
                <td>{{ FormData.jgbh }}</td>
                <td class="text-blue font-600 text-right">表单名称</td>
                <td>{{ FormData.bdmc }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">社会信用代码</td>
                <td>{{ FormData.shxydm }}</td>
                <td class="text-blue font-600 text-right">企业名称</td>
                <td>{{ FormData.qymc }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检查时间</td>
                <td>{{ FormData.jcsj }}</td>
                <td class="text-blue font-600 text-right">检查部门</td>
                <td>{{ FormData.lybm }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">联系人</td>
                <td>{{ FormData.lxr }}</td>
                <td class="text-blue font-600 text-right">联系电话</td>
                <td>{{ FormData.dh }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检查形式</td>
                <td colspan="3"></td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检查人员</td>
                <td colspan="3">{{ FormData.jcry }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">其它需要说明问题</td>
                <td colspan="3">{{ FormData.qtxysmwt }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">综合评定结论</td>
                <td colspan="3">
                    {{
                        FormData.jcsj && new Date(FormData.jcsj).getFullYear() >= 2025
                            ? (FormData.jcjl == '1' ? '符合要求'
                                : (FormData.jcjl == '2' ? '整改后评定'
                                    : (FormData.jcjl == '3' ? '不符合要求'
                                        : FormData.jcjl)))
                            : (FormData.jcjl == '1' ? '基本符合规定'
                                : (FormData.jcjl == '2' ? '立即整改'
                                    : (FormData.jcjl == '3' ? '限期整改'
                                        : (FormData.jcjl == '4' ? '现场处罚'
                                            : '拟立案处罚'))))
                    }}
                </td>
            </tr>
        </table>
        <h2>【检查明细】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <th style="width:10%">条款号</th>
                <th style="width:70%">检查内容</th>
                <th style="width:5%">检查结果</th>
                <th style="width:15%">存在问题说明</th>
            </tr>
            <tr v-for="(item, index) in ZbData">
                <td>{{ item.zdyztk }}</td>
                <td>{{ item.jcnr }}</td>
                <td>{{ item.jcjl == '1' ? '合格' : '不合格' }}</td>
                <td>{{ item.czawtsm }}</td>
            </tr>
        </table>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { formatToDate } from '/@/utils/dateUtil';
import { getTextByCode } from '/@/utils/area/areaDataUtil';
const formatToDate1 = formatToDate;
const FormData = ref({});
const ZbData = ref([]);
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    FormData.value = data.record || {};
    ZbData.value = data.record.mx.records || [];
    setModalProps({ confirmLoading: false, width: 1000, footer: null });

});
const columns = ref([
    {
        title: '条款',
        align: 'center',
        dataIndex: 'BH',
    },
    {
        title: '检查内容',
        align: 'center',
        dataIndex: 'JCNR',
    },
    {
        title: '检查结果',
        align: 'center',
        dataIndex: 'JCJL',
    },
    {
        title: '其它',
        align: 'center',
        dataIndex: 'QT',
    },
]);
function handleSubmit() {
    //关闭弹窗
    closeModal();
}
</script>

<style lang="less" scoped></style>
