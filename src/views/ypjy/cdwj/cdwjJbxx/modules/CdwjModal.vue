<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="80%">
        <div class="bg-white page">
            <a-tabs size="large" tabPosition="left" v-model:activeKey="activeKey" hide-add type="card">
                <a-tab-pane :style="{ fontSize: '10px' }" v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="false">
                    <component :is="pane.component" v-if="pane.component" v-bind="pane.props" />
                </a-tab-pane>
            </a-tabs>
        </div>
     </BasicModal>
</template>

<script lang="ts" setup>
    import {ref, computed, unref,watch} from 'vue';
    import {BasicModal, useModalInner} from '/@/components/Modal';
    import {BasicForm, useForm} from '/@/components/Form/index';
    import {formSchema} from '../Cdwj.data';
    import {saveOrUpdate} from '../Cdwj.api';
    import cdwjPz from '/@/views/ypjy/cdwj/cdwjPz/CdwjPzList.vue';
    import cdwjCggy from '/@/views/ypjy/cdwj/cdwjCggy/CdwjCggyList.vue';
    import cdwjRy from '/@/views/ypjy/cdwj/cdwjRy/CdwjRyList.vue';
    import cdwjBhgyp from '/@/views/ypjy/cdwj/cdwjBhgyp/CdwjBhgypList.vue';
    import cdwjZhyp from '/@/views/ypjy/cdwj/cdwjZhyp/CdwjZhypList.vue';
    import cdwjGsp from '/@/views/ypjy/cdwj/cdwjGsp/CdwjGspList.vue';
    import cdwjFj from '/@/views/ypjy/cdwj/cdwjFj/CdwjFj.vue';
    import cdwjJbxx from '/@/views/ypjy/cdwj/JydzMap.vue';
    import { useRoute } from 'vue-router';
    import { useTabs } from '/@/hooks/web/useTabs';
    const route = useRoute();
    const { setTitle } = useTabs();
    const aa = route.params?.qyid;
    const panes = ref([{
            key: 'cdwjJbxx', title: '场地文件基本信息', component: 'cdwjJbxx', props: { shxydm: route.params?.qyid }
        }, {
            key: 'cdwjPz', title: '经营品种信息', component: 'cdwjPz', props: { shxydm: route.params?.qyid  }
        }, {
            key: 'cdwjCggy', title: '采购,供应信息', component: 'cdwjCggy', props: { shxydm: route.params?.qyid  }
        },
        {
            key: 'cdwjRy', title: '人员', component: 'cdwjRy', props: { shxydm: route.params?.qyid  }
        },
        {
            key: 'cdwjBhgyp', title: '不合格药品', component: 'cdwjBhgyp', props: { shxydm: route.params?.qyid  }
        },
        {
            key: 'cdwjZhyp', title: '召回药品', component: 'cdwjZhyp', props: { shxydm: route.params?.qyid  }
        },
        {
            key: 'cdwjGsp', title: 'GSP符合性检查', component: 'cdwjGsp', props: { shxydm: route.params?.qyid  }
        },
        {
            key: 'cdwjFj', title: '附件', component: 'cdwjFj', props: { shxydm: route.params?.qyid  }
        }
        
    ]), activeKey = ref(route.params?.tab || 'cdwjPz');
    

    //   watch(() => activeKey, (val) => {
    //       let array = panes.value.filter((item) => {
    //           return item.key == val + '';
    //       });
    //       if (0 < array.length) setTitle('行政许可 - ' + array[0].title);
    //   });


      if (activeKey.value == ':tab') activeKey.value = 'cdwjPz';
    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    //表单配置
    const [registerForm, {resetFields, setFieldsValue, validate}] = useForm({
        labelWidth: 150,
        schemas: formSchema,
        showActionButtonGroup: false,
    });
    //表单赋值
    const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
        //重置表单
        await resetFields();
        setModalProps({confirmLoading: false,showCancelBtn:data?.showFooter,showOkBtn:data?.showFooter});
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
            //表单赋值
            await setFieldsValue({
                ...data.record,
            });
        }
    });
    //设置标题
    //const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
    const title = 'SMF文件';
    //表单提交事件
    async function handleSubmit(v) {
        try {
            let values = await validate();
            setModalProps({confirmLoading: true});
            //提交表单
            await saveOrUpdate(values, isUpdate.value);
            //关闭弹窗
            closeModal();
            //刷新列表
            emit('success', {isUpdate: isUpdate.value, values});
        } finally {
            setModalProps({confirmLoading: false});
        }
    }
</script>

<style lang="less" scoped>

</style>
