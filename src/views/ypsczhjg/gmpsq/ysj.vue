<template>
  <div class="m-4 p-4 bg-white page">
    <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card">
      <a-tab-pane
        v-for="pane in panes"
        :key="pane.key"
        :tab="pane.title"
        :closable="false"
      >
        <component :is="pane.component" v-bind="pane.props" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useTabs } from "/@/hooks/web/useTabs";
import { columnRender } from "/@/utils/dict/dictUtils";
import wsl from "/@/views/ypsczhjg/gmpsq/wsllist.vue";
import sqsx from "/@/views/ypsczhjg/gmpsq/SqsxSqsxList.vue";
// import yjc from "/@/views/ypsczhjg/gmpsq/yjclist.vue";
import sqsxybsx from "/@/views/ypsczhjg/gmpsq/components/SqsxYbsxList.vue";
import sqsxShsx from "/@/views/ypsczhjg/gmpsq/components/SqsxShsxList.vue";
export default defineComponent({
  name: "gmp-ysj-@tab",
  components: { wsl, sqsx, sqsxybsx, sqsxShsx},
  setup() {
    const route = useRoute();
    const { setTitle } = useTabs();

    const sbcolumns: BasicColumn[] = [
      {
        title: "申报编号",
        dataIndex: "bh",
        width: 140,
        sorter: true,
      },
      {
        title: "事项标题",
        dataIndex: "title",
        sorter: true,
        slots: { customRender: "title" },
        ellipsis: false,
      },
      {
        title: "申请企业名称",
        dataIndex: "sqQymc",
        width: 300,
        sorter: true,
        defaultHidden: true,
      },
      {
        title: "联系人",
        dataIndex: "lxrmc",
        width: 80,
        sorter: true,
      },
      {
        title: "联系人手机",
        dataIndex: "lxrsjh",
        width: 120,
        sorter: true,
      },
      {
        title: "提交时间",
        dataIndex: "tjsj",
        width: 160,
        sorter: true,
        defaultHidden: true,
      },
      {
        title: "状态",
        dataIndex: "dqbz",
        width: 75,
        customRender: ({ text, record }) =>
          columnRender(text ? "sqsx_currentstep" : "sqsx_state", text || record.state),
      },
    ];

    const sbdbcolumns: BasicColumn[] = [
      {
        title: "申报编号",
        dataIndex: "sqsxSqsx.bh",
        width: 140,
        sorter: true,
      },
      {
        title: "事项标题",
        dataIndex: "sqsxSqsx.title",
        sorter: true,
        slots: { customRender: "title" },
        ellipsis: false,
      },
      {
        title: "申请企业名称",
        dataIndex: "sqsxSqsx.sqQymc",
        width: 300,
        sorter: true,
        defaultHidden: true,
      },
      {
        title: "联系人",
        dataIndex: "sqsxSqsx.lxrmc",
        width: 80,
        sorter: true,
      },
      {
        title: "联系人手机",
        dataIndex: "sqsxSqsx.lxrsjh",
        width: 120,
        sorter: true,
      },
      {
        title: "提交时间",
        dataIndex: "sqsxSqsx.tjsj",
        width: 160,
        sorter: true,
        defaultHidden: true,
      },
      // {
      //   title: "状态",
      //   dataIndex: "sqsxSqsx.dqbz",
      //   width: 75,
      //   customRender: ({ text, record }) =>
      //     columnRender(text ? "sqsx_currentstep" : "sqsx_state", text || record.state),
      // },
    ];
    const searchFormSchema: FormSchema[] = [
      {
        label: "",
        field: "dqbzs",
        component: "Input",
        show: false,
      },
      {
        label: "申报编号",
        field: "bh1",
        component: "Input",
      },
      {
        label: "事项标题",
        field: "title",
        component: "Input",
      },
    ];
   
    const ytcolumns: BasicColumn[] = [
      {
        title: "受理编号",
        dataIndex: "slbh",
        width: 140,
        sorter: true,
      },
      {
        title: "事项标题",
        dataIndex: "title",
        sorter: true,
        slots: { customRender: "title" },
        ellipsis: false,
      },
      {
        title: "申请企业名称",
        dataIndex: "sqQymc",
        width: 300,
        sorter: true,
        defaultHidden: true,
      },
      {
        title: "联系人",
        dataIndex: "lxrmc",
        width: 80,
        sorter: true,
      },
      {
        title: "联系人手机",
        dataIndex: "lxrsjh",
        width: 120,
        sorter: true,
      },
      {
        title: "提交时间",
        dataIndex: "tjsj",
        width: 160,
        sorter: true,
        defaultHidden: true,
      },
      {
        title: "状态",
        dataIndex: "dqbz",
        width: 75,
        customRender: ({ text, record }) =>
          columnRender(text ? "sqsx_currentstep" : "sqsx_state", text || record.state),
      },
    ];
    const searchslFormSchema: FormSchema[] = [
      {
        label: "",
        field: "dqbzs",
        component: "Input",
        show: false,
      },
      {
        label: "受理编号",
        field: "slbh",
        component: "JInput",
      },
      {
        label: "事项标题",
        field: "title",
        component: "JInput",
      },
    ];
    const panes = ref([
        {
          key: "dsy",
          title: "待审核",
          component: "sqsxShsx",
          props: { dqbz: "YS",rm:'1',columns:sbdbcolumns,search:searchFormSchema},
        },
        {
          key: "ytg",
          title: "已通过",
          component: "sqsxybsx",
          props: { columns: ytcolumns,search:searchslFormSchema, state:'7'},
        },
        {
          key: "wtg",
          title: "未通过",
          component: "sqsxybsx",
          props: { columns: sbcolumns, search: searchFormSchema, state:'1'},
        },
      ]),
      activeKey = ref(route.params?.tab || "dsy");

    if (activeKey.value == ":tab") activeKey.value = "dsy";

    return {
      panes,
      activeKey,
    };
  },
});
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-basic-table";

.page /deep/ .@{prefix-cls} {
  &-form-container {
    padding: 0;
  }

  &-form-container .ant-form {
    padding: 0;
    margin-bottom: 0;
  }

  .ant-table-wrapper {
    padding: 0;
  }
}
</style>
