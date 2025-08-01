<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="执证药师详情" @ok="handleSubmit" width="80%">
        <table class="my-table">
            <colgroup>
            <col style="width:10%" />
            <col />
            <col style="width:20%" />
            <col />
            </colgroup>
            <tbody>
            <tr>
                <td class="text-blue font-600 text-right">注册证书号码</td>
                <td>{{ Info.zczshm }}</td>
                <td class="text-blue font-600 text-right">资格证书号码</td>
                <td>{{ Info.zgzshm }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">姓名</td>
                <td>{{Info.zwxm }} </td>
                <td class="text-blue font-600 text-right">证件类型</td>
                <td>{{ getDictText('SFZJLX-1',Info.zjlx)  }}</td>
            </tr>
                <tr >
                    <td class="text-blue font-600 text-right">证件号码</td>
                    <td>{{ Info.zjhm }}</td>
                    <td class="text-blue font-600 text-right">性别</td>
                    <td>{{ Info.xb   == '1' ? '男' : '女'}}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">名族</td>
                    <td >
                    {{ Info.mz == '1' ? '汉族' : '少数民族' }}
                    </td>
                    <td class="text-blue font-600 text-right">出生日期</td>
                    <td >
                    {{ Info.csrq }}
                    </td>
                </tr>
                
            <tr>
                <td class="text-blue font-600 text-right">职称</td>
                <td>{{ getDictText('zyys_zc',Info.zc) }} </td>
                <td class="text-blue font-600 text-right">参加工作时间</td>
                <td>{{ Info.cjgzsj }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">手机号码</td>
                <td>{{ Info.sjhm }} </td>
                <td class="text-blue font-600 text-right">电子邮件</td>
                <td>{{ Info.dzyj }} </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">邮政编码</td>
                <td>{{ Info.yzbm }} </td>
                <td class="text-blue font-600 text-right">毕业学校</td>
                <td>{{ Info.byxx }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">所学专业</td>
                <td>{{ getDictText('zyys_zy',Info.sxzy)}} </td>
                <td class="text-blue font-600 text-right">学历</td>
                <td>{{ Info.xl }} </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">执业地区</td>
                <td>{{  getAreaName(Info.zydqssqx) }} </td>
                <td class="text-blue font-600 text-right">执业类别</td>
                <td>{{ getDictText('zyys_zylb',Info.zylb) }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">执业范围</td>
                <td>{{ getDictText('zyys_zyfw',Info.zyfw)}} </td>
                <td class="text-blue font-600 text-right">执业单位名称</td>
                <td>{{ Info.zydwmc }} </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">执业单位地址</td>
                <td>{{ Info.zydwdz }} </td>
                <td class="text-blue font-600 text-right">执业单位联系电话</td>
                <td>{{ Info.zydwlxdh }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">执业单位证号</td>
                <td>{{ Info.zydwzh }} </td>
                <td class="text-blue font-600 text-right">现工作岗位</td>
                <td>{{ Info.xgzgwShow }} </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">注册时间</td>
                <td>{{ Info.zcsj }} </td>
                <td class="text-blue font-600 text-right">有效日期</td>
                <td>{{ Info.yxrq }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">注册类型</td>
                <td>{{ getDictText('zyys_zclx',Info.zclx)}}  </td>
                <td class="text-blue font-600 text-right">注册状态</td>
                <td>{{ getDictText('zyys_zczt',Info.zczt)}}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">注销注册原因</td>
                <td>{{ getDictText('zyys_zxzcyy',Info.zxzcyy) }} </td>
                <td class="text-blue font-600 text-right">变更原因</td>
                <td>{{ getDictText('zyys_bgyy',Info.bgyy) }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">报考单位</td>
                <td>{{ Info.bkdw }} </td>
                <td class="text-blue font-600 text-right">考试年份</td>
                <td>{{ Info.ksnf }}</td>
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
