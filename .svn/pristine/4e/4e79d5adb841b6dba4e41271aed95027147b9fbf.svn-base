<template>
  <table class="my-table" style="table-layout:auto;">
            <thead>
              <tr>
                <th width="60" class="text-center">序号</th>
                <th style="width: 50%;">材料内容</th>
                <th>附件</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center">1</td>
                <td class="hidden-480 left">有效药品经营活动许可和报告文本复印件</td>
                <td class="hidden-480">
                  <MUpload :bisId="cdwjid" :disabled="true" :download="true"
                   category="有效药品经营活动许可和报告文本复印件" source="wssb"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">2</td>
                <td class="hidden-480 left">经营活动场地涉及的品种范围、储存条件及其主要品种类别清单</td>
                <td class="hidden-480">
                  <MUpload :bisId="cdwjid" :disabled="true" :download="true"
                   category="经营活动场地涉及的品种范围、储存条件及其主要品种类别清单" source="wssb"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">3</td>
                <td class="hidden-480 left">药品经营质量管理规范合规证明文件</td>
                <td class="hidden-480">
                  <MUpload :bisId="cdwjid" :disabled="true" :download="true"
                   category="药品经营质量管理规范合规证明文件" source="wssb"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">4</td>
                <td class="hidden-480 left">购销人员授权及身份证明核实信息及不合规人员清单</td>
                <td class="hidden-480">
                  <MUpload :bisId="cdwjid" :disabled="true" :download="true"
                   category="购销人员授权及身份证明核实信息及不合规人员清单" source="wssb"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">5</td>
                <td class="hidden-480 left">经营活动场地总平面布局图、功能分区及设施设备布局图</td>
                <td class="hidden-480">
                  <MUpload :bisId="cdwjid" :disabled="true" :download="true"
                   category="经营活动场地总平面布局图、功能分区及设施设备布局图" source="wssb"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">6</td>
                <td class="hidden-480 left">各场地仓库主要设施设备清单</td>
                <td class="hidden-480">
                  <MUpload :bisId="cdwjid" :disabled="true" :download="true"
                   category="各场地仓库主要设施设备清单" source="wssb"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">7</td>
                <td class="hidden-480 left">近三年质量系统变更清单，包括计算机管理系统及温湿度监控设施设备变更</td>
                <td class="hidden-480">
                  <MUpload :bisId="cdwjid" :disabled="true" :download="true"
                   category="近三年质量系统变更清单，包括计算机管理系统及温湿度监控设施设备变更" source="wssb"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">8</td>
                <td class="hidden-480 left">近三年不合格药品清单及处理情况</td>
                <td class="hidden-480">
                  <MUpload :bisId="cdwjid" :disabled="true" :download="true"
                   category="近三年不合格药品清单及处理情况" source="wssb"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">9</td>
                <td class="hidden-480 left">近三年偏差及超标（OOS）清单及预防纠正措施情况</td>
                <td class="hidden-480">
                  <MUpload :bisId="cdwjid" :disabled="true" :download="true"
                   category="近三年偏差及超标（OOS）清单及预防纠正措施情况" source="wssb"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">10</td>
                <td class="hidden-480 left">近三年质量投诉处理、退货、产品缺陷与召回情况清单</td>
                <td class="hidden-480">
                  <MUpload :bisId="cdwjid" :disabled="true" :download="true"
                   category="近三年质量投诉处理、退货、产品缺陷与召回情况清单" source="wssb"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">11</td>
                <td class="hidden-480 left">MAH及其相关监管机构质量审核或监督检查缺陷复印件</td>
                <td class="hidden-480">
                  <MUpload :bisId="cdwjid" :disabled="true" :download="true"
                   category="MAH及其相关监管机构质量审核或监督检查缺陷复印件" source="wssb"/>
                </td>
              </tr>
              <tr>
                <td class="text-center">12</td>
                <td class="hidden-480 left">信用承诺书</td>
                <td class="hidden-480">
                  <MUpload :bisId="cdwjid" :disabled="true" :download="true"
                   category="信用承诺书" source="wssb"/>
                </td>
              </tr>
            </tbody>
          </table>
</template>
<script setup>

  import {ref, computed, unref} from 'vue';
  import {getCdwjid} from './CdwjFj.api';
  import { propTypes } from '/@/utils/propTypes';
  import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';

  const props = defineProps({
    shxydm: propTypes.string
  });
  const cdwjid = ref('');
  getCdwjidByShxydm();

async function getCdwjidByShxydm() {
    var data = await getCdwjid({shxydm: props.shxydm});
    debugger
    cdwjid.value = data.data;
   // console.log(data);
}

</script>
<style scoped></style>