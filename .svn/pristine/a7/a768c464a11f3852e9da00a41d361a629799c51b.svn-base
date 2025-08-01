<template>
  <div class="page">
    <PageWrapper class="title-center" :contentStyle="{ padding: '0 16px 16px 16px' }" contentBackground>
      <div class="text-black font-900 text-left my-4" style="font-size:120%">年度报告基本信息</div>
      <table class="my-table">
        <colgroup>
          <col style="width:80%" />
          <col />
          <col style="width:50%" />
          <col />
        </colgroup>
        <table class="my-table">
          <colgroup>
            <col style="width:20%" />
            <col />
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <td class="text-blue font-600 text-right">报告周期起</td>
              <td>{{ Info.reportingCycleStart && formatToDate(Info.reportingCycleStart) }}</td>
              <td class="text-blue font-600 text-right">报告周期止</td>
              <td>{{ Info.reportingCycleEnd && formatToDate(Info.reportingCycleEnd) }}</td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">填报人</td>
              <td>{{ Info.fillUser }}</td>
              <td class="text-blue font-600 text-right">联系方式</td>
              <td>{{ Info.contactInfo }}</td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">批准人</td>
              <td>{{ Info.approveUser }}</td>
              <td class="text-blue font-600 text-right" style="width:80px">批准日期</td>
              <td>{{ Info.approveTime && formatToDate(Info.approveTime) }}</td>
            </tr>
          </tbody>
        </table>
      </table>
      <div style="color:red">
        说明：<br />
        1. 为方便企业填写，药品年度报告中的企业基础信息、产品基础信息等，可由系统自动带出。<br />
        2. 以下各部分内容，均为必填项；如果该内容没有信息，请填“无”。<br />
        3. 一个品种有多个规格时，产品部分应当按批准文号、规格，分别填报、分节罗列。如果该品种未实施药品批准文号管理（如中药饮片），需要按药品名称进行填报。<br />
        4. 品种在年度报告周期内未生产，但存在销售、上市后研究及变更管理、风险管理等情况的，需如实填写；如上述情况不存在，则填“无”。<br />
        5. 简述内容原则上不超过3000字，附件上传为word格式，单个文件大小不要超过10M。<br />
        6. 年度报告模板及其系统实行版本号管理，后续根据监管工作需要，予以完善更新。<br />
      </div>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">药品上市许可持有人(中药饮片生产企业)</div>
      <table class="my-table" style="table-layout: fixed">
        <colgroup>
          <col style="width:10%" />
          <col />
          <col style="width:20%" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td class="text-blue font-600 text-right">持有人名称</td>
            <td colspan="3" align="left">
              {{ hoder.ypssxkcyrmc }}
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">药品生产许可证编号</td>
            <td colspan="3" align="left">
              {{ hoder.ypscxkzbh }}
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">注册地址</td>
            <td colspan="3" align="left">
              {{ hoder.ssxkcyrdz }}
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">企业法定代表人</td>
            <td>{{ hoder.fddbr }}</td>
            <td class="text-blue font-600 text-right">统一社会信用代码(组织机构代码)</td>
            <td>{{ hoder.tyshxydm }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">境外上市持有人中文名称</td>
            <td>{{ hoder.zwm }}</td>
            <td class="text-blue font-600 text-right">境外上市持有人英文名称</td>
            <td>{{ hoder.ywm }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">境外上市持有人中文地址</td>
            <td>{{ hoder.dzzw }}</td>
            <td class="text-blue font-600 text-right">境外上市持有人英文地址</td>
            <td>{{ hoder.dzyw }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">质量负责人</td>
            <td>{{ hoder.zlfzr }}</td>
            <td class="text-blue font-600 text-right">质量授权人</td>
            <td>{{ hoder.zlsqr }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">警戒负责人</td>
            <td>{{ hoder.ywjjfzr }}</td>
            <td class="text-blue font-600 text-right">企业联系人</td>
            <td>{{ hoder.qylxr }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">联系人电话</td>
            <td>{{ hoder.lxrsj }}</td>
            <td class="text-blue font-600 text-right">联系人座机</td>
            <td>{{ hoder.lxrzj }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">联系人邮箱</td>
            <td colspan="3">{{ hoder.lxryx }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">许可变更事项概述</td>
            <td colspan="3" align="left">
              {{ hoder.xksxbggs }}
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">登记事项变更概述</td>
            <td colspan="3" align="left">
              {{ hoder.djsxbggs }}
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">{{Info.year}}年产值（万元）</td>
            <td>{{ Info.ncz }}</td>
            <td class="text-blue font-600 text-right">{{Info.year}}年利税（万元）</td>
            <td>{{ Info.nls }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">产值过亿品种名单</td>
            <td colspan="3" align="left">
              {{ Info.czgypzmd }}
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">企业概况</td>
            <td colspan="3" align="left">
              {{ Info.qygk }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">质量管理概述</div>
      <b style="color:red">注：概述质量管理体系运行、供应商审核、产品放行审核、委托生产管理、委托销售管理、委托储存运输管理、总体结论等有关情况。</b>
      <div>
        &nbsp; &nbsp;<b>附件下载</b>
        <MUpload :bisId="Info.id || ''"  category="质量管理概述" :disabled="true" />
        <!-- <uploader :fileId="Info.id || ''" attchType="质量管理概述" :readonly="true" /> -->
      </div>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">品种报告信息</div>
      <DrugsBasicInfoList :data="cyrname"></DrugsBasicInfoList>
      <b style="color:red">备注:若发现“品种报告信息”栏目下，有批准文号的品种不齐全，存在文号缺失的现象，请及时与技术支持联络。</b>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">药物警戒体系建设及运行情况</div>
      <DurgsWarnSystemList :reportInfo="Info"></DurgsWarnSystemList>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">接受境外委托加工情况</div>
      <EntrustedProcessingList></EntrustedProcessingList>
      <b style="color:red">备注：此表仅由境内生产企业填写。</b>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">接受境外药品监管机构检查情况</div>
      <SuperviseStatusList></SuperviseStatusList>
      <b style="color:red">
        备注：<br>
        1.此表仅由境内生产企业（持有人）填写。<br>
        2.监管机构名称包括：有关国家或地区的药品监管部门、世界卫生组织等。<br>
        3.检查范围指：品种名称、剂型类别等。<br>
        4.检查类型指：首次检查、跟踪检查等。<br>
        5.缺陷及整改情况主要指：严重缺陷、主要缺陷情况及整改等情况。<br>
        6.检查结果处置情况，包括：通过检查、整改后再检查、警告信、暂停进口、撤销认证证书/品种许可等。
      </b>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">退回补正</div>
      <table class="my-table" style="table-layout: fixed">
        <colgroup>
          <col style="width:10%" />
          <col />
          <col style="width:20%" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td class="text-blue font-600 text-right">退回原因</td>
            <td colspan="3" align="left">
              {{ Info.returnReason || '' }}
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">联系人</td>
            <td colspan="3" align="left">
              {{ Info.lxr || '' }}
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">联系方式</td>
            <td>{{ Info.lxfs || '' }}</td>
            <td class="text-blue font-600 text-right">退回时间</td>
            <td align="left">
              {{ Info.returnTime && formatToDate(Info.returnTime) || '' }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">委托生产情况</div>
      <table class="my-table" style="table-layout: fixed">
        <colgroup>
          <col style="width:5%" />
          <col />
          <col style="width:20%" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td class="text-blue font-600 text-right">受托生产企业信息</td>
            <td align="left" colspan="3">
              <table style="width:100%;margin-top:8px;" class="my-table  mb-4 text-left">
                <colgroup>
                  <col style="width:12%" />
                  <col style="width:12%" />
                  <col />
                  <col style="width:15%" />
                  <col style="width:35%" />
                  <col style="width:10%" />
                </colgroup>
                <thead>
                  <tr>
                    <td class="text-blue font-600 text-center">受托企业名称</td>
                    <td class="text-blue font-600 text-center">受托企业社会信用代码</td>
                    <td class="text-blue font-600 text-center">受托生产企业许可证号</td>
                    <td class="text-blue font-600 text-center">受托生产企业所在省份</td>
                    <td class="text-blue font-600 text-center">不良信用记录</td>
                    <td class="text-blue font-600 text-center">受托企业信息</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in wtqyList" :key="idx">
                    <td align="center">
                      {{ item.qymc }}
                    </td>
                    <td align="center">
                      {{ item.shxydm }}
                    </td>
                    <td align="center">
                      {{ item.stscqyxk }}
                    </td>
                    <td align="center">
                      {{ item.stscqyszsf }}
                    </td>
                    <td>
                      <a-checkbox-group v-model:value="item.wnnblyfjl" :options="plainOptions" disabled />
                    </td>
                    <td align="center">
                      <a href="javascript:;" style="margin-right:5px; " @click="wtQyInfo(item)">详情
                      </a>
                      <!-- <div >
                            <div style="margin-bottom:5px;">受托生产企业药品GMP符合情况的现场审核报告:
                              <MUpload :bisId="item.id || ''" category="GMP符合情况的现场审核报告" source="年度报告"  disabled :maxCount="1">
                              </MUpload>
                            </div>
                            <div style="margin-bottom:5px;">受托生产企业检验能力的评估报告:
                              <MUpload :bisId="item.id || ''" category="检验能力的评估报告"  source="年度报告" disabled :maxCount="1">
                              </MUpload>
                            </div>
                            <div style="margin-bottom:5px;">受托生产企业前期违法违规行为整改情况的评估报告:
                              <MUpload :bisId="item.id || ''" category="整改情况的评估报告" source="年度报告" disabled :maxCount="1">
                              </MUpload>
                            </div>
                          </div>                          -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">委托生产品种信息</td>
            <td align="left" colspan="3">
              <table class="my-table mb-4">
                <colgroup>
                  <col style="width:15%" />
                  <col />
                  <col style="width:25%" />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <td class="text-blue font-600 text-center">受托企业名称</td>
                    <td class="text-blue font-600 text-center">受托企业社会信用代码</td>
                    <td class="text-blue font-600 text-center">药品批准文号</td>
                    <td class="text-blue font-600 text-center">药品通用名称</td>
                    <td class="text-blue font-600 text-center">是否在产</td>
                    <td class="text-blue font-600 text-center">是否有委托第三方检验机构进行检验</td>
                    <td class="text-blue font-600 text-center">委托生产药品信息</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in wtpzList" :key="idx">
                    <td align="center">
                      {{ item.qymc }}
                    </td>
                    <td align="center">
                      {{ item.shxydm }}
                    </td>
                    <td align="center">
                      {{ item.yppzwh }}
                    </td>
                    <td align="center">
                      {{ item.yptymc }}
                    </td>
                    <td align="center">
                      <a-radio-group :options="[{ value: 'Y', label: '是' }, { value: 'N', label: '否' }]"
                        v-model:value="item.sfzc" disabled />
                    </td>
                    <td align="center">
                      <a-radio-group :options="[{ value: 'Y', label: '是' }, { value: 'N', label: '否' }]"
                        v-model:value="item.sfwtdsfjy" disabled />
                    </td>
                    <td align="center">
                      <a href="javascript:;" style="margin-right:5px; " @click="wtscInfo(item)">详情
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">医疗代表备案情况</div>
      <table class="my-table" style="table-layout: fixed">
        <colgroup>
          <col style="width:10%" />
          <col />
          <col style="width:20%" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td class="text-blue font-600 text-right">药品上市许可持有人</td>
            <td align="left">
              {{ baqk.cyrmc || '' }}
            </td>
            <td class="text-blue font-600 text-right">企业所在辖区</td>
            <td align="left">
              {{ baqk.qyszxq }}
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">管理工作负责人</td>
            <td align="left">
              {{ baqk.glfzr || '' }}
            </td>
            <td class="text-blue font-600 text-right">联系电话</td>
            <td align="left">
              {{ baqk.lxdh || '' }}
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">签约医药代表人数</td>
            <td>{{ baqk.qyrs || '' }}</td>
            <td class="text-blue font-600 text-right">已备案人数</td>
            <td align="left">
              {{ baqk.bars || '' }}
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">聘用或授权医药代表情况</td>
            <td colspan="3" align="left">
              {{ baqk.yydbqk || '' }}
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">医药代表培训情况</td>
            <td colspan="3" align="left">
              {{ baqk.yydbpx || '' }}
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">工作打算</td>
            <td colspan="3" align="left">
              {{ baqk.gzds || '' }}
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">填表人</td>
            <td align="left">
              {{ baqk.tbr || '' }}
            </td>
            <td class="text-blue font-600 text-right">填表人联系电话</td>
            <td align="left">
              {{ baqk.tbrlxfs || '' }}
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">医药代表备案名单截图</td>
            <td colspan="3">
              <MUpload :bisId="baqk.id" fileType="image" :disabled="true" />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-black font-600 text-left my-5" style="font-size:120%">审核信息</div>
      <shxxviewList></shxxviewList>
      <a-modal title="委托生产信息-品种" :width="800" :footer="null" :destroyOnClose=true :visible="wtypzcMd"
        @cancel="closeInfo">
        <div style=" margin-bottom: 5%;">
          <a-row style=" margin-top:10px">
            <a-col :span="8" style="text-align: right;" class="required pr-4">受托生产企业名称</a-col>
            <a-col :span="16">
              {{ wtscyp.qymc || "" }}
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="8" style="text-align: right;" class="required pr-4">受托企业社会信用代码</a-col>
            <a-col :span="16">
              {{ wtscyp.shxydm || "" }}
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="8" style="text-align: right;" class="required pr-4">委托药品通用名称</a-col>
            <a-col :span="16">
              {{ wtscyp.yptymc || "" }}
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="8" style="text-align: right;" class="required pr-4">是否为无菌品种</a-col>
            <a-col :span="16">
              <a-radio-group :options="[{ value: 'Y', label: '是' }, { value: 'N', label: '否' }]"
                v-model:value="wtscyp.sfwjpz" disabled />
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="8" style="text-align: right;" class="required pr-4">品种类型</a-col>
            <a-col :span="16">
              <a-checkbox-group :options="pzlxOptions" v-model:value="wtscyp.pzlx" disabled />
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="8" style="text-align: right;" class="required pr-4">品种状态</a-col>
            <a-col :span="16">
              <a-radio-group :options="pzStateOptions" v-model:value="wtscyp.pzState" disabled />
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="8" style="text-align: right;" class="required pr-4">委托药品批准文号</a-col>
            <a-col :span="16">
              {{ wtscyp.yppzwh || 'N/A' }}
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="8" style="text-align: right;" class="required pr-4">注册分类 </a-col>
            <a-col :span="16">
              <a-radio-group :options="[{ value: '化学药品', label: '化学药品' }, { value: '中药', label: '中药' }]"
                v-model:value="wtscyp.zcfl" disabled />
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="8" style="text-align: right;" class="required pr-4">是否已购买赔偿责任保险 </a-col>
            <a-col :span="16">
              <a-radio-group :options="[{ value: 'Y', label: '是' }, { value: 'N', label: '否' }]"
                v-model:value="wtscyp.sfygmzrbx" disabled />
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="8" style="text-align: right;" class="required pr-4">是否在产</a-col>
            <a-col :span="16">
              <a-radio-group :options="[{ value: 'Y', label: '是' }, { value: 'N', label: '否' }]"
                v-model:value="wtscyp.sfzc" disabled />
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="8" style="text-align: right;" class="required pr-4">剂型</a-col>
            <a-col :span="16">
              {{ wtscyp.ypjx || "" }}
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="8" style="text-align: right;" class="required pr-4">规格</a-col>
            <a-col :span="16">
              {{ wtscyp.ypgg || "" }}
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="8" style="text-align: right;" class="pr-4">{{ Info.year }}年生产批次数</a-col>
            <a-col :span="16">
              {{ wtscyp.scpcs || '0' }}
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="8" style="text-align: right;" class="required pr-4">是否有委托第三方检验机构进行检验</a-col>
            <a-col :span="16">
              <a-radio-group :options="[{ value: 'Y', label: '是' }, { value: 'N', label: '否' }]"
                v-model:value="wtscyp.sfwtdsfjy" disabled />
            </a-col>
          </a-row>
          <div v-if="wtscyp.sfwtdsfjy == 'Y'">
            <a-row style=" margin-top:10px">
              <a-col :span="8" style="text-align: right;" class="required pr-4">委托第三方检验机构名称</a-col>
              <a-col :span="16">
                {{ wtscyp.jyjgmc || "" }}
              </a-col>
            </a-row>
            <a-row style=" margin-top:10px">
              <a-col :span="8" style="text-align: right;" class="required pr-4">委托检验项目名称</a-col>
              <a-col :span="16">
                {{ wtscyp.jyxmmc || "" }}
              </a-col>
            </a-row>
            <a-row style=" margin-top:10px">
              <a-col :span="8" style="text-align: right;" class="required pr-4">委托检验协议</a-col>
              <a-col :span="16">
                <MUpload :bisId="wtscyp.id || ''" category="委托检验协议" source="年度报告" disabled :maxCount="10">
                </MUpload>
              </a-col>
            </a-row>
          </div>
          <a-row style=" margin-top:10px">
            <a-col :span="8" style="text-align: right;" class="required pr-4">其它附件</a-col>
            <a-col :span="16">
              <MUpload :bisId="wtscyp.id || ''" category="其它附件" source="年度报告" disabled :maxCount="10">
              </MUpload>
            </a-col>
          </a-row>
        </div>
      </a-modal>

      <a-modal title="委托生产信息-企业" :width="800" :footer="null" :destroyOnClose=true :visible="wtqyMd"
        @cancel="closeQyInfo">
        <div style=" margin-bottom: 5%;">
          <a-row style=" margin-top:10px">
            <a-col :span="6" style="text-align: right;" class="required pr-4">受托生产企业名称</a-col>
            <a-col :span="18">
              {{ wtscyp.qymc || "" }}
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="6" style="text-align: right;" class="required pr-4">受托企业社会信用代码</a-col>
            <a-col :span="18">
              {{ wtscyp.shxydm || "" }}
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="6" style="text-align: right;" class="required pr-4">受托生产企业许可证号</a-col>
            <a-col :span="18">
              {{ wtscyp.stscqyxk || "" }}
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="6" style="text-align: right;" class="required pr-4">受托生产企业所在省份</a-col>
            <a-col :span="18">
              {{ wtscyp.stscqyszsf || "" }}
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="6" style="text-align: right;" class="required pr-4">是否集团内委托</a-col>
            <a-col :span="18">
              <a-radio-group :options="[{ value: 'Y', label: '是' }, { value: 'N', label: '否' }]"
                v-model:value="wtscyp.sfjtnwt" disabled />
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="6" style="text-align: right;" class="required pr-4">与委托方企业关系</a-col>
            <a-col :span="18">
              <a-radio-group :options="wtfqygxOptions" v-model:value="wtscyp.ywtfqygx" disabled />
              <a-input v-model="wtscyp.ywtfqygxQt" maxlength="10" disabled style="width: 140px;"
                v-if="wtscyp.ywtfqygx == 40" />
            </a-col>
          </a-row>
          <a-row style=" margin-top:10px">
            <a-col :span="6" style="text-align: right;" class=" pr-4">不良信用记录</a-col>
            <a-col :span="18">
              <a-checkbox-group v-model:value="wtscyp.wnnblyfjl" :options="plainOptions" disabled />
            </a-col>
          </a-row>
          <a-row style="margin-top:10px">
            <a-col :span="6" style="text-align: right;" class=" pr-4">报告</a-col>
            <a-col :span="18">     
              <div style="margin-bottom:5px;">受托生产企业药品GMP符合情况的现场审核报告:
                <MUpload :bisId="wtscyp.id || ''" category="GMP符合情况的现场审核报告" source="年度报告"  disabled :maxCount="1">
                </MUpload>
              </div>
              <div style="margin-bottom:5px;">受托生产企业检验能力的评估报告:
                <MUpload :bisId="wtscyp.id || ''" category="检验能力的评估报告"  source="年度报告" disabled :maxCount="1">
                </MUpload>
              </div>
              <div style="margin-bottom:5px;">受托生产企业前期违法违规行为整改情况的评估报告:
                <MUpload :bisId="wtscyp.id || ''" category="整改情况的评估报告" source="年度报告" disabled :maxCount="1">
                </MUpload>
              </div>                  
            </a-col>
          </a-row>
        </div>
      </a-modal>
    </PageWrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { FormSchema, useForm, BasicForm } from '/@/components/Form'
import { JUploadModal } from '/@/components/Form/src/jeecg/components/JUpload'
import { propTypes } from '/@/utils/propTypes';
import DurgsWarnSystemList from '/@/views/ypsczhjg/ndbg/warn/DurgsWarnSystemList.vue'
import EntrustedProcessingList from '/@/views/ypsczhjg/ndbg/jwwt/EntrustedProcessingList.vue';
import SuperviseStatusList from '/@/views/ypsczhjg/ndbg/jwwt/SuperviseStatusList.vue';
import shxxviewList from '/@/views/ypsczhjg/ndbg/shxx/shxxviewList.vue';
import { PageWrapper } from '/@/components/Page';
import { queryById } from './ReportInfo.api';
import { formatToDate } from '/@/utils/dateUtil';
import { useRoute } from 'vue-router';
import DrugsBasicInfoList from './DrugsBasicInfoList.vue';
import { downloadByUrl } from '/@/utils/file/download';
import { getAppEnvConfig } from '/@/utils/env';
import { getDictItems } from '/@/utils/dict/JDictSelectUtil';
import uploader from '../components/uploader.vue';
import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';
export default defineComponent({
  components: { PageWrapper, JUploadModal, DrugsBasicInfoList, DurgsWarnSystemList, EntrustedProcessingList, SuperviseStatusList, shxxviewList, BasicForm, uploader, MUpload },
  setup() {
    const { VITE_GLOB_DOMAIN_URL } = getAppEnvConfig();
    const route = useRoute();
    const uploadModalValue = ref('')
    const Info = ref({});
    const hoder = ref({});
    const baqk = ref({});
    const wtscqk = ref({});
    const wtpzList = ref([]);
    const wtqyList = ref([]);
    const wtscyp = ref({});
    const wtypzcMd = ref(false);
    const wtqyMd = ref(false);
    const pzlxOptions = ref([]);
    getDictItems("wtsc_pzlx").then(data => pzlxOptions.value = data);
    const pzStateOptions = ref([]);
    getDictItems("wtsc_pzState").then(data => pzStateOptions.value = data);
    const wtfqygxOptions = ref([]);
    getDictItems("wtsc_wtfqygx").then(data => wtfqygxOptions.value = data);
    const plainOptions = [
      { label: '近一年内存在两批次产品抽检不合格', value: '1' },
      { label: '近三年内监督检查结论存在不符合药品GMP要求', value: '3' },
      { label: '近5年内存在严重违反药品监管法规行为或关键岗位人员存在失信记录的', value: '5' }];

    const cyrname = computed(() => {
      return hoder.value?.ypssxkcyrmc;
    });
    const Data = ref({ data: {} });
    const id = ref(route.query?.id);
    queryById({ id: id.value }).then((res) => {
      Info.value = res.data;
      hoder.value = res.holderInfo || {};
      Data.value = res;
      baqk.value = res.baqk || {};
      wtscqk.value = res.wtscqk || {};
      wtpzList.value = res.wtpzlist;
      wtqyList.value = res.wtqylist;
    }).catch(() => {
      console.log(arguments);
    });
    function toDownload(item) {
      downloadByUrl({
        url: VITE_GLOB_DOMAIN_URL + '/sys/common/static/' + item + "?filename=" + item,
        fileName: item,
        target: '_blank',
      });
    }

    function wtscInfo(item) {
      wtypzcMd.value = true;
      wtscyp.value = item;
    }

    function wtQyInfo(item) {
      wtqyMd.value = true;
      wtscyp.value = item;
    }

    function closeInfo() {
      wtscyp.value = {};
      wtypzcMd.value = false;
    }

    function closeQyInfo() {
      wtscyp.value = {};
      wtqyMd.value = false;
    }

    return {
      id,
      Info,
      hoder,
      baqk,
      wtscqk,
      wtpzList,
      wtqyList,
      plainOptions,
      cyrname,
      formatToDate,
      uploadModalValue,
      toDownload,
      wtscyp,
      wtypzcMd,
      wtqyMd,
      wtscInfo,
      wtQyInfo,
      closeInfo,
      closeQyInfo,
      getDictItems,
      pzlxOptions,
      pzStateOptions,
      wtfqygxOptions
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
