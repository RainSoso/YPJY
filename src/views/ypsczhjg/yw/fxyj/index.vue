<template>
    <div class="m-4 p-4 bg-white page">
        <a-tabs  hide-add type="editable-card">
            <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="false">
                <component :is="pane.component" v-if="pane.component" />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTabs } from '/@/hooks/web/useTabs';
import pzfxj from '/@/views/ypsczhjg/yw/fxyj/YwFxyjPzList.vue';
import qyfxj from '/@/views/ypsczhjg/yw/fxyj/YwFxyjQyList.vue';

export default defineComponent({
    name: 'yw-fxyj-@tab',
    components: { qyfxj, pzfxj },
    setup() {
        const route = useRoute();
        const { setTitle } = useTabs();

        const panes = ref([{
            key: 'qy', title: '风险企业', component: 'qyfxj'
        }, {
            key: 'pz', title: '风险品种', component: 'pzfxj'
        }]);

        return {
            panes
        };
    }
});
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-basic-table';

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