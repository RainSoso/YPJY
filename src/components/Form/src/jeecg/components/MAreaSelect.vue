<template>
  <div class="area-select">
    <!--省份-->
    <div class="item">
      <a-select v-model:value="province" @change="proChange">
        <a-select-option v-if="!required[0]" :value="''">请选择</a-select-option>
        <template v-for="item in provinceOptions" :key="`${item.value}`">
          <a-select-option :value="item.value">{{ item.label }}</a-select-option>
        </template>
      </a-select>
    </div>
    <!--城市-->
    <div class="item">
      <a-select v-if="level >= 2 && province" v-model:value="city" @change="cityChange">
        <a-select-option v-if="!required[1]" :value="''">请选择</a-select-option>
        <template v-for="item in cityOptions" :key="`${item.value}`">
          <a-select-option :value="item.value">{{ item.label }}</a-select-option>
        </template>
      </a-select>
    </div>
    <!--区县-->
    <div class="item">
      <a-select v-if="level >= 3 && city" v-model:value="area" @change="areaChange">
        <a-select-option v-if="!required[2]" :value="''">请选择</a-select-option>
        <template v-for="item in areaOptions" :key="`${item.value}`">
          <a-select-option :value="item.value">{{ item.label }}</a-select-option>
        </template>
      </a-select>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, reactive, watchEffect, computed, unref, watch, onMounted, onUnmounted, toRefs } from 'vue';
import { propTypes } from "/@/utils/propTypes";
import { useRuleFormItem } from '/@/hooks/component/useFormItem';
import { provinceOptions as allProvinceOptions, getDataByCode, getRealCode } from "../../utils/areaDataUtil";

export default defineComponent({
  name: 'MAreaSelect',
  props: {
    value: [Array, String],
    province: [String],
    city: [String],
    area: [String],
    level: propTypes.number.def(3),
    provinceCodes: [Array, String],
    required: propTypes.array.def([])
  },
  emits: ['change', 'update:value', 'update:province', 'update:city', 'update:area'],
  setup(props, { emit, refs }) {
    const emitData = ref<any[]>([]);
    //下拉框的选择值
    const pca = reactive({
      province: '',
      city: '',
      area: '',
    });
    //表单值
    const [state] = useRuleFormItem(props, 'value', 'change', emitData);
    const provinceOptions = computed(() => {
      if (!props.provinceCodes) return allProvinceOptions;
      return allProvinceOptions.filter((item) => {
        if (Array.isArray(props.provinceCodes)) {
          return 0 <= props.provinceCodes.indexOf(item.value);
        }
        return props.provinceCodes == item.value;
      });
    });
    //城市下拉框的选项
    const cityOptions = computed(() => {
      return pca.province ? getDataByCode(pca.province) : [];
    });
    //地区下拉框的选项
    const areaOptions = computed(() => {
      return pca.city ? getDataByCode(pca.city, true) : [];
    });
    const required = computed(() => {
      if (3 == props.required?.length) return props.required;
      let array: Array<any> = [true, false, false];
      props.required?.forEach((item, idx) => {
        if (idx < array.length) array[idx] = item;
      });
      return array;
    });
    /**
     * 监听props值
     */
    watchEffect(() => {
      props && initValue();
    });

    /**
     * 监听组件值变化
     */
    watch(pca, (newVal) => {
      if (!props.value) {
        emit("update:province", pca.province);
        emit("update:city", pca.city);
        emit("update:area", pca.area);
      }
    });
    /**
     * 数据初始化
     */
    function initValue() {
      if (props.value) {
        //传参是数组的情况下的处理
        if (Array.isArray(props.value)) {
          pca.province = props.value[0];
          pca.city = props.value[1] ? props.value[1] : '';
          pca.area = props.value[2] ? props.value[2] : '';
        } else {
          //传参是数值
          let valueArr = getRealCode(props.value);
          if (valueArr) {
            pca.province = valueArr[0];
            pca.city = props.level >= 2 && valueArr[1] ? valueArr[1] : '';
            pca.area = props.level >= 3 && valueArr[2] ? valueArr[2] : '';
          }
        }
      } else {
        //绑定三个数据的情况
        pca.province = props.province ? props.province : '';
        pca.city = props.city ? props.city : '';
        pca.area = props.area ? props.area : '';

        if (required.value[0] && !pca.province && 0 < provinceOptions.value.length) {
          pca.province = provinceOptions.value[0].value;
          proChange(pca.province);
        } else if (required.value[1] && !pca.city && 0 < cityOptions.value.length) {
          pca.city = cityOptions.value[0].value;
          cityChange(pca.city);
        } else if (required.value[2] && !pca.area && 0 < areaOptions.value.length) {
          pca.area = areaOptions.value[0].value;
          areaChange(pca.area);
        }
      }
    }

    /**
     * 省份change事件
     */
    function proChange(val) {
      pca.city = required.value[1] ? (val && getDataByCode(val)[0]?.value) : '';
      pca.area = required.value[2] ? (pca.city && getDataByCode(pca.city, true)[0]?.value) : '';
      updateValue((props.level <= 1 ? val : (props.level <= 2 ? pca.city : pca.area)) || val || pca.province);
    }

    /**
     * 城市change事件
     */
    function cityChange(val) {
      pca.area = required.value[2] ? (val && getDataByCode(val, true)[0]?.value) : '';
      updateValue((props.level <= 2 ? val : pca.area) || val || pca.province);
    }

    /**
     * 区域change事件
     */
    function areaChange(val) {
      updateValue(val || pca.city);
    }

    function updateValue(val) {
      state.value = val;
      emit("update:value", unref(state));
    }

    return {
      ...toRefs(pca),
      provinceOptions,
      cityOptions,
      areaOptions,
      proChange,
      cityChange,
      areaChange,
      required
    };
  },
});
</script>
<style lang="less" scoped>
.area-select {
  width: 100%;
  display: flex;

  .item {
    width: 33.3333%;
    overflow: hidden;
  }

  .item:not(:first-child) {
    margin-left: 10px;
  }
}
</style>
