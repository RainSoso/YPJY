<template>
    <div class="choose-user-btn" @click="open" v-if="!!$slots.default">
        <slot></slot>
    </div>
    <ChooseUserModal v-bind="{ ...$attrs, ...getBindValues }" @register="registerModal" @result="dialogHandle" />
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Modal } from 'ant-design-vue';
import { useModal } from '/@/components/Modal';
import { ChooseUserProps } from './index';
import ChooseUserModal from './modal/ChooseUserModal.vue';

export default defineComponent({
    components: { ChooseUserModal, Modal },
    props: ChooseUserProps,
    emits: ['result'],
    setup(props, { emit, slots }) {
        const getBindValues = computed(() => {
            let res = {
                destroyOnClose: true,
                wrapperProps: { scrollbarPadding: 0 },
                ...props,
                visible: !slots.default
            };
            return res;
        });
        const [registerModal, { openModal }] = useModal();

        function dialogHandle(fromOk, ids?, data?) {
            emit('result', { isConfirm: fromOk, ids, data });
        }

        return {
            getBindValues,
            registerModal,
            dialogHandle,
            open() {
                openModal(true, {});
            }
        };
    }
});
</script>
<style lang="less" scoped>
.choose-user-btn {
    display: inline-block;
}
</style>