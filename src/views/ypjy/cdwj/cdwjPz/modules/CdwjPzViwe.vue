<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="60%">
        <h2>【场地文件经营品种信息】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">批准文号</td>
                <td>{{ FormData.pzwh }}</td>
                <td class="text-blue font-600 text-right">商品名称</td>
                <td>{{ FormData.spm }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">商品规格</td>
                <td>{{ FormData.spgg }}</td>
                <td class="text-blue font-600 text-right">单位</td>
                <td>{{ FormData.dw }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">是否首营品种</td>
                <td>{{ FormData.sfsy == 'Y' ? '是' : '否' }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产企业名称</td>
                <td>{{ FormData.scqymc }}</td>
                <td class="text-blue font-600 text-right">生产企业社会信用代码</td>
                <td>{{ FormData.scqydm}}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">剂型</td>
                <td >{{ getDictText("cdwjPz_jx", FormData.jx) }}</td>
                <td class="text-blue font-600 text-right">商品类别</td>
                <td >{{ getDictText("cdwjPz_lb", FormData.lb) }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">存储条件</td>
                <td >{{  FormData.cctj }}</td>
                <td class="text-blue font-600 text-right">状态</td>
                <td >{{ FormData.zt == '1' ? '经营' : '停业'}}</td>
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
   // ZbData.value = data.record.mx.records || [];
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
