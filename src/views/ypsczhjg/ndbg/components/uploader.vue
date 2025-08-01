<template>
    <a-upload :action="baseURL + '/nb/upload'" :headers="headers" :data="params" :disabled="inenrDisabled"
        list-type="text" :defaultFileList="[]" :fileList="fileList" class="upload-list-inline" :remove="removeFile"
        :showUploadList="false" @preview="previewFile" @download="download" @change="change">
        <a-button :disabled="inenrDisabled" v-if="!readonly">
            <a-icon type="upload" />上传附件
        </a-button>
    </a-upload>
    <template v-for="(file, idx) in fileList" :key="idx">
        <div>
            <a-button type="link" @click="download(file)">下载</a-button>
            <a-button type="link" @click="previewFile(file)">{{ file.name }}</a-button>
        </div>
    </template>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { getConfig } from '/@/utils/configUtils';
import { defHttp, leftByByte } from './Tools';
import Tools from '/@/utils/tools';

export default defineComponent({
    name: 'ndbg-uploader',
    props: {
        fileId: {
            type: String,
            required: true,
            default: false
        },
        attchType: {
            type: String,
            default: 'qynb'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        isYpjy: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const that = this,
            baseURL = ref(getConfig('qy.wssb.url')),
            fileList = ref([]),
            headers = computed(() => {
                return {
                    Authentication: ''
                };
            }),
            params = computed(() => {
                return {
                    fileId: props.fileId,
                    attTypeId: leftByByte(props.attchType, 40)
                }
            }),
            inenrDisabled = computed(() => {
                return props.disabled || !props.fileId || props.readonly
            }),
            loadFileUrl = computed(() => {
                return props.isYpjy ? 'wtbg/editJyFj' : 'ym/editNdbgFj';
            });
        watch(() => {
            return props.fileId
        }, () => {
            loadFileList();
        }, {
            immediate: true
        });

        function loadFileList() {
            const { fileId, attTypeId } = params.value;
            if (!fileId) return;
            defHttp.post(loadFileUrl.value, { id: fileId, type: attTypeId }).then((res) => {
                if (res && res.data && res.data.code == '200') {
                    fileList.value = toFileList(res.data.data || []);
                }
            });
        }
        function toFileList(data) {
            return data.map((item) => {
                return {
                    uid: item.recId,
                    name: item.attachName,
                    status: 'done',
                    path: item.attachUrl,
                    url: baseURL.value + '/wssb/fileDownload?path=' + encodeURIComponent(item.attachUrl)
                }
            });
        }
        function change({ file, fileList }) {
            if (file.status == 'done') {
                fileList.value = toFileList(file.response.data || []);
            } else fileList.value = fileList;
        }
        function removeFile(file) {
            return new Promise((resolve, reject) => {
                that.$confirm({
                    title: '提示',
                    content: '确定删除[ ' + file.name + ' ]文件？',
                    onOk() {
                        that.$post('/wssb/saveXzspInit/delClxById', {
                            id: file.uid
                        }).then(r => {
                            if (r.data.code === '200') {
                                that.fileList = that.toFileList(r.data.scList || []);
                            } else {
                                resolve(false);
                            }
                        }).catch(() => {
                            resolve(false);
                        });
                    },
                    onCancel() {
                        resolve(false);
                    },
                });
            });
        }
        function download(file) {
            defHttp.downloadByData('wssb/fileDownload', { path: file.path }, file.name);
        }
        function previewFile(file) {
            Tools.toPreview(getConfig('qy.wssb.url') + '/nb/fileDownload?' + Tools.toUrlParams({ path: file.path }) + '&fullfilename=' + (file.uid + '_' + file.name));
        }
        return {
            inenrDisabled,
            readonly: props.readonly,
            baseURL,
            fileList,
            headers,
            params,

            removeFile,
            previewFile,
            download,
            change
        }
    }
});
</script>

<style scoped>

</style>