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
        <td>{{ QyJbxx.qymc }}</td>
        <td class="text-blue font-600 text-right">统一社会信用代码</td>
        <td>{{ QyJbxx.shxydm }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">注册地址</td>
        <td>{{ QyJbxx.zcdz }}</td>
        <td class="text-blue font-600 text-right">生产地址</td>
        <td>{{ QyJbxx.scdz }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">生产范围</td>
        <td colspan="3">
         {{ QyJbxx.scfw }}
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">其他经营活动</td>
        <td colspan="3">
          暂无
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">生产品种</td>
        <td colspan="3">
          <table class="my-table">
            <tr class="text-black font-600 text-center">
              <td width="50px"> 序号</td>
              <td width="14%">批准文号 </td>
              <td>产品名称 </td>
              <td>商品名</td>
              <td width="8%">产品类别</td>
              <td width="9%">批准日期</td>
              <td width="8%">是否集采品种</td>
              <td width="6%">是否特药</td>
              <td width="8%">详情</td>
            </tr>
            <tbody>
              <tr align="center">
                <td colspan="9">暂无</td>
                <!-- <td>
                  国药准字H20046522
                </td>
                <td>二乙酰氨乙酸乙二胺注射液</td>
                <td>胶囊剂（硬胶囊剂）</td>
                <td>化学药品</td>
                <td>2021-07-21</td>
                <td>是</td>
                <td>否</td>
                <th>【查看】</th>
                 -->
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">生产车间/生产线</td>
        <td colspan="3">
          <table class="my-table">
            <tr class="text-black font-600 text-center">
              <td width="50px"> 序号</td>
              <td width="14%">生产车间/生产线名称 </td>
              <td>位置 </td>
              <td width="12%">剂型</td>
              <td width="10%">投入使用时间</td>
              <td>生产品种</td>
            </tr>
            <tbody>
              <tr align="center">
                <td colspan="6">暂无</td>
                <!-- <td>
                  <div align="center">固体一车间A线、B线&nbsp;&nbsp;</div>
                </td>
                <td class="hidden-480">黄冈市蕲春县本草纲目生物科技园</td>
                <td>胶囊剂（硬胶囊剂）</td>
                <td>2021-12-08</td>
                <td>二乙酰氨乙酸乙二胺注射液</td> -->
              </tr>
              <!-- <tr align="center">
                <td>2</td>
                <td class="hidden-480 left">
                  <div align="center">丸剂一车间</div>
                </td>
                <td class="hidden-480">黄冈市蕲春县本草纲目生物科技园</td>
                <td>丸剂</td>
                <td>2020-12-12</td>
                <td>二乙酰氨乙酸乙二胺注射液</td>
              </tr>
              <tr align="center">
                <td>3</td>
                <td class="hidden-480 left">
                  <div align="center">露剂车间&nbsp;</div>
                </td>
                <td class="hidden-480">黄冈市蕲春县本草纲目生物科技园</td>
                <td>露剂</td>
                <td>2019-11-30</td>
                <td>注射用亚叶酸钙</td>
              </tr> -->
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="text-black font-600 text-left my-5" style="font-size:120%">
    <h5><b>2.质量管理体系</b></h5>
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
  </table>
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
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { propTypes } from '/@/utils/propTypes';

export default defineComponent({
  props: {
    QyJbxx: propTypes.object.def({}),
  },
  setup() {
    return {

    };
  }
});
</script>
<style>
#components-table-demo-size h4 {
  margin-bottom: 16px;
}
</style>
