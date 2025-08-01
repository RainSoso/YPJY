<template>
    <PageWrapper :title="FormData.qymc" class="title-center" contentBackground>
        <template #headerContent>
            <table class="my-table">
                <colgroup>
                    <col style="width:20%" />
                    <col />
                    <col style="width:20%" />
                    <col />
                </colgroup>
                <tr>
                    <td class="text-blue font-600 text-right">社会信用代码</td>
                    <td>{{ FormData.shxydm }}</td>
                    <td class="text-blue font-600 text-right">企业类型</td>
                    <td>{{ FormData.qylx && getDictText('QYLXDM-1', FormData.qylx) || FormData.qylx }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">法定代表人</td>
                    <td>{{ FormData.fddbr }}</td>
                    <td class="text-blue font-600 text-right">企业负责人</td>
                    <td>{{ FormData.fzrxm }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">联系人</td>
                    <td>{{ FormData.lxr }}</td>
                    <td class="text-blue font-600 text-right">联系电话（座机）</td>
                    <td>{{ FormData.lxdh }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">联系电话（手机）</td>
                    <td>{{ FormData.sjhm }}</td>
                    <td class="text-blue font-600 text-right">电子邮箱</td>
                    <td>{{ FormData.dzyx }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">注册地址/住所</td>
                    <td>{{ FormData.zcdz }}</td>
                    <td class="text-blue font-600 text-right">生产地址</td>
                    <td>{{ FormData.scdz }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">企业标签</td>
                    <td colspan="3">
                        <MCategory :value="FormData.tags" displayType="tags" itemClass="xl" />
                    </td>
                </tr>
            </table>
        </template>
        <template #footer>
            <a-tabs default-active-key="0" type="line">
                <template v-for="(item, idx) in tabs" :key="idx">
                    <a-tab-pane :tab="item.title">
                        <div style="padding-bottom:16px;">
                            <component :is="item.component" v-if="item.component" v-bind="item.props" />
                            <template v-else>{{ item.title }}[{{ idx }}]</template>
                        </div>
                    </a-tab-pane>
                </template>
            </a-tabs>
        </template>
    </PageWrapper>
</template>
<script lang="ts" name="yqyd-ybc-view-@shxydm" setup>
import { ref, reactive, computed, markRaw, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useTabs } from '/@/hooks/web/useTabs';
import { PageWrapper } from '/@/components/Page';
import { getDictText } from '/@/utils/dict/JDictSelectUtil';
import MCategory from '/@/components/Custom/MCategory.vue';
import { queryJbxx } from '/@/views/ypsczhjg/jc/TJcQyJbxx.api';

const route = useRoute();
const { setTitle } = useTabs();

const Category = reactive({ value: route.query?.zslx, label: getDictText('qyTjxxZslx', route.query?.zslx) });
setTitle(Category.label + '企业详情');

const FormData: Recordable = ref({ shxydm: route.params.shxydm });
const Data: Recordable = ref({});
const tabs = computed(() => {
    return [{
        title: Category.label + '品种（' + (Data.value.bcyflPzCount || 0) + '）',
        component: markRaw(defineAsyncComponent(() => import('/@/views/ypsczhjg/ypyd/ybc/list.vue'))),
        props: { category: Category.label, shxydm: FormData.value.shxydm, showOnlyPage: true }
    }, {
        title: '行政许可',
        component: markRaw(defineAsyncComponent(() => import('/@/views/ypsczhjg/jc/xzsp.vue'))),
        props: { shxydm: FormData.value.shxydm }
    }, {
        title: '监督检查（' + (Data.value.rcjgCount || 0) + '）',
        component: markRaw(defineAsyncComponent(() => import('/@/views/ypsczhjg/yw/rcjg/rcjg.vue'))),
        props: { shxydm: FormData.value.shxydm }
    }, {
        title: '非现场监管', component: markRaw(defineAsyncComponent(() => import('/@/views/ypsczhjg/jc/fxcjg.vue')))
    }, {
        title: '药品抽检（' + (Data.value.cjyCount || 0) + '）',
        component: markRaw(defineAsyncComponent(() => import('/@/views/ypsczhjg/yw/ypcyjl/ypcj.vue'))), props: { QyJbxx: FormData.value }
    }, {
        title: '稽查执法（' + (Data.value.zfcfCount || 0) + '）',
        component: markRaw(defineAsyncComponent(() => import('/@/views/ypsczhjg/yw/zfcf/zfcfList.vue'))), props: { shxydm: FormData.value.shxydm }
    }, {
        title: '不良反应监测（0）', component: markRaw(defineAsyncComponent(() => import('/@/views/ypsczhjg/jc/blfy.vue')))
    }, {
        title: '信用评级', component: markRaw(defineAsyncComponent(() => import('/@/views/ypsczhjg/ypyd/building.vue')))
    }];
});

queryJbxx({ id: FormData.value.shxydm, zslx: Category.value, category: Category.label }).then((res) => {
    FormData.value = res.data;
    Data.value = res;

    setTitle(Category.label + '企业详情：' + FormData.value.qymc);
});
</script>