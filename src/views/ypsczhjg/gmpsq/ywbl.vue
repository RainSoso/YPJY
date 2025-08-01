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

    const slcolumns: BasicColumn[] = [
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

    const sldbcolumns: BasicColumn[] = [
      {
        title: "受理编号",
        dataIndex: "sqsxSqsx.slbh",
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
    const dclsearchFormSchema: FormSchema[] = [
      {
        label: "",
        field: "dqbzs",
        component: "Input",
        show: false,
      },
      {
        label: "受理编号",
        field: "bh1",
        component: "Input",
      },
      {
        label: "事项标题",
        field: "title",
        component: "Input",
      },
    ];
    const panes = ref([
        {
          key: "dcl",
          title: "待处理",
          component: "sqsxShsx",
          props: { rm: "1",isyw:'Y',search:dclsearchFormSchema,columns:sldbcolumns},
        },
        {
          key: "ycl",
          title: "已处理",
          component: "sqsxybsx",
          props: { rm: "2" ,columns:slcolumns, search:searchFormSchema,isyw:'N'},
        },
      ]),
      activeKey = ref(route.params?.tab || "dcl");

    if (activeKey.value == ":tab") activeKey.value = "dcl";

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
