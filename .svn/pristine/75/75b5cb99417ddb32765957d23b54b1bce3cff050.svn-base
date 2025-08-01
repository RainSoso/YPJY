<template>
  <div class="text-black font-600 text-left my-5" style="font-size:120%" v-if="showTitle">{{title}}</div>
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
      <tr>
        <td class="text-blue font-600 text-right">仓库地址</td>
        <td colspan="3">
          {{ Info.ckdz }}
        </td>
      </tr>
      <tr>
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

</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { propTypes } from '/@/utils/propTypes';
import { formatToDate } from '/@/utils/dateUtil';
import { getXkzxxByShxydm } from './TJcZsYpscXk.api';

export default defineComponent({
  props: {
    shxydm: propTypes.string.def(''),
    showTitle: propTypes.bool.def(true)
  },
  setup(props) {
    const Info = ref({});
    const showTitle = ref(props.showTitle);
    const title = ref('');
    const bgxxlist = ref([]);
    const reload = () => {
      getXkzxxByShxydm({ shxydm: props.shxydm }).then((res) => {
        Info.value = res.data || {};
        var type = Info.value.type;
        title.value = type == '01' ? '药品经营批发许可证' : '药品经营零售连锁总部';
        bgxxlist.value = res.bgxxlist || [];
        debugger
      });
    };

    watch(() => props.shxydm, (value, oldVal) => {
      if (value != oldVal) reload();
    });

    if (props.shxydm) reload();

    return {
      Info,
      showTitle,
      formatToDate,
      title,
      bgxxlist
    };
  }
});
</script>
<style>
#components-table-demo-size h4 {
  margin-bottom: 16px;
}
</style>
