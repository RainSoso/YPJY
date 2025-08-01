<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="投诉举报详情"
    @cancel="closeModal"
    width="1200px"
  >
    <h2>投诉举报人信息</h2>
    <table class="my-table mb-2">
      <colgroup>
        <col style="width: 180px" />
        <col />
        <col style="width: 230px" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <td class="text-blue font-600 text-right">平台来源</td>
          <td>{{ userInfo.platType && getDictText('tsjb_ptly',userInfo.platType)}}</td>
          <td class="text-blue font-600 text-right">姓名</td>
          <td>{{ userInfo.name }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">手机号码</td>
          <td>{{ userInfo.mobile }}</td>
          <td class="text-blue font-600 text-right">性别</td>
          <td>{{ userInfo.sex }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">证件类型</td>
          <td>{{ userInfo.certificateType }}</td>
          <td class="text-blue font-600 text-right">证件号码</td>
          <td>{{ userInfo.certificateNumber }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">地址</td>
          <td colspan="3">{{ userInfo.address }}</td>
        </tr>
      </tbody>
    </table>
    <h2>投诉举报信息</h2>
    <table class="my-table mb-2">
      <colgroup>
        <col style="width: 180px" />
        <col />
        <col style="width: 230px" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <td class="text-blue font-600 text-right">平台来源</td>
          <td>{{ record.platType && getDictText('tsjb_ptly',record.platType) }}</td>
          <td class="text-blue font-600 text-right">姓名</td>
          <td>{{ record.name }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">投诉举报标签</td>
          <td>{{ record.complaintReportFlg && getDictText('tsjb_tsjbbq',record.complaintReportFlg) }}</td>
          <td class="text-blue font-600 text-right">投诉举报对象类型</td>
          <td>{{ record.complaintObjectType && getDictText('tsjb_tsdxlx',record.complaintObjectType)}}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">投诉举报对象</td>
          <td>{{ record.complaintObject }}</td>
          <td class="text-blue font-600 text-right">投诉举报对象统一社会信用代码</td>
          <td>{{ record.enterpriseCreditCode }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">投诉举报属地</td>
          <td colspan="3">{{ record.complaintTerritory }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">投诉举报内容</td>
          <td colspan="3">
            <table class="my-table">
              <colgroup>
                    <col style="width: 150px" />
                    <col />
                    <col style="width: 200px" />
                    <col />
                </colgroup>
              <tbody>
                <tr>
                  <td class="text-blue font-600 text-right">服务类型</td>
                  <td>{{ jbnr.service_type }}</td>
                  <td class="text-blue font-600 text-right">商品名称</td>
                  <td>{{ jbnr.goods_name }}</td>
                </tr>
                <tr>
                  <td class="text-blue font-600 text-right">被投诉主体</td>
                  <td>{{ jbnr.complaint_subject }}</td>
                  <td class="text-blue font-600 text-right">商品品牌</td>
                  <td>{{ jbnr.goods_brand }}</td>
                </tr>
                <tr>
                  <td class="text-blue font-600 text-right">订单编号</td>
                  <td>{{ jbnr.order_number }}</td>
                  <td class="text-blue font-600 text-right">商品价格</td>
                  <td>{{ jbnr.unit_price }}</td>
                </tr>
                <tr>
                  <td class="text-blue font-600 text-right">订单时间</td>
                  <td>{{ jbnr.order_date }}</td>
                  <td class="text-blue font-600 text-right">商品数量</td>
                  <td>{{ jbnr.goods_quant }}</td>
                </tr>
                <tr>
                  <td class="text-blue font-600 text-right">服务名称</td>
                  <td>{{ jbnr.service_name }}</td>
                  <td class="text-blue font-600 text-right">商品总价</td>
                  <td>{{ jbnr.total_price }}</td>
                </tr>
                <tr>
                  <td class="text-blue font-600 text-right">投诉详细描述</td>
                  <td colspan="3">{{ jbnr.complaints }}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">投诉举报递交日期</td>
          <td>{{ record.complaintDate && formatToDate1(record.complaintDate) }}</td>
          <td class="text-blue font-600 text-right">事件发生日期</td>
          <td>{{ record.happenDate && formatToDate1(record.happenDate) }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">事件发生地点</td>
          <td colspan="3">{{ record.happenPlace }}</td>
        </tr>
      </tbody>
    </table>
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref, computed, unref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import { formSchema } from "../TsjbComplaintInfo.data";
import { queryById } from "../TsjbComplaintInfo.api";
import { formatToDate } from "/@/utils/dateUtil";
import { getDictText } from '/@/utils/dict/JDictSelectUtil';
// Emits声明
const record = ref({});
const userInfo = ref({});
const jbnr = ref({});
const formatToDate1 = formatToDate;
//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  setModalProps({
    confirmLoading: false,
    showCancelBtn: data?.showFooter,
    showOkBtn: false,
  });
  queryById({ id: data.record.registerCode }).then((res) => {
    record.value = res.data || {};
    jbnr.value = JSON.parse(res.data.complaintDetail || "");
    userInfo.value = res.userdata || {};
  });
});

defineExpose({});
</script>

<style lang="less" scoped></style>
