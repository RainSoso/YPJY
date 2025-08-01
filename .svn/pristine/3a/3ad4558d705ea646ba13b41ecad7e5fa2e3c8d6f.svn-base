<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="80%">
        <table class="my-table">
            <colgroup>
            <col style="width:10%" />
            <col />
            <col style="width:20%" />
            <col />
            </colgroup>
            <tbody>
            <tr>
                <td class="text-blue font-600 text-right">证书编号</td>
                <td>{{ Info.zsbh }}</td>
                <td class="text-blue font-600 text-right">企业名称</td>
                <td>{{ Info.qymc }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">统一社会信用代码</td>
                <td>{{ Info.shxydm }}</td>
                <td class="text-blue font-600 text-right">注册地址</td>
                <td>{{ Info.zcdz }}</td>
            </tr>
                <tr v-if="Info.type == '0'">
                    <td class="text-blue font-600 text-right">生产范围</td>
                    <td colspan="3">
                    {{ Info.scfw }}
                    </td>
                </tr>
                <tr v-if="Info.type == '0'">
                    <td class="text-blue font-600 text-right">生产范围副本</td>
                    <td colspan="3">
                    {{ Info.scfw_fb }}
                    </td>
                </tr>
                <tr v-if="Info.type != '0'">
                    <td class="text-blue font-600 text-right">仓库地址</td>
                    <td colspan="3">
                    {{ Info.ckdz }}
                    </td>
                </tr>
                <tr v-if="Info.type != '0'">
                    <td class="text-blue font-600 text-right">范围</td>
                    <td class="my-undefined" colspan="3">
                    {{ Info.fw }}
                    </td>
                </tr>
            <tr>
                <td class="text-blue font-600 text-right">法定代表人</td>
                <td>{{ Info.fddbr }} </td>
                <td class="text-blue font-600 text-right">企业负责人</td>
                <td>{{ Info.qyfzr }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">质量负责人</td>
                <td colspan="3">{{ Info.zlfzr }} </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">发证日期</td>
                <td>{{ Info.fzrq }} </td>
                <td class="text-blue font-600 text-right">有效截止日期</td>
                <td>{{ Info.yxqz }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">监督检查机构</td>
                <td>{{ Info.rcjgjgmc }} </td>
                <td class="text-blue font-600 text-right">发证机关</td>
                <td>{{ Info.fzjg }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">签发人</td>
                <td class="my-undefined" colspan="3">{{ Info.qfr }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">变更情况</td>
                <td colspan="3">
                <table class="my-table">
                    <tbody>
                    <tr v-for="(item, idx) in bgxxlist" :key="idx">
                        <td class="my-undefined">{{ item }}</td>
                    </tr>
                    </tbody>
                </table>
                </td>
            </tr>
            </tbody>
        </table>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { formatToDate } from '/@/utils/dateUtil';
import { getTextByCode } from '/@/utils/area/areaDataUtil';
import {getXkzxxByShxydm} from '../Xkzs.api';

const formatToDate1 = formatToDate;
const Info = ref({});
const bgxxlist = ref([]);
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    getXkzxxByShxydm({ id: data.data.id }).then((res) => {
        //Info.value = res.data || {};
        //var type = Info.value.type;
        //title.value = type == '01' ? '药品经营批发许可证' : '药品经营零售连锁总部';
        bgxxlist.value = res.bgxxlist || [];
      });
    Info.value = data.data || {};
    setModalProps({ confirmLoading: false, width: 1000, footer: null });

});

function handleSubmit() {
    //关闭弹窗
    closeModal();
}
</script>

<style lang="less" scoped></style>
