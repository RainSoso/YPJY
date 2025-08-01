<template>
    <div class="bg-white page" style="height: 100%;">
        <a-tabs size="large"  v-model:activeKey="activeKey" hide-add type="card" style="height: 100%;">
            <a-tab-pane   v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="false">
                <component :is="pane.component" v-if="pane.component" v-bind="pane.props" />
            </a-tab-pane>
        </a-tabs>
    </div>
    
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { propTypes } from '/@/utils/propTypes';
import { useTabs } from '/@/hooks/web/useTabs';
import cdwjPz from '/@/views/ypjy/cdwj/cdwjPz/CdwjPzList.vue';
import cdwjCggy from '/@/views/ypjy/cdwj/cdwjCggy/CdwjCggyList.vue';
import cdwjRy from '/@/views/ypjy/cdwj/cdwjRy/CdwjRyList.vue';
import cdwjBhgyp from '/@/views/ypjy/cdwj/cdwjBhgyp/CdwjBhgypList.vue';
import cdwjZhyp from '/@/views/ypjy/cdwj/cdwjZhyp/CdwjZhypList.vue';
import cdwjGsp from '/@/views/ypjy/cdwj/cdwjGsp/CdwjGspList.vue';
import cdwjFj from '/@/views/ypjy/cdwj/cdwjFj/CdwjFj.vue';
import cdwjJbxx from '/@/views/ypjy/cdwj/cdwjJbxx/CdwjJbxx.vue';

export default defineComponent({
    props: {
        shxydm: propTypes.string.def(''),
        nd: propTypes.string.def(''),
        showTitle: propTypes.bool.def(true)
    },
  name: 'jgyw-xzxk-@tab',
  components: {cdwjPz,cdwjCggy,cdwjRy,cdwjBhgyp,cdwjZhyp,cdwjGsp,cdwjFj,cdwjJbxx},
  setup(props) {
      const route = useRoute();
      const { setTitle } = useTabs();
      const panes = ref([{
            key: 'cdwjJbxx', title: '场地文件基本信息', component: 'cdwjJbxx', props: { shxydm: route.query?.id,nd: route.query?.nd }
        }, {
            key: 'cdwjPz', title: '经营品种信息', component: 'cdwjPz', props: { shxydm: route.query?.id  }
        }, {
            key: 'cdwjCggy', title: '采购,供应信息', component: 'cdwjCggy', props: { shxydm: route.query?.id  }
        },
        {
            key: 'cdwjRy', title: '人员', component: 'cdwjRy', props: { shxydm: route.query?.id  }
        },
        {
            key: 'cdwjBhgyp', title: '不合格药品', component: 'cdwjBhgyp', props: { shxydm: route.query?.id  }
        },
        {
            key: 'cdwjZhyp', title: '召回药品', component: 'cdwjZhyp', props: { shxydm: route.query?.id  }
        },
        {
            key: 'cdwjGsp', title: 'GSP符合性检查', component: 'cdwjGsp', props: { shxydm: route.query?.id  }
        },
        {
            key: 'cdwjFj', title: '附件', component: 'cdwjFj', props: { shxydm: route.query?.id  }
        }
        
    ]), activeKey = ref(route.params?.tab || 'cdwjJbxx');
    

    //   watch(() => activeKey, (val) => {
    //       let array = panes.value.filter((item) => {
    //           return item.key == val + '';
    //       });
    //       if (0 < array.length) setTitle('行政许可 - ' + array[0].title);
    //   });


      if (activeKey.value == ':tab') activeKey.value = 'cdwjJbxx';

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