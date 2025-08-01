<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="80%">
         <BasicForm @register="registerForm"/>
         <a-divider content-position="left">委托方资料目录</a-divider>
         <div class="panel-heading">
            <div style="display: flex;" class="panel" >
                <div style="width:60%" >MAH批准证明文件</div>
                <div style="width:80%;text-align: right;" >
                    <a-upload :action="VITE_GLOB_DOMAIN_URL + '/sys/attachment/upload'" :headers="headers" :data="paramsWtf1" 
                      list-type="text"  :disabled="false" :fileList="fileListWtf1"
                    class="upload-list-inline" :remove="deleteFileWtf1"   
                    @change="handleChangeWtf1">
                    <slot>
                        <a-button :disabled="false"  >
                            <a-icon type="upload" />上传
                        </a-button>
                    </slot>
                    </a-upload>
                </div>
            </div>
            <div style="display: flex;" class="panel">
                <div style="width:60%" >营业执照、组织机构代码证</div>
                <div style="width:80%;text-align: right;" >
                    <a-upload :action="VITE_GLOB_DOMAIN_URL + '/sys/attachment/upload'" :headers="headers" :data="paramsWtf2" 
                      list-type="text"  :disabled="false" :fileList="fileListWtf2"
                    class="upload-list-inline" :remove="deleteFileWtf2" 
                    @change="handleChangeWtf2">
                    <slot>
                        <a-button :disabled="false"  >
                            <a-icon type="upload" />上传
                        </a-button>
                    </slot>
                    </a-upload>
                </div>
            </div>
            <div style="display: flex;" class="panel">
                <div style="width:60%" >药品生产许可证或药品经营许可证</div>
                <div style="width:80%;text-align: right;" >
                    <a-upload :action="VITE_GLOB_DOMAIN_URL + '/sys/attachment/upload'" :headers="headers" :data="paramsWtf3" 
                      list-type="text"  :disabled="false" :fileList="fileListWtf3"
                    class="upload-list-inline" :remove="deleteFileWtf3" 
                    @change="handleChangeWtf3">
                    <slot>
                        <a-button :disabled="false"  >
                            <a-icon type="upload" />上传
                        </a-button>
                    </slot>
                    </a-upload>
                </div>
            </div>
            <div style="display: flex;" class="panel">
                <div style="width:60%" >药品监管机构场地检查符合性证明文件或药品监管部门认为的其他证明性文件</div>
                <div style="width:80%;text-align: right;" >
                    <a-upload :action="VITE_GLOB_DOMAIN_URL + '/sys/attachment/upload'" :headers="headers" :data="paramsWtf4" 
                      list-type="text"  :disabled="false" :fileList="fileListWtf4"
                    class="upload-list-inline" :remove="deleteFileWtf4" 
                    @change="handleChangeWtf4">
                    <slot>
                        <a-button :disabled="false"  >
                            <a-icon type="upload" />上传
                        </a-button>
                    </slot>
                    </a-upload>
                </div>
            </div>
            <div style="display: flex;" class="panel">
                <div style="width:60%" >药品生产/经营（如有）场地主文件</div>
                <div style="width:80%;text-align: right;" >
                    <a-upload :action="VITE_GLOB_DOMAIN_URL + '/sys/attachment/upload'" :headers="headers" :data="paramsWtf5" 
                      list-type="text"  :disabled="false" :fileList="fileListWtf5"
                    class="upload-list-inline" :remove="deleteFileWtf5" 
                    @change="handleChangeWtf5">
                    <slot>
                        <a-button :disabled="false"  >
                            <a-icon type="upload" />上传
                        </a-button>
                    </slot>
                    </a-upload>
                </div>
            </div>
            <div style="display: flex;" class="panel">
                <div style="width:60%" >质量审核和评估报告</div>
                <div style="width:80%;text-align: right;" >
                    <a-upload :action="VITE_GLOB_DOMAIN_URL + '/sys/attachment/upload'" :headers="headers" :data="paramsWtf6" 
                      list-type="text"  :disabled="false" :fileList="fileListWtf6"
                    class="upload-list-inline" :remove="deleteFileWtf6" 
                    @change="handleChangeWtf6">
                    <slot>
                        <a-button :disabled="false"  >
                            <a-icon type="upload" />上传
                        </a-button>
                    </slot>
                    </a-upload>
                </div>
            </div>
            <div style="display: flex;" class="panel">
                <div style="width:60%" >质量协议文本原件</div>
                <div style="width:80%;text-align: right;" >
                    <a-upload :action="VITE_GLOB_DOMAIN_URL + '/sys/attachment/upload'" :headers="headers" :data="paramsWtf7" 
                      list-type="text"  :disabled="false" :fileList="fileListWtf7"
                    class="upload-list-inline" :remove="deleteFileWtf7" 
                    @change="handleChangeWtf7">
                    <slot>
                        <a-button :disabled="false"  >
                            <a-icon type="upload" />上传
                        </a-button>
                    </slot>
                    </a-upload>
                </div>
            </div>
            <div style="display: flex;" class="panel">
                <div style="width:60%" >真实性承诺声明</div>
                <div style="width:80%;text-align: right;" >
                    <a-upload :action="VITE_GLOB_DOMAIN_URL + '/sys/attachment/upload'" :headers="headers" :data="paramsWtf8" 
                      list-type="text"  :disabled="false" :fileList="fileListWtf8"
                    class="upload-list-inline" :remove="deleteFileWtf8" 
                    @change="handleChangeWtf8">
                    <slot>
                        <a-button :disabled="false"  >
                            <a-icon type="upload" />上传
                        </a-button>
                    </slot>
                    </a-upload>
                </div>
            </div>
            <a-divider content-position="left">受托方资料目录</a-divider>
            <div style="display: flex;" class="panel">
                <div style="width:60%" >药品委托销售（储存、运输）申请表(含双方签字盖章件)</div>
                <div style="width:100%;text-align: right;" >
                    <a-upload :action="VITE_GLOB_DOMAIN_URL + '/sys/attachment/upload'" :headers="headers" :data="paramsStf1" 
                      list-type="text"  :disabled="false" :fileList="fileListStf1"
                    class="upload-list-inline" :remove="deleteFileStf1" 
                    @change="handleChangeStf1">
                    <slot>
                        <a-button :disabled="false"  >
                            <a-icon type="upload" />上传
                        </a-button>
                    </slot>
                    </a-upload>
                </div>
            </div>
            <div style="display: flex;" class="panel">
                <div style="width:60%" >真实性承诺声明</div>
                <div style="width:80%;text-align: right;" >
                    <a-upload :action="VITE_GLOB_DOMAIN_URL + '/sys/attachment/upload'" :headers="headers" :data="paramsStf2" 
                      list-type="text"  :disabled="false" :fileList="fileListStf2"
                    class="upload-list-inline" :remove="deleteFileStf2" 
                    @change="handleChangeStf2">
                    <slot>
                        <a-button :disabled="false"  >
                            <a-icon type="upload" />上传
                        </a-button>
                    </slot>
                    </a-upload>
                </div>
            </div>
        </div>
     </BasicModal>
</template>

<script lang="ts" setup>
import { defHttp } from '/@/utils/http/axios';
    import {ref, computed, unref,watch} from 'vue';
    import {BasicModal, useModalInner} from '/@/components/Modal';
    import {BasicForm, useForm} from '/@/components/Form/index';
    import {formSchema} from '../WtbgBaseAdd.data';
    import {saveOrUpdate,getFileList} from '../WtbgBaseAdd.api';
    import { getAppEnvConfig } from '/@/utils/env';
    import {getToken} from '/@/utils/auth/index';
    const { VITE_GLOB_DOMAIN_URL } = getAppEnvConfig();
    let token = getToken();
    const headers = ref({'X-Access-Token': token});
    const fileListWtf1 = ref([]);
    const fileListWtf2 = ref([]);
    const fileListWtf3 = ref([]);
    const fileListWtf4 = ref([]);
    const fileListWtf5 = ref([]);
    const fileListWtf6 = ref([]);
    const fileListWtf7 = ref([]);
    const fileListWtf8 = ref([]);
    const fileListStf1 = ref([]);
    const fileListStf2 = ref([]);
    const bisId = ref('1111');
    const source = ref('ypjyWtbg');
    const categoryWtf1 = ref('wtf1');
    const categoryWtf2 = ref('wtf2');
    const categoryWtf3 = ref('wtf3');
    const categoryWtf4 = ref('wtf4');
    const categoryWtf5 = ref('wtf5');
    const categoryWtf6 = ref('wtf6');
    const categoryWtf7 = ref('wtf7');
    const categoryWtf8 = ref('wtf8');
    const categoryStf1 = ref('stf1');
    const categoryStf2 = ref('stf2');
    watch(() => bisId.value, (value, oldVal) => {
        debugger
      if (value != oldVal) loadFileListWtf1();loadFileListWtf2();loadFileListWtf3();loadFileListWtf4();
      loadFileListWtf5();loadFileListWtf6();loadFileListWtf7();loadFileListWtf8();
      loadFileListStf1();loadFileListStf2();
    },{immediate: true});
    
    const paramsWtf1 = computed(() => {
        let res = {};
        if (source.value) res.source = source.value;
        if (bisId.value) res.bisId = bisId.value;
        if (categoryWtf1.value) res.category = categoryWtf1.value;
        return res;
    });
    const paramsWtf2 = computed(() => {
        let res = {};
        if (source.value) res.source = source.value;
        if (bisId.value) res.bisId = bisId.value;
        if (categoryWtf2.value) res.category = categoryWtf2.value;
        return res;
    });
    const paramsWtf3 = computed(() => {
        let res = {};
        if (source.value) res.source = source.value;
        if (bisId.value) res.bisId = bisId.value;
        if (categoryWtf3.value) res.category = categoryWtf3.value;
        return res;
    });
    const paramsWtf4 = computed(() => {
        let res = {};
        if (source.value) res.source = source.value;
        if (bisId.value) res.bisId = bisId.value;
        if (categoryWtf4.value) res.category = categoryWtf4.value;
        return res;
    });
    const paramsWtf5 = computed(() => {
        let res = {};
        if (source.value) res.source = source.value;
        if (bisId.value) res.bisId = bisId.value;
        if (categoryWtf5.value) res.category = categoryWtf5.value;
        return res;
    });
    const paramsWtf6 = computed(() => {
        let res = {};
        if (source.value) res.source = source.value;
        if (bisId.value) res.bisId = bisId.value;
        if (categoryWtf6.value) res.category = categoryWtf6.value;
        return res;
    });
    const paramsWtf7 = computed(() => {
        let res = {};
        if (source.value) res.source = source.value;
        if (bisId.value) res.bisId = bisId.value;
        if (categoryWtf7.value) res.category = categoryWtf7.value;
        return res;
    });
    const paramsWtf8 = computed(() => {
        let res = {};
        if (source.value) res.source = source.value;
        if (bisId.value) res.bisId = bisId.value;
        if (categoryWtf8.value) res.category = categoryWtf8.value;
        return res;
    });
    const paramsStf1 = computed(() => {
        let res = {};
        if (source.value) res.source = source.value;
        if (bisId.value) res.bisId = bisId.value;
        if (categoryStf1.value) res.category = categoryStf1.value;
        return res;
    });
    const paramsStf2 = computed(() => {
        let res = {};
        if (source.value) res.source = source.value;
        if (bisId.value) res.bisId = bisId.value;
        if (categoryStf2.value) res.category = categoryStf2.value;
        return res;
    });
function deleteFileWtf1(item) {
    let params = { id: item.uid };
    defHttp.delete({url: '/sys/attachment/delete?id=' +  item.uid, params}).then(r=>{
        if (r= '删除成功') {
            var fileList_ = fileListWtf1.value;
            for (let idx = 0; idx < fileList_.length; idx++) {
                if (fileList_[idx].uid != item.uid) continue;
                fileList_.splice(idx, 1);
                break;
            }
            fileListWtf1.value = fileList_;
        }
    })
}
function deleteFileWtf2(item) {
    let params = { id: item.uid };
    defHttp.delete({url: '/sys/attachment/delete?id=' +  item.uid, params}).then(r=>{
        if (r= '删除成功') {
            var fileList_ = fileListWtf2.value;
            for (let idx = 0; idx < fileList_.length; idx++) {
                if (fileList_[idx].uid != item.uid) continue;
                fileList_.splice(idx, 1);
                break;
            }
            fileListWtf2.value = fileList_;
        }
    })
}
function deleteFileWtf3(item) {
    let params = { id: item.uid };
    defHttp.delete({url: '/sys/attachment/delete?id=' +  item.uid, params}).then(r=>{
        if (r= '删除成功') {
            var fileList_ = fileListWtf3.value;
            for (let idx = 0; idx < fileList_.length; idx++) {
                if (fileList_[idx].uid != item.uid) continue;
                fileList_.splice(idx, 1);
                break;
            }
            fileListWtf3.value = fileList_;
        }
    })
}
function deleteFileWtf4(item) {
    let params = { id: item.uid };
    defHttp.delete({url: '/sys/attachment/delete?id=' +  item.uid, params}).then(r=>{
        if (r= '删除成功') {
            var fileList_ = fileListWtf4.value;
            for (let idx = 0; idx < fileList_.length; idx++) {
                if (fileList_[idx].uid != item.uid) continue;
                fileList_.splice(idx, 1);
                break;
            }
            fileListWtf4.value = fileList_;
        }
    })
}
function deleteFileWtf5(item) {
    let params = { id: item.uid };
    defHttp.delete({url: '/sys/attachment/delete?id=' +  item.uid, params}).then(r=>{
        if (r= '删除成功') {
            var fileList_ = fileListWtf5.value;
            for (let idx = 0; idx < fileList_.length; idx++) {
                if (fileList_[idx].uid != item.uid) continue;
                fileList_.splice(idx, 1);
                break;
            }
            fileListWtf5.value = fileList_;
        }
    })
}
function deleteFileWtf6(item) {
    let params = { id: item.uid };
    defHttp.delete({url: '/sys/attachment/delete?id=' +  item.uid, params}).then(r=>{
        if (r= '删除成功') {
            var fileList_ = fileListWtf6.value;
            for (let idx = 0; idx < fileList_.length; idx++) {
                if (fileList_[idx].uid != item.uid) continue;
                fileList_.splice(idx, 1);
                break;
            }
            fileListWtf6.value = fileList_;
        }
    })
}
function deleteFileWtf7(item) {
    let params = { id: item.uid };
    defHttp.delete({url: '/sys/attachment/delete?id=' +  item.uid, params}).then(r=>{
        if (r= '删除成功') {
            var fileList_ = fileListWtf7.value;
            for (let idx = 0; idx < fileList_.length; idx++) {
                if (fileList_[idx].uid != item.uid) continue;
                fileList_.splice(idx, 1);
                break;
            }
            fileListWtf7.value = fileList_;
        }
    })
}
function deleteFileWtf8(item) {
    let params = { id: item.uid };
    defHttp.delete({url: '/sys/attachment/delete?id=' +  item.uid, params}).then(r=>{
        if (r= '删除成功') {
            var fileList_ = fileListWtf8.value;
            for (let idx = 0; idx < fileList_.length; idx++) {
                if (fileList_[idx].uid != item.uid) continue;
                fileList_.splice(idx, 1);
                break;
            }
            fileListWtf8.value = fileList_;
        }
    })
}

function deleteFileStf1(item) {
    let params = { id: item.uid };
    defHttp.delete({url: '/sys/attachment/delete?id=' +  item.uid, params}).then(r=>{
        if (r= '删除成功') {
            var fileList_ = fileListStf1.value;
            for (let idx = 0; idx < fileList_.length; idx++) {
                if (fileList_[idx].uid != item.uid) continue;
                fileList_.splice(idx, 1);
                break;
            }
            fileListStf1.value = fileList_;
        }
    })
}

function deleteFileStf2(item) {
    let params = { id: item.uid };
    defHttp.delete({url: '/sys/attachment/delete?id=' +  item.uid, params}).then(r=>{
        if (r= '删除成功') {
            var fileList_ = fileListStf2.value;
            for (let idx = 0; idx < fileList_.length; idx++) {
                if (fileList_[idx].uid != item.uid) continue;
                fileList_.splice(idx, 1);
                break;
            }
            fileListStf2.value = fileList_;
        }
    })
}

function handleChangeWtf1({ file, fileList }) {
    if (file.status == 'done' || file.status == 'success') {
          fileList.forEach((item) => {
              if (item.uid !== file.uid) return;
              if (file.response.success) {
                  let data = toFileList([file.response.result || {}])[0];
                  item.uid = data.uid;
                  item.path = data.path;
                  item.url = data.url;
                  item.thumbUrl = data.thumbUrl;
              } else {
                  let msg = item.response.message || '', sqlMark = 'java.sql.SQLException: ';
                  if (0 <= msg.indexOf(sqlMark)) msg = msg.substring(msg.lastIndexOf(sqlMark) + sqlMark.length);
                  item.status = 'error';
                  item.error = { statusText: msg };
              }
          });
      } else fileListWtf1.value = fileList;
}
function handleChangeWtf2({ file, fileList }) {
    if (file.status == 'done' || file.status == 'success') {
          fileList.forEach((item) => {
              if (item.uid !== file.uid) return;
              if (file.response.success) {
                  let data = toFileList([file.response.result || {}])[0];
                  item.uid = data.uid;
                  item.path = data.path;
                  item.url = data.url;
                  item.thumbUrl = data.thumbUrl;
              } else {
                  let msg = item.response.message || '', sqlMark = 'java.sql.SQLException: ';
                  if (0 <= msg.indexOf(sqlMark)) msg = msg.substring(msg.lastIndexOf(sqlMark) + sqlMark.length);
                  item.status = 'error';
                  item.error = { statusText: msg };
              }
          });
      } else fileListWtf2.value = fileList;
}
function handleChangeWtf3({ file, fileList }) {
    if (file.status == 'done' || file.status == 'success') {
          fileList.forEach((item) => {
              if (item.uid !== file.uid) return;
              if (file.response.success) {
                  let data = toFileList([file.response.result || {}])[0];
                  item.uid = data.uid;
                  item.path = data.path;
                  item.url = data.url;
                  item.thumbUrl = data.thumbUrl;
              } else {
                  let msg = item.response.message || '', sqlMark = 'java.sql.SQLException: ';
                  if (0 <= msg.indexOf(sqlMark)) msg = msg.substring(msg.lastIndexOf(sqlMark) + sqlMark.length);
                  item.status = 'error';
                  item.error = { statusText: msg };
              }
          });
      } else fileListWtf3.value = fileList;
}
function handleChangeWtf4({ file, fileList }) {
    if (file.status == 'done' || file.status == 'success') {
          fileList.forEach((item) => {
              if (item.uid !== file.uid) return;
              if (file.response.success) {
                  let data = toFileList([file.response.result || {}])[0];
                  item.uid = data.uid;
                  item.path = data.path;
                  item.url = data.url;
                  item.thumbUrl = data.thumbUrl;
              } else {
                  let msg = item.response.message || '', sqlMark = 'java.sql.SQLException: ';
                  if (0 <= msg.indexOf(sqlMark)) msg = msg.substring(msg.lastIndexOf(sqlMark) + sqlMark.length);
                  item.status = 'error';
                  item.error = { statusText: msg };
              }
          });
      } else fileListWtf4.value = fileList;
}
function handleChangeWtf5({ file, fileList }) {
    if (file.status == 'done' || file.status == 'success') {
          fileList.forEach((item) => {
              if (item.uid !== file.uid) return;
              if (file.response.success) {
                  let data = toFileList([file.response.result || {}])[0];
                  item.uid = data.uid;
                  item.path = data.path;
                  item.url = data.url;
                  item.thumbUrl = data.thumbUrl;
              } else {
                  let msg = item.response.message || '', sqlMark = 'java.sql.SQLException: ';
                  if (0 <= msg.indexOf(sqlMark)) msg = msg.substring(msg.lastIndexOf(sqlMark) + sqlMark.length);
                  item.status = 'error';
                  item.error = { statusText: msg };
              }
          });
      } else fileListWtf5.value = fileList;
}
function handleChangeWtf6({ file, fileList }) {
    if (file.status == 'done' || file.status == 'success') {
          fileList.forEach((item) => {
              if (item.uid !== file.uid) return;
              if (file.response.success) {
                  let data = toFileList([file.response.result || {}])[0];
                  item.uid = data.uid;
                  item.path = data.path;
                  item.url = data.url;
                  item.thumbUrl = data.thumbUrl;
              } else {
                  let msg = item.response.message || '', sqlMark = 'java.sql.SQLException: ';
                  if (0 <= msg.indexOf(sqlMark)) msg = msg.substring(msg.lastIndexOf(sqlMark) + sqlMark.length);
                  item.status = 'error';
                  item.error = { statusText: msg };
              }
          });
      } else fileListWtf6.value = fileList;
}
function handleChangeWtf7({ file, fileList }) {
    if (file.status == 'done' || file.status == 'success') {
          fileList.forEach((item) => {
              if (item.uid !== file.uid) return;
              if (file.response.success) {
                  let data = toFileList([file.response.result || {}])[0];
                  item.uid = data.uid;
                  item.path = data.path;
                  item.url = data.url;
                  item.thumbUrl = data.thumbUrl;
              } else {
                  let msg = item.response.message || '', sqlMark = 'java.sql.SQLException: ';
                  if (0 <= msg.indexOf(sqlMark)) msg = msg.substring(msg.lastIndexOf(sqlMark) + sqlMark.length);
                  item.status = 'error';
                  item.error = { statusText: msg };
              }
          });
      } else fileListWtf7.value = fileList;
}
function handleChangeWtf8({ file, fileList }) {
    if (file.status == 'done' || file.status == 'success') {
          fileList.forEach((item) => {
              if (item.uid !== file.uid) return;
              if (file.response.success) {
                  let data = toFileList([file.response.result || {}])[0];
                  item.uid = data.uid;
                  item.path = data.path;
                  item.url = data.url;
                  item.thumbUrl = data.thumbUrl;
              } else {
                  let msg = item.response.message || '', sqlMark = 'java.sql.SQLException: ';
                  if (0 <= msg.indexOf(sqlMark)) msg = msg.substring(msg.lastIndexOf(sqlMark) + sqlMark.length);
                  item.status = 'error';
                  item.error = { statusText: msg };
              }
          });
      } else fileListWtf8.value = fileList;
}
function handleChangeStf1({ file, fileList }) {
    if (file.status == 'done' || file.status == 'success') {
          fileList.forEach((item) => {
              if (item.uid !== file.uid) return;
              if (file.response.success) {
                  let data = toFileList([file.response.result || {}])[0];
                  item.uid = data.uid;
                  item.path = data.path;
                  item.url = data.url;
                  item.thumbUrl = data.thumbUrl;
              } else {
                  let msg = item.response.message || '', sqlMark = 'java.sql.SQLException: ';
                  if (0 <= msg.indexOf(sqlMark)) msg = msg.substring(msg.lastIndexOf(sqlMark) + sqlMark.length);
                  item.status = 'error';
                  item.error = { statusText: msg };
              }
          });
      } else fileListStf1.value = fileList;
}
function handleChangeStf2({ file, fileList }) {
    if (file.status == 'done' || file.status == 'success') {
          fileList.forEach((item) => {
              if (item.uid !== file.uid) return;
              if (file.response.success) {
                  let data = toFileList([file.response.result || {}])[0];
                  item.uid = data.uid;
                  item.path = data.path;
                  item.url = data.url;
                  item.thumbUrl = data.thumbUrl;
              } else {
                  let msg = item.response.message || '', sqlMark = 'java.sql.SQLException: ';
                  if (0 <= msg.indexOf(sqlMark)) msg = msg.substring(msg.lastIndexOf(sqlMark) + sqlMark.length);
                  item.status = 'error';
                  item.error = { statusText: msg };
              }
          });
      } else fileListStf2.value = fileList;
}
async function loadFileListWtf1() {
    if(bisId.value != null && bisId.value != undefined) {
    var data = await getFileList({bisId: bisId.value,category: categoryWtf1.value});
    fileListWtf1.value = toFileList(data || []);
    }
}
async function loadFileListWtf2() {
    if(bisId.value != null && bisId.value != undefined) {
    var data = await getFileList({bisId: bisId.value,category: categoryWtf2.value});
    fileListWtf2.value = toFileList(data || []);
    }
}
async function loadFileListWtf3() {
    if(bisId.value != null && bisId.value != undefined) {
    var data = await getFileList({bisId: bisId.value,category: categoryWtf3.value});
    fileListWtf3.value = toFileList(data || []);
    }
}
async function loadFileListWtf4() {
    if(bisId.value != null && bisId.value != undefined) {
    var data = await getFileList({bisId: bisId.value,category: categoryWtf4.value});
    fileListWtf4.value = toFileList(data || []);
    }
}
async function loadFileListWtf5() {
    if(bisId.value != null && bisId.value != undefined) {
    var data = await getFileList({bisId: bisId.value,category: categoryWtf5.value});
    fileListWtf5.value = toFileList(data || []);
    }
}
async function loadFileListWtf6() {
    if(bisId.value != null && bisId.value != undefined) {
    var data = await getFileList({bisId: bisId.value,category: categoryWtf6.value});
    fileListWtf6.value = toFileList(data || []);
    }
}
async function loadFileListWtf7() {
    if(bisId.value != null && bisId.value != undefined) {
    var data = await getFileList({bisId: bisId.value,category: categoryWtf7.value});
    fileListWtf7.value = toFileList(data || []);
    }
}
async function loadFileListWtf8() {
    if(bisId.value != null && bisId.value != undefined) {
    var data = await getFileList({bisId: bisId.value,category: categoryWtf8.value});
    fileListWtf8.value = toFileList(data || []);
    }
}

async function loadFileListStf1() {
    if(bisId.value != null && bisId.value != undefined) {
    var data = await getFileList({bisId: bisId.value,category: categoryStf1.value});
    fileListStf1.value = toFileList(data || []);
    }
}
async function loadFileListStf2() {
    if(bisId.value != null && bisId.value != undefined) {
    var data = await getFileList({bisId: bisId.value,category: categoryStf2.value});
    fileListStf2.value = toFileList(data || []);
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

    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    //表单配置
    const [registerForm, {resetFields, setFieldsValue, validate}] = useForm({
        schemas: formSchema,
        showAdvancedButton: false,
        showActionButtonGroup: false,
        baseColProps: { span: 12 },
        labelWidth: '200px',
        autoFocusFirstItem: true,
        wrapperCol: { span: 14 }
    });
    //表单赋值
    const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
        //重置表单
        await resetFields();
        setModalProps({confirmLoading: false,showCancelBtn:data?.showFooter,showOkBtn:data?.showFooter});
        isUpdate.value = !!data?.isUpdate;
        debugger
        bisId.value = data.record.id;
        if (true) {
            //表单赋值
            await setFieldsValue({
                ...data.record,
            });
        }
    });
    //设置标题
    const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
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
.panel {
    padding-bottom: 10px; 
    border-top: 2px solid #f6c8c8;
    //border-bottom: 2px solid #f6c8c8;
    padding: 10px;
    margin: 10px 0;
}
</style>