<template>
    <div>
        <template v-for="(item, idx) in valueArray" :key="idx">
            <div :class="['flex', idx < valueArray.length - 1 ? 'mb-2' : '']">
                <MAreaSelect :value="item" :level="props.level" :provinceCodes="props.provinceCodes"
                    :required="props.required" @change="val => changeItem(idx, val)" class="flex-1 mr-2" />
                <a-button type="link" shape="circle" @click="valueArray.splice(idx, 1), changeItem()"
                    v-if="idx < valueArray.length - 1" danger>
                    <Icon icon="ant-design:minus-circle-outlined" style="font-size:24px;" />
                </a-button>
                <a-button type="link" shape="circle" @click="valueArray.push(''), changeItem()"
                    v-if="idx >= valueArray.length - 1">
                    <Icon icon="ant-design:plus-circle-outlined" style="font-size:24px;" />
                </a-button>
            </div>
        </template>
    </div>
</template>

<script lang="ts" name="MAreaSelectMultiple" setup>
import { ref, unref, watchEffect } from 'vue';
import { propTypes } from "/@/utils/propTypes";
import MAreaSelect from './MAreaSelect.vue';
import { useRuleFormItem } from '/@/hooks/component/useFormItem';

const emit = defineEmits(['change', 'update:value']);

const props = defineProps({
    value: [String],
    level: propTypes.number.def(3),
    provinceCodes: [Array, String],
    required: propTypes.array.def([])
});

const valueArray = ref<Array<string>>([]);

const emitData = ref<any[]>([]);
const [state] = useRuleFormItem(props, 'value', 'change', emitData);

watchEffect(() => {
    props && (valueArray.value = (props.value || '').split(','));
});

function changeItem(idx = -1, val = '') {
    if (0 <= idx) valueArray.value[idx] = val;
    state.value = valueArray.value.filter(item => item).join(',');
    emit("update:value", unref(state));
}

defineExpose({ props });
</script>

<style lang="less" scoped>

</style>