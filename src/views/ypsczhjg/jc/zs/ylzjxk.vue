<template>
  <div class="text-black font-600 text-left my-5" style="font-size:120%">医疗机构制剂许可证</div>
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
        <td class="text-blue font-600 text-right">医疗机构名称</td>
        <td>{{ Info.qymc }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">统一社会信用代码</td>
        <td>{{ Info.shxydm }}</td>
        <td class="text-blue font-600 text-right">注册地址</td>
        <td>{{ Info.zcdz }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">配置范围</td>
        <td colspan="3">
          {{ Info.scfw }}
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">配置地址</td>
        <td class="my-undefined" colspan="3">
          {{ Info.scdz }}
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">法定代表人</td>
        <td>{{ Info.fddbr }} </td>
        <td class="text-blue font-600 text-right">医疗机构类别</td>
        <td>{{ Info.yljglb }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">制剂室负责人</td>
        <td>{{ Info.qyfzr }} </td>
        <td class="text-blue font-600 text-right">质量负责人</td>
        <td>{{ Info.zlfzr }} </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">发证机关</td>
        <td>{{ Info.fzjg }} </td>
        <td class="text-blue font-600 text-right">发证日期</td>
        <td>{{ formatToDate(Info.fzrq) }} </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">有效期至</td>
        <td>{{ formatToDate(Info.yxqz) }} </td>
        <td class="text-blue font-600 text-right">签发人</td>
        <td>{{ Info.qfr }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">日常监管机构名称</td>
        <td>{{ Info.rcjgjgmc }} </td>
        <td class="text-blue font-600 text-right">日常监管人员姓名</td>
        <td>{{ Info.rcjgryxm }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">备注</td>
        <td class="my-undefined" colspan="3">
          {{Info.bz}}
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">变更情况 </td>
        <td colspan="3">
          <table class="my-table">
            <tbody>
              <tr v-for="(item, idx) in Data.bgxxlist" :key="idx">
                <td class="my-undefined">
                  {{item}}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">电子证书</td>
        <td colspan="3">
          【正本】【副本】【副页】【变更】
        </td>
      </tr>
    </tbody>
  </table>

</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { propTypes } from '/@/utils/propTypes';
import { formatToDate } from '/@/utils/dateUtil';
import { queryById, list } from './JcZsYljgzjXk.api';

export default defineComponent({
  props: {
    shxydm: propTypes.string.def('')
  },
  setup(props) {
    const Info = ref({});
    const Data = ref({});
    const reload = () => {
      queryById({ id: props.shxydm }).then((res) => {
        Data.value = res || {};
        Info.value = res.data || {};
      });
    };

    watch(() => props.shxydm, (value, oldVal) => {
      if (value != oldVal) reload();
    });

    if (props.shxydm) reload();

    return {
      Info,
      Data,
      formatToDate
    };
  }
});
</script>
<style>
#components-table-demo-size h4 {
  margin-bottom: 16px;
}
</style>
