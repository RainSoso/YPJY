<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="60%">
        <h2>【场地文件采购，供应信息】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">供应商/购货商</td>
                <td>{{ getDictText("cdwjCggy_lb", FormData.lb) }}</td>
                <td class="text-blue font-600 text-right">是否首营</td>
                <td>{{ FormData.sfsy == 'Y' ? '是' : '否' }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">企业名称</td>
                <td>{{ FormData.qymc }}</td>
                <td class="text-blue font-600 text-right">社会信用代码</td>
                <td>{{ FormData.shxydm }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">委托人</td>
                <td>{{ FormData.wtr}}</td>
                <td class="text-blue font-600 text-right">委托人证件号码</td>
                <td>{{ FormData.wtrshz}}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">委托人联系方式</td>
                <td>{{ FormData.wtrlxfs }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">起始日期</td>
                <td >{{ FormData.beginTime }}</td>
                <td class="text-blue font-600 text-right">结束日期</td>
                <td >{{ FormData.endTime }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">采购权限</td>
                <td >{{  FormData.cgqx == 'Y' ? '是' : '否' }}</td>
                <td class="text-blue font-600 text-right">提货权限</td>
                <td >{{ FormData.thqx  == 'Y' ? '是' : '否' }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">销售权限</td>
                <td >{{  FormData.xsqx == 'Y' ? '是' : '否' }}</td>
                <td class="text-blue font-600 text-right">是否合规</td>
                <td >{{ FormData.sfhg  == 'Y' ? '是' : '否' }}</td>
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
const formatToDate1 = formatToDate;
const FormData = ref({});
const ZbData = ref([]);
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    FormData.value = data.record || {};
    //ZbData.value = data.record.mx.records || [];
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
