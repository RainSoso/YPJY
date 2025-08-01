<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="90%">
    <template #title>
      <BasicTitle class="items-center">
        <div>查看监督检查记录</div>
        <a-dropdown class="ml-4" v-if="hasPermission('jgyw:jdjc:tsData')">
          <a class="ant-dropdown-link text-xs" @click.prevent>
            <span>特殊数据 </span>
            <a-icon icon="ant-design:down-outlined" :style="{ fontSize: '10px' }" />
          </a>
          <template #overlay>
            <a-menu @click="saveTsData">
              <a-menu-item v-for="item in TsDataArray" :key="item.value">
                <a-checkbox :checked="FormData.tsData == item.value">{{ item.label }}</a-checkbox>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </BasicTitle>
    </template>

    <h2>【监管检查结果信息】</h2>
    <table class="my-table mb-2">
      <colgroup>
        <col style="width:180px;" />
        <col />
        <col style="width:180px;" />
        <col />
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">监管表单名称</td>
        <td>{{ FormData.jgbdmc }}</td>
        <td class="text-blue font-600 text-right">监管类别</td>
        <td>{{ FormData.jglbbh && filterDictTextByCache('jdjcJglb', FormData.jglbbh) || FormData.jglbbh }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">企业名称</td>
        <td>{{ FormData.qymc }}</td>
        <td class="text-blue font-600 text-right">检查人</td>
        <td>{{ FormData.jcr }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">检查时间</td>
        <td>{{ FormData.jcsj && formatToDate1(FormData.jcsj) }}</td>
        <td class="text-blue font-600 text-right">得分</td>
        <td>{{ FormData.df }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">备注</td>
        <td colspan="3">{{ FormData.bz }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">检查单位名称</td>
        <td>{{ FormData.jcdwmc }}</td>
        <td class="text-blue font-600 text-right">综合评定结论</td>
        <td>{{ FormData.zhpdjl && filterDictTextByCache('jdjcZhpdjl', FormData.zhpdjl) || FormData.zhpdjl }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">检查报告正文附件</td>
        <td colspan="3" style="white-space:pre-wrap;">
          <div v-for="(item, idx) in attach(FormData.jcbgzw)" :key="idx">
            <a-button type="link" @click="toDownload(item)">下载</a-button>
            <a-button type="link" @click="toPreview(item)">{{ item[0] }}</a-button>
          </div>
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">药品检查综合评定报告书</td>
        <td colspan="3" style="white-space:pre-wrap;">
          <div v-for="(item, idx) in attach(FormData.zhpdbg)" :key="idx">
            <a-button type="link" @click="toDownload(item)">下载</a-button>
            <a-button type="link" @click="toPreview(item)">{{ item[0] }}</a-button>
          </div>
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">整改报告</td>
        <td colspan="3" style="white-space:pre-wrap;">
          <div v-for="(item, idx) in attach(FormData.localZgbg)" :key="idx">
            <a-button type="link" @click="toDownload(item)">下载</a-button>
            <a-button type="link" @click="toPreview(item)">{{ item[0] }}</a-button>
          </div>
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">药品品种</td>
        <td colspan="3">
          <table class="my-table !table-auto">
            <tbody>
              <tr v-for="(item, idx) in YppzArray" :key="idx">
                <td class="text-center">{{ item.yppzwh }}</td>
                <td class="text-center">{{ item.yptymc }}</td>
                <td class="text-center">{{ item.ypgg }}</td>
                <td class="text-center">{{ item.bzjx }}</td>
                <td v-if="hasPermission('jgyw:jdjc:pz')" style="width:80px;text-align:center">
                  <a-popconfirm :title="'是否删除 ' + item.yppzwh + ' ？'" ok-text="确定" cancel-text="取消"
                    @confirm="toDelYppz(item)">
                    <a-button danger>删除</a-button>
                  </a-popconfirm>
                </td>
              </tr>
            </tbody>
          </table>
          <div :class="YppzArray.length && 'mt-8px' || ''">
            <a-button @click="toAddYppz" v-if="hasPermission('jgyw:jdjc:pz')">添加</a-button>
          </div>
        </td>
      </tr>
    </table>
    <h2>【检查对象相关信息】</h2>
    <table class="my-table mb-2">
      <colgroup>
        <col style="width:180px;" />
        <col />
        <col style="width:180px;" />
        <col />
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">行政相对人名称</td>
        <td colspan="3">{{ FormData.qymc }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">行政相对人性质</td>
        <td>{{ FormData.xzxdrxz == '2' ? '法人' : FormData.xzxdrxz}}</td>
        <td class="text-blue font-600 text-right">行政相对人证件类型</td>
        <td>{{ FormData.xzxdrzjlx == '001' ? '统一社会信用代码' : FormData.xzxdrzjlx}}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">注册地址</td>
        <td>{{ FormData.zcdz }}</td>
        <td class="text-blue font-600 text-right">行政相对人编码</td>
        <td>{{ FormData.shxydm }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">药品上市许可持有人联系人</td>
        <td>{{ FormData.ypssxklxr }}</td>
        <td class="text-blue font-600 text-right">药品上市许可持有人联系方式</td>
        <td>{{ FormData.ypssxklxrlxfs }}</td>
      </tr>
    </table>
    <table class="my-table">
      <colgroup>
        <col style="width:60px" />
        <col style="width:120px;" />
        <col style="width:150px;" />
        <col />
        <col />
        <col style="width:100px;" />
        <col style="width:90px;" />
      </colgroup>
      <thead>
        <tr>
          <td class="text-blue font-600 text-center">监管对象类型</td>
          <td class="text-blue font-600 text-center">监管对象</td>
          <td class="text-blue font-600 text-center">许可证号</td>
          <td class="text-blue font-600 text-center">生产地址</td>
          <td class="text-blue font-600 text-center">车间</td>
          <td class="text-blue font-600 text-center">生产线</td>
          <td class="text-blue font-600 text-center">药品类别</td>
          <td class="text-blue font-600 text-center">药品批准文号</td>
          <td class="text-blue font-600 text-center">延伸检查产品名称</td>
          <td class="text-blue font-600 text-center">生产批号</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in jgdxlist" :key="idx">
          <td class="text-center">{{ item.jgdxlx && filterDictTextByCache('jdjcJgdxLx', item.jgdxlx) }}</td>
          <td class="text-center">{{ item.jgdx }}</td>
          <td class="text-center">{{ item.xgzjxx }}</td>
          <td class="text-center">{{ item.szdq }}</td>
          <td class="text-center">{{ item.cj }}</td>
          <td class="text-center">{{ item.scx }}</td>
          <td class="text-center">{{ item.ypxl }}</td>
          <td class="text-center">{{ item.yppzwh }}</td>
          <td class="text-center">{{ item.cpmc }}</td>
          <td class="text-center">{{ item.scph }}</td>
        </tr>
      </tbody>
    </table>
    <h2>【检查实施机构信息】</h2>
    <table class="my-table mb-2">
      <colgroup>
        <col style="width:180px;" />
        <col />
        <col style="width:180px;" />
        <col />
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">实施机构</td>
        <td>{{ FormData.jcdwmc }}</td>
        <td class="text-blue font-600 text-right">实施机构编码</td>
        <td>{{ FormData.jcdwzzjgdm }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">受委托部门</td>
        <td>{{ FormData.swtbm }}</td>
        <td class="text-blue font-600 text-right">受委托部门编码</td>
        <td>{{ FormData.swtbmbm }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">联合检查部门</td>
        <td>{{ FormData.lhjcbm }}</td>
        <td class="text-blue font-600 text-right">联合检查部门编码</td>
        <td>{{ FormData.lhjcbmbm }}</td>
      </tr>
    </table>
    <h2>【检查行为】</h2>
    <table class="my-table mb-2">
      <colgroup>
        <col style="width:180px;" />
        <col />
        <col style="width:180px;" />
        <col />
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">检查行为名称</td>
        <td colspan="3">{{ FormData.jcxwmc }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">检查行为编号</td>
        <td colspan="3">{{ FormData.jcxwbh }}</td>
      </tr>
    </table>
    <h2>【检查情况】</h2>
    <table class="my-table mb-2">
      <colgroup>
        <col style="width:180px;" />
        <col />
        <col style="width:180px;" />
        <col />
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">检查形式</td>
        <td>{{ FormData.jcxs && getDictText('jdjcJcxs', FormData.jcxs) }}</td>
        <td class="text-blue font-600 text-right">检查类别</td>
        <td>{{ FormData.jclb && filterDictTextByCache('rcjgJclb', FormData.jclb)}}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">是否含GMP符合性检查(上市前)</td>
        <td>{{ FormData.sfhgpgssq && filterDictTextByCache('SFBZ-1', FormData.sfhgpgssq)}}</td>
        <td class="text-blue font-600 text-right">是否含GMP符合性检查(上市后)</td>
        <td>{{ FormData.sfhgpgssh && filterDictTextByCache('SFBZ-1', FormData.sfhgpgssh)}}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">检查方式</td>
        <td colspan="3">{{ FormData.jcfs && filterDictTextByCache('rcjgJclb', FormData.jcfs) }}</td>
        <!-- <td class="text-blue font-600 text-right">是否属于停产企业</td>
        <td>{{ FormData.tcqy }}</td> -->
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">检查基本情况</td>
        <td colspan="3">{{ FormData.jcjbqk }}</td>
      </tr>
    </table>
    <table class="my-table mb-2">
      <colgroup>
        <col style="width:110px" />
        <col/>
        <col/>
      </colgroup>
      <thead>
        <tr>
          <td class="text-blue font-600 text-center">缺陷类型</td>
          <td class="text-blue font-600 text-center">缺陷描述</td>
          <td class="text-blue font-600 text-center">缺陷依据</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in qxmsxxList" :key="idx">
          <td class="text-center">{{ item.qxlx && filterDictTextByCache('jdjcQxlx',item.qxlx)}}</td>
          <td class="text-center">{{ item.qxms }}</td>
          <td class="text-center">{{ item.qyxj }}</td>
        </tr>
      </tbody>
    </table>
    <table class="my-table mb-2">
      <colgroup>
        <col style="width:180px;" />
        <col />
        <col style="width:180px;" />
        <col />
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">严重缺陷数量</td>
        <td>{{ FormData.yzqxsl }}</td>
        <td class="text-blue font-600 text-right">主要缺陷数量</td>
        <td>{{ FormData.zyqxsl }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">一般缺陷数量</td>
        <td>{{ FormData.ybqxsl }}</td>
        <td class="text-blue font-600 text-right">未定义缺陷数量</td>
        <td>{{ FormData.wdyqxsl }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">检查结果(国办)</td>
        <td>{{ FormData.jcjggb && filterDictTextByCache('rcjgJcjgGb',FormData.jcjggb) }}</td>
        <td class="text-blue font-600 text-right">综合评定结论</td>
        <td>{{ FormData.zhpdjl && filterDictTextByCache('jdjcZhpdjl',FormData.zhpdjl)}}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">省局生产许可现场检查建议</td>
        <td>{{ FormData.jcjlSjscxkxcjcjy && filterDictTextByCache('rgjgxcJcjy',FormData.jcjlSjscxkxcjcjy)}}</td>
        <td class="text-blue font-600 text-right">省局监督检查结论</td>
        <td>{{ FormData.jcjlSjjdjcjl && getDictText('rcjgJdjcjl',FormData.jcjlSjjdjcjl)}}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">国家局核查中心监督检查结论</td>
        <td colspan="3">{{ FormData.jcjl }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">处理建议</td>
        <td colspan="3">{{ FormData.cljy }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">其他需要说明的问题</td>
        <td colspan="3">{{ FormData.qtxysmdwt }}</td>
      </tr>
    </table>
    <h2>【检查报送人员及时间】</h2>
    <table class="my-table mb-2">
      <colgroup>
        <col style="width:180px;" />
        <col />
        <col style="width:180px;" />
        <col />
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">检查开始时间</td>
        <td>{{ FormData.jcsj && formatToDate1(FormData.jcsj) }}</td>
        <td class="text-blue font-600 text-right">检查结束时间</td>
        <td>{{ FormData.jcsjjs }}</td>
      </tr>
    </table>
    <table class="my-table mb-2">
      <colgroup>
        <col style="width:60px" />
        <col style="width:180px;" />
        <col style="width:90px;" />
      </colgroup>
      <thead>
        <tr>
          <td class="text-blue font-600 text-center">检查人员类型</td>
          <td class="text-blue font-600 text-center">检查人员</td>
          <td class="text-blue font-600 text-center">执法证号</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in jcryxxList" :key="idx">
          <td class="text-center">{{ item.jcrylx && filterDictTextByCache('rcjgJcrlx',item.jcrylx) }}</td>
          <td class="text-center">{{ item.jcryxm }}</td>
          <td class="text-center">{{ item.jcryzfzbh }}</td>
        </tr>
      </tbody>
    </table>
    <table class="my-table mb-2">
      <colgroup>
        <col style="width:180px;" />
        <col />
        <col style="width:180px;" />
        <col />
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">报送人员</td>
        <td>{{ FormData.bsry }}</td>
        <td class="text-blue font-600 text-right">报送时间</td>
        <td>{{ FormData.bssj }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">报送人员联系方式</td>
        <td colspan="3">{{ FormData.bsrlxfc }}</td>
      </tr>
    </table>
    <h2>【其他】</h2>
    <table class="my-table mb-2">
      <colgroup>
        <col style="width:180px;" />
        <col />
        <col style="width:180px;" />
        <col />
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">备注</td>
        <td colspan="3">{{ FormData.bz }}</td>
      </tr>
      <!-- <tr>
        <td class="text-blue font-600 text-right">检查报告正文附件</td>
        <td colspan="3" style="white-space:pre-wrap;">
          <div v-for="(item, idx) in attach(FormData.jcbgzw)" :key="idx">
            <a-button type="link" @click="toDownload(item)">下载</a-button>
            <a-button type="link" @click="toPreview(item)">{{ item[0] }}</a-button>
          </div>
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">药品检查综合评定报告书</td>
        <td colspan="3" style="white-space:pre-wrap;">
          <div v-for="(item, idx) in attach(FormData.zhpdbg)" :key="idx">
            <a-button type="link" @click="toDownload(item)">下载</a-button>
            <a-button type="link" @click="toPreview(item)">{{ item[0] }}</a-button>
          </div>
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">整改报告</td>
        <td colspan="3" style="white-space:pre-wrap;">
          <div v-for="(item, idx) in attach(FormData.localZgbg)" :key="idx">
            <a-button type="link" @click="toDownload(item)">下载</a-button>
            <a-button type="link" @click="toPreview(item)">{{ item[0] }}</a-button>
          </div>
        </td>
      </tr> -->
      <tr>
        <td class="text-blue font-600 text-right">其他附加材料</td>
        <td colspan="3" style="white-space:pre-wrap;">
          <div v-for="(item, idx) in attach(FormData.qtfjcl)" :key="idx">
            <a-button type="link" @click="toDownload(item)">下载</a-button>
            <a-button type="link" @click="toPreview(item)">{{ item[0] }}</a-button>
          </div>
        </td>
      </tr>
    </table>
  </BasicModal>
  <JcPzSelectModal @register="regModal" @getSelectResult="doAddYppz" :params="selectYppzParams"></JcPzSelectModal>
</template>

<script lang="ts" setup>
import { ref, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { filterDictTextByCache,getDictText } from '/@/utils/dict/JDictSelectUtil';
import { formatToDate } from '/@/utils/dateUtil';
import { downloadByUrl } from '/@/utils/file/download';
import { getAppEnvConfig } from '/@/utils/env';
import { usePermission } from '/@/hooks/web/usePermission';
import Tools from '/@/utils/tools';
import { useModal } from '/@/components/Modal';
import { getYppzListByJdjcId, addYppz, delYppz, setTsData, loadDeatils } from '/@/views/ypsczhjg/yw/rcjg/TYwRcjgJgjg.api';
import JcPzSelectModal from '/@/views/ypsczhjg/jc/pz/modal/JcPzSelectModal.vue';
import { BasicTitle } from '/@/components/Basic';
import { getDictItems } from '/@/utils/dict/JDictSelectUtil';

const { hasPermission } = usePermission();
const [regModal, { openModal }] = useModal();
const formatToDate1 = formatToDate;
const { VITE_GLOB_DOMAIN_URL } = getAppEnvConfig();

const TsDataArray = ref([]);
const jgdxlist = ref([]);
const qxmsxxList = ref([]);
const jcryxxList = ref([]);
getDictItems('ts_data').then((res) => {
  TsDataArray.value = res;
});

const FormData = ref({});
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
  setModalProps({ confirmLoading: false, width: '80%', footer: null });
  getYppzListByJdjcId(data.record?.id).then((res) => {
    YppzArray.value = res;
  });
  loadDeatils({ id: data.record?.id}).then((res) => {
    FormData.value = res.data;
    jgdxlist.value = res.jgdxlist;
    qxmsxxList.value = res.qxmsxxList;
    jcryxxList.value = res.jcryxxList;
  });
});

function saveTsData(e) {
  Tools.debounce(async () => {
    if (FormData.value.tsData == e.key)
      FormData.value.tsData = '';
    else FormData.value.tsData = e.key;
    await setTsData(FormData.value.id, FormData.value.tsData);
  });
}

function handleSubmit() {
  //关闭弹窗
  closeModal();
}
function attach(item) {
  let array: any = [];
  (item || '').split(';').forEach(str => {
    if (str) {
      let idx = str.lastIndexOf(',');
      if (0 > idx) array.push([str, str]);
      else array.push([str.substring(0, idx), str.substring(idx + 1)]);
    }
  });;
  return array;
}
function toPreview(item) {
  let url = Tools.getAppInnerUrl() + '/ypsc-api/sys/common/static' + sfparam(item[1]) + "?filename=" + item[0];
  Tools.toPreview(url);
}
function toDownload(item) {
  downloadByUrl({
    url: VITE_GLOB_DOMAIN_URL + '/sys/common/static'+ sfparam(item[1]) + "?filename=" + item[0],
    fileName: item[0],
    target: '_blank',
  });
}

const YppzArray = ref([]);
const selectYppzParams = ref({ shxydm: '', qymc: '' });
function toAddYppz() {
  selectYppzParams.value.shxydm = FormData.value?.shxydm;
  openModal(true, {});
}
async function doAddYppz(res) {
  YppzArray.value = await addYppz(FormData.value?.id, res.map(item => item.value));
}
function toDelYppz(item) {
  delYppz({ id: FormData.value?.id, pzwh: item.yppzwh }, (res) => {
    YppzArray.value = res;
  });
}
function sfparam(item){
  if(!/^\/.*/ig.test(item)){
    return '/'+item;
  }else{
    return item;
  }
   
}
</script>

<style lang="less" scoped>

</style>
