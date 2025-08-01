<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
    <h2>当事人信息</h2>
    <table class="my-table mb-2">
      <colgroup>
        <template v-for="(item, idx) in TableStyle.cols" :key="idx">
          <col :style="item.style || ''" />
        </template>
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">当事人</td>
        <td>{{ Jbxx.dsrmc }}</td>
        <td class="text-blue font-600 text-right">统一社会信用代码</td>
        <td>{{ Jbxx.shxydm }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">法定代表人</td>
        <td>{{ Jbxx.fddbr }}</td>
        <td class="text-blue font-600 text-right">身份证号码</td>
        <td>{{ Jbxx.fddbrsfzhm }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">联系电话</td>
        <td>{{ Jbxx.lxdh }}</td>
        <td class="text-blue font-600 text-right">邮编</td>
        <td>{{ Jbxx.yb }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">地址</td>
        <td colspan="3">{{ Jbxx.dz }}</td>
      </tr>
    </table>
    <h2>案件信息</h2>
    <table class="my-table mb-2">
      <colgroup>
        <template v-for="(item, idx) in TableStyle.cols" :key="idx">
          <col :style="item.style || ''" />
        </template>
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">登记时间</td>
        <td>{{ Jbxx.djsj && formatToDate1(Jbxx.djsj) }}</td>
        <td class="text-blue font-600 text-right">案件编号</td>
        <td>{{ Jbxx.ajbh }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">案件发生时间</td>
        <td>{{ Jbxx.ajfssj && formatToDate1(Jbxx.ajfssj) }}</td>
        <td class="text-blue font-600 text-right">是否当场办理</td>
        <td>{{ Jbxx.sfdcbl && getDictText1('SFBZ-1', Jbxx.sfdcbl) || Jbxx.sfdcbl }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">执法类别</td>
        <td>{{ Jbxx.zflb && getDictText1('ZFLB-1', Jbxx.zflb) || Jbxx.zflb }}</td>
        <td class="text-blue font-600 text-right">案件来源</td>
        <td>{{ Jbxx.ajly && getDictText1('AJLY-1', Jbxx.ajly) || Jbxx.ajly }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">案件所属行政区划</td>
        <td>{{ getTextByCode1(Jbxx.ajssxzqh) }}</td>
        <td class="text-blue font-600 text-right">是否无证经营</td>
        <td>{{ Clxx.sfwzjy && getDictText1('SFBZ-1', Clxx.sfwzjy) || Clxx.sfwzjy }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">失信类型</td>
        <td>{{ Jbxx.sxlx && getDictText1('SXLXDM-1', Jbxx.sxlx) || Jbxx.sxlx }}</td>
        <td class="text-blue font-600 text-right">案由</td>
        <td>{{ Jbxx.ay }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">基本情况介绍</td>
        <td colspan="3">{{ Jbxx.jbqkjs }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">主要违法事实</td>
        <td colspan="3">{{ Jbxx.zywfss }}</td>
      </tr>
    </table>
    <h2>承办信息</h2>
    <table class="my-table mb-2">
      <colgroup>
        <template v-for="(item, idx) in TableStyle.cols" :key="idx">
          <col :style="item.style || ''" />
        </template>
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">经办人姓名</td>
        <td>{{ Clxx.jbrxm }}</td>
        <td class="text-blue font-600 text-right">经办日期</td>
        <td>{{ Clxx.jbrq && formatToDate1(Clxx.jbrq) }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">立案日期</td>
        <td>{{ Jbxx.lasj && formatToDate1(Jbxx.lasj) }}</td>
        <td class="text-blue font-600 text-right">承办人姓名</td>
        <td>{{ Clxx.cbrxm }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">办理方式</td>
        <td>{{ Clxx.blfs && getDictText1('AJCLFSDM-1', Clxx.blfs) || Clxx.blfs }}</td>
        <td class="text-blue font-600 text-right">调查时间</td>
        <td></td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">是否申请听证</td>
        <td>{{ Clxx.sfsqtz && getDictText1('SFBZ-1', Clxx.sfsqtz) || Clxx.sfsqtz }}</td>
        <td class="text-blue font-600 text-right">听证结果</td>
        <td>{{ Clxx.tzjg && getDictText1('LSAJCLJG-1', Clxx.tzjg) || Clxx.tzjg }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">是否申请复议</td>
        <td>{{ Clxx.sfsqfy && getDictText1('SFBZ-1', Clxx.sfsqfy) || Clxx.sfsqfy }}</td>
        <td class="text-blue font-600 text-right">复议结果</td>
        <td>{{ Clxx.fyjg && getDictText1('LSAJCLJG-1', Clxx.fyjg) || Clxx.fyjg }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">是否提起诉讼</td>
        <td>{{ Clxx.sftqss && getDictText1('SFBZ-1', Clxx.sftqss) || Clxx.sftqss }}</td>
        <td class="text-blue font-600 text-right">诉讼结果</td>
        <td>{{ Clxx.ssjg && getDictText1('LSAJCLJG-1', Clxx.ssjg) || Clxx.ssjg }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">签发人</td>
        <td>{{ Jbxx.qfrMc }}</td>
        <td class="text-blue font-600 text-right">结案时间</td>
        <td>{{ Jbxx.jasj && formatToDate1(Jbxx.jasj) }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">档案归类</td>
        <td>{{ Jbxx.dagl && getDictText1('DAGL-1', Jbxx.dagl) || Jbxx.dagl }}</td>
        <td class="text-blue font-600 text-right">保存期限</td>
        <td>{{ Jbxx.bcqx && getDictText1('BCQX-1', Jbxx.bcqx) || Jbxx.bcqx }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">归档时间</td>
        <td>{{ Jbxx.gdsj && formatToDate1(Jbxx.gdsj) }}</td>
        <td class="text-blue font-600 text-right">执行结果</td>
        <td>{{ Jbxx.zxjg }}</td>
      </tr>
    </table>
    <h2>处罚信息</h2>
    <table class="my-table">
      <colgroup>
        <template v-for="(item, idx) in TableStyle.cols" :key="idx">
          <col :style="item.style || ''" />
        </template>
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">处罚日期</td>
        <td>{{ Clxx.cfrq && formatToDate1(Clxx.cfrq) }}</td>
        <td class="text-blue font-600 text-right">处罚类型</td>
        <td>{{ Jbxx.cflx && getDictText1('CFLX-1', Jbxx.cflx) || Jbxx.cflx }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">行政处罚内容</td>
        <td>{{ Clxx.xzcfnr }}</td>
        <td class="text-blue font-600 text-right">处罚依据</td>
        <td>{{ Clxx.cfyj }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">规定处罚</td>
        <td>{{ Clxx.gdcf }}</td>
        <td class="text-blue font-600 text-right">实际到账(元)</td>
        <td>{{ Clxx.sjdz }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">结案方式</td>
        <td>{{ Clxx.jafs && getDictText1('JAFS-1', Clxx.jafs) || Clxx.jafs }}</td>
        <td class="text-blue font-600 text-right">移送司法机关</td>
        <td>{{ Clxx.sfyssfjg && getDictText1('SFBZ-1', Clxx.sfyssfjg) || Clxx.sfyssfjg }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">司法机关结案时间</td>
        <td>{{ Clxx.sfjgjasj && formatToDate1(Clxx.sfjgjasj) }}</td>
        <td class="text-blue font-600 text-right">刑事处罚结果</td>
        <td>{{ Clxx.xscfjg }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">案值(元)</td>
        <td>{{ Clxx.az }}</td>
        <td class="text-blue font-600 text-right">货值金额(元)</td>
        <td>{{ Clxx.hzje }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">涉及物品总值(元)</td>
        <td>{{ Clxx.wfsdsjwpzz }}</td>
        <td class="text-blue font-600 text-right">没收金额(元)</td>
        <td>{{ Clxx.msje }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">罚款金额(元)</td>
        <td>{{ Clxx.cyfk }}</td>
        <td class="text-blue font-600 text-right">罚没款合计(元)</td>
        <td>{{ Clxx.fmkhj }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">销毁价值(元)</td>
        <td>{{ Clxx.xhhz }}</td>
        <td class="text-blue font-600 text-right">捣毁售假窝点(个)</td>
        <td>{{ Clxx.sjwd }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">捣毁制假窝点(个)</td>
        <td>{{ Clxx.zjwd }}</td>
        <td class="text-blue font-600 text-right">罚没假劣一次性注射器(支)</td>
        <td>{{ Clxx.fmjlycxzsq }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">罚没假劣一次性输液器(套)</td>
        <td>{{ Clxx.fmjlycxsyq }}</td>
        <td class="text-blue font-600 text-right">缴获产品数量(公斤)</td>
        <td>{{ Clxx.jhcpslGj }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">缴获产品数量(公升)</td>
        <td>{{ Clxx.jhcpslGs }}</td>
        <td class="text-blue font-600 text-right">撤销中止批准文号</td>
        <td>{{ Clxx.cxzzpzwh }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">缴获工具设备等台(套)</td>
        <td>{{ Clxx.jhgjsbdtt }}</td>
        <td class="text-blue font-600 text-right"></td>
        <td></td>
      </tr>
    </table>
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { formatToDate } from '/@/utils/dateUtil';
import { getDictText } from '/@/utils/dict/JDictSelectUtil';
import { queryById } from '/@/views/ypsczhjg/yw/zfcf/YwZfcfAjjbxx.api';
import { getTextByCode } from '/@/utils/area/areaDataUtil';

const getDictText1 = getDictText;
const formatToDate1 = formatToDate;
const getTextByCode1 = getTextByCode;
const Jbxx = ref({});
const Clxx = ref({});
const TableStyle = ref({
  cols: [{ style: 'width:190px' }, {}, { style: 'width:190px' }, {}]
});
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  //重置表单
  await queryById({ id: data.record.id }).then((res) => {
    Jbxx.value = res.jbxx || {};
    Clxx.value = res.clxx || {};
    setModalProps({ confirmLoading: false, width: '80%', footer: null });
  });
});
function handleSubmit() {
  //关闭弹窗
  closeModal();
}
</script>

<style lang="less" scoped>
</style>
