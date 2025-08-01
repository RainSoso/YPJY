<template>
  <PageWrapper>
    <template #headerContent>
      <div class="panel-heading">
        <div class="panel">事项信息:</div>
      </div>
      <table class="my-table">
        <tr>
          <td class="text-blue font-600 text-right">事项标题</td>
          <td colspan="3">{{ cpTask.cpEvent.title }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">事项编号</td>
          <td>{{ cpTask.cpEvent.code }}</td>
          <td class="text-blue font-600 text-right">事项分类</td>
          <td>{{ getDictText("xtcz_sxfl", cpTask.cpEvent.category) }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">发起人</td>
          <td>{{ cpTask.cpEvent.leader }}</td>
          <td class="text-blue font-600 text-right">状态</td>
          <td>{{ getDictText("xtcz_state", cpTask.cpEvent.state) }}<span
              v-if="cpTask.cpEvent.currentStep != null && cpTask.cpEvent.state != 20">({{
                getDictText("xtcz_currentStep",
                  cpTask.cpEvent.currentStep + "") }})</span></td>
        </tr>
        <tr v-if="cpTask.cpEvent.category < 3">
          <td class="text-blue font-600 text-right">截止时间</td>
          <td>{{ cpTask.cpEvent.closingDate }}</td>
        </tr>
        <tr v-if="cpTask.cpEvent.category < 3">
          <td class="text-blue font-600 text-right">内容</td>
          <td colspan="3">{{ cpTask.cpEvent.content }}</td>
        </tr>

        <tr v-if="cpTask.cpEvent.category < 3">
          <td class="text-blue font-600 text-right">备注</td>
          <td colspan="3">{{ cpTask.cpEvent.remarks }}</td>
        </tr>
        <tr v-if="cpTask.cpEvent.category < 3">
          <td class="text-blue font-600 text-right">附件</td>
          <td colspan="3">
            <a-button type="link" @click="toPreview(cpTask.cpEvent.attaches)">{{ subFileName(cpTask.cpEvent.attaches)
              }}</a-button>
          </td>
        </tr>
      </table>
    </template>
    <template #footer>
      <div v-if="refresh">
        <div v-if="cpTask.cpTaskItems.length > 0">
          <div class="panel-heading">
            <div class="panel" style="margin-top: 20px">反馈信息</div>
          </div>
          <div class="table1">
            <table class="table table-striped table-bordered center mar_t15" style="width: 100%">
              <tr v-for="item in cpTask.cpTaskItems" :key="item">
                <td class="right tab_apply required">
                  {{ item.name }}
                </td>
                <td class="left">
                  <a-input v-if="item.widgetType == 'string'" v-model:value="item.value" />
                  <a-input-number v-if="item.widgetType == 'int'" v-model:value="item.value" />
                  <a-input-number v-if="item.widgetType == 'double'" v-model:value="item.value" :step="0.01" />
                  <a-date-picker v-if="item.widgetType == 'date'" v-model:value="item.value" />
                  <a-date-picker show-time placeholder="请选择时间" v-if="item.widgetType == 'dateTime'"
                    v-model:value="item.value" />
                  <a-textarea v-if="item.widgetType == 'textarea'" v-model:value="item.value" />
                  <JUpload v-if="item.widgetType == 'file'" bizPath="xtcz" :maxCount="1" v-model:value="item.value">
                  </JUpload>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div v-if="cpTask.cpEvent.category == '2'">
          <div class="panel-heading">
            <div class="panel" style="margin-top: 20px">国抽药品检验信息</div>
          </div>
          <table class="my-table">
            <tr class="text-green font-600 text-center">
              <td colspan="4">基本信息</td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">计划名称</td>
              <td colspan="3">
                <a-input v-model:value="cpTask.cpEvent.gcfxcz.jhmc" placeholder="请输入计划名称" :disabled="disabled" />
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">品种名称</td>
              <td>
                <a-input v-model:value="cpTask.cpEvent.gcfxcz.pzmc" placeholder="请输入品种名称" :disabled="disabled" />
              </td>
              <td class="text-blue font-600 text-right">药品通用名称</td>
              <td>
                <a-input v-model:value="cpTask.cpEvent.gcfxcz.yptymc" placeholder="请输入药品通用名称" :disabled="disabled" />
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">标示生产企业名称</td>
              <td>
                <a-input v-model:value="cpTask.cpEvent.gcfxcz.bsscqymc" placeholder="请输入标示生产企业名称"
                  :disabled="disabled" />
              </td>
              <td class="text-blue font-600 text-right">生产企业所在省份</td>
              <td>
                <a-input v-model:value="cpTask.cpEvent.gcfxcz.scqyszsf" placeholder="请输入生产企业所在省份"
                  :disabled="disabled" />
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">涉及的样品批号</td>
              <td>
                <a-input v-model:value="cpTask.cpEvent.gcfxcz.sjypph" placeholder="请输入涉及的样品批号" :disabled="disabled" />
              </td>
              <td class="text-blue font-600 text-right">涉及样品批数</td>
              <td>
                <a-input v-model:value="cpTask.cpEvent.gcfxcz.sjypps" placeholder="请输入涉及样品批数" :disabled="disabled" />
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">药品批准文号</td>
              <td>
                <a-input v-model:value="cpTask.cpEvent.gcfxcz.yppzwh" placeholder="请输入药品批准文号" :disabled="disabled" />
              </td>
              <td class="text-blue font-600 text-right">风险类别</td>
              <td>
                <a-input v-model:value="cpTask.cpEvent.gcfxcz.fxllb" placeholder="请输入风险类别" :disabled="disabled" />
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">研究结果描述及原因分析</td>
              <td colspan="3">
                <a-textarea v-model:value="cpTask.cpEvent.gcfxcz.jgfx" placeholder="请输入研究结果描述及原因分析"
                  :disabled="disabled" />
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">检验单位</td>
              <td>
                <a-input v-model:value="cpTask.cpEvent.gcfxcz.jydw" placeholder="请输入检验单位" :disabled="disabled" />
              </td>
              <td class="text-blue font-600 text-right">检验单位电话</td>
              <td>
                <a-input v-model:value="cpTask.cpEvent.gcfxcz.jydwdh" placeholder="请输入检验单位电话" :disabled="disabled" />
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">国家局处理情况</td>
              <td colspan="3">
                <a-input v-model:value="cpTask.cpEvent.gcfxcz.gjjclqk" placeholder="请输入国家局处理情况" :disabled="disabled" />
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">备注</td>
              <td colspan="3">
                <a-textarea v-model:value="cpTask.cpEvent.gcfxcz.bz" placeholder="请输入备注" :disabled="disabled" />
              </td>
            </tr>
            <tr class="text-green font-600 text-center">
              <td colspan="4">企业填报信息</td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">是否开展排查</td>
              <td colspan="3">
                <a-radio-group v-model:value="cpTask.cpEvent.gcfxcz.iskzdc" :disabled="disabled">
                  <a-radio :value="1">是</a-radio>
                  <a-radio :value="2">否</a-radio>
                </a-radio-group>
              </td>
            </tr>
            <template v-if="cpTask.cpEvent.gcfxcz.iskzdc == 1">
              <tr>
                <td class="text-blue font-600 text-right">是否按探索性研究方法进行检测</td>
                <td>
                  <a-radio-group v-model:value="cpTask.cpEvent.gcfxcz.istsyjjc" :disabled="disabled">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
                <td class="text-blue font-600 text-right" v-if="cpTask.cpEvent.gcfxcz.istsyjjc == 1">是否重现探索性研究方案</td>
                <td v-if="cpTask.cpEvent.gcfxcz.istsyjjc == 1">
                  <a-radio-group v-model:value="cpTask.cpEvent.gcfxcz.iscxtsjg" :disabled="disabled">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
              </tr>
              <tr>
                <td class="text-blue font-600 text-right">是否对相关药品或原辅包按现行标准进行检验</td>
                <td>
                  <a-radio-group v-model:value="cpTask.cpEvent.gcfxcz.isbzjy" :disabled="disabled">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
                <td class="text-blue font-600 text-right" v-if="cpTask.cpEvent.gcfxcz.isbzjy == 1">是否符合规定</td>
                <td v-if="cpTask.cpEvent.gcfxcz.isbzjy == 1">
                  <a-radio-group v-model:value="cpTask.cpEvent.gcfxcz.isfhgd" :disabled="disabled">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
              </tr>
              <tr>
                <td class="text-blue font-600 text-right">是否对涉事药品生产相关环节和因素进行检查或自查</td>
                <td>
                  <a-radio-group v-model:value="cpTask.cpEvent.gcfxcz.isjchzc" :disabled="disabled">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
                <td class="text-blue font-600 text-right" v-if="cpTask.cpEvent.gcfxcz.isjchzc == 1">是否发现探索性研究结果相关的缺陷或问题
                </td>
                <td v-if="cpTask.cpEvent.gcfxcz.isjchzc == 1">
                  <a-radio-group v-model:value="cpTask.cpEvent.gcfxcz.isfxqxwt1" :disabled="disabled">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
              </tr>
              <tr>
                <td class="text-blue font-600 text-right">是否开展其它方式的排查</td>
                <td>
                  <a-radio-group v-model:value="cpTask.cpEvent.gcfxcz.iskzqtpc" :disabled="disabled">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
                <td class="text-blue font-600 text-right" v-if="cpTask.cpEvent.gcfxcz.iskzqtpc == 1">是否发现探索性研究结果相关的缺陷或问题
                </td>
                <td v-if="cpTask.cpEvent.gcfxcz.iskzqtpc == 1">
                  <a-radio-group v-model:value="cpTask.cpEvent.gcfxcz.isfxqxwt2" :disabled="disabled">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
              </tr>
              <tr>
                <td class="text-blue font-600 text-right">根据排查情况，是否找到或分析生产企业自身产生探索性研究所件问题的原因</td>
                <td colspan="3">
                  <a-radio-group v-model:value="cpTask.cpEvent.gcfxcz.iszdyy" :disabled="disabled">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
              </tr>
              <tr>
                <td class="text-blue font-600 text-right">承检机构针对探索性研究发现问题可能原因的分析对生产企业是否有指导意义或参考价值</td>
                <td colspan="3">
                  <a-radio-group v-model:value="cpTask.cpEvent.gcfxcz.isckjz" :disabled="disabled">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
              </tr>
            </template>
            <tr class="text-green font-600 text-center">
              <td colspan="4">提示的质里风险和问题</td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">生产企业是否认可探索性研究结果</td>
              <td colspan="3">
                <a-radio-group v-model:value="cpTask.cpEvent.gcfxcz.isrkxjjg" :disabled="disabled">
                  <a-radio :value="1">是</a-radio>
                  <a-radio :value="2">否</a-radio>
                </a-radio-group>
              </td>
            </tr>
            <tr v-if="cpTask.cpEvent.gcfxcz.isrkxjjg == 2">
              <td class="text-blue font-600 text-right">生产企业不认可探索性研究结果的主要理由（限3000字）</td>
              <td colspan="3">
                <a-textarea v-model:value="cpTask.cpEvent.gcfxcz.zyly" placeholder="请输入生产企业不认可探索性研究结果的主要理由"
                  :disabled="disabled" />
              </td>
            </tr>
            <tr class="text-green font-600 text-center">
              <td colspan="4">企业整改情况</td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">是否采取整改措施</td>
              <td colspan="3">
                <a-radio-group v-model:value="cpTask.cpEvent.gcfxcz.iscqzgcs" :disabled="disabled">
                  <a-radio :value="1">是</a-radio>
                  <a-radio :value="2">否</a-radio>
                </a-radio-group>
              </td>
            </tr>
            <tr v-if="cpTask.cpEvent.gcfxcz.iscqzgcs == 1">
              <td class="text-blue font-600 text-right">采取的整改措施</td>
              <td colspan="3">
                <a-checkbox-group v-model:value="zgcs" name="checkboxgroup" :options="zgcsAwarry"
                  :disabled="disabled" />
              </td>
            </tr>
            <tr class="text-green font-600 text-center">
              <td colspan="4">附件</td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">上传附件</td>
              <td colspan="2">
                <MUpload :bisId="cpTask.cpEvent.gcfxcz.id" source="国抽药品检验信息" :disabled="disabled"></MUpload>
              </td>
              <td>
                注意:请上传pdf文件,仅支持pdf格式
              </td>
            </tr>

          </table>
        </div>

        <div v-if="cpTask.cpEvent.category == '3'">
          <div class="panel-heading">
            <div class="panel">GCP机构监督检查</div>
          </div>
          <table class="my-table">
            <colgroup>
              <col style="width:235px;" />
              <col />
              <col style="width:240px" />
              <col />
            </colgroup>
            <tr>
              <td class="text-blue font-600 text-right">机构名称</td>
              <td>
                <a-input v-model:value="cpTask.cpGcpJdjc.jgmc" :disabled="true"></a-input>
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">检查分类</td>
              <td>
                <a-radio-group
                  :options="[{ value: '日常监督检查', label: '日常监督检查' }, { value: '常规检查', label: '常规检查' }, { value: '有因检查', label: '有因检查' }]"
                  v-model:value="cpTask.cpGcpJdjc.jcfl" :disabled="true" />
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">主要内容</td>
              <td colspan="3">
                <a-textarea v-model:value="cpTask.cpGcpJdjc.zynr" :disabled="true"></a-textarea>
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">备案时间</td>
              <td>
                <a-DatePicker v-model:value="cpTask.cpGcpJdjc.basj" :disabled="true"></a-DatePicker>
              </td>
              <td class="text-blue font-600 text-right">检查完成时间</td>
              <td>
                <a-DatePicker v-model:value="cpTask.cpGcpJdjc.jcwcsj" :disabled="true"></a-DatePicker>
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">备注</td>
              <td colspan="3">
                <a-textarea v-model:value="cpTask.cpGcpJdjc.bz" :disabled="true"></a-textarea>
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">附件</td>
              <td colspan="2">
                <MUpload :bisId="cpTask.eventId || ''" source="协同处置-gcp监督检查" :maxSize="1024 * 1024 * 50"
                  :disabled="true">
                </MUpload>
              </td>
            </tr>
          </table>
        </div>

        <div v-if="cpTask.cpEvent.category == '4'">
          <div class="panel-heading">
            <div class="panel">沟通交流信息</div>
          </div>
          <table class="my-table">
            <colgroup>
              <col style="width:235px;" />
              <col />
              <col style="width:240px" />
              <col />
            </colgroup>
            <tr>
              <td class="text-blue font-600 text-right">药品通用名称</td>
              <td>
                <a-input v-model:value="cpTask.cpGtjl.yptymc" :disabled="true"></a-input>
              </td>
              <td class="text-blue font-600 text-right">药品批准文号</td>
              <td>
                <a-input v-model:value="cpTask.cpGtjl.yppzwh" :disabled="true"></a-input>
              </td>
            </tr>
            <tr>

            </tr>
            <tr>
              <td class="text-blue font-600 text-right">药品上市许可持有人</td>
              <td colspan="3">
                <a-input v-model:value="cpTask.cpGtjl.ypssxkcyr" :disabled="true"></a-input>
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">主要内容</td>
              <td>
                <a-textarea v-model:value="cpTask.cpGtjl.zynr" :disabled="true"></a-textarea>
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">备注</td>
              <td colspan="3">
                <a-textarea v-model:value="cpTask.cpGtjl.bz" :disabled="true"></a-textarea>
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">附件</td>
              <td colspan="2">
                <MUpload :bisId="cpTask.eventId || ''" source="协同处置-沟通交流" :maxSize="1024 * 1024 * 50" :disabled="true">
                </MUpload>
              </td>
            </tr>
          </table>
        </div>

        <div v-if="cpTask.cpEvent.category == '3' || cpTask.cpEvent.category == '4'">
          <div class="panel-heading">
            <div class="panel">反馈信息</div>
          </div>
          <table class="my-table">
            <colgroup>
              <col style="width:235px;" />
              <col />
              <col style="width:240px" />
              <col />
            </colgroup>
            <tr v-if="cpTask.cpEvent.category == '3'">
              <td class="text-blue font-600 text-right">综合评定结论</td>
              <td>
                <a-radio-group
                  :options="[{ value: '通过', label: '通过' }, { value: '不通过', label: '不通过' }, { value: '其它', label: '其它' }]"
                  v-model:value="cpTask.cpFkxx.zhpdjl" :disabled="!(cpTask.optType > 5 && cpTask.optType < 20)" />
              </td>
            </tr>
            <tr v-if="cpTask.cpEvent.category == '4'">
              <td class="text-blue font-600 text-right">类别</td>
              <td colspan="2">
                <a-radio-group
                  :options="[{ value: '微小', label: '微小' }, { value: '中等', label: '中等' }, { value: '重大', label: '重大' }, { value: '其它', label: '其它' }]"
                  v-model:value="cpTask.cpFkxx.lb" :disabled="!(cpTask.optType > 5 && cpTask.optType < 20)" />
              </td>
            </tr>
            <tr v-if="cpTask.cpFkxx.zhpdjl != '其它' && cpTask.cpFkxx.lb != '其它'">
              <td class="text-blue font-600 text-right">结论说明</td>
              <td colspan="2">
                <a-textarea v-model:value="cpTask.cpFkxx.jlsm"
                  :disabled="!(cpTask.optType > 5 && cpTask.optType < 20)"></a-textarea>
              </td>
            </tr>
            <tr v-else>
              <td class="text-blue font-600 text-right required">结论说明</td>
              <td colspan="2">
                <a-textarea v-model:value="cpTask.cpFkxx.jlsm"
                  :disabled="!(cpTask.optType > 5 && cpTask.optType < 20)"></a-textarea>
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">办理意见</td>
              <td colspan="2">
                <a-textarea v-model:value="cpTask.cpFkxx.blyj"
                  :disabled="!(cpTask.optType > 5 && cpTask.optType < 20)"></a-textarea>
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">附件</td>
              <td colspan="2">
                <MUpload :bisId="cpTask.cpFkxx.id || ''" source="协同处置-反馈意见" :maxSize="1024 * 1024 * 50"
                  :disabled="!(cpTask.optType > 5 && cpTask.optType < 20)"></MUpload>
              </td>
            </tr>
          </table>
        </div>

        <div v-if="cpTask.cpEvent.fileUrl">
          <div class="panel-heading">
            <div class="panel" style="margin-top: 20px">盖章信息</div>
          </div>
          <table class="my-table">
            <tr>
              <td class="text-blue font-600 text-right">盖章人</td>
              <td>{{ cpTask.cpEvent.zsInfo.finishBy }}</td>
              <td class="text-blue font-600 text-right">盖章时间</td>
              <td>{{ cpTask.cpEvent.zsInfo.finishDate }}</td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">盖章文件</td>
              <td>
                <a-button type="primary" @click="ZsXz(cpTask.cpEvent.fileUrl)"> 下载 </a-button>
              </td>
            </tr>
          </table>
        </div>

        <div v-if="cpTask.cpEvent.taskArray.length > 0">
          <div class="panel-heading">
            <div class="panel" style="margin-top: 20px">处理记录</div>
          </div>
          <div class="table1">
            <a-table :columns="columnsArray" :data-source="cpTask.cpEvent.taskArray" :pagination="false" bordered>
            </a-table>
          </div>
        </div>
      </div>
      <div class="ctl-panel">
        <div v-if="cpTask.optType >= 10 && cpTask.cpEvent.category < 3">
          <div>
            <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
              <tr>
                <td class="right tab_apply required">办理意见</td>
                <td class="left" colspan="3">
                  <a-textarea placeholder="请填写办理意见" maxLength="1000" v-model:value="cpTask.comment"
                    :disabled="cpTask.optType > 10" />
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div v-if="isDetail && cpTask.optType != 90 && cpTask.cpEvent.category == '0'" style="padding: 5px;">
          <a-row style="margin:0 auto">
            <a-col :span="24" style="text-align:center">
              <a-button type="primary" @click="qianShou" class="mr-2" v-if="cpTask.optType == 0"> 签收</a-button>
              <a-button type="primary" @click="zanCun" class="mr-2" v-if="cpTask.optType > 0 && cpTask.optType < 20">
                暂存</a-button>
              <a-button type="primary" @click="banJie" class="mr-2" v-if="cpTask.optType > 0 && cpTask.optType < 20">
                办结</a-button>
              <a-button type="primary" @click="zhuanFa" class="mr-2" v-if="cpTask.optType > 5 && cpTask.optType < 20">
                转发</a-button>
              <a-button type="primary" @click="tuiHui" class="mr-2" v-if="cpTask.optType != 90 && cpTask.optType == 10">
                退回</a-button>
            </a-col>
          </a-row>
        </div>
        <div v-if="isDetail && cpTask.optType != 90 && cpTask.cpEvent.category == '2'" style="padding: 5px;">
          <a-row style="margin:0 auto">
            <a-col :span="24" style="text-align:center">
              <a-button type="primary" @click="yiYue" class="mr-2" v-if="cpTask.optType == 0 && !cpTask.prevId">
                已阅</a-button>
              <a-button type="primary" @click="qianShou" class="mr-2"
                v-if="cpTask.optType < 10 && cpTask.prevId != null">
                签收</a-button>
              <a-button type="primary" @click="zanCun" class="mr-2" v-if="cpTask.optType > 5 && cpTask.optType <= 10">
                暂存</a-button>
              <a-popconfirm title="确认通过?" ok-text="确定" cancel-text="取消" @confirm="banJie">
                <a-button type="primary" class="mr-2"
                  v-if="cpTask.optType > 5 && cpTask.optType < 20 && cpTask.cpEvent.currentStep >= 20">
                  通过</a-button>
              </a-popconfirm>
              <ChooseUser @result="getResult" :multiple="false" :force-org-ids="cpTask.orgCode">
                <a-button type="primary" class="mr-2"
                  v-if="cpTask.optType > 5 && cpTask.optType < 20 && cpTask.cpEvent.currentStep == 10">
                  转领导审核</a-button>
              </ChooseUser>
              <a-popconfirm title="确认退回?" ok-text="确定" cancel-text="取消" @confirm="tuiHui">
                <a-button type="primary" class="mr-2" v-if="cpTask.optType != 90 && cpTask.optType == 10">
                  退回</a-button>
              </a-popconfirm>
            </a-col>
          </a-row>
        </div>
        <div v-if="cpTask.optType != 90 && cpTask.cpEvent.category > 2" style="padding: 5px;">
          <a-row style="margin:0 auto">
            <a-col :span="24" style="text-align:center">
              <a-button type="primary" @click="qianShou" class="mr-2" v-if="cpTask.optType == 0"> 签收</a-button>
              <a-button type="primary" @click="yiYue" class="mr-2" v-if="cpTask.optType == 2">
                已阅</a-button>
              <a-button type="primary" @click="zanCun" class="mr-2" v-if="cpTask.optType > 5 && cpTask.optType < 20">
                暂存</a-button>
              <a-button type="primary" @click="banJie" class="mr-2" v-if="cpTask.optType > 5 && cpTask.optType < 20">
                办结</a-button>
              <ChooseUser @result="getResult" :multiple="false">
                <a-button type="primary" class="mr-2" v-if="cpTask.optType > 5 && cpTask.optType < 20">
                  转发</a-button>
              </ChooseUser>
              <!-- <a-button type="primary" @click="tuiHui" class="mr-2" v-if="cpTask.optType != 90 && cpTask.optType == 10">
                退回</a-button> -->
            </a-col>
          </a-row>
        </div>
      </div>
      <a-modal v-model:visible="visible" title="选择接收目标" @ok="handleOk()" width="800px">
        <div style="padding-top: 40px;">
          <a-form>
            <a-row>
              <a-col>
                <a-form-item label="部门" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
                  <JSelectDept v-model:value="params.chushi" :multi="true" :rootOpened="false"></JSelectDept>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row v-if="cpTask.cpEvent.currentStep != 10">
              <a-col>
                <a-form-item label="企业" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
                  <a-input placeholder="企业" v-model:value="params.qymc" style="width: 400px;" />
                  <a-button type="primary" @click="selectQy()" style="float: right;"> 选择</a-button>
                </a-form-item>
              </a-col>
            </a-row>
            <!-- <a-row >
            <a-col>
                <a-form-item label="企业标签" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
                  <j-category-select  v-model:value="params.qyTags" pcode="A02" placeholder="请选择企业标签" multiple="true" @change="getTags"/>
                </a-form-item>
            </a-col>
          </a-row> -->
          </a-form>
        </div>
      </a-modal>
      <selectQyModal @register="registerQyModal" @getSelectResult="getSelectResult"></selectQyModal>
    </template>

  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from 'vue';
import { PageWrapper } from '/@/components/Page';
import { useRoute } from 'vue-router';
import { queryById, qs, saveOrUpdate } from '../CpTask.api'
import { getDictText, getDictItemsByValue, getDictItems, filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { useModal } from '/@/components/Modal';
import { JSelectDept } from '/@/components/Form';
import JCategorySelect from '/@/components/Form/src/jeecg/components/JCategorySelect.vue';
import selectQyModal from '../../rwfb/components/selectQyModal.vue';
import { message } from 'ant-design-vue';
import { defHttp } from '/@/utils/http/axios';
import { formatToDate } from '/@/utils/dateUtil';
import { useGo } from '/@/hooks/web/usePage';
import Tools from '/@/utils/tools';
import JUpload from '/@/components/Form/src/jeecg/components/JUpload/JUpload.vue';
import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';
import UserSelectModal from '/@/components/Form/src/jeecg/components/modal/UserSelectModal.vue';
import ChooseUser from '/@/components/Custom/ChooseUser/ChooseUser.vue';
import { downloadByUrl } from '/@/utils/file/download';
const columnsArray = [
  {
    title: '主办单位',
    align: "center",
    customRender: function (text) {
      if (text.record.orgName || text.record.entName) {
        return text.record.orgName ? text.record.orgName : text.record.entName
      }
    },
    width: '260px'
  },
  {
    title: '状态',
    align: "center",
    dataIndex: 'optType',
    customRender: function (text) {
      return filterDictTextByCache("xtcz_task_state", text.text)
    },
    width: '120px'
  },
  {
    title: '创建时间',
    align: "center",
    dataIndex: 'createTime',
    width: '260px'
  },
  {
    title: '主办人姓名',
    align: "center",
    dataIndex: 'assigneeName',
    width: '140px'
  },
  {
    title: '办理意见',
    align: "center",
    dataIndex: 'comment'
  },
];
export default defineComponent({
  name: 'xtcz-rwcl',
  components: { PageWrapper, JCategorySelect, selectQyModal, JSelectDept, JUpload, MUpload, UserSelectModal, ChooseUser },
  setup() {
    const zgcsAwarry = ref([]);
    const [registerQyModal, { openModal: openQyModal }] = useModal();
    const [registerUserModal, { openModal: openUserModal }] = useModal();
    const route = useRoute();
    const go = useGo();
    const visible = ref(false);
    const refresh = ref(false);
    const params = ref({});
    const zgcs = ref([]);
    const title = ref(route.query.title);
    const isDetail = ref<boolean>(false);
    const cpTask = ref({
      cpEvent: { taskArray: [], zsInfo: {} },
      cpTaskItems: [],
      cpGtjl: {},
      cpGcpJdjc: {},
      cpFkxx: {}
    });
    const disabled = ref<boolean>(true);

    getDictItems("xtcz_zgcs").then(data => zgcsAwarry.value = data);

    function loadData() {
      queryById({ id: route.query?.id }).then((res) => {
        cpTask.value = res;
        if (route.query.isDetail) {
          isDetail.value = false;
        } else {
          isDetail.value = true;
        }
        if (cpTask.value.cpEvent.gcfxcz) {
          if (cpTask.value.cpEvent.gcfxcz.zqzgcs) {
            zgcs.value = cpTask.value.cpEvent.gcfxcz.zqzgcs.split(",");
          }
        }
        // if(cpTask.value.optType==0||cpTask.value.optType==20||cpTask.value.optType==90){
        //   disabled.value=true;
        // }
        // if(cpTask.value.optType==10){
        //   disabled.value=false;
        // }
      });
      refresh.value = true;
    }

    function qianShou() {
      qs({ id: cpTask.value.id }).then((res) => {
        loadData();
      });
    };

    async function zanCun() {
      let pra = unref(cpTask.value);
      if (pra.cpEvent.category > 2) {
        if (pra.cpFkxx.zhpdjl == "其它" || pra.cpFkxx.lb == "其它") {
          if (!pra.cpFkxx.jlsm) {
            return message.info("结论说明不能为空");
          }
        }
      }
      await saveOrUpdate(pra, true);
      loadData();
    };

    async function yiYue() {
      cpTask.value.readTime = new Date();
      cpTask.value.optType = 5;
      await saveOrUpdate(unref(cpTask.value), true);
      loadData();
    }

    async function banJie() {
      defHttp.post({ url: "/xtcz/cpTask/banJie", params: cpTask.value }).then((res) => {
        loadData();
      });
    };

    async function getResult(text) {
      if (!text.isConfirm) {
        return;
      }
      let userInfo = text.data[0];
      if (cpTask.value.cpEvent.category < 3) {
        if (userInfo.orgCodeTxt != cpTask.value.orgName) {
          return message.info("请选择本单位接收目标")
        }
      }
      params.value = unref(cpTask.value);
      params.value.assigneeName = userInfo.realname;
      params.value.assignee = userInfo.id;
      params.value.orgName = userInfo.orgCodeTxt;
      params.value.orgCode = userInfo.orgCode;

      await defHttp.post({ url: "/xtcz/cpTask/zhuanFa", params: params.value });
      loadData();
      visible.value = false;
    }

    async function zhuanFa() {
      openChiose(cpTask);
      loadData();
    };

    function tuiHui() {
      if (!cpTask.value.comment) {
        return message.info("退回时办理意见不能为空")
      }

      defHttp.post({ url: "/xtcz/cpTask/tuiHui", params: cpTask.value }).then((res) => {
        loadData();
      });
    };

    function selectQy() {
      openQyModal(true, {
        showFooter: true,
      });
    }

    function getTags(tes) {
      params.value.qyTags = tes
    };

    function toDetail(record) {
      go({ path: '/rwcl/CpTaskDetail', query: { id: record.id, title: record.cpEvent.title, isDetail: 'false' } });
    }

    async function handleOk() {
      if (!params.value.chushi && !params.value.qyShxydm && !params.value.qyTags) {
        return message.info("未选择接收目标")
      }
      await defHttp.post({ url: "/xtcz/cpTask/zhuanFa", params: params.value });
      loadData();
      visible.value = false;
    }


    function getSelectResult(text) {
      let a = []
      let b = []
      if (text) {
        text.value.forEach((item) => {
          a.push(item.shxydm)
          b.push(item.qymc)
        })
        params.value.qyShxydm = a.toString();
        params.value.qymc = b.toString();
      }
    }

    function toPreview(fj) {
      let url = Tools.getAppInnerUrl() + '/ypsc-api/sys/common/static/' + fj + "?filename=" + subFileName(fj);
      Tools.toPreview(url);
    }

    function subFileName(fj) {
      if (fj) {
        const firstSlashIndex = fj.indexOf('/');
        const fileName = fj.substring(firstSlashIndex + 1);
        return fileName;
      }
    }

    function ZsXz(item) {
      const match = item.replace('https://59.175.169.149:88', '')
      downloadByUrl({
        url: 'http://192.168.0.103:8080' + match,
        target: '_self',
      });
    }

    function openChiose(record) {
      params.value = {};
      visible.value = true;
      params.value = unref(record);
      params.value.chushi = "";
      params.value.qymc = "";
      params.value.qyShxydm = "";
      params.value.qyTags = "";
    }

    loadData();

    return {
      cpTask,
      title,
      visible,
      params,
      isDetail,
      getDictText,
      getDictItemsByValue,
      qianShou,
      zanCun,
      banJie,
      zhuanFa,
      tuiHui,
      selectQy,
      registerQyModal,
      getSelectResult,
      handleOk,
      openChiose,
      getTags,
      formatToDate,
      toDetail,
      toPreview,
      subFileName,
      refresh,
      zgcs,
      zgcsAwarry,
      yiYue,
      getResult,
      columnsArray,
      disabled,
      registerUserModal,
      ZsXz
    };
  }
});
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
  background-color: #eee5de;
}

.table-striped>tr:nth-child(odd)>td,
.table-striped>tr:nth-child(odd)>th {
  background-color: #f9f9f9;
}
</style>