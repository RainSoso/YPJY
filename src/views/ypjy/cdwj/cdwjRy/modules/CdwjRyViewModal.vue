<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="60%">
        <h2>【场地文件主要人员】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">人员类别</td>
                <td>{{ getDictText("cdwjRy_rylb", FormData.lb) }}</td>
                <td class="text-blue font-600 text-right">姓名</td>
                <td>{{ FormData.xm }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">性别</td>
                <td>{{ FormData.xb == '0' ? '男' : '女' }}</td>
                <td class="text-blue font-600 text-right">身份证号</td>
                <td>{{ FormData.sfzh }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">联系方式</td>
                <td>{{ FormData.lxfs }}</td>
                <td class="text-blue font-600 text-right">学历</td>
                <td>{{ getDictText("XLDM-1", FormData.xl) }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">专业</td>
                <td>{{ FormData.zy }}</td>
                <td class="text-blue font-600 text-right">职称</td>
                <td>{{ FormData.zc }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">执业药师注册证号</td>
                <td>{{ FormData.zyyszczh }}</td>
                <td class="text-blue font-600 text-right">执业药师资格证号</td>
                <td>{{ FormData.zyyszgzh }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">法人授权委托书流水号</td>
                <td>{{ FormData.frsqs }}</td>
                <td class="text-blue font-600 text-right">授权品种</td>
                <td>{{ FormData.sqpz }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">授权开始期限</td>
                <td>{{ FormData.sqksrq }}</td>
                <td class="text-blue font-600 text-right">授权结束期限</td>
                <td>{{ FormData.sqjsrq }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">授权区域</td>
                <td colspan="3">{{ FormData.sqqy }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right" >人员状态</td>
                <td colspan="3" >{{ FormData.flag   == '0' ? '在岗' : ( FormData.flag   == '1' ? '转岗':(FormData.flag   == '2' ? '离职' : '退休'))}} </td>
            </tr>
            <!-- <tr>
                <td  class="text-blue font-600 text-right">人员变更记录</td>
                <td colspan="3">
                    <table class="my-table"> 
                        <tr  class="text-black font-600 text-center">
                            <td width="3%">序号</td> 
                            <td width="10%">人员类别</td>
                            <td width="8%">姓名</td>
                            <td width="20%">职称</td>
                            <td width="10%">学历</td>
                            <td width="10%">专业</td>
                            <td width="8%">操作</td>
                        </tr>
                        <tbody>
                            <tr align="center" v-for="(item, index) in cdwjRybgData" :key="index">
                                <td align="center">{{index + 1}}</td>
                                <td>{{item.lb}}</td>
                                <td>{{item.xm}}</td>
                                <td>{{item.zc}}</td>
                                <td>{{item.xl}}</td>
                                <td>{{item.zy}}</td>
                                
                            </tr>
                        </tbody>
                    </table>    

                </td>
            </tr> -->

                <!-- <td class="text-blue font-600 text-right">发证日期</td>
                <td>{{ FormData.fzrq && formatToDate1(FormData.fzrq) }}</td> -->
            
        </table>
    </BasicModal>
</template>

<script lang="ts" setup>
import { getDictText } from '/@/utils/dict/JDictSelectUtil';
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { formatToDate } from '/@/utils/dateUtil';
import { getTextByCode } from '/@/utils/area/areaDataUtil';
import {getCdwjRybg} from '../CdwjRy.api';
const formatToDate1 = formatToDate;
const FormData = ref({});
const cdwjRybgData = ref([]);
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    
    FormData.value = data.record || {};
    // getCdwjRybg({ bghid: data.record.id }).then((res) => {
    //     cdwjRybgData.value = res;
    //   }).catch(() => {
    //     console.log(arguments);
    //   });
    //查询企业人员变更记录，
    setModalProps({ confirmLoading: false, width: 1000, footer: null });

});
function handleSubmit() {
    //关闭弹窗
    closeModal();
}
</script>

<style lang="less" scoped></style>
