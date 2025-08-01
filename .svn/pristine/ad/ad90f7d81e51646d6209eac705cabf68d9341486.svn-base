<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
        <h2>【抽样记录】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">年度</td>
                <td>{{ FormData.nd }}</td>
                <td class="text-blue font-600 text-right">抽验级别</td>
                <td>{{ FormData.cyjb && filterDictTextByCache('CYJB-1', FormData.cyjb) || FormData.cyjb }}</td>

            </tr>
            <tr>
                <td class="text-blue font-600 text-right">抽验目的</td>
                <td>{{ FormData.cymd && filterDictTextByCache('CYMD-1', FormData.cymd) || FormData.cymd }}</td>
                <td class="text-blue font-600 text-right">抽验目的细化类别</td>
                <td>{{ FormData.cymdxhlb }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">抽样环节</td>
                <td>{{ FormData.cyhj && filterDictTextByCache('CYHJ-1', FormData.cyhj) || FormData.cyhj }}</td>
                <td class="text-blue font-600 text-right">抽样地点性质</td>
                <td>{{ FormData.cyddxz && filterDictTextByCache('CYDDXZ-1', FormData.cyddxz) || FormData.cyddxz }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">是否基药</td>
                <td colspan="3">{{ FormData.sfjy && filterDictTextByCache('SFJY-1', FormData.sfjy) || FormData.sfjy }}
                </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">抽样编号</td>
                <td>{{ FormData.cybh }}</td>
                <td class="text-blue font-600 text-right">抽样日期</td>
                <td>{{ FormData.cyrq }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">药品通用名</td>
                <td>{{ FormData.yptym }}</td>
                <td class="text-blue font-600 text-right">药品商品名</td>
                <td>{{ FormData.ypspm }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">批号</td>
                <td>{{ FormData.ph }}</td>
                <td class="text-blue font-600 text-right">制剂规格</td>
                <td>{{ FormData.zjgg }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">包装规格</td>
                <td>{{ FormData.bzgg }}</td>
                <td class="text-blue font-600 text-right">执行标准</td>
                <td>{{ FormData.zxbz }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">剂型</td>
                <td>{{ FormData.jx && filterDictTextByCache('JX-1', FormData.jx) || FormData.jx }}</td>
                <td class="text-blue font-600 text-right">药品大类</td>
                <td>{{ FormData.ypdl && filterDictTextByCache('YPDL-1', FormData.ypdl) || FormData.ypdl }}</td>

            </tr>
            <tr>
                <td class="text-blue font-600 text-right">药品细类</td>
                <td>{{ FormData.ypxl && filterDictTextByCache('YPXL-1', FormData.ypxl) || FormData.ypxl }}</td>
                <td class="text-blue font-600 text-right">药品原料</td>
                <td>{{ FormData.ypyl }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">特殊药品</td>
                <td>{{ FormData.tsyp }}</td>
                <td class="text-blue font-600 text-right">批准文号</td>
                <td>{{ FormData.pzwh }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">质量受控代码</td>
                <td>{{ FormData.zlskdm }}</td>
                <td class="text-blue font-600 text-right">生产日期</td>
                <td>{{ FormData.scrq }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">有效期</td>
                <td>{{ FormData.yxrq }}</td>
                <td class="text-blue font-600 text-right">有效期至</td>
                <td>{{ FormData.yxqz }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">效期（月）</td>
                <td>{{ FormData.xq }}</td>
                <td class="text-blue font-600 text-right">样品贮存温度（℃）</td>
                <td>{{ FormData.ypzcwd }}℃</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">样品贮存相对湿度（%）</td>
                <td colspan="3">{{ FormData.ypzcxdsd }}%</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">样品包装</td>
                <td>{{ FormData.ypbz }}</td>
                <td class="text-blue font-600 text-right">外包装情况</td>
                <td>{{ FormData.wbzqk }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">抽样数量</td>
                <td>{{ FormData.cysl }}</td>
                <td class="text-blue font-600 text-right">留样数量</td>
                <td>{{ FormData.lysl }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产、配置或购进数量</td>
                <td>{{ FormData.scpzhgjsl }}{{ FormData.scpzhgjsldw }}</td>
                <td class="text-blue font-600 text-right">库存数量及价值</td>
                <td>{{ FormData.kcsl }}{{ FormData.kcsldw }}{{ FormData.kcjz }}元</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">抽样地点</td>
                <td colspan="3">{{ FormData.cydd }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">抽样说明</td>
                <td colspan="3">{{ FormData.cysm }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产单位(委托方)</td>
                <td>{{ FormData.bsccdw }}</td>
                <td class="text-blue font-600 text-right">生产单位曾用名</td>
                <td>{{ FormData.bsccdycym }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产单位所属省份</td>
                <td>{{ FormData.bsccdwsssf }}</td>
                <td class="text-blue font-600 text-right">生产单位所属地市</td>
                <td>{{ FormData.bsscdwssds && getTextByCode(FormData.bsscdwssds) || FormData.bsscdwssds }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产单位所属区/县</td>
                <td>{{ FormData.bsscdwssqx && getTextByCode(FormData.bsscdwssqx) || FormData.bsscdwssqx }}</td>
                <td class="text-blue font-600 text-right">生产单位(受托方)</td>
                <td>{{ FormData.stfscdw }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">受托方所属省份</td>
                <td>{{ FormData.stfsssf }}</td>
                <td class="text-blue font-600 text-right">生产单位详细地址</td>
                <td>{{ FormData.scdwxxdz }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">社会信用代码</td>
                <td colspan="3"> {{ FormData.zzdm }} </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">被抽样单位</td>
                <td>{{ FormData.bcydwmc }}</td>
                <td class="text-blue font-600 text-right">被抽样单位所在省份</td>
                <td>{{ FormData.bcydwsssf && getTextByCode(FormData.bcydwsssf) || FormData.bcydwsssf }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">被抽样单位所在地市</td>
                <td>{{ FormData.bcydwssds && getTextByCode(FormData.bcydwssds) || FormData.bcydwssds }}</td>
                <td class="text-blue font-600 text-right">被抽样单位所在县</td>
                <td>{{ FormData.bcydwssqx && getTextByCode(FormData.bcydwssqx) || FormData.bcydwssqx }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">被抽样单位地址</td>
                <td>{{ FormData.bcydwdz }}</td>
                <td class="text-blue font-600 text-right">被抽样单位联系人</td>
                <td>{{ FormData.bcydwcylxr }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">被抽样单位电话</td>
                <td>{{ FormData.bcydwdh }}</td>
                <td class="text-blue font-600 text-right">被抽样单位邮编</td>
                <td>{{ FormData.yb }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">抽样单位</td>
                <td>{{ FormData.cydwmc }}</td>
                <td class="text-blue font-600 text-right">抽样单位所属省份</td>
                <td>{{ FormData.cydwsssf && getTextByCode(FormData.cydwsssf) || FormData.cydwsssf }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">抽样单位所属地市</td>
                <td>{{ FormData.cydwssds && getTextByCode(FormData.cydwssds) || FormData.cydwssds }}</td>
                <td class="text-blue font-600 text-right">抽样单位所属县</td>
                <td>{{ FormData.cydwssx && getTextByCode(FormData.cydwssx) || FormData.cydwssx }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">抽样单位经手人签名</td>
                <td>{{ FormData.cydwjsrqm }}</td>
                <td class="text-blue font-600 text-right">抽样单位联系人</td>
                <td>{{ FormData.cydwlxr }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">被抽样单位经手人签名</td>
                <td>{{ FormData.bcydwjsrqm }}</td>
                <td class="text-blue font-600 text-right">抽样单位联系电话</td>
                <td>{{ FormData.cydwlxdh }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检验单位</td>
                <td>{{ FormData.jydwmc }}</td>
                <td class="text-blue font-600 text-right">检验单位所属省份</td>
                <td>{{ FormData.jydwsssf && getTextByCode(FormData.jydwsssf) || FormData.jydwsssf }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检验单位所属地市</td>
                <td>{{ FormData.jydwssds && getTextByCode(FormData.jydwssds) || FormData.jydwssds }}</td>
                <td class="text-blue font-600 text-right">检验单位所属县</td>
                <td>{{ FormData.jydwssx && getTextByCode(FormData.jydwssx) || FormData.jydwssx }}</td>
            </tr>
        </table>
        <h2 v-if="flag">【检验报告】</h2>
        <table class="my-table mb-2" v-if="flag">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">报告编号</td>
                <td>{{ ypgs.bgbh }}</td>
                <td class="text-blue font-600 text-right">检品名称</td>
                <td>{{ FormData.yptym }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">规格</td>
                <td>{{ FormData.zjgg }}</td>
                <td class="text-blue font-600 text-right">批号</td>
                <td>{{ FormData.ph }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">剂型</td>
                <td>{{ FormData.jx && filterDictTextByCache('JX-1', FormData.jx) || FormData.jx }}</td>
                <td class="text-blue font-600 text-right">生产单位或产地</td>
                <td>{{ FormData.bsccdw }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">包装</td>
                <td>{{ FormData.ypbz }}</td>
                <td class="text-blue font-600 text-right">供样单位名称</td>
                <td>{{ FormData.bcydwmc }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">有效期至</td>
                <td>{{ FormData.yxqz }}</td>
                <td class="text-blue font-600 text-right">检验目的</td>
                <td>{{ FormData.cymd && filterDictTextByCache('CYMD-1', FormData.cymd) || FormData.cymd }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">签封数量</td>
                <td>{{ ypgs.qfsl }}</td>
                <td class="text-blue font-600 text-right">检验项目类别</td>
                <td>{{ ypgs.jyxmlb && filterDictTextByCache('JYXMLB-1', ypgs.jyxmlb) || ypgs.jyxmlb }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">收检日期</td>
                <td>{{ ypgs.sjrq && formatToDate1(ypgs.sjrq) }}</td>
                <td class="text-blue font-600 text-right">检品数量</td>
                <td>{{ ypgs.jpsl }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">报告日期</td>
                <td>{{ ypgs.bgrq && formatToDate1(ypgs.bgrq) }}</td>
                <td class="text-blue font-600 text-right">抽样单编号</td>
                <td>{{ ypgs.cybh }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">抽样人</td>
                <td>{{ FormData.cydwjsrqm }}</td>
                <td class="text-blue font-600 text-right">检验依据</td>
                <td>{{ ypgs.jyyj }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检验单位</td>
                <td colspan="3">{{ FormData.jydwmc }}
                </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检验结果</td>
                <td colspan="3">{{ ypgs.jyjg && filterDictTextByCache('JYJG-1', ypgs.jyjg) || ypgs.jyjg }}
                </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">不合格项目</td>
                <td colspan="3">{{ ypgs.bfhgdxm }}
                </td>
            </tr>
        </table>
        <h2 v-if="flag">【检验项目】</h2>
        <table class="my-table" v-if="flag">
            <colgroup>
                <col style="width:60px" />
                <col style="width:120px;" />
                <col style="width:150px;" />
                <col />
                <col />
                <col style="width:100px;" />
                <col style="width:90px;" />
            </colgroup>
            <tr>
                <td class="text-black font-600 text-center">序号</td>
                <td class="text-black font-600 text-center">检验项目大类</td>
                <td class="text-black font-600 text-center">检验项目</td>
                <td class="text-black font-600 text-center">标准规定</td>
                <td class="text-black font-600 text-center">检验结果</td>
                <td class="text-black font-600 text-center">检验结论</td>
                <td class="text-black font-600 text-center">实验人</td>
            </tr>
            <tbody>
                <tr v-for="(item, index) in list" :key="index">
                    <td class="font-200 text-center">{{ index + 1 }}</td>
                    <td class="font-200 text-center">{{ item.jyxmdl &&
                        filterDictTextByCache('JYXMDL-1', item.jyxmdl) || item.jyxmdl
                        }}</td>
                    <td class="font-200 text-center">{{ item.jyxm }}</td>
                    <td class="font-200 text-center">{{ item.bzgd }}</td>
                    <td class="font-200 text-center">{{ item.jyjg }}</td>
                    <td class="font-200 text-center">{{ item.jyjl }}</td>
                    <td class="font-200 text-center">{{ item.syr }}</td>
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
import { queryById } from '/@/views/ypsczhjg/yw/ypcyjl/TYwCjyYpcyji.api';
import { getTextByCode } from '/@/utils/area/areaDataUtil';
const formatToDate1 = formatToDate;
const FormData = ref({});
const ypgs = ref({});
const list = ref({});
const flag = ref(false);
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    FormData.value = data.record || {};
    setModalProps({ confirmLoading: false, width: 1000, footer: null });
    queryById({ id: data.record.id }).then((res) => {
        flag.value = false;
        ypgs.value = res.ypgs || {};
        list.value = res.list || {};
        if (res.ypgs != null) {
            flag.value = true;
        }
    });
});
function handleSubmit() {
    //关闭弹窗
    closeModal();
}
</script>

<style lang="less" scoped></style>
