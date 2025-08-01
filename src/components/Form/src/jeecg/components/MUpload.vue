<template>
    <div ref="containerRef" :class="`${prefixCls}-container`">
        <a-upload :headers="headers" :multiple="multiple" :action="attachmentUploadUrl" :fileList="fileList"
            :disabled="disabled" :remove="onRemove" v-bind="bindProps" @change="onFileChange" @preview="onFilePreview">
            <template v-if="isImageMode">
                <div v-if="!disabled && !isMaxCount">
                    <Icon icon="ant-design:plus-outlined" />
                    <div class="ant-upload-text">{{ btnName }}</div>
                </div>
            </template>
            <a-button v-else-if="!disabled && !isMaxCount" :disabled="isMaxCount || disabled">
                <Icon icon="ant-design:upload-outlined" />
                <span>{{ btnName }}</span>
            </a-button>
        </a-upload>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, computed, nextTick, createApp } from 'vue';
import { Icon } from '/@/components/Icon';
import { getToken } from '/@/utils/auth';
import { getAttachmentList, attachmentUploadUrl, deleteAttachment } from '/@/api/common/api';
import { propTypes } from '/@/utils/propTypes';
import { UploadTypeEnum } from './JUpload/upload.data';
import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';
import { useMessage } from '/@/hooks/web/useMessage';
import { createImgPreview } from '/@/components/Preview/index';
import { useAttrs } from '/@/hooks/core/useAttrs';
import { useDesign } from '/@/hooks/web/useDesign';
import { isUnDef } from '/@/utils/is';
import UploadItemActions from './JUpload/components/UploadItemActions.vue';
import Tools from '/@/utils/tools';

const { createMessage, createConfirm } = useMessage();
const { prefixCls } = useDesign('j-upload');
const attrs = useAttrs();
const emit = defineEmits(['change', 'update:value']);
const props = defineProps({
    value: propTypes.oneOfType([propTypes.string, propTypes.array]),
    biz: propTypes.string.def('temp'),
    /**
     * 是否返回id，
     * true：仅返回id
     * false：返回id fileName filePath fileSize
     */
    returnId: propTypes.bool.def(true),
    source: propTypes.string.def('default'),
    bisId: propTypes.string,
    category: propTypes.string.def(),

    fileType: propTypes.string.def(UploadTypeEnum.all),
    accept: propTypes.string,
    maxCount: propTypes.number.def(5),
    maxSize: propTypes.number.def(1024 * 1024 * 2),
    multiple: propTypes.bool.def(true),
    disabled: propTypes.bool.def(false),
    btnName: propTypes.string.def('上传'),

    // 是否显示左右移动按钮
    mover: propTypes.bool.def(true),
    // 是否显示下载按钮
    download: propTypes.bool.def(true),
});
const headers = reactive({
    'X-Access-Token': getToken(),
});
const fileList = ref<any[]>([]);
const uploadGoOn = ref<boolean>(true);
// refs
const containerRef = ref();
// 是否达到了最大上传数量
const isMaxCount = computed(() => props.maxCount > 0 && fileList.value.length >= props.maxCount);
// 当前是否是上传图片模式
const isImageMode = computed(() => props.fileType === UploadTypeEnum.image);
// 合并 props 和 attrs
const bindProps = computed(() => {
    const bind: any = Object.assign({}, props, attrs);
    bind.name = 'file';
    bind.listType = isImageMode.value ? 'picture-card' : 'text';
    bind.class = [bind.class, { 'upload-disabled': props.disabled }];
    bind.data = { biz: props.biz, ...bind.data };
    if (props.source) bind.data.source = props.source;
    if (props.bisId) bind.data.bisId = props.bisId;
    if (props.category) bind.data.category = props.category;
    if (!bind.beforeUpload) {
        bind.beforeUpload = onBeforeUpload;
    }
    // 如果当前是图片上传模式，就只能上传图片
    if (isImageMode.value && !bind.accept) {
        bind.accept = 'image/*';
    }
    return bind;
});

const params = computed(() => {
    return {
        biz: props.biz,
        source: props.source,
        bisId: props.bisId,
        category: props.category
    };
});

const isModelValue = computed(() => {
    return isUnDef(props.bisId);
});

watch([() => props.bisId, () => props.value], () => {
    if (isModelValue.value) {
        if (props.value) {
            let val = Array.isArray(props.value) ? props.value.join(',') : props.value;
            getAttachmentList({ id: props.value }).then((res) => {
                fileList.value = sortFileList(res.map(item => toUploadItem(item)), val, false);
            });
        }
    } else if (props.bisId) {
        let { bisId, category } = params.value;
        getAttachmentList({ bisId, category }).then((res) => {
            fileList.value = res.map(item => toUploadItem(item));
        });
    }
}, { immediate: true });

const toUploadItem = (item) => {
    let url = getFileAccessHttpUrl(item.filePath);
    url += (url.indexOf('?') < 0 ? '?' : '&') + Tools.toUrlParams({ filename: item.filename });
    return {
        uid: item.id,
        name: item.filename,
        url,
        status: 'done',
        path: item.filePath,
        response: { status: 'history', message: item.filePath },
    }
};
// 文件上传之前的操作
function onBeforeUpload(file) {
    uploadGoOn.value = true;
    if (isImageMode.value) {
        if (file.type.indexOf('image') < 0) {
            createMessage.warning('请上传图片');
            uploadGoOn.value = false;
            return false;
        }
    }
    if (0 < props.maxSize && props.maxSize < file.size) {
        createMessage.warning('单个文件只能上传小于 ' + Tools.getFileSize(props.maxSize) + ' 的文件！');
        uploadGoOn.value = false;
        return false;
    }
    return true;
}

// 删除处理事件
function onRemove(file) {
    return new Promise((resolve) => {
        createConfirm({
            title: '删除',
            content: `确定要删除这${isImageMode.value ? '张图片' : '个文件'}吗？`,
            iconType: 'warning',
            onOk: () => {
                deleteAttachment({ id: file.uid }).then(() => resolve(true)).catch(() => resolve(false));
            },
            onCancel: () => resolve(false),
        });
    });
}

// upload组件change事件
function onFileChange(info) {
    if (!info.file.status && uploadGoOn.value === false) {
        info.fileList.pop();
    }
    let fileListTemp = info.fileList;
    // 限制最大上传数
    if (props.maxCount > 0) {
        let count = fileListTemp.length;
        if (count >= props.maxCount) {
            let diffNum = props.maxCount - fileListTemp.length;
            if (diffNum >= 0) {
                fileListTemp = fileListTemp.slice(-props.maxCount);
            } else {
                return;
            }
        }
    }
    if (info.file.status === 'done') {
        if (info.file.response.success) {
            fileListTemp = fileListTemp.map((file) => {
                if (file.response.result) {
                    let item = file.response.result;
                    file.uid = item.id;
                    file.url = file.thumbUrl = getFileAccessHttpUrl(item.filePath);
                    file.path = item.filePath;
                }
                return file;
            });
        }
    } else if (info.file.status === 'error') {
        createMessage.error(`${info.file.name} 上传失败.`);
    }
    fileList.value = fileListTemp;
    if (info.file.status === 'done' || info.file.status === 'removed') {
        emitValueAuto();
    }
}

// 预览文件、图片
function onFilePreview(file) {
    if (Tools.isImageUrl(file.url)) {
        let index = 0, idx = 0, imageList = fileList.value.filter(item => Tools.isImageUrl(item.url)).map(item => {
            if (file.uid == item.uid) index = idx;
            idx++;
            return item.url;
        });
        createImgPreview({ imageList, index, maskClosable: true });
    } else {
        let url = Tools.getFileAccessHttpUrl(file.path, true);
        Tools.toPreview(url + (0 > url?.indexOf('?') ? '?' : '&') + 'fullfilename=' + (file.uid + '_' + file.name));
    }
}

function emitValueAuto() {
    if (props.returnId) {
        let uploadFiles = fileList.value;
        let path = '';
        if (!uploadFiles || uploadFiles.length == 0) {
            path = '';
        }
        let pathList: string[] = [];
        for (const item of uploadFiles) {
            if (item.status === 'done') {
                pathList.push(item.uid);
            } else {
                return;
            }
        }
        if (pathList.length > 0) {
            path = pathList.join(',');
        }
        emitValue(path);
    } else {
        let newFileList: any[] = [];
        for (const item of fileList.value) {
            if (item.status === 'done') {
                let fileJson = {
                    id: item.uid,
                    fileName: item.name,
                    filePath: item.path,
                    fileSize: item.size,
                };
                newFileList.push(fileJson);
            }
        }
        emitValue(newFileList);
    }
}

function emitValue(value) {
    emit('change', value);
    emit('update:value', value);
}

watch(fileList, () => nextTick(() => addActionsListener()), { immediate: true });

const antUploadItemCls = 'ant-upload-list-item';

// Listener
function addActionsListener() {
    const uploadItems = containerRef.value ? containerRef.value.getElementsByClassName(antUploadItemCls) : null;
    if (!uploadItems || uploadItems.length === 0) {
        return;
    }
    for (const uploadItem of uploadItems) {
        let hasActions = uploadItem.getAttribute('data-has-actions') === 'true';
        if (!hasActions) {
            uploadItem.addEventListener('mouseover', onAddActionsButton);
        }
    }
}

// 添加可左右移动的按钮
function onAddActionsButton(event) {
    const getUploadItem = () => {
        for (const path of event.path) {
            if (path.classList.contains(antUploadItemCls)) {
                return path;
            } else if (path.classList.contains(`${prefixCls}-container`)) {
                return null;
            }
        }
        return null;
    };
    const uploadItem = getUploadItem();
    if (!uploadItem) {
        return;
    }
    let actions = uploadItem.getElementsByClassName('ant-upload-list-item-actions');
    if (!actions || actions.length === 0) {
        actions = uploadItem.getElementsByClassName('ant-upload-list-item-card-actions');
        if (!actions || actions.length === 0) {
            return;
        }
    }
    // 添加操作按钮
    const div = document.createElement('div');
    div.className = 'upload-actions-container';
    createApp(UploadItemActions, {
        element: uploadItem,
        fileList: fileList,
        mover: props.mover && isImageMode.value && isModelValue.value,
        download: props.download,
        emitValue: (val) => {
            fileList.value = sortFileList(fileList.value, val);
            emitValueAuto();
        },
    }).mount(div);
    actions[0].appendChild(div);
    uploadItem.setAttribute('data-has-actions', 'true');
    uploadItem.removeEventListener('mouseover', onAddActionsButton);
}

function sortFileList(array, sort: string, useUrl: boolean = true) {
    let cache = {}, res: any = [];
    array.forEach(item => {
        cache[useUrl ? item.url : item.uid] = item;
    });
    sort.split(',').forEach(item => {
        cache[item] && res.push(cache[item]);
    });
    return res;
}

defineExpose({
    addActionsListener,
});
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-j-upload';

.@{prefix-cls}-container {
    font-size: 0;

    :deep(.ant-upload-picture-card-wrapper) {
        margin: 0 -8px -8px 0;
    }

    :deep(.ant-upload-list-text) {
        &>div:first-child {
            margin-top: -8px;
        }
    }
}
</style>