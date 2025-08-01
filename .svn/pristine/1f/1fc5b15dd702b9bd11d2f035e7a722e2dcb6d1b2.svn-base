<template>
    <div class="m-4 p-4 bg-white page">
        <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card">
            <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="false">
                <component :is="pane.component" v-if="pane.component" v-bind="pane.props" />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTabs } from '/@/hooks/web/useTabs';
import ypscxk from '/@/views/ypsczhjg/jc/zs/ypscxk/index.vue';
import xzsp from '/@/views/ypsczhjg/yw/xk/xzsp/index.vue';

export default defineComponent({
    name: 'jgyw-xzxk-@tab',
    components: { ypscxk, xzsp },
    setup() {
        const route = useRoute();
        const { setTitle } = useTabs();

        const panes = ref([{
            key: 'hf', title: '核发', component: 'xzsp', props: { serviceType: 1 }
        }, {
            key: 'bg', title: '变更', component: 'xzsp', props: { serviceType: 3 }
        }, {
            key: 'zx', title: '注销', component: 'xzsp', props: { serviceType: 4 }
        }, {
            key: 'jjgqzs', title: '即将过期证书', component: 'ypscxk', props: {}
        }]), activeKey = ref(route.params?.tab || 'hf');

        watch(() => activeKey, (val) => {
            let array = panes.value.filter((item) => {
                return item.key == val + '';
            });
            if (0 < array.length) setTitle('行政许可 - ' + array[0].title);
        });

        if (activeKey.value == ':tab') activeKey.value = 'hf';

        return {
            panes, activeKey
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