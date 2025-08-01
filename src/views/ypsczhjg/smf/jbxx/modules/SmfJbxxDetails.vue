<template>
  <div class="page">
    <PageWrapper class="title-center" :contentStyle="{ padding: '0 16px 16px 16px' }" contentBackground>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">生产场地基本信息</div>
      <table class="my-table" style="table-layout: fixed">
        <colgroup>
          <col style="width:10%" />
          <col />
          <col style="width:20%" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td class="text-blue font-600 text-right">统一社会信用代码</td>
            <td>{{ Info.shxydm }}</td>
            <td class="text-blue font-600 text-right">企业名称</td>
            <td>{{ Info.qymc }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">注册地址</td>
            <td>{{ Info.zcdz }}</td>
            <td class="text-blue font-600 text-right">生产地址</td>
            <td>{{ Info.address }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">场地名称</td>
            <td>{{ Info.name }}</td>
            <td class="text-blue font-600 text-right">本生产地址的生产范围</td>
            <td>{{ Info.scfw }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">场地质量负责人</td>
            <td>{{ Info.cdZlfzr }}</td>
            <td class="text-blue font-600 text-right">本生产场地联系人</td>
            <td>{{ Info.lxr }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">本生产场地联系方式</td>
            <td colspan="3">{{ Info.lxfs }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">其他生产活动</td>
            <td colspan="3">{{ Info.qtschd }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">近5年生产场地受到监督管理部门处罚情况</td>
            <td colspan="3">{{ Info.cfqk }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">质量管理体系</td>
            <td colspan="3"><p v-html="Info.zlgltx"></p></td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">人员情况描述</td>
            <td colspan="3">{{ Info.ryqk }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">组织结构图</td>
            <td colspan="3">
              <MUpload :bisId="Info.id" :disabled="true" :download="true" category="组织机构图" source="药品场地管理文件-组织机构图"/>
              <!-- <a-button @click="openImg" type="primary">点击预览图片</a-button> -->
              </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">生产场地厂房情况</td>
            <td colspan="3"> {{ Info.cdcfqk }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">生产场地设备情况</td>
            <td colspan="3"> {{ Info.cdsbqk }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">文件系统情况</td>
            <td colspan="3"> {{ Info.wjxtqk }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">生产情况描述</td>
            <td colspan="3"> {{ Info.scqk }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">质量控制信息</td>
            <td colspan="3">
              <MUpload :bisId="Info.id" :disabled="true" :download="true" category="质量控制文件" source="药品场地管理文件-质量控制"/>
               <!-- {{ Info.zlkzqk }} -->
              </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">发运、投诉与召回描述</td>
            <td colspan="3"> {{ Info.fytszhqk }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">自检描述</td>
            <td colspan="3"> {{ Info.zjms }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">备注</td>
            <td colspan="3"> {{ Info.remarks }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">全部修订内容的概述</td>
            <td colspan="3"> {{ Info.xdnrgs }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">文件编号</td>
            <td> {{ Info.wjbh }}</td>
            <td class="text-blue font-600 text-right">版本</td>
            <td> {{ Info.version }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">生效时间</td>
            <td> {{ Info.bgnDate && formatToDate(Info.bgnDate) || '' }}</td>
            <td class="text-blue font-600 text-right">失效时间</td>
            <td> {{ Info.endDate && formatToDate(Info.endDate) || '' }}</td>
          </tr>
        </tbody>
      </table>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">人员信息</div>
      <table class="my-table">
        <tr>
          <td class="text-blue font-600 text-center" width="50px">序号</td>
          <td class="text-blue font-600 text-center" width="100px">姓名</td>
          <td class="text-blue font-600 text-center" width="180px">身份证号码</td>
          <td class="text-blue font-600 text-center" width="120px">岗位</td>
          <td class="text-blue font-600 text-center">关键岗位(质量保证、生产控制、质量控制、储存及发运)</td>
          <td class="text-blue font-600 text-center" width="90px">学历</td>
          <td class="text-blue font-600 text-center">其他证书</td>
          <td class="text-blue font-600 text-center">备注</td>
          <td class="text-blue font-600 text-center" width="70px">状态</td>
          <td class="text-blue font-600 text-center" width="90px">入职时间</td>
          <td class="text-blue font-600 text-center" width="90px">离职时间</td>
          <td class="text-blue font-600 text-center">离职原因</td>
        </tr>
        <tbody>
          <tr align="center" v-for="(item, idx) in Data.userList" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.userName }}</td>
            <td>{{ item.idCard }}</td>
            <td>{{ item.position }}</td>
            <td>{{ item.keyPosition }}</td>
            <td>{{ item.education }}</td>
            <td>{{ item.certs }}</td>
            <td>{{ item.remarks }}</td>
            <td>{{ item.state == '1' ? "在职" : "离职" }}</td>
            <td>{{ formatToDate(item.joinDate) }}</td>
            <td>{{ formatToDate(item.leaveDate) }}</td>
            <td>{{ item.leaveReason }}</td>
          </tr>
          <tr v-if="!Data.userList || 1 > Data.userList.length">
            <td colspan="12" align="center">暂无</td>
          </tr>
        </tbody>
      </table>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">生产车间及生产线</div>
      <table class="my-table">
        <tr>
          <td class="text-blue font-600 text-center" width="50px"> 序号</td>
          <td class="text-blue font-600 text-center" width="150px">生产车间/生产线 </td>
          <td class="text-blue font-600 text-center">位置 </td>
          <td class="text-blue font-600 text-center">剂型 </td>
          <td class="text-blue font-600 text-center">投入使用时间</td>
          <td class="text-blue font-600 text-center">生产品种 </td>
          <td class="text-blue font-600 text-center">备注</td>
        </tr>
        <tbody>
          <tr align="center" v-for="(item, idx) in Data.sccjcxList" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.jx }}</td>
            <td>{{ item.trsysj }}</td>
            <td>{{ item.scpz }}</td>
            <td>{{ item.remarks }}</td>
          </tr>
          <tr v-if="!Data.sccjcxList || 1 > Data.sccjcxList.length">
            <td colspan="7" align="center">暂无</td>
          </tr>
        </tbody>
      </table>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">生产药品品种</div>
      <table class="my-table">
        <tr>
          <td class="text-blue font-600 text-center" width="130px">生产车间/生产线（剂型）</td>
          <td class="text-blue font-600 text-center" width="50px"> 序号</td>
          <td class="text-blue font-600 text-center">批准文号</td>
          <td class="text-blue font-600 text-center">品种名称</td>
          <td class="text-blue font-600 text-center">规格</td>
          <td class="text-blue font-600 text-center">获批情况（已有批准文号、受托加工品种、仅供出口品种、在研品种）</td>
          <td class="text-blue font-600 text-center">首次生产时间</td>
          <td class="text-blue font-600 text-center">生产场地变更时间</td>
          <td class="text-blue font-600 text-center">是否为全部生产活动，如不是应说明具体的生产活动内容</td>
          <td class="text-blue font-600 text-center">是否为高毒性、高致敏性、高活性品种</td>
          <td class="text-blue font-600 text-center">备注</td>
        </tr>
        <tbody>
          <tr align="center" v-for="(item, idx) in Data.cjpzList" :key="idx">
            <td>{{ item.name }}</td>
            <td>{{ idx + 1 }}</td>
            <td>{{ item.YPPZWH }}</td>
            <td>{{ item.YPTYMC }}</td>
            <td>{{ item.YPGG }}</td>
            <td>{{ item.HPQK }}</td>
            <td>{{ formatToDate(item.SCSCSJ) }}</td>
            <td>{{ formatToDate(item.SCCDBGSJ) }}</td>
            <td>{{ item.SCHDNR }}</td>
            <td>{{ filterDictTextByCache('yes_no', item.TSPZ) }}</td>
            <td>{{ item.REMARKS }}</td>
          </tr>
          <tr v-if="!Data.cjpzList || 1 > Data.cjpzList.length">
            <td colspan="11" align="center">暂无</td>
          </tr>
        </tbody>
      </table>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">生产场地高毒性、高致敏性、高活性品种</div>
      <table class="my-table">
        <tr>
          <td class="text-blue font-600 text-center" width="130px">生产车间/生产线（剂型）</td>
          <td class="text-blue font-600 text-center" width="50px"> 序号</td>
          <td class="text-blue font-600 text-center">批准文号</td>
          <td class="text-blue font-600 text-center">品种名称</td>
          <td class="text-blue font-600 text-center">规格</td>
          <td class="text-blue font-600 text-center">类型（高毒性、高致敏性、高活性）</td>
          <td class="text-blue font-600 text-center">专用设施情况</td>
          <td class="text-blue font-600 text-center">阶段生产情况</td>
          <td class="text-blue font-600 text-center">备注</td>
        </tr>
        <tbody>
          <tr align="center" v-for="(item, idx) in Data.cjtspzList" :key="idx">
            <td>{{ item.name }}</td>
            <td>{{ idx + 1 }}</td>
            <td>{{ item.YPPZWH }}</td>
            <td>{{ item.YPTYMC }}</td>
            <td>{{ item.YPGG }}</td>
            <td>{{ getDictText('smfTspzLx', item.TSPZ_LX.split(',')) }}</td>
            <td>{{ item.TSPZ_ZYSSQK }}</td>
            <td>{{ item.TSPZ_JDSCQK }}</td>
            <td>{{ item.REMARKS }}</td>
          </tr>
          <tr v-if="!Data.cjtspzList || 1 > Data.cjtspzList.length">
            <td colspan="9" align="center">暂无</td>
          </tr>
        </tbody>
      </table>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">厂房建筑物信息</div>
      <table class="my-table">
        <tr>
          <td class="text-blue font-600 text-center" width="50px"> 序号</td>
          <td class="text-blue font-600 text-center"> 建筑物名称</td>
          <td class="text-blue font-600 text-center"> 投入使用时间</td>
          <td class="text-blue font-600 text-center"> 建筑面积</td>
          <td class="text-blue font-600 text-center"> 功能区划</td>
          <td class="text-blue font-600 text-center"> 备注</td>
        </tr>
        <tbody>
          <tr align="center" v-for="(item, idx) in Data.buildingsList" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ formatToDate(item.trsysj) }}</td>
            <td>{{ item.jzmj }}</td>
            <td>{{ item.gnqh }}</td>
            <td>{{ item.remarks }}</td>
          </tr>
          <tr v-if="!Data.buildingsList || 1 > Data.buildingsList.length">
            <td colspan="6" align="center">暂无</td>
          </tr>
        </tbody>
      </table>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">生产场地关键设备</div>
      <table class="my-table">
        <tr>
          <td class="text-blue font-600 text-center" width="130px">生产车间/生产线（剂型）</td>
          <td class="text-blue font-600 text-center" width="50px"> 序号</td>
          <td class="text-blue font-600 text-center">设备名称</td>
          <td class="text-blue font-600 text-center">规格/型号</td>
          <td class="text-blue font-600 text-center">设备编号</td>
          <td class="text-blue font-600 text-center" width="110px">首次安装时间</td>
          <td class="text-blue font-600 text-center" width="110px">变更位置时间</td>
          <td class="text-blue font-600 text-center">生产品种</td>
          <td class="text-blue font-600 text-center">备注</td>
        </tr>
        <tbody>
          <tr align="center" v-for="(item, idx) in Data.cjsbList" :key="idx">
            <td>{{ item.cjmc }}</td>
            <td>{{ idx + 1 }}</td>
            <td>{{ item.NAME }}</td>
            <td>{{ item.GG }}</td>
            <td>{{ item.SBBH }}</td>
            <td>{{ formatToDate(item.FIRST_DATE) }}</td>
            <td>{{ formatToDate(item.CHANGE_DATE) }}</td>
            <td>{{ item.SCPZ }}</td>
            <td>{{ item.REMARKS }}</td>
          </tr>
          <tr v-if="!Data.cjsbList || 1 > Data.cjsbList.length">
            <td colspan="9" align="center">暂无</td>
          </tr>
        </tbody>
      </table>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">生产场地接受现场检查情况</div>
      <table class="my-table">
        <tr>
          <td class="text-blue font-600 text-center" width="50px"> 序号</td>
          <td class="text-blue font-600 text-center" width="100px">检查时间</td>
          <td class="text-blue font-600 text-center" width="150px">监管机构名称</td>
          <td class="text-blue font-600 text-center" width="120px">检查范围</td>
          <td class="text-blue font-600 text-center" width="150px">检查形式</td>
          <td class="text-blue font-600 text-center" width="400px">严重缺陷情况</td>
          <td class="text-blue font-600 text-center" width="400px">主要缺陷情况</td>
          <td class="text-blue font-600 text-center">备注</td>
        </tr>
        <tbody>
          <tr align="center" v-for="(item, idx) in Data.jdjcList" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ formatToDate(item.jcsj) }}</td>
            <td>{{ item.jcjgmc }}</td>
            <td>{{ item.jcfw }}</td>
            <td>{{ item.jcxs }}</td>
            <td>{{ item.yzqxqk }}</td>
            <td>{{ item.zyqxqk }}</td>
            <td>{{ item.remarks }}</td>
          </tr>
          <tr v-if="!Data.jdjcList || 1 > Data.jdjcList.length">
            <td colspan="8" align="center">暂无</td>
          </tr>
        </tbody>
      </table>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">生产场地药品抽验情况</div>
      <table class="my-table">
        <tr>
          <td class="text-blue font-600 text-center" width="50px"> 序号</td>
          <td class="text-blue font-600 text-center">批准文号</td>
          <td class="text-blue font-600 text-center">通用名称</td>
          <td class="text-blue font-600 text-center">抽样时间</td>
          <td class="text-blue font-600 text-center">抽验单位</td>
          <td class="text-blue font-600 text-center">抽验类型</td>
          <td class="text-blue font-600 text-center">抽验项目</td>
          <td class="text-blue font-600 text-center">抽验结果</td>
          <td class="text-blue font-600 text-center">备注</td>
        </tr>
        <tbody>
          <tr align="center" v-for="(item, idx) in Data.cjyList" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.yppzwh }}</td>
            <td>{{ item.yptymc }}</td>
            <td>{{ formatToDate(item.cysj) }}</td>
            <td>{{ item.cydwmc }}</td>
            <td>{{ item.cylx }}</td>
            <td>{{ item.cyxm }}</td>
            <td>{{ item.cyjg }}</td>
            <td>{{ item.remarks }}</td>
          </tr>
          <tr v-if="!Data.cjyList || 1 > Data.cjyList.length">
            <td colspan="9" align="center">暂无</td>
          </tr>
        </tbody>
      </table>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">外存文件信息</div>
      <table class="my-table">
        <tr>
          <td class="text-blue font-600 text-center" width="50px"> 序号</td>
          <td class="text-blue font-600 text-center">文件名称</td>
          <td class="text-blue font-600 text-center">储存场所名称</td>
          <td class="text-blue font-600 text-center">地址</td>
          <td class="text-blue font-600 text-center">取回文件所需的时间</td>
          <td class="text-blue font-600 text-center">备注</td>
        </tr>
        <tbody>
          <tr align="center" v-for="(item, idx) in Data.smfFiles" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.csmc }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.qhsxsj }}</td>
            <td>{{ item.remarks }}</td>
          </tr>
          <tr v-if="!Data.smfFiles || 1 > Data.smfFiles.length">
            <td colspan="6" align="center">暂无</td>
          </tr>
        </tbody>
      </table>
    </PageWrapper>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref} from 'vue';
import { FormSchema, useForm, BasicForm } from '/@/components/Form'
import { JUploadModal } from '/@/components/Form/src/jeecg/components/JUpload';
import { createImgPreview, ImagePreview } from '/@/components/Preview/index';
import { PageWrapper } from '/@/components/Page';
import { formatToDate } from '/@/utils/dateUtil';
import { useRoute } from 'vue-router';
import { queryById } from '../SmfJbxx.api';
import { filterDictTextByCache, getDictText } from '/@/utils/dict/JDictSelectUtil';
import { getFileAccessHttpUrl, getRandom } from '/@/utils/common/compUtils';
import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';
export default defineComponent({
  components: { PageWrapper, JUploadModal, BasicForm ,ImagePreview,MUpload},
  setup() {
    const route = useRoute();
    const Info = ref({});
    const Data = ref({});
    const id = ref(route.query?.id);
    const imgList: string[] = [];
    queryById({ id: id.value }).then((res) => {
      Info.value = res.data;
      Data.value = res;
      for(const i of res.data.zzjgt.split(',')) {
        imgList.push(getFileAccessHttpUrl(i));
      }
      // res.data.zzjgt.split(',').forEach((item) => {
      // imgList.push(item)
      // });
      
     
      
    }).catch(() => {
      console.log(arguments);
    });
    
    function openImg() {
        const onImgLoad = ({ index, url, dom }) => {
          console.log(`第${index + 1}张图片已加载，URL为：${url}`, dom);
        };
        createImgPreview({ imageList: imgList, defaultWidth: 700, rememberState: true, onImgLoad });
      }
    

    return {
      id,
      Info,
      Data,
      formatToDate,
      filterDictTextByCache,
      getDictText,
      imgList,
      openImg,
      getFileAccessHttpUrl,
    };
  }
});
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
</style>
