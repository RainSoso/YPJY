<template>
  <BasicModal v-bind="$attrs" @register="registerModal"  :title="title"  width="60%"  @ok="handleSubmit" >
    <BasicForm @register="registerForm"/>   
        <!-- <a-form :model="fxpgbg" ref="fxpgbgForm"  >
            <a-input v-model:value="fxpgbg.id" hidden></a-input>
            <a-input v-model:value="fxpgbg.zt"  hidden></a-input>
            <a-input v-model:value="fxpgbg.xiaqu"  hidden></a-input>
            <a-input v-model:value="fxpgbg.tbdw"  hidden></a-input>
            <a-input v-model:value="fxpgbg.tbr"  hidden></a-input>
            <a-input v-model:value="fxpgbg.lxfs"  hidden></a-input>
            <a-input v-model:value="fxpgbg.title"  hidden></a-input>
            <a-input v-model:value="fxpgbg.ms"  hidden></a-input>
            <a-input v-model:value="fxpgbg.zdwt"  hidden></a-input>

            <a-row>
                <a-col :span="3">
                </a-col>
                <a-col :span="3">
                </a-col>
                <a-col :span="3" style="text-align: center;padding-left: 130px; padding-top: 3px;">
                    <b>标题: </b>
                </a-col>
                <a-col :span="3">
                    <a-input  style="width:100%" v-model:value="fxpgbg.title"></a-input>
                </a-col>
                <a-col :span="3">
                    
                </a-col>
                <a-col :span="3">
                </a-col>
                <a-col :span="3">
                </a-col>
                <a-col :span="3">
                </a-col>
            </a-row>
            <div class="panel-heading">
                <div style="display: flex;" class="panel">
                    <div style="width:20%" >填报单位：{{fxpgbg.tbdw}}</div>
                    <div style="width:80%;text-align: right;" >辖区：{{fxpgbg.xiaqu}}</div>
                </div>
            </div>
            
            <div class="" style="padding-left: 20px;">
                <div style="display: flex;padding-top: 10px;"  class="panel">
                    <div style="width:40%" >填报人：
                        <a-input style="width:40%" v-model:value="fxpgbg.tbr"></a-input>
                    </div>
                    <div style="width:60%;text-align: right;" >联系方式：
                        <a-input style="width:20%" v-model:value="fxpgbg.lxfs"></a-input>
                    </div>
                </div>
            </div>
           <div class="" style="padding-left: 35px;width:100%">
                <div style="display: flex;padding-top: 10px;"  class="panel">
                    <div style="width:80%" >描述：
                        <a-input style="width:80%" v-model:value="fxpgbg.ms"></a-input>
                    </div>
                </div>
            </div>
            <div class="" style="padding-left: 5px;width:100%">
                <div style="display: flex;padding-top: 10px;"  class="panel">
                    <div style="width:80%" >重点问题：
                        <a-input style="width:78.5%"    v-model:value="fxpgbg.zdwt"></a-input>
                        
                    </div>
                </div>
            </div> 
        </a-form> -->
        <!-- <div class="panel-heading">
            <div style="display: flex;" class="panel">
                <div style="width:20%" >风险材料分析</div>
                <div style="width:80%;text-align: right;" >
                    <a-upload :action="VITE_GLOB_DOMAIN_URL + '/sys/attachment/upload'" :headers="headers" :data="params" 
                      list-type="text"  :disabled="false" 
                    class="upload-list-inline" :remove="removeFile" :showUploadList="false"
                    @change="handleChange">
                    <slot>
                        <a-button :disabled="!showFooter" :size="btnSize" >
                            <a-icon type="upload" />上传
                        </a-button>
                    </slot>
                    </a-upload>
                </div>
            </div>
        </div> -->
        <!-- <table style="width: 100%" class="my-table text-center">
            <tr>
                <td style="width:80%">材料名称</td>
                <td style="width:20%">操作</td>
            </tr>
            <tr v-for="(item, index) in fileList" :key="index">
                <td style="width:80%"><a :href="item.url" target="downloadFile" >{{item.name}}</a></td>
                <template v-if="showFooter">
                    <td  style="width:20%"><a  @click="deleteFile(item)">删除</a></td>
                </template>
                <template v-if="!showFooter">
                </template>
            </tr>
        </table>         -->
     </BasicModal>
</template>

<script lang="ts" setup>
    import {ref, computed, unref,watch} from 'vue';
    import {BasicModal, useModalInner} from '/@/components/Modal';
    import {BasicForm, useForm} from '/@/components/Form/index';
    import {formSchema} from '../Fxpgbg.data';
    import {saveOrUpdate,getFileList} from '../Fxpgbg.api';
    import { getAppEnvConfig } from '/@/utils/env';
    import {getToken} from '/@/utils/auth/index';
    import { defHttp } from '/@/utils/http/axios';
    import { useMessage } from '/@/hooks/web/useMessage';
    const { createMessage } = useMessage();

    const { VITE_GLOB_DOMAIN_URL } = getAppEnvConfig();
    let token = getToken();
    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const showFooter = ref(true);
    const fxpgbg = ref({});
    const fileList = ref([]);
    const bisId = ref('');
    const biz = ref('ypjy');
    const source = ref('风险评估报告');
    const category = ref('风险材料');
    const headers = ref({'X-Access-Token': token});
    const fxpgbgForm = ref();
    // watch(() => bisId.value, (value, oldVal) => {
    //   if (value != oldVal) loadFileList();
    // });
    //loadFileList();
    const params = computed(() => {
        
        // let res = {};
        //   if (biz.value) res.biz = biz.value;
        //   if (source.value) res.source = source.value;
        //   if (bisId.value) res.bisId = bisId.value;
        //   if (category.value) res.category = category.value;
        //   return res;
       
        });


    
    //表单配置
    const [registerForm, {setProps,resetFields, setFieldsValue, validate}] = useForm({
        schemas: formSchema,
        showAdvancedButton: false,
        showActionButtonGroup: false,
        baseColProps: { span: 12 },
        labelCol: { span: 10 },
        autoFocusFirstItem: true,
        wrapperCol: { span: 14 }
    });
    //表单赋值
    const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
        //重置表单
        await resetFields();
        setModalProps({confirmLoading: false,showCancelBtn:data?.showFooter,showOkBtn:data?.showFooter});
        isUpdate.value = !!data?.isUpdate;
        showFooter.value = !!data?.showFooter;
        fxpgbg.value = data.dept;
        bisId.value = data.dept.id;
        //if (unref(isUpdate)) {
            //表单赋值
            await setFieldsValue({
                ...data.dept,
            });
        //}
         // 隐藏底部时禁用整个表单
         setProps({ disabled: !data?.showFooter })
    });
   
    //设置标题
    const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
    
    function handleChange({ file, fileList }) {
        loadFileList();
    }
    // function previewFile(file) {
    //     if (file.status !== 'done') return;
    //     if (/.*\.(png|jpg|jpeg|bmp|gif|webp)$/ig.test(file.name)) {
    //         window.open(this.baseURL + '/ypjy/filePreview/' + file.path);
    //     } else {
    //         this.$download('ypjy/fileDownload', { path: file.path }, file.name)
    //     }
    // }
    function deleteFile(item) {
        let params = { id: item.uid };
        defHttp.delete({url: '/sys/attachment/delete?id=' +  item.uid, params}).then(r=>{
            if (r= '删除成功') {
                var fileList_ = fileList.value;
                for (let idx = 0; idx < fileList_.length; idx++) {
                    if (fileList_[idx].uid != item.uid) continue;
                    fileList_.splice(idx, 1);
                    break;
                }
                fileList.value = fileList_;
            }
        })
    }
    
    async function loadFileList() {
        
        if(bisId.value != null && bisId.value != undefined) {
            var data = await getFileList({bisId: bisId.value});
            fileList.value = toFileList(data || []);
        }
        
    }
    function toFileList(data) {
        return data.map((item) => {
            return item.id ? {
                uid: item.id,
                name: item.filename,
                status: 'done',
                path: item.filePath,
                url: VITE_GLOB_DOMAIN_URL + '/sys/common/static/' + item.filePath
            } : item 
        });  
    }
    
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
.table1 {
  margin-bottom: 20px;
}

.panel {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 15px;
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
  /* border:1px solid #BEBEBE; */
}

.table-striped tr {
  width: 100%;
  padding: 30px 0;
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

.table-striped td {
  border: 1px solid #ddd;
  padding: 8px;
  line-height: 1.42857143;
  text-align: center;
}

.table-striped .tab_apply {
  width: 200px;
  vertical-align: middle;
  color: #0986b0;
  font-weight: bold;
}

.table-striped .left {
  text-align: left;
}

.table-striped>tr:nth-child(odd)>td,
.table-striped>tr:nth-child(odd)>th {
  background-color: #f9f9f9;
}

.table-striped tr {
  width: 100%;
  padding: 30px 0;
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

.table-striped td {
  border: 1px solid #ddd;
  padding: 8px;
  line-height: 1.42857143;
  text-align: center;
}

.table-striped .tab_apply {
  width: 200px;
  vertical-align: middle;
  color: #0986b0;
  font-weight: bold;
  text-align: right;
}

.tab_apply {
  width: 200px;
  vertical-align: middle;
  color: #0986b0;
  font-weight: bold;
  text-align: right;
}

.table-striped .left {
  text-align: left;
}

.ctl-panel {
  position: sticky;
  bottom: 0;
  margin: 2px;
  overflow: hidden;
  padding: 0px;
  background-color: #eee5de;
  width: 100%;
}

.table-striped>tr:nth-child(odd)>td,
.table-striped>tr:nth-child(odd)>th {
  background-color: #f9f9f9;
}
</style>