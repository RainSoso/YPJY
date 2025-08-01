<template>
    <div class="!-mb-2">
        <template v-for="(item, idx) in dataValue" :key="item.id">
            <a-tag :class="['!mb-2', itemClass]" :color="item.color" @click="onClick(item, $event)"
                v-if="displayType == 'tags' || !displayType && item.displayType == 'tags'">
                {{ item.name }}
            </a-tag>
            <template v-else-if="displayType == 'original'">
                {{ 0 < idx ? ', ' : '' }}
                <span @click="onClick(item, $event)">{{ item.name }}</span>
            </template>
            <span :class="['mb-2 mr-2', itemClass]" @click="onClick(item, $event)" v-else
                :style="{ color: displayType == 'text' || !displayType && !!item.color && item.displayType == 'text' ? item.color : undefined }">
                {{ item.name }}
            </span>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { getCategoryItemByCode } from '/@/api/common/api';
import { isArray } from '/@/utils/is';
import { propTypes } from '/@/utils/propTypes';

export default defineComponent({
    name: 'MCategory',
    props: {
        value: propTypes.oneOfType([propTypes.string, propTypes.array]),
        displayType: propTypes.string.def(''),
        itemClass: propTypes.string.def('')
    },
    emits: ['click'],
    setup(props, { emit }) {
        const dataValue: any = ref([]);

        watch(() => props.value, () => {
            loadItemByCode();
        }, { immediate: true });

        function loadItemByCode() {
            if (!props.value || props.value == '0') {
                dataValue.value = [];
            } else {
                let val = isArray(props.value) ? props.value.join(',') : props.value;
                getCategoryItemByCode({ codes: val }).then((res) => {
                    dataValue.value = res;
                });
            }
        }

        function onClick(item, e) {
            emit('click', item, e);
        }

        return {
            dataValue,
            onClick
        };
    }
});
</script>