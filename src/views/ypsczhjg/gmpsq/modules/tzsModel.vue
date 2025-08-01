<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" destroyOnClose>
        <PageWrapper class="title-center" contentBackground>
            <div class="page" style="border:1px;padding:1px;margin-top:-20px;">
                <div class="panel-heading">
                    <div class="panel">药品GMP符合性检查结果通知书</div>
                </div>
                <table class="my-table mb-2">
                    <colgroup>
                        <col style="width:20%" />
                        <col />
                        <col style="width:10%" />
                        <col />
                    </colgroup>
                    <tr>
                        <td class="text-blue font-600 text-right">编号</td>
                        <td colspan="3">
                            <a-input v-model:value="FormData.tzsBh" @input="replaceNumber" :disabled="!isshow"></a-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-blue font-600 text-right">药品上市许可持有人</td>
                        <td colspan="3">
                            <a-input v-model:value="FormData.cyrQymc" :disabled="!isshow"></a-input>
                        </td>
                    </tr>
                    <tr v-if="iscs">
                        <td class="text-blue font-600 text-right">受托企业名称</td>
                        <td colspan="3">
                            <a-input v-model:value="FormData.scQymc" :disabled="!isshow"></a-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-blue font-600 text-right">检查范围/品种</td>
                        <td colspan="3">
                            <a-textarea v-model:value="FormData.jcpzfw" :disabled="!isshow" rows="3"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-blue font-600 text-right">检查场地地址</td>
                        <td colspan="3">
                            <a-textarea type="textarea" v-model:value="FormData.tzsJccddz" :disabled="!isshow" :maxLength="1000"></a-textarea>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-blue font-600 text-right">检查生产车间/线</td>
                        <td colspan="3">
                            <a-input v-model:value="FormData.tzsJccjx" :disabled="!isshow"></a-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-blue font-600 text-right">检查时间</td>
                        <td colspan="3">
                            <a-input v-model:value="FormData.tzsJcsj" :disabled="!isshow"></a-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-blue font-600 text-right">检查结论</td>
                        <td colspan="3">
                            <a-textarea type="textarea" v-model:value="FormData.jcjl" :disabled="!isshow" :maxLength="500"></a-textarea>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-blue font-600 text-right">主送</td>
                        <td colspan="3">
                        <a-input v-model:value="FormData.zs" :disabled="!isshow"></a-input>
                       </td>
                    </tr>
                    <tr>
                        <td class="text-blue font-600 text-right">抄送</td>
                        <td colspan="3">
                            <JSelectDept v-model:value="FormData.cs" :multiple="true" :rootOpened="false" type="array" v-if="isshow">></JSelectDept>
                            <JSelectDept v-model:value="FormData.cs" :multiple="true" :rootOpened="false" type="array" :disabled="!isshow" v-if="!isshow"></JSelectDept>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-blue font-600 text-right">备注</td>
                        <td colspan="3">
                            <a-textarea type="textarea" v-model:value="FormData.tzsBz" :disabled="!isshow" :maxLength="1000"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-blue font-600 text-right">发证机构</td>
                        <td colspan="3">{{ FormData.tzsFzjg }}</td>
                    </tr>
                    <tr>
                        <td class="text-blue font-600 text-right">发证日期</td>
                        <td colspan="3">
                            <a-date-picker valueFormat="YYYY-MM-DD" v-model:value="FormData.tzsFzrq" :disabled="!isshow"/>
                       </td>
                    </tr>
                </table>
            </div>
        </PageWrapper>
    </BasicModal>
</template>
<script lang="ts" setup>
import { ref, computed, unref, watch, defineComponent } from 'vue';
import dayjs from 'dayjs';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { PageWrapper } from '/@/components/Page';
import JSelectDept from '/@/components/Form/src/jeecg/components/JSelectDept.vue';
import { formatToDate } from '/@/utils/dateUtil';
import { saveOrUpdate } from '../SqsxGmpsq.api';
import { useRoute } from 'vue-router';
const FormData = ref({ id: '',cs:[] });
const dqbzcode = ref('');
const route = useRoute();
const isshow = computed(() =>
    route.query?.sfbl == 'Y' && dqbzcode.value == 'JCSH' || route.query?.sfbl == 'Y' && dqbzcode.value == 'ZZ'
);
const iscs = computed(() =>
      FormData.value.scQymc
);
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    FormData.value = data.record || {};
    dqbzcode.value = data.dqbz;
    let props = {confirmLoading: false, width: '50%', minHeight: 300, wrapperProps: { scrollbarPadding: 0 }};
    if (!isshow.value) props.footer = null;
    setModalProps(props);
});

const formatDate = (dateStr) => {
    const date = dayjs(dateStr);
    const year = date.year();
    const month = date.month() + 1;
    const day = date.date();
      return `${year}年${month}月${day}日`;
    };

function handleSubmit() {
    saveOrUpdate(FormData.value, true).then(() => {
        closeModal();
    });
}

function replaceNumber() {
    FormData.value.tzsBh = FormData.value?.tzsBh?.replace(/[\uFF10-\uFF19]/g, match => String.fromCharCode(match.charCodeAt(0) - 65248));
}

defineExpose({ formatToDate });
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-basic-table';

#components-table-demo-size h4 {
    margin-bottom: 16px;
}

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

.ant-switch-loading-icon,
.ant-switch::after {
    width: 26px;
    height: 26px;
}

.panel-heading {
    padding: 0px 0px 0px 15px;
    height: 42px;
    line-height: 42px;
    margin-top: 20px;
    background-image: none;
    background-color: #eee5de;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.panel {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 15px;
}
</style>