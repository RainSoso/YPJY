<template>
  <div class="text-black font-900 text-left my-4" style="font-size:120%">
    1.企业总体情况
  </div>
  <table class="my-table">
    <colgroup>
      <col style="width:10%" />
      <col />
      <col style="width:20%" />
      <col />
    </colgroup>
    <tbody>
      <tr>
        <td class="text-blue font-600 text-right">企业名称</td>
        <td>{{ cdwjData.qymc }}</td>
        <td class="text-blue font-600 text-right">统一社会信用代码</td>
        <td>{{ cdwjData.shxydm }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">注册地址</td>
        <td>{{ cdwjData.zcdz }}</td>
        <td class="text-blue font-600 text-right">经营地址</td>
        <td>{{ cdwjData.jydz }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">仓库地址</td>
        <td>{{ cdwjData.ckdz }}</td>
        <td class="text-blue font-600 text-right">场地文件编码</td>
        <td>{{ cdwjData.wjbm }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">联系人</td>
        <td>{{ cdwjData.lxr }}</td>
        <td class="text-blue font-600 text-right">联系电话</td>
        <td>{{ cdwjData.lxdh }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">修订日期</td>
        <td>{{ cdwjData.xdzq }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">法定代表人</td>
        <td>{{ cdwjData.fddbr }}</td>
        <td class="text-blue font-600 text-right">企业负责人</td>
        <td>{{ cdwjData.qyfzr }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">质量负责人</td>
        <td>{{ cdwjData.zlfzr }}</td>
      </tr>
      <b>附件</b>
      <!-- <tr>
        <td colspan="4">
          <table class="my-table">
            <thead>
            <tr>
              <th>参与药品经营活动企业的质量管理体系</th>
              <th>仓库和设施设备</th>
              <th>采购、验收、储存、养护、销售、运输</th>
              <th>自检和外部审核</th>
              <th>特殊药品管理情况</th>
              <th>其他信息</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in fileList" :key="index">
              <td >
              </td>
              <td ></td>
              <td ></td>
              <td ></td>
              <td ></td>
              <td ></td>
             
            </tr>
            </tbody>
          </table>
        </td>
      </tr> -->
      <tr v-for="(item, index) in fileList" :key="index">
        <td colspan="2" style=""><kbd>{{item.title}}</kbd></td>
        <td colspan="2" style=""><a :href="item.url" target="downloadFile" >{{item.name}}</a></td>
     </tr>
      
      <!-- <tr>
        <td class="text-blue font-600 text-right">主要品种</td>
        <td colspan="3">
          
        </td>
      </tr> -->
      <!-- <tr>
        <td class="text-blue font-600 text-right"></td>
        <td colspan="3">
          
        </td>
      </tr> -->
      <!-- <tr>
        <td class="text-blue font-600 text-right">人员信息</td>
        <td colspan="3">
          
        </td>
      </tr> -->
    </tbody>
  </table>
  <div class="text-black font-600 text-left my-5" style="font-size:120%">
    <h5><b>2.场地文件主要品种</b></h5>
  </div>
  <table class="my-table">
    <tr class="text-black font-600 text-center">
      <td width="5%">序号</td> 
      <td width="10%">批准文号</td>
      <td width="17%">商品名称</td>
      <td width="11%">单位</td>
      <td width="10%">是否首营品种</td>
      <td width="17%">生产企业名称</td>
      <td width="10%">品种类别</td>
      <td width="10%">商品类别</td>
      <td width="5%">状态</td>
      <td width="5%">操作</td>
    </tr>
    <tbody>
      <tr align="center" v-for="(item, index) in cdwjPz" :key="index">
        <td align="center">{{index + 1}}</td>
        <td>{{item.pzwh}}</td>
        <td>{{item.spm}}</td>
        <td>{{item.dw}}</td>
        <td>{{item.sfsy}}</td>
        <td>{{item.scqymc}}</td>
        <td>{{item.jx}}</td>
        <td>{{item.lb}}</td>
        <td>{{item.zt}}</td>
        <td align="center"><a @click="cdwjPzModalOpen(item)">查看</a></td>
      </tr>
    </tbody>
  </table>
  <div class="text-black font-600 text-left my-5" style="font-size:120%">
    <h5><b>3.场地文件采购/供应信息</b></h5>
  </div>
  <table class="my-table">
    <tr  class="text-black font-600 text-center">
      <td width="5%">序号</td> 
      <td width="8%">类别</td>
      <td width="8%">是否首营</td>
      <td width="20%">企业名称</td>
      <td width="16%">社会信用代码</td>
      <td width="16%">委托人</td>
      <td width="10%">起始日期</td>
      <td width="10%">结束日期</td>
      <td width="8%">操作</td>
    </tr>
    <tbody>
      <tr align="center" v-for="(item, index) in cdwjCggy" :key="index">
        <td align="center">{{index + 1}}</td>
        <td>{{item.lb}}</td>
        <td>{{item.sfsy}}</td>
        <td>{{item.qymc}}</td>
        <td>{{item.shxydm}}</td>
        <td>{{item.wtr}}</td>
        <td>{{item.beginTime}}</td>
        <td >{{item.endTime}}</td>
        <td align="center"><a @click="cdwjCggyModalOpen(item)">查看</a></td>
      </tr>
    </tbody>
  </table>

  <div class="text-black font-600 text-left my-5" style="font-size:120%">
    <h5><b>4.场地文件人员</b></h5>
  </div>
  <!-- <cdwjRyList :data="cdwjid"></cdwjRyList> -->
  <table class="my-table" > 
    <tr  class="text-black font-600 text-center">
      <td width="3%">序号</td> 
      <td width="10%">人员类别</td>
      <td width="8%">姓名</td>
      <td width="20%">职称</td>
      <td width="10%">学历</td>
      <td width="10%">专业</td>
      <td width="8%">操作</td>
    </tr>
    <tbody>
      <tr align="center" v-for="(item, index) in cdwjRy" :key="index">
          <td align="center">{{index + 1}}</td>
          <td>{{item.lb}}</td>
          <td>{{item.xm}}</td>
          <td>{{item.zc}}</td>
          <td>{{item.xl}}</td>
          <td>{{item.zy}}</td>
    
      </tr>
    </tbody>
  </table>
  <div class="text-black font-600 text-left my-5" style="font-size:120%">
    <h5><b>5.场地文件不合格药品</b></h5>
  </div>
  <table class="my-table" > 
    <tr  class="text-black font-600 text-center">
      <td width="3%">序号</td> 
      <td width="8%">批准文号</td>
      <td width="10%">通用名称</td>
      <td width="10%">生产批号</td>
      <td width="8%">发现日期</td>
      <td width="5%">数量</td>
      <td width="10%">上市许可持有人</td>
      <td width="8%">经办人</td>
      <td width="5%">操作</td>
    </tr>
    <tbody>
      <tr align="center" v-for="(item, index) in cdwjBhgyp" :key="index">
          <td align="center">{{index + 1}}</td>
          <td>{{item.pzwh}}</td>
          <td>{{item.tymc}}</td>
          <td>{{item.scph}}</td>
          <td>{{item.rq}}</td>
          <td>{{item.sl}}</td>
           <td>{{item.scqy}}</td>
          <td >{{item.jbr}}</td> 
          <td align="center"><a @click="cdwjBhgypModalOpen(item)">查看</a></td> 
      </tr> 
    </tbody>
  </table>






















  <!-- <table class="my-table" style="table-layout: fixed">
    <colgroup>
      <col style="width:10%" />
      <col />
      <col style="width:20%" />
      <col />
    </colgroup>
    <tbody>
      <tr>
        <td class="text-blue font-600 text-right">质量管理体系</td>
        <td colspan="3" align="center">
            暂无
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">成品放行程序</td>
        <td colspan="3" align="center">
         暂无
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">供应商管理</td>
        <td colspan="3" align="center">
         暂无
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">委托生产、委托检验情况</td>
        <td colspan="3" align="center">
          暂无
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">质量风险管理</td>
        <td colspan="3" align="center">
         暂无
        </td>
      </tr>
    </tbody>
  </table> -->
  <div class="text-black font-600 text-left my-5" style="font-size:120%">
    3.机构与人员
  </div>
  <table class="my-table" style="table-layout: fixed">
    <colgroup>
      <col style="width:10%" />
      <col />
      <col style="width:20%" />
      <col />
    </colgroup>
    <tbody>
      <tr>
        <td class="text-blue font-600 text-right">组织结构图</td>
        <td colspan="3"></td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">相关岗位人员配备情况</td>
        <td colspan="3">
          <table class="my-table">
            <tr class="text-black font-600 text-center">
              <td width="50px"> 序号</td>
              <td width="10%">姓名</td>
              <td>身份证号</td>
              <td>岗位</td>
              <td width="100px">学历证书</td>
            </tr>
            <tbody>
              <tr align="center">
                <td colspan="5">暂无</td>
                <!-- <td>
                  <div> 张三</div>
                </td>
                <td>4309811123223412451</td>
                <td>法定代表人</td>
                <th>【查看】</th> -->

              </tr>
              <!-- <tr align="center">
                <td>2</td>
                <td>
                  <div>李四</div>
                </td>
                <td>4309811123223412231</td>
                <td>主要负责人</td>
                <th>【查看】</th>

              </tr>
              <tr align="center">
                <td>3</td>
                <td class="hidden-480 center">
                  <div>王五</div>
                </td>
                <td>4309811234243222341</td>
                <td>质量负责人</td>
                <th>【查看】</th>

              </tr> -->
            </tbody>
          </table>
      <tr>
        <td class="text-blue font-600 text-right">关键岗位人员变动情况 </td>
        <td colspan="3">
          <table class="my-table">
            <tbody>
              <tr>
                <td align="center">暂无</td>
              </tr>
              <!-- <tr>
                <td>2、变更质量负责人：由“王五”变更为“陈六” 2017年12月30日</td>
              </tr> -->
            </tbody>
          </table>
        </td>
      </tr>
      </td>
      </tr>
    </tbody>
  </table>
  <div class="text-black font-600 text-left my-5" style="font-size:120%"> 4.厂房和设备</div>
  <table class="my-table" style="table-layout: fixed">
    <colgroup>
      <col style="width:10%" />
      <col />
      <col style="width:20%" />
      <col />
    </colgroup>
    <tbody>
      <tr>
        <td class="text-blue font-600 text-right">生产场地建筑物</td>
        <td colspan="3">
          <table class="my-table">
            <tr class="text-black font-600 text-center">
              <td width="50px"> 序号</td>
              <td width="15%">建筑物名称 </td>
              <td width="8%">投入使用时间 </td>
              <td width="8%">建筑面积</td>
              <td>功能区划</td>
              <td width="6%">备注</td>
            </tr>
            <tbody>
              <tr align="center">
               <td colspan="6">暂无</td>
                <!-- <td>
                  <div> 化学药品生产楼</div>
                </td>
                <td>2020-01-01</td>
                <td>10000㎡</td>
                <td>片剂、丸剂、注射剂</td>
                <td></td> -->
              </tr>
              <!-- <tr align="center">
                <td>2</td>
                <td>
                  <div> 中药生产大楼 </div>
                </td>
                <td>2020-01-01</td>
                <td>15000㎡</td>
                <td>片剂、丸剂、注射剂、搽剂</td>
                <td></td>
              </tr> -->
            </tbody>
          </table>
      <tr>
        <td class="text-blue font-600 text-right">生产场地关键设备 </td>
        <td colspan="3">
          <table class="my-table">
            <tr class="text-black font-600 text-center">
              <td width="50px"> 序号</td>
              <td width="15%">生产车间/生产线名称 </td>
              <td>设备名称 </td>
              <td width="140px">规格/型号</td>
              <td>设备编号</td>
              <td width="200px">首次安装时间</td>
            </tr>
            <tbody>
              <tr align="center">
                <td colspan="6">暂无</td>
                <!-- <td>
                  <div> 固体一车间A线、B线</div>
                </td>
                <td>大型药品粉碎机</td>
                <td>台</td>
                <td>ms002</td>
                <td>2019-02-01</td> -->
              </tr>
              <!-- <tr align="center">
                <td>2</td>
                <td>
                  <div> 液体一车间B线</div>
                </td>
                <td>液体药品灌装机</td>
                <td>台</td>
                <td>lh1002</td>
                <td>2019-02-01</td>
              </tr> -->
            </tbody>
          </table>
        </td>
      </tr>
      </td>
      </tr>
    </tbody>
  </table>
  <div class="text-black font-600 text-left my-5" style="font-size:120%"> 5.文件管理</div>
  <table class="my-table" style="table-layout: fixed">
    <colgroup>
      <col style="width:10%" />
      <col />
      <col style="width:20%" />
      <col />
    </colgroup>
    <tbody>
      <tr>
        <td class="text-blue font-600 text-right">文件系统</td>
        <td colspan="3" align="center">
         暂无
      <tr>
        <td class="text-blue font-600 text-right">文件和记录在生产场地外保存 </td>
        <td colspan="3">
          <table class="my-table">
            <tr class="text-black font-600 text-center">
              <td width="3%"> 序号</td>
              <td width="15%">外存的文件/记录目录 </td>
              <td width="10%">储存场所名称 </td>
              <td width="45%">地址</td>
              <td width="15%">取回文件所需</td>
            </tr>
            <tbody>
              <tr align="center">
                <td colspan="5">暂无</td>
                <!-- <td class="hidden-480 center">
                  <div> 人员与机构管理规程</div>
                </td>
                <td>公司办公楼</td>
                <td>湖北省黄冈市蕲春县本草纲目生物科技园区</td>
                <td align="center">半个小时</td>
              </tr> -->
              <!-- <tr align="center">
                <td>1</td>
                <td class="hidden-480 center">
                  <div> 质量保证管理规程</div>
                </td>
                <td>质量管理大楼 </td>
                <td>湖北省黄冈市蕲春县本草纲目生物科技园区</td>
                <td>半个小时</td>
                -->
              </tr> 
            </tbody>
          </table>
        </td>
      </tr>
      </td>
      </tr>
    </tbody>
  </table>
  <div class="text-black font-600 text-left my-5" style="font-size:120%"> 6.生产</div>
  <table class="my-table" style="table-layout: fixed">
    <colgroup>
      <col style="width:10%" />
      <col />
      <col style="width:20%" />
      <col />
    </colgroup>
    <tbody>
      <tr>
        <td class="text-blue font-600 text-right">产品情况</td>
        <td colspan="3">
          <table class="my-table">
            <tr class="text-black font-600 text-center">
              <td width="3%"> 序号</td>
              <td width="13%">批准文号 </td>
              <td width="13%">产品名称</td>
              <td width="10%">商品名</td>
              <td width="8%">产品类别</td>
              <td width="9%">批准日期</td>
              <td width="8%">是否集采品种</td>
              <td width="6%">是否特药</td>
              <td width="6%">详情</td>
            </tr>
            <tbody>
              <tr align="center">
                <td colspan="9">暂无</td>
                <!-- <td class="hidden-480 center">
                  <div> 国药准字H20046522</div>
                </td>
                <td>二乙酰氨乙酸乙二胺注射液</td>
                <td>味禾</td>
                <td>化学药品</td>
                <td>2021-07-21</td>
                <td>是</td>
                <td>否</td>
                <th>【查看】</th> -->
              </tr>
              <!-- <tr align="center">
                <td>2</td>
                <td>
                  <div> 国药准字H20045758</div>
                </td>
                <td>注射用亚叶酸钙</td>
                <td>亚叶酸钙</td>
                <td>化学药品</td>
                <td>2021-07-21</td>
                <td>否</td>
                <td>否</td>
                <th>【查看】</th>
              </tr> -->
            </tbody>
          </table>
      <tr>
        <td class="text-blue font-600 text-right">工艺验证 </td>
        <td colspan="3" align="center">
            暂无
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">物料管理和仓储 </td>
        <td colspan="3" align="center">
           暂无
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">产品追溯方式 </td>
        <td colspan="3" align="center">
          暂无
        </td>
      </tr>
      </td>
      </tr>
    </tbody>
  </table>
  <div class="text-black font-600 text-left my-5" style="font-size:120%">7.质量控制</div>
  <table class="my-table" style="table-layout: fixed">
    <colgroup>
      <col style="width:10%" />
      <col />
      <col style="width:20%" />
      <col />
    </colgroup>
    <tbody>
      <tr>
        <td class="text-blue font-600 text-right">质量控制</td>
        <td colspan="3" align="center">
           暂无
        </td>
      </tr>
    </tbody>
  </table>
  <div class="text-black font-600 text-left my-5" style="font-size:120%">8.发运、投诉与召回</div>
  <table class="my-table" style="table-layout: fixed">
    <colgroup>
      <col style="width:10%" />
      <col />
      <col style="width:20%" />
      <col />
    </colgroup>
    <tbody>
      <tr>
        <td class="text-blue font-600 text-right">发运</td>
        <td colspan="3" align="center">
        暂无
      <tr>
        <td class="text-blue font-600 text-right">投诉与召回 </td>
        <td colspan="3">
          <table class="my-table">
            <tr class="text-black font-600 text-center">
              <td width="50px"> 序号</td>
              <td width="15%">商品名</td>
              <td width="8%">投诉人 </td>
              <td width="30%">投诉内容</td>
              <td width="8%">投诉时间</td>
              <td width="25%">处理结果</td>
              <td width="10%">处理时间</td>
            </tr>
            <tbody>
              <tr align="center">
                <td colspan="7">暂无</td>
                <!-- <td class="hidden-480 center">
                  <div> 破伤风抗毒素</div>
                </td>
                <td class="hidden-480 center" align="center">张三</td>
                <td>药品产生不良反应</td>
                <td>2021-08-21</td>
                <td>药品召回处理</td>
                <td>2021-09-01</td> -->
              </tr>
              <!-- <tr align="center">
                <td>2</td>
                <td class="hidden-480 center">
                  <div> 气管炎疫苗</div>
                </td>
                <td class="hidden-480 center" align="center">李四</td>
                <td>药品超过有效期</td>
                <td>2020-08-21</td>
                <td>退还购药款，集中销毁过期药品</td>
                <td>2021-09-12</td>
              </tr> -->
            </tbody>
          </table>
        </td>
      </tr>
      </td>
      </tr>
    </tbody>
  </table>
  <div class="text-black font-600 text-left my-5" style="font-size:120%"> 9.自检</div>
  <table class="my-table" style="table-layout: fixed">
    <colgroup>
      <col style="width:10%" />
      <col />
      <col style="width:20%" />
      <col />
    </colgroup>
    <tbody>
      <tr>
        <td class="text-blue font-600 text-right">企业自检情况</td>
        <td colspan="3" align="center">
           暂无
        </td>
      </tr>
    </tbody>
  </table>
  <div class="text-black font-600 text-left my-5" style="font-size:120%"> 10.其他情況</div>
  <table class="my-table" style="table-layout: fixed">
    <colgroup>
      <col style="width:10%" />
      <col />
      <col style="width:20%" />
      <col />
    </colgroup>
    <tbody>
      <tr>
        <td class="text-blue font-600 text-right">其他情況</td>
        <td colspan="3" align="center">
          暂无
        </td>
      </tr>
    </tbody>
  </table>
  <!-- 场地文件 主要品种modal-->
  <CdwjPzModal @register="registerModal" @success="handleSuccess"></CdwjPzModal>
<!-- 场地文件 采购、供应信息modal-->
  <CdwjCggyModal @register="registerCggyModal" @success="handleSuccess"></CdwjCggyModal>

  <!-- 场地文件 人员信息/变更-->
  <CdwjRyModal @register="registerRyModal" @success="handleSuccess"></CdwjRyModal>

  <!-- 场地文件 不合格药品-->
  <CdwjBhgypModal @register="registerBhgypModal" @success="handleSuccess"></CdwjBhgypModal>

  
</template>
<script lang="ts">

import CdwjPzModal from './modules/CdwjPzModal.vue'
import CdwjCggyModal from './modules/CdwjCggyModal.vue'
import CdwjRyModal from './modules/CdwjRyModal.vue'
import CdwjBhgypModal from './modules/CdwjBhgypModal.vue'
import { defineComponent,ref,watch } from 'vue';
import { propTypes } from '/@/utils/propTypes';
import { useRoute } from 'vue-router';
import {queryCdwj,queryCdwjPz,queryCdwjCggy,queryCdwjRy,queryCdwjBhgyp} from './Cdwj.api';
import {getFileList} from '../fxpgbg/Fxpgbg.api';
import { getAppEnvConfig } from '/@/utils/env';
import {useModal} from '/@/components/Modal';
import cdwjRyList from '/@/views/ypjy/cdwj/cdwjRy/CdwjRyList.vue';
//const [ypscxkzModal, {openModal: openModalYpscxkz}] = useModal();

export default defineComponent({
  components: {CdwjPzModal,CdwjCggyModal,CdwjRyModal,CdwjBhgypModal,cdwjRyList},
  props: {
    QyJbxx: propTypes.object.def({}),
    Shxydm: propTypes.object.def({}),
  },
  setup() {
    const { VITE_GLOB_DOMAIN_URL } = getAppEnvConfig();
    const [registerModal, {openModal}] = useModal();
    const [registerCggyModal, {openModal: openModalCggy}] = useModal();
    const [registerRyModal, {openModal: openModalRy}] = useModal();
    const [registerBhgypModal, {openModal: openModalBhgyp}] = useModal();
    
    const route = useRoute();
    const qyid = ref(route.params?.qyid);
    const cdwjData = ref({});
    const fileList = ref([]);
    const cdwjPz = ref([]);//场地文件主要品种
    const cdwjCggy = ref([]);//场地文件采购、供应信息
    const cdwjRy = ref([]);//场地文件 人员、人员变更信息
    const cdwjBhgyp = ref([]);//场地文件 不合格药品
    const bisId = ref('');
    const cdwjid = ref('');
    watch(() => cdwjid.value, (value, oldVal) => {
      debugger
      if (value != oldVal) return value;
    });
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
                title: item.source,
                url: VITE_GLOB_DOMAIN_URL + '/sys/common/static/' + item.filePath
            } : item 
        });  
    }
    queryCdwj({ shxydm: qyid.value }).then((res) => {
      cdwjData.value = res;
      bisId.value = res.id;
      cdwjid.value = res.id;
      loadFileList();

      //加载场地文件主要产品
      queryCdwjPz({ cdwjid: res.id }).then((res) => {
        cdwjPz.value = res;
      }).catch(() => {
        console.log(arguments);
      });

      //加载场地文件采购、供应信息
      queryCdwjCggy({ cdwjid: res.id }).then((res) => {
        cdwjCggy.value = res;
      }).catch(() => {
        console.log(arguments);
      });
      //加载场地 人员信息
      queryCdwjRy({ cdwjid: res.id }).then((res) => {
        cdwjRy.value = res;
      }).catch(() => {
        console.log(arguments);
      });
      //加载场地 不合格药品
      queryCdwjBhgyp({ cdwjid: res.id }).then((res) => {
        cdwjBhgyp.value = res;
      }).catch(() => {
        console.log(arguments);
      });
      

      // Info.value = res.data;
      // Data.value = res;
    }).catch(() => {
      console.log(arguments);
    });

    //打开 场地文件  主要品种
    function cdwjPzModalOpen(item) {
      openModal(true,{
        item,
        isUpdate: true,
        showFooter: false,
      })
    }
    function cdwjCggyModalOpen(item) {
      openModalCggy(true,{
        item,
        isUpdate: true,
        showFooter: false,
      })
    }
    function cdwjRyModalOpen(item) {
      openModalRy(true,{
        item,
        isUpdate: true,
        showFooter: false,
      })
    }

    function cdwjBhgypModalOpen(item) {
      openModalBhgyp(true,{
        item,
        isUpdate: true,
        showFooter: false,
      })
    }
    
    return {
      qyid,
      cdwjData,
      fileList,
      cdwjPz,
      cdwjPzModalOpen,
      openModal,
      registerModal,
      registerCggyModal,
      cdwjCggyModalOpen,
      cdwjCggy,
      cdwjRyModalOpen,
      registerRyModal,
      cdwjRy,
      registerBhgypModal,
      openModalBhgyp,
      cdwjBhgypModalOpen,
      cdwjBhgyp,
      cdwjid,
    };
  }
});
</script>
<style>
#components-table-demo-size h4 {
  margin-bottom: 16px;
}
</style>
