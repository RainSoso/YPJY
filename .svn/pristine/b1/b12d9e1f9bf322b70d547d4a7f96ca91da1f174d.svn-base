<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="企业人员详情" @ok="handleSubmit" width="80%">
        <table class="my-table">
            <colgroup>
            <col style="width:10%" />
            <col />
            <col style="width:20%" />
            <col />
            </colgroup>
            <tbody>
            <tr>
                <td class="text-blue font-600 text-right">企业名称</td>
                <td>{{ Info.qymc }}</td>
                <td class="text-blue font-600 text-right">社会信用代码</td>
                <td>{{ Info.shxydm }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">人员类别</td>
                <td>{{ getDictText('cdwjRy_rylb',Info.lb) }}
                </td>
                <td class="text-blue font-600 text-right">姓名</td>
                <td>{{ Info.xm }}</td>
            </tr>
            <tr >
                <td class="text-blue font-600 text-right">性别</td>
                <td>
                {{ Info.xb   == '0' ? '男' : '女'}}
                </td>
                <td class="text-blue font-600 text-right">身份证号</td>
                <td>
                {{ Info.sfzh }}
                </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right" v-if="['11', '3'].includes(Info.lb)">联系方式</td>
                <td v-if="['11', '3'].includes(Info.lb)">
                {{ Info.lxfs }}
                </td>
                <td class="text-blue font-600 text-right" v-if="['11', '4'].includes(Info.lb)">职称</td>
                <td v-if="['11', '4'].includes(Info.lb)">{{ Info.zc }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">学历</td>
                <td >
                {{ getDictText('XLDM-1',Info.xl) }}
                </td>
                <td class="text-blue font-600 text-right" >人员状态</td>
                <td  >{{ Info.flag   == '0' ? '在岗' : ( Info.flag   == '1' ? '转岗':(Info.flag   == '2' ? '离职' : '退休'))}} </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right" v-if="['2', '3'].includes(Info.lb)">执业药师注册证号</td>
                <td v-if="['2', '3'].includes(Info.lb)">{{ Info.zyyszczh }} </td>
                <td class="text-blue font-600 text-right" v-if="['2', '3'].includes(Info.lb)">执业药师资格证号</td>
                <td v-if="['2', '3'].includes(Info.lb)">{{ Info.zyyszgzh }} </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right" v-if="['4', '5', '6'].includes(Info.lb)">专业</td>
                <td v-if="['4', '5', '6'].includes(Info.lb)">{{ Info.zy }} </td>
                <td class="text-blue font-600 text-right"  v-if="['5', '6'].includes(Info.lb)">法人授权委托书流水号</td>
                <td  v-if="['5', '6'].includes(Info.lb)">{{ Info.frsqs }} </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right" v-if="['2', '3'].includes(Info.lb)">工作经历</td>
                <td colspan="3" v-if="['2', '3'].includes(Info.lb)">{{ Info.gzjl }} </td>
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

const formatToDate1 = formatToDate;
const Info = ref({});
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    debugger
    Info.value = data.record || {};
    setModalProps({ confirmLoading: false, width: 1000, footer: null });
});

function handleSubmit() {
    //关闭弹窗
    closeModal();
}
</script>

<style lang="less" scoped></style>
