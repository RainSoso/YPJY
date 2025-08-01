<template>
  <table class="my-table">
    <colgroup>
      <col style="width:150px;" />
      <col />
      <col style="width:170px;" />
      <col />
    </colgroup>
    <tbody>
      <tr>
        <td class="text-blue font-600 text-right">批准文号</td>
        <td>{{ Ypzcscjy.yppzwh }}</td>
        <td class="text-blue font-600 text-right">药品通用名</td>
        <td>{{ Ypzcscjy.yptymc }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">商品名</td>
        <td>{{ Ypzcscjy.ypspmc }}</td>
        <td class="text-blue font-600 text-right">化学名称</td>
        <td>{{ Ypzcscjy.yphxmc }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">药品类型</td>
        <td>{{ Ypzcscjy.ypfl && filterDictTextByCache('YPPZLX-1', Ypzcscjy.ypfl) || Ypzcscjy.ypfl }}</td>
        <td class="text-blue font-600 text-right">剂型</td>
        <td>{{ Ypzcscjy.jx }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">规格</td>
        <td>{{ Ypzcscjy.ypgg }}</td>
        <td class="text-blue font-600 text-right">包装规格</td>
        <td>{{ Ypzcscjy.bzgg }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">批准日期</td>
        <td>{{ Ypzcscjy.pzrq && formatToDate(Ypzcscjy.pzrq) }}</td>
        <td class="text-blue font-600 text-right">批准文号有效期</td>
        <td>{{ Ypzcscjy.yppzwhyxq && formatToDate(Ypzcscjy.yppzwhyxq) }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">上市许可持有人</td>
        <td class="my-undefined">{{ Ypzcscjy.cyrmc }}</td>
        <td class="text-blue font-600 text-right">上市许可持有人地址</td>
        <td class="my-undefined">{{ Ypzcscjy.cyrdz }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">生产企业</td>
        <td>{{ Ypzcscjy.ypscqymc }}</td>
        <td class="text-blue font-600 text-right">生产企业地址</td>
        <td>{{ Ypzcscjy.scdz }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">药品标准</td>
        <td>{{ Ypzcscjy.ypbzh }}</td>
        <td class="text-blue font-600 text-right">药品有效期</td>
        <td>{{ Ypzcscjy.ypyxq }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">{{ Tools.isThirdTesting() ? '上市后变更信息' : '审批结论' }}</td>
        <td colspan="3" style="white-space:pre-wrap;">{{ Ypzcscjy.ypspjl01 }} </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { propTypes } from '/@/utils/propTypes';
import { formatToDate } from '/@/utils/dateUtil';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import Tools from '/@/utils/tools';

export default defineComponent({
  props: {
    Ypzcscjy: propTypes.object.def({})
  },
  setup(props) {

    return {
      formatToDate,
      filterDictTextByCache,
      Tools
    };
  }
});
</script>
