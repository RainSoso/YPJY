<template>
    <span>{{ value }}</span>
</template>

<script setup>
import { ref, watch } from 'vue';
import { propTypes } from '/@/utils/propTypes';
import { getAttachmentList } from '/@/api/common/api';

const props = defineProps({
    fileId: propTypes.string.def(''),
    type: propTypes.string.def('')
});
const value = ref(0);

watch([() => props.fileId, () => propTypes.type], () => {
    if (props.fileId) {
        getAttachmentList({ bisId: props.fileId, category: props.type }).then(res => {
            value.value = res.length;
        });
    }
}, { immediate: true });
</script>