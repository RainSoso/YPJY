<template>
  <PageWrapper>
    <template #headerContent>
      <div class="panel-heading">
        <div class="panel">事项信息</div>
      </div>
      <table class="my-table">
        <colgroup>
          <col style="width:235px;" />
          <col />
          <col style="width:240px" />
          <col />
        </colgroup>
        <tr v-if="cpEvent.category < 3">
          <td class="text-blue font-600 text-right">事项标题</td>
          <td colspan="3">
            {{ cpEvent.title }}
          </td>
        </tr>
        <tr v-if="cpEvent.category == 3">
          <td class="text-blue font-600 text-right">事项标题</td>
          <td colspan="3">
            {{ getDictText("xtcz_sxfl", cpEvent.category) + "-" + (cpEvent.cpGcpJdjc.jgmc || "") + "-" + cpEvent.code }}
          </td>
        </tr>
        <tr v-if="cpEvent.category == 4">
          <td class="text-blue font-600 text-right">事项标题</td>
          <td colspan="3">
            {{ getDictText("xtcz_sxfl", cpEvent.category) + "-" + (cpEvent.cpGtjl.yptymc || "") + "-" + cpEvent.code }}
          </td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">事项编号</td>
          <td>{{ cpEvent.code }}</td>
          <td class="text-blue font-600 text-right">事项分类</td>
          <td>{{ getDictText("xtcz_sxfl", cpEvent.category) }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">发起人</td>
          <td>{{ cpEvent.leader }}</td>
          <td class="text-blue font-600 text-right">状态</td>
          <td>{{ getDictText("xtcz_state", cpEvent.state + "") }}<span
              v-if="cpEvent.currentStep != null && cpEvent.state != 20">({{ getDictText("xtcz_currentStep",
                cpEvent.currentStep + "") }})</span></td>
        </tr>
        <tr v-if="cpEvent.category < 3">
          <td class="text-blue font-600 text-right">截止时间</td>
          <td>
            <a-DatePicker v-model:value="cpEvent.closingDate" :disabled="true"></a-DatePicker>
          </td>
        </tr>
        <tr v-if="cpEvent.category < 3">
          <td class="text-blue font-600 text-right">内容</td>
          <td colspan="3">
            <a-input v-model:value="cpEvent.content" :disabled="true"></a-input>
          </td>
        </tr>
        <tr v-if="cpEvent.category < 3">
          <td class="text-blue font-600 text-right">备注</td>
          <td colspan="3">
            <a-textarea v-model:value="cpEvent.remarks" :disabled="true"></a-textarea>
          </td>
        </tr>
        <tr v-if="cpEvent.category < 3">
          <td class="text-blue font-600 text-right">附件</td>
          <td>
            <j-upload v-model:value="cpEvent.attaches" text="上传" number="1" :bizPath="'xtcz'"
              :disabled="true"></j-upload>
          </td>
        </tr>
      </table>
    </template>
    <template #footer>
      <div v-if="cpEvent.category == '0'">
        <div>
          <div class="panel-heading">
            <div class="panel" style="margin-top: 20px">
              反馈信息
            </div>
          </div>
          <div class="my-table">
            <colgroup>
              <col style="width:235px;" />
              <col />
              <col />
              <col />
            </colgroup>
            <table style="width: 100%" class="my-table text-center">
              <tr class="text-blue font-600 text-center">
                <td>
                  名称
                </td>
                <td>
                  类型
                </td>
                <td>
                  是否必填
                </td>
                <td>
                  内容
                </td>
              </tr>
              <tr v-for="item in eventItems" :key="item">
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ getDictText('xtcz_widgetType', item.widgetType) }}
                </td>
                <td>
                  {{ item.required == 0 ? "是" : "否" }}
                </td>
                <td>
                  <a-input disabled v-if="item.widgetType == 'string'" v-model:value="item.value" />
                  <a-input-number disabled v-if="item.widgetType == 'int'" v-model:value="item.value" />
                  <a-input-number disabled v-if="item.widgetType == 'double'" v-model:value="item.value" :step="0.01" />
                  <a-date-picker disabled v-if="item.widgetType == 'date'" v-model:value="item.value" />
                  <a-date-picker disabled show-time placeholder="请选择时间" v-if="item.widgetType == 'dateTime'"
                    v-model:value="item.value" />
                  <a-textarea disabled v-if="item.widgetType == 'textarea'" v-model:value="item.value" />
                  <JUpload disabled v-if="item.widgetType == 'file'" bizPath="xtcz" :maxCount="1"
                    v-model:value="item.value">
                  </JUpload>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div v-if="cpEvent.category == '2'">
        <div class="panel-heading">
          <div class="panel" style="margin-top: 20px">国抽药品检验信息
          </div>
        </div>
        <table class="my-table">
          <colgroup>
            <col style="width:235px;" />
            <col />
            <col style="width:240px" />
            <col />
          </colgroup>
          <tr class="text-green font-600 text-center">
            <td colspan="4">基本信息</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">计划名称</td>
            <td colspan="3">
              <a-input v-model:value="cpEvent.gcfxcz.jhmc" placeholder="请输入计划名称" :disabled="true" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">品种名称</td>
            <td>
              <a-input v-model:value="cpEvent.gcfxcz.pzmc" placeholder="请输入品种名称" :disabled="true" />
            </td>
            <td class="text-blue font-600 text-right">药品通用名称</td>
            <td>
              <a-input v-model:value="cpEvent.gcfxcz.yptymc" placeholder="请输入药品通用名称" :disabled="true" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">标示生产企业名称</td>
            <td>
              <a-input v-model:value="cpEvent.gcfxcz.bsscqymc" placeholder="请输入标示生产企业名称" :disabled="true" />
            </td>
            <td class="text-blue font-600 text-right">生产企业所在省份</td>
            <td>
              <a-input v-model:value="cpEvent.gcfxcz.scqyszsf" placeholder="请输入生产企业所在省份" :disabled="true" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">涉及的样品批号</td>
            <td>
              <a-input v-model:value="cpEvent.gcfxcz.sjypph" placeholder="请输入涉及的样品批号" :disabled="true" />
            </td>
            <td class="text-blue font-600 text-right">涉及样品批数</td>
            <td>
              <a-input v-model:value="cpEvent.gcfxcz.sjypps" placeholder="请输入涉及样品批数" :disabled="true" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">药品批准文号</td>
            <td>
              <a-input v-model:value="cpEvent.gcfxcz.yppzwh" placeholder="请输入药品批准文号" :disabled="true" />
            </td>
            <td class="text-blue font-600 text-right">风险类别</td>
            <td>
              <a-input v-model:value="cpEvent.gcfxcz.fxllb" placeholder="请输入风险类别" :disabled="true" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">研究结果描述及原因分析</td>
            <td colspan="3">
              <a-textarea v-model:value="cpEvent.gcfxcz.jgfx" placeholder="请输入研究结果描述及原因分析" :disabled="true" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">检验单位</td>
            <td>
              <a-input v-model:value="cpEvent.gcfxcz.jydw" placeholder="请输入检验单位" :disabled="true" />
            </td>
            <td class="text-blue font-600 text-right">检验单位电话</td>
            <td>
              <a-input v-model:value="cpEvent.gcfxcz.jydwdh" placeholder="请输入检验单位电话" :disabled="true" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">国家局处理情况</td>
            <td colspan="3">
              <a-input v-model:value="cpEvent.gcfxcz.gjjclqk" placeholder="请输入国家局处理情况" :disabled="true" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">备注</td>
            <td colspan="3">
              <a-textarea v-model:value="cpEvent.gcfxcz.bz" placeholder="请输入备注" :disabled="true" />
            </td>
          </tr>

          <template v-if="cpEvent.state > 9">
            <tr class="text-green font-600 text-center">
              <td colspan="4">企业填报信息</td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">企业排查情况</td>
              <td colspan="3">是否开展排查
                <a-radio-group v-model:value="cpEvent.gcfxcz.iskzdc" :disabled="true">
                  <a-radio :value="1">是</a-radio>
                  <a-radio :value="2">否</a-radio>
                </a-radio-group>
              </td>
            </tr>
            <template v-if="cpEvent.gcfxcz.iskzdc == 1">
              <tr>
                <td class="text-blue font-600 text-right">是否按探索性研究方法进行检测</td>
                <td>
                  <a-radio-group v-model:value="cpEvent.gcfxcz.istsyjjc" :disabled="true">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
                <td class="text-blue font-600 text-right" v-if="cpEvent.gcfxcz.istsyjjc == 1">是否重现探索性研究方案</td>
                <td v-if="cpEvent.gcfxcz.istsyjjc == 1">
                  <a-radio-group v-model:value="cpEvent.gcfxcz.iscxtsjg" :disabled="true">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
              </tr>
              <tr>
                <td class="text-blue font-600 text-right">是否对相关药品或原辅包按现行标准进行检验</td>
                <td>
                  <a-radio-group v-model:value="cpEvent.gcfxcz.isbzjy" :disabled="true">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
                <td class="text-blue font-600 text-right" v-if="cpEvent.gcfxcz.isbzjy == 1">是否符合规定</td>
                <td v-if="cpEvent.gcfxcz.isbzjy == 1">
                  <a-radio-group v-model:value="cpEvent.gcfxcz.isfhgd" :disabled="true">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
              </tr>
              <tr>
                <td class="text-blue font-600 text-right">是否对涉事药品生产相关环节和因素进行检查或自查</td>
                <td>
                  <a-radio-group v-model:value="cpEvent.gcfxcz.isjchzc" :disabled="true">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
                <td class="text-blue font-600 text-right" v-if="cpEvent.gcfxcz.isjchzc == 1">是否发现探索性研究结果相关的缺陷或问题</td>
                <td v-if="cpEvent.gcfxcz.isjchzc == 1">
                  <a-radio-group v-model:value="cpEvent.gcfxcz.isfxqxwt1" :disabled="true">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
              </tr>
              <tr>
                <td class="text-blue font-600 text-right">是否开展其它方式的排查</td>
                <td>
                  <a-radio-group v-model:value="cpEvent.gcfxcz.iskzqtpc" :disabled="true">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
                <td class="text-blue font-600 text-right" v-if="cpEvent.gcfxcz.iskzqtpc == 1">是否发现探索性研究结果相关的缺陷或问题</td>
                <td v-if="cpEvent.gcfxcz.iskzqtpc == 1">
                  <a-radio-group v-model:value="cpEvent.gcfxcz.isfxqxwt2" :disabled="true">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
              </tr>
              <tr>
                <td class="text-blue font-600 text-right">根据排查情况，是否找到或分析生产企业自身产生探索性研究所件问题的原因</td>
                <td colspan="3">
                  <a-radio-group v-model:value="cpEvent.gcfxcz.iszdyy" :disabled="true">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
              </tr>
              <tr>
                <td class="text-blue font-600 text-right">承检机构针对探索性研究发现问题可能原因的分析对生产企业是否有指导意义或参考价值</td>
                <td colspan="3">
                  <a-radio-group v-model:value="cpEvent.gcfxcz.isckjz" :disabled="true">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                  </a-radio-group>
                </td>
              </tr>
            </template>
            <!-- <tr class="text-green font-600 text-center">
              <td colspan="4">提示的质里风险和问题</td>
            </tr> -->
            <tr>
              <td class="text-blue font-600 text-right">提示的质里风险和问题</td>
              <td colspan="3">生产企业是否认可探索性研究结果
                <a-radio-group v-model:value="cpEvent.gcfxcz.isrkxjjg" :disabled="true">
                  <a-radio :value="1">是</a-radio>
                  <a-radio :value="2">否</a-radio>
                </a-radio-group>
              </td>
            </tr>
            <tr v-if="cpEvent.gcfxcz.isrkxjjg == 2">
              <td class="text-blue font-600 text-right"></td>
              <td colspan="3">生产企业不认可探索性研究结果的主要理由（限3000字）
                <a-textarea v-model:value="cpEvent.gcfxcz.zyly" placeholder="请输入生产企业不认可探索性研究结果的主要理由" :disabled="true" />
              </td>
            </tr>
            <!-- <tr class="text-green font-600 text-center">
              <td colspan="4">企业整改情况</td>
            </tr> -->
            <tr>
              <td class="text-blue font-600 text-right">企业整改情况</td>
              <td colspan="3">是否采取整改措施
                <a-radio-group v-model:value="cpEvent.gcfxcz.iscqzgcs" :disabled="true">
                  <a-radio :value="1">是</a-radio>
                  <a-radio :value="2">否</a-radio>
                </a-radio-group>
              </td>
            </tr>
            <tr v-if="cpEvent.gcfxcz.iscqzgcs == 1">
              <td class="text-blue font-600 text-right"></td>
              <td colspan="3">采取的整改措施:
                <a-checkbox-group v-model:value="zgcs" name="checkboxgroup" :options="zgcsAwarry" disabled />
              </td>
            </tr>
            <!-- <tr class="text-green font-600 text-center">
              <td colspan="4">附件</td>
            </tr> -->
            <tr>
              <td class="text-blue font-600 text-right">附件</td>
              <td colspan="3">
                <MUpload :bisId="cpEvent.gcfxcz.id" source="国抽药品检验信息" :disabled="true"></MUpload>
              </td>
            </tr>
          </template>
        </table>
      </div>
      <div v-if="cpEvent.category == '3'">
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
              <a-input v-model:value="cpEvent.cpGcpJdjc.jgmc" :disabled="true"></a-input>
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">检查分类</td>
            <td>
              <a-radio-group
                :options="[{ value: '日常监督检查', label: '日常监督检查' }, { value: '常规检查', label: '常规检查' }, { value: '有因检查', label: '有因检查' }]"
                v-model:value="cpEvent.cpGcpJdjc.jcfl" :disabled="true" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">主要内容</td>
            <td colspan="3">
              <a-textarea v-model:value="cpEvent.cpGcpJdjc.zynr" :disabled="true"></a-textarea>
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">备案时间</td>
            <td>
              <a-DatePicker v-model:value="cpEvent.cpGcpJdjc.basj" :disabled="true"></a-DatePicker>
            </td>
            <td class="text-blue font-600 text-right">检查完成时间</td>
            <td>
              <a-DatePicker v-model:value="cpEvent.cpGcpJdjc.jcwcsj" :disabled="true"></a-DatePicker>
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">备注</td>
            <td colspan="3">
              <a-textarea v-model:value="cpEvent.cpGcpJdjc.bz" :disabled="true"></a-textarea>
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">附件</td>
            <td colspan="2">
              <MUpload :bisId="cpEvent.id || ''" source="协同处置-gcp监督检查" :maxSize="1024 * 1024 * 50" :disabled="true">
              </MUpload>
            </td>
          </tr>
        </table>
      </div>

      <div v-if="cpEvent.category == '4'">
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
              <a-input v-model:value="cpEvent.cpGtjl.yptymc" :disabled="true"></a-input>
            </td>
            <td class="text-blue font-600 text-right">药品批准文号</td>
            <td>
              <a-input v-model:value="cpEvent.cpGtjl.yppzwh" :disabled="true"></a-input>
            </td>
          </tr>
          <tr>

          </tr>
          <tr>
            <td class="text-blue font-600 text-right">药品上市许可持有人</td>
            <td colspan="3">
              <a-input v-model:value="cpEvent.cpGtjl.ypssxkcyr" :disabled="true"></a-input>
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">主要内容</td>
            <td>
              <a-textarea v-model:value="cpEvent.cpGtjl.zynr" :disabled="true"></a-textarea>
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">备注</td>
            <td colspan="3">
              <a-textarea v-model:value="cpEvent.cpGtjl.bz" :disabled="true"></a-textarea>
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">附件</td>
            <td colspan="2">
              <MUpload :bisId="cpEvent.id || ''" source="协同处置-沟通交流" :maxSize="1024 * 1024 * 50" :disabled="true">
              </MUpload>
            </td>
          </tr>
        </table>
      </div>

      <div v-if="cpEvent.category == '3' || cpEvent.category == '4'">
        <div v-if="cpEvent.cpFkxx">
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
            <tr v-if="cpEvent.category == '3'">
              <td class="text-blue font-600 text-right">综合评定结论</td>
              <td>
                <a-radio-group
                  :options="[{ value: '通过', label: '通过' }, { value: '不通过', label: '不通过' }, { value: '其它', label: '其它' }]"
                  v-model:value="cpEvent.cpFkxx.zhpdjl" :disabled="true" />
              </td>
            </tr>
            <tr v-if="cpEvent.category == '4'">
              <td class="text-blue font-600 text-right">类别</td>
              <td colspan="2">
                <a-radio-group
                  :options="[{ value: '微小', label: '微小' }, { value: '中等', label: '中等' }, { value: '重大', label: '重大' }, { value: '其它', label: '其它' }]"
                  v-model:value="cpEvent.cpFkxx.lb" :disabled="true" />
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">结论说明</td>
              <td colspan="2">
                <a-textarea v-model:value="cpEvent.cpFkxx.jlsm" :disabled="true"></a-textarea>
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">办理意见</td>
              <td colspan="2">
                <a-textarea v-model:value="cpEvent.cpFkxx.blyj" :disabled="true"></a-textarea>
              </td>
            </tr>
            <tr>
              <td class="text-blue font-600 text-right">附件</td>
              <td colspan="2">
                <MUpload :bisId="cpEvent.cpFkxx.id || ''" source="协同处置-反馈意见" :maxSize="1024 * 1024 * 50"
                  :disabled="true">
                </MUpload>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div v-if="cpEvent.fileUrl">
        <div class="panel-heading">
          <div class="panel" style="margin-top: 20px">盖章信息</div>
        </div>
        <table class="my-table">
          <tr>
            <td class="text-blue font-600 text-right">盖章人</td>
            <td>{{ cpEvent.zsInfo.finishBy }}</td>
            <td class="text-blue font-600 text-right">盖章时间</td>
            <td>{{ cpEvent.zsInfo.finishDate }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">盖章文件</td>
            <td>
              <a-button type="primary" @click="ZsXz(cpEvent.fileUrl)"> 下载 </a-button>
            </td>
          </tr>
        </table>
      </div>

      <div v-if="cpEvent.cpTasks.length > 0">
        <div class="panel-heading">
          <div class="panel" style="margin-top: 20px">处理记录</div>
        </div>
        <div class="table1">
          <a-table :columns="columnsArray" :data-source="cpEvent.taskArray" :pagination="false" bordered>
            <!-- <template #action="{ record }">
              <span v-if="record.optType ==0&&record.prevId==null">
                <a-popconfirm title="确认撤回?" ok-text="确认" cancel-text="取消" @confirm="confirm(record)">
                  <a>撤回</a>
                </a-popconfirm>
              </span>            
            </template> -->
          </a-table>
        </div>
      </div>
    </template>
  </PageWrapper>
  <selectQyModal @register="registerQyModal" @getSelectResult="getSelectResult"></selectQyModal>
  <selectScpzModal @register="registerScpzModal" @getSelectResult="getPzSelectResult"></selectScpzModal>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from 'vue';
import { PageWrapper } from '/@/components/Page';
import { useRoute } from 'vue-router';
import { chuslist, queryById, addCpEvent } from '../CpEvent.api';
import { getDictText } from '/@/utils/dict/JDictSelectUtil';
import { deleteOne } from '/@/views/ypsczhjg/xtcz/rwcl/CpTask.api';
import { filterDictTextByCache, getDictItems } from '/@/utils/dict/JDictSelectUtil';
import { useGo } from '/@/hooks/web/usePage';
import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';
import Tools from '/@/utils/tools';
import { saveOrUpdate } from '../CpEvent.api';
import { message } from 'ant-design-vue';
import { useModal } from '/@/components/Modal';
import { defHttp } from '/@/utils/http/axios';
import selectQyModal from '../components/selectQyModal.vue';
import JSelectDept from '/@/components/Form/src/jeecg/components/JSelectDept.vue';
import selectScpzModal from './selectScpzModal.vue';
import JUpload from '/@/components/Form/src/jeecg/components/JUpload/JUpload.vue';
import { downloadByUrl } from '/@/utils/file/download';
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
const columnsArray = [
  {
    title: '主办单位',
    align: "center",
    customRender: function (text) {
      if (text.record.orgName || text.record.entName) {
        return text.record.orgName ? text.record.orgName : text.record.entName
      }
    },
    width: '300px'
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
    width: '150px'
  },
  {
    title: '办理意见',
    align: "center",
    dataIndex: 'comment'
  },
  // {
  //   title: '操作',
  //   key: 'action',
  //   align: "center",
  //   slots: { customRender: 'action' },
  // }
];
export default defineComponent({
  name: 'xtcz-rwfb',
  components: { PageWrapper, MUpload, JSelectDept, selectQyModal, selectScpzModal, JUpload, JDictSelectTag },
  setup() {
    const zgcsAwarry = ref([]);
    const go = useGo();
    const route = useRoute();
    const data = ref([]);
    const zgcs = ref([]);
    const params = ref({});
    const qy = ref({})
    const visible = ref(false);
    const fkxxModel = ref(false);
    const eventItem = ref({});
    const eventItems = ref([]);
    const cpEvent = ref({
      eventItems: [],
      cpTasks: [],
      zsInfo: {},
      cpGcpJdjc: {},
      gcfxcz: {},
      cpGtjl: {},
      cpfkxx: {}
    });
    const taskArray = ref([])
    const [registerQyModal, { openModal: openQyModal }] = useModal();
    const [registerScpzModal, { openModal: openPzModal }] = useModal();
    getDictItems("xtcz_zgcs").then(data => zgcsAwarry.value = data);

    getQuery();

    function getQuery() {
      if (route.query?.id) {
        queryById({ id: route.query?.id }).then((res) => {
          cpEvent.value = res;
          if (cpEvent.value.gcfxcz) {
            if (cpEvent.value.gcfxcz.zqzgcs) {
              zgcs.value = cpEvent.value.gcfxcz.zqzgcs.split(",");
            }
            if (cpEvent.value.chushi) {
              params.value.chushi = cpEvent.value.chushi
            }
            if (cpEvent.value.qymc) {
              qy.value.qymc = cpEvent.value.qymc
              qy.value.qyShxydm = cpEvent.value.qyShxydm
            }
          }
          if (cpEvent.value.eventItems) {
            eventItems.value = cpEvent.value.eventItems;
          }
        });
      } else {
        if (route.query?.category) {
          if (!cpEvent.value.id) {
            addCpEvent({ category: route.query?.category }).then((res) => {
              cpEvent.value.code = res.code;
              cpEvent.value.category = res.category;
              cpEvent.value.leader = res.leader;
              cpEvent.value.orgCode = res.orgCode;
              cpEvent.value.id = res.id;
            });
          }
        }
      }
    }

    async function confirm(record) {
      await deleteOne({ id: record.id }, handleSuccess);
    }

    function handleSuccess() {
      queryById({ id: route.query?.id }).then((res) => {
        cpEvent.value = res;
      });
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

    function getTags(tes) {
      params.value.qyTags = tes
    }

    function selectQy() {
      openQyModal(true, {
        showFooter: true,
      });
    }

    function selectPz() {
      openPzModal(true, {
        showFooter: true,
      });
    }

    function onExportWord() {
      defHttp.post({ url: "/xtcz/cpEvent/exportWord" })
    }

    function getSelectResult(text) {
      let a = []
      let b = []
      if (text) {
        text.value.forEach((item) => {
          a.push(item.shxydm)
          b.push(item.qymc)
        })
        qy.value.qymc = b.toString();
        qy.value.qyShxydm = a.toString()
      }
    }

    function getPzSelectResult(text) {
      let a = cpEvent.value.gcfxcz;
      a.pzmc = text.ypspmc
      a.yptymc = text.yptymc
      a.bsscqymc = text.ypscqymc
      a.scqyszsf = text.areaCode.split(0, 1) == "42" ? "湖北" : "";
      a.yppzwh = text.yppzwh
      a.shxydm = text.shxydm
      a.xzqhdm = text.areaCode
      cpEvent.value.title = a.jhmc
      cpEvent.value.content = a.jhmc + " - " + a.yptymc + " - " + a.bsscqymc;
    }

    async function zancun() {
      cpEvent.value.eventItems = eventItems.value;
      if (cpEvent.value.category == 3) {
        cpEvent.value.title = getDictText("xtcz_sxfl", cpEvent.value.category) + "-" + (cpEvent.value.cpGcpJdjc.jgmc || "") + "-" + cpEvent.value.code
      }
      if (cpEvent.value.category == 4) {
        cpEvent.value.title = getDictText("xtcz_sxfl", cpEvent.value.category) + "-" + (cpEvent.value.cpGtjl.yptymc || "") + "-" + cpEvent.value.code
      }
      await saveOrUpdate(cpEvent.value, true);
      getQuery();
    }

    function toDetail(record) {
      record.cpEvent = cpEvent.value;
      go({ path: '/rwcl/CpTaskDetail', query: { id: record.id, title: record.cpEvent.title, isDetail: "false" } })
    }

    function openChiose() {
      params.value = {};
      qy.value = {};
      visible.value = true;
    }

    async function send() {
      if (cpEvent.value.category == 3) {
        cpEvent.value.title = getDictText("xtcz_sxfl", cpEvent.value.category) + "-" + (cpEvent.value.cpGcpJdjc.jgmc || "") + "-" + cpEvent.value.code
      }
      if (cpEvent.value.category == 4) {
        cpEvent.value.title = getDictText("xtcz_sxfl", cpEvent.value.category) + "-" + (cpEvent.value.cpGtjl.yptymc || "") + "-" + cpEvent.value.code
      }
      cpEvent.value.eventItems = eventItems.value;
      let par = unref(cpEvent.value)
      if (cpEvent.value.category < 3) {
        if (!params.value.chushi && !qy.value.qyShxydm && !qy.value.qyTags) {
          return message.info("未选择接收目标")
        }
        if (qy.value.qymc) {
          par.qymc = qy.value.qymc;
          par.qyShxydm = qy.value.qyShxydm;
        }
        if (params.value.chushi) {
          par.chushi = params.value.chushi;
        }
      }
      await defHttp.post({ url: "/xtcz/cpEvent/addTo", params: par });
      if (route.query?.category) {
        go({ path: '/rwfb/CpEventDetail', query: { id: cpEvent.value.id } });
      }
      getQuery();
    }

    async function handleOk() {
      if (!params.value.chushi && !qy.value.qyShxydm && !qy.value.qyTags) {
        return message.info("未选择接收目标")
      }
      let par = unref(cpEvent.value)
      if (qy.value.qymc) {
        par.qymc = qy.value.qymc;
        par.qyShxydm = qy.value.qyShxydm;
      }
      if (params.value.chushi) {
        par.chushi = params.value.chushi;
      }
      await defHttp.post({ url: "/xtcz/cpEvent/addTo", params: par });
      getQuery();
      visible.value = false;
    }

    function addFkxx() {
      eventItem.value = {}
      fkxxModel.value = true
    }

    function fkxxModelOk() {
      if (eventItem.value.name && eventItem.value.widgetType) {
        eventItems.value.push(eventItem.value)
        fkxxModel.value = false
      } else {
        message.info("反馈信息名字或类型不能为空")
      }
    }

    function deleteOnefkxx(record) {
      let arr = [];
      for (let i = 0; i < eventItems.value.length; i++) {
        if (eventItems.value[i].name != record.name) {
          arr.push(eventItems.value[i])
        }
      }
      eventItems.value = arr;
    }

    return {
      data,
      cpEvent,
      getDictText,
      confirm,
      toDetail,
      send,
      zgcs,
      zgcsAwarry,
      toPreview,
      subFileName,
      zancun,
      getQuery,
      openChiose,
      handleOk,
      registerQyModal,
      openQyModal,
      registerScpzModal,
      openPzModal,
      getSelectResult,
      getPzSelectResult,
      getTags,
      visible,
      params,
      selectQy,
      useModal,
      taskArray,
      qy,
      columnsArray,
      onExportWord,
      selectPz,
      ZsXz,
      fkxxModel,
      fkxxModelOk,
      addFkxx,
      eventItems,
      eventItem,
      deleteOnefkxx
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
  padding: 0px;
  background-color: #eee5de;
  width: 100%;
}

.table-striped>tr:nth-child(odd)>td,
.table-striped>tr:nth-child(odd)>th {
  background-color: #f9f9f9;
}
</style>