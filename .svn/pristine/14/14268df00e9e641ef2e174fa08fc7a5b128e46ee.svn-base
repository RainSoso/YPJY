<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="800" @ok="handleSubmit">
    <div class="panel-heading">
      <div class="panel" style="margin-top: 20px">基本信息</div>
    </div>
    <div class="table1">
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr>
          <td class="right tab_apply required">上市许可持有人企业名称</td>
          <td class="left">
            {{ params.qymc }}
          </td>
          <td class="right tab_apply required">统一社会信用代码</td>
          <td class="left">
            {{ params.shxydm }}
          </td>
        </tr>
        <tr>
          <td class="right tab_apply required">计划生产年份</td>
          <td class="left">
            {{ params.jhYear }}
          </td>
          <td class="right tab_apply required">计划表名</td>
          <td class="left">
            {{ getDictText("tysc_title", params.jhTitle) }}
          </td>
        </tr>
      </table>
    </div>
    <div class="panel-heading" v-if="params.jhTitle == 3 && params.qylx == 1">
      <div class="panel" style="margin-top: 20px">生产信息
      </div>
    </div>
    <div class="table1" v-if="params.jhTitle == 3 && params.qylx == 1">
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr>
          <td class="right tab_apply ">生产药品名称</td>
          <td class="left">
            {{ params.scypmc }}
          </td>
          <td class="right tab_apply ">药品批准文号（备案号）</td>
          <td class="left">
            {{ params.scyppzwh }}
          </td>
        </tr>
        <tr style="color: brown;">
          <td class="right tab_apply ">{{ params.jhYear || "" }}计划生产总量</td>
          <td class="left">
            {{ scxx.jhscl||"" }}L
          </td>
          <td class="right tab_apply ">{{ params.jhYear || "" }}计划用罂粟壳总量</td>
          <td class="left">
            {{ scxx.jhxyl||"" }}公斤
          </td>
        </tr>
        <tr style="color: brown;">
          <td class="right tab_apply ">{{ params.jhYear-1 || "" }}预计生产总量</td>
          <td class="left">
            {{ scxx.yjscl||"" }}L
          </td>
          <td class="right tab_apply ">{{ params.jhYear-1 || "" }}预计用罂粟壳总量</td>
          <td class="left">
            {{ scxx.yjxyl ||""}}公斤
          </td>
        </tr>
        <tr style="color: brown;">
          <td class="right tab_apply ">{{ params.jhYear-1 || "" }}预计销售总量</td>
          <td class="left">
            {{ scxx.yjxsl ||""}}L
          </td>
          <td class="right tab_apply ">{{ params.jhYear-1 || "" }}预计销售用罂粟壳总量</td>
          <td class="left">
            {{ scxx.yjxsxyl||"" }}公斤
          </td>
        </tr>
        <tr>
          <td colspan="4">生产信息(<a @click="showList()">点击查看详情</a>)</td>
        </tr>
      </table>
      <a-table :dataSource="scpzList" :columns="columns" bordered style="width: 1180px;" v-if="scpzList.length > 0&&show"
        :pagination="false">
        <template #action="{ text, record }">
          <span>
            <a @click="showInfo(record)">详情</a>
          </span>
        </template>
      </a-table>
    </div>

    <div class="panel-heading" v-if="params.jhTitle == 3 && params.qylx == 2">
      <div class="panel" style="margin-top: 20px">购销信息
      </div>
    </div>
    <div class="table1" v-if="params.jhTitle == 3 && params.qylx == 2">
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr style="color: brown;">
          <td class="right tab_apply ">{{ params.jhYear-1 || "" }}销售总量</td>
          <td class="left">
            {{ gxxx.yjxsl ||""}}公斤
          </td>
          <td class="right tab_apply ">{{ params.jhYear-1 || "" }}购进总量</td>
          <td class="left">
            {{ gxxx.yjgjl||"" }}公斤
          </td>
        </tr>
        <tr>
          <td colspan="4"> {{ params.jhYear -1|| "" }}年计划购销信息(<a @click="showGxlist()">点击查看详情</a>)
          </td>
        </tr>
      </table>
      <a-table :dataSource="scpzGxList" :columns="columns1" bordered style="width: 1180px;" v-if="scpzGxList.length > 0&&showGx"
        :pagination="false">
      </a-table>
    </div>

    <div class="panel-heading" v-if="params.jhTitle != 3">
      <div class="panel" style="margin-top: 20px">生产信息</div>
    </div>
    <div class="table1" v-if="params.jhTitle != 3">
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr>
          <td class="right tab_apply required">生产药品名称</td>
          <td class="left">
            {{ params.scypmc }}
          </td>
          <td class="right tab_apply required">药品批准文号（备案号）</td>
          <td class="left">
            {{ params.scyppzwh }}
          </td>
        </tr>
        <tr>
          <td class="right tab_apply required">规格</td>
          <td class="left">
            {{ params.ypgg }}
          </td>
          <td class="right tab_apply required">单位</td>
          <td class="left">
            {{ params.dw }}
          </td>
        </tr>
        <tr>
          <td class="right tab_apply required">生产药品现有库存</td>
          <td class="left">
            {{ params.scypkc }}
          </td>
          <td class="right tab_apply required">{{ params.jhYear - 1 }}年预计生产药品年底库存</td>
          <td class="left">
            {{ params.yjscypkc }}
          </td>
        </tr>
        <tr v-if="params.jhTitle == 2">
          <td class="tab_apply required">{{ params.jhYear - 1 }}年预计销售量</td>
          <td class="left"> {{ params.yjxsl }}</td>
        </tr>
        <tr>
          <td class="right tab_apply required">{{ params.jhYear }}企业计划生产量</td>
          <td class="left">
            {{ params.qyJhscl }}
          </td>
          <td class="right tab_apply required">{{ params.jhYear - 1 }}年国家下达生产量</td>
          <td class="left">
            {{ params.gjxdscl }}
          </td>
        </tr>
        <tr>
          <td class="tab_apply required">{{ params.jhYear - 1 }}年实际生产量(1-5月)</td>
          <td class="left">
            {{ params.sjscl1 }}
          </td>
          <td class="tab_apply required">{{ params.jhYear - 1 }}年实际生产量(6-9月)</td>
          <td class="left">
            {{ params.sjscl2 }}
          </td>
        </tr>
        <tr>
          <td class="tab_apply required">{{ params.jhYear - 1 }}年预计生产量(10-12月)</td>
          <td class="left">
            {{ params.sjscl4 }}
          </td>
          <td class="tab_apply required" style="color: brown;">{{ params.jhYear - 1 }}年预计总生产量</td>
          <td class="left" style="color: brown;">
            {{ (parseFloat(params.sjscl1) * 10000 + parseFloat(params.sjscl2) * 10000 + parseFloat(params.sjscl4) * 10000) / 10000 || ""
            }}
          </td>
        </tr>
        <tr>
          <td class="tab_apply required" v-if="params.sjscl3">{{ params.jhYear - 1 }}年实际生产量(10-12月)</td>
          <td class="left" v-if="params.sjscl3">
            {{ params.sjscl3 }}
          </td>
          <td class="tab_apply required" v-if="params.sjscl5">{{ params.jhYear }}年实际生产量(1-5月)</td>
          <td class="left" v-if="params.sjscl5">
            {{ params.sjscl5 }}
          </td>
        </tr>
        <tr>
          <td class="right tab_apply required" v-if="params.jhTitle == 0">生产药品收购单位</td>
          <td class="left" v-if="params.jhTitle == 0" colspan="3">
            {{ sgdw }}
          </td>
        </tr>
      </table>
    </div>
    <div class="panel-heading">
      <div class="panel" style="margin-top: 20px"></div>需用信息（{{ params.ylydw }}）
    </div>
    <div class="table1">
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr>
          <td class="right tab_apply required">需用原料药名称</td>
          <td class="left">{{ params.xyylymc }}</td>
          <td class="right tab_apply required">原料药品批准文号（备案号）</td>
          <td class="left">{{ params.xyylypzwh }}</td>
        </tr>
        <tr>
          <td class="tab_apply required">原料药供应单位</td>
          <td class="left">{{ params.gydwmc }}</td>
          <td class="tab_apply required" v-if="params.jhTitle == 0">所需原料折算系数</td>
          <td class="left" v-if="params.jhTitle == 0">{{ params.sxylzsxs }}</td>
        </tr>
        <tr>
          <td class="tab_apply required">企业原料药现有库存量</td>
          <td class="left"> {{ params.xyylykc }}</td>
          <td class="right tab_apply required">{{ params.jhYear - 1 }}年预计原料药年底库存</td>
          <td class="left">
            {{ params.yjxyylykc }}
          </td>
        </tr>
        <tr v-if="params.jhTitle == 1">
          <td class="tab_apply required">{{ params.jhYear - 1 }}年预计购进量</td>
          <td class="left"> {{ params.yjgjl }}</td>
        </tr>
        <tr>
          <td class="right tab_apply required">{{ params.jhYear }}企业计划需用量</td>
          <td class="left">
            {{ params.qyXyylyjhsyl }}
          </td>
          <td class="tab_apply required">{{ params.jhYear - 1 }}年国家下达需用量</td>
          <td class="left"> {{ params.gjxdxyl }}</td>
        </tr>
        <tr>
          <td class="tab_apply required">{{ params.jhYear - 1 }}年实际需用量(1-5月)</td>
          <td class="left">{{ params.xyylysjsyl1 }}</td>
          <td class="tab_apply required">{{ params.jhYear - 1 }}年实际需用量(6-9月)</td>
          <td class="left">{{ params.xyylysjsyl2 }}</td>
        </tr>
        <tr>
          <td class="tab_apply required">{{ params.jhYear - 1 }}年预计需用量(10-12月)</td>
          <td class="left">
            {{ params.xyylysjsyl4 }}
          </td>
          <td class="tab_apply required" style="color: brown;">{{ params.jhYear - 1 }}年预计总需用量</td>
          <td class="left" style="color: brown;">
            {{ (parseFloat(params.xyylysjsyl1) * 10000
              + parseFloat(params.xyylysjsyl2) * 10000 + parseFloat(params.xyylysjsyl4) * 10000) / 10000 || "" }}
          </td>
        </tr>
        <tr>
          <td class="tab_apply required" v-if="params.xyylysjsyl3">{{ params.jhYear - 1 }}年实际需用量(10-12月)</td>
          <td class="left" v-if="params.xyylysjsyl3"> {{ params.xyylysjsyl3 }}</td>
          <td class="tab_apply required" v-if="params.xyylysjsyl5">本年度（{{ params.jhYear }}年）实际需用量(1-5月)</td>
          <td class="left" v-if="params.xyylysjsyl5">{{ params.xyylysjsyl5 }}</td>
        </tr>

      </table>
    </div>
    <div class="panel-heading" v-if="params.sbState > 30">
      <div class="panel" style="margin-top: 20px">追加信息</div>
    </div>
    <div class="table1" v-if="params.sbState > 30">
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr v-if="params.jhTitle != 3">
          <td class="right tab_apply required">{{ params.jhYear }}企业追加计划生产量</td>
          <td class="left">
            {{ params.zjsbInfo.qyJhscl }}
          </td>
          <td class="right tab_apply required" v-if="params.jhTitle == 0">收购单位</td>
          <td class="left" v-if="params.jhTitle == 0">
            {{ sgdwZj }}
          </td>
        </tr>
        <tr>
          <td class="right tab_apply required">{{ params.jhYear }}企业追加计划需用量</td>
          <td class="left">
            {{ params.zjsbInfo.qyXyylyjhsyl }}
          </td>
          <td class="tab_apply required">追加原料药供应单位</td>
          <td class="left">
            {{ params.zjsbInfo.gydwmc }}
          </td>
        </tr>
      </table>
    </div>
    <div class="panel-heading">
      <div class="panel" style="margin-top: 20px">补充信息</div>
    </div>
    <div class="table1">
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr>
          <td class="tab_apply required">备注</td>
          <td class="left" colspan="3">{{ params.remark }} </td>
        </tr>
        <tr>
          <td class="tab_apply required" v-if="params.sbState >= 40">追加备注</td>
          <td class="left" colspan="3" v-if="params.sbState >= 40">{{ params.zjsbInfo.remark }} </td>
        </tr>
        <tr>
          <td class="tab_apply required">材料附件</td>
          <td class="left">
            <MUpload :bisId="params.fj" :disabled="true" :download="true" />
          </td>
          <td class="tab_apply required" v-if="params.sbState > 30">追加材料附件</td>
          <td class="left" v-if="params.sbState > 30">
            <MUpload :bisId="params.zjsbInfo.fj" :disabled="true" :download="true" />
          </td>
        </tr>
      </table>
    </div>
    <div>
      <div class="panel-heading" v-if="thjlList.length > 0">
        <div class="panel" style="margin-top: 20px"></div>退回记录
      </div>
      <div class="table1">
        <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
          <a-table :dataSource="thjlList" :columns="columnsthjl" bordered style="width: 1180px;"
            v-if="thjlList.length > 0" :pagination="false">
          </a-table>
        </table>
      </div>
    </div>

    <div class="panel-heading">
      <div class="panel" style="margin-top: 20px">审计信息</div>
    </div>
    <div class="table1">
      <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
        <tr>
          <td class="right tab_apply required">省局申报计划生产量</td>
          <td class="left"><a-input placeholder="请填写省局计划生产量" maxLength="100" v-model:value="params.sjJhscl"
              :disabled="params.sbState > 20" /> </td>
          <td class="right tab_apply required">省局申报计划需用量</td>
          <td class="left">
            <a-input placeholder="请填写省局申报计划需用量" maxLength="100" v-model:value="params.sjXyylyjhsyl"
              :disabled="params.sbState > 20" />
          </td>
        </tr>
        <tr v-if="params.sbState > 10">
          <td class="right tab_apply required">国家下达计划生产量</td>
          <td class="left">
            <a-input placeholder="请填写国家计划生产量" maxLength="100" v-model:value="params.gjJhscl"
              :disabled="params.sbState > 30" />
          </td>
          <td class="right tab_apply required" v-if="params.sbState >= 20">国家下达计划需用量</td>
          <td class="left" v-if="params.sbState >= 20">
            <a-input placeholder="请填写国家下达计划需用量" maxLength="100" v-model:value="params.gjXyylyjhsyl"
              :disabled="params.sbState > 30" />
          </td>
        </tr>
        <tr v-if="params.sbState > 30">
          <td class="right tab_apply required">省局申报追加计划生产量</td>
          <td class="left">
            <a-input placeholder="请填写省局追加计划生产量" maxLength="100" v-model:value="params.zjsbInfo.sjJhscl"
              :disabled="params.sbState > 50" />
          </td>
          <td class="right tab_apply required">省局申报追加计划需用量</td>
          <td class="left">
            <a-input placeholder="请填写省局申报追加计划需用量" maxLength="100" v-model:value="params.zjsbInfo.sjXyylyjhsyl"
              :disabled="params.sbState > 50" />
          </td>
        </tr>
        <tr v-if="params.sbState > 40">
          <td class="right tab_apply required">国家下达追加计划生产量</td>
          <td class="left">
            <a-input placeholder="请填写国家追加计划生产量" maxLength="100" v-model:value="params.zjsbInfo.gjJhscl"
              :disabled="params.sbState > 60" />
          </td>
          <td class="right tab_apply required">国家下达追加计划需用量</td>
          <td class="left">
            <a-input placeholder="请填写国家下达追加计划需用量" maxLength="100" v-model:value="params.zjsbInfo.gjXyylyjhsyl"
              :disabled="params.sbState > 60" />
          </td>
        </tr>
        <tr>
          <td class="right tab_apply required">省局备注</td>
          <td class="left" colspan="3">
            <a-textarea v-model:value="params.sjRemark" placeholder="退回时，请输入退回意见" maxLength="200" />
          </td>
        </tr>
        <tr v-if="params.sbState > 40">
          <td class="right tab_apply required">省局追加备注</td>
          <td class="left" colspan="3">
            <a-textarea v-model:value="params.zjsbInfo.sjRemark" placeholder="退回时，请输入退回意见" maxLength="200" :disabled="params.sbState > 60"/>
          </td>
        </tr>
        <tr v-if="params.sbState == 10 || params.sbState == 40">
          <td class="right tab_apply required">退回意见</td>
          <td class="left" colspan="3">
            <a-textarea v-model:value="thyj" placeholder="退回时，请输入退回意见" maxLength="100" />
          </td>
        </tr>
      </table>
    </div>

    <div style="text-align: center;" v-if="params.sbState != '80' && params.sbState != '90'">
      <a-row style="margin:0 auto;padding: 5px;">
        <a-col :span="24" style="text-align:center">
          <a-button type="primary" class="mr-8" @click="closeModal">取消</a-button>
          <a-popconfirm title="确认退回?" ok-text="确定" cancel-text="取消" @confirm="tuihui">
            <a-button type="primary" class="mr-8" v-if="params.sbState == 10 || params.sbState == 40">退回</a-button>
          </a-popconfirm>
          <a-popconfirm title="确认完成?" ok-text="确定" cancel-text="取消" @confirm="handleSubmit">
            <a-button type="primary" class="mr-8">完成</a-button>
          </a-popconfirm>
        </a-col>
      </a-row>
    </div>

    <a-modal v-model:visible="visible0" title="详细信息" :footer="null" width="1000px">
      <div class="table1" style="padding: 5px;">
        <table style="width: 100%" class="table table-striped table-bordered center mar_t15">
          <tr>
            <td class="right tab_apply required  req">生产药品名称</td>
            <td class="left">
              {{ scpz.scypmc }}
            </td>
            <td class="right tab_apply required  ">规格</td>
            <td class="left">
              {{ scpz.ypgg }}ml/{{ scpz.dw||'瓶' }}
            </td>
          </tr>
          <tr>

            <!-- <td class="right tab_apply required  req">原料使用量/{{ scpz.dw||" " }}</td>
          <td class="left">
            <a-input placeholder="请填写生产药品生产单个所需原料用量" maxLength="10"  v-model="scpz.xyl"
              :disabled="value.sbState > 10" class="chang" />{{ value.ylydw||"公斤" }}
          </td> -->
          </tr>
          <tr>
            <td class="right tab_apply required  req">生产药品现有库存</td>
            <td class="left">
              {{ scpz.scypkc }}{{ scpz.dw||'瓶' }}
            </td>
            <td class="right tab_apply required  req">{{ params.jhYear - 1 || "" }}预计生产药品年底库存</td>
            <td class="left">
              {{ scpz.yjscypkc }}{{ scpz.dw||'瓶' }}
            </td>
          </tr>
          <tr>
            <td class="right tab_apply required  req">{{ params.jhYear || "" }}企业计划生产量</td>
            <td class="left">
              {{ scpz.qyJhscl }}{{ scpz.dw||'瓶' }}
            </td>
          </tr>
          <tr>
            <td class="tab_apply required  req">原料折算系数</td>
            <td class="left">
              每1ml含罂粟壳0.05g。
            </td>
            <td class="right tab_apply required  req">{{ params.jhYear || "" }}计划生产罂粟壳用量</td>
            <td class="left">
              {{ parseFloat(scpz.ypgg) * parseFloat(scpz.qyJhscl) * 0.05 / 1000 || "" }}
              公斤
            </td>
          </tr>
          <tr>
            <td class="right tab_apply required  req">{{ params.jhYear - 1 || "" }}实际生产量(1-5月)</td>
            <td class="left">
              {{ scpz.sjscl1 }}{{ scpz.dw||'瓶' }}
            </td>
            <td class="right tab_apply required  req">{{ params.jhYear - 1 || "" }}实际销售量(1-5月)</td>
            <td class="left">
              {{ scpz.sjxsl1 }}{{ scpz.dw||'瓶' }}
            </td>
          </tr>
          <tr>
            <td class="right tab_apply required  req">{{ params.jhYear - 1 || "" }}实际生产量(6-9月)</td>
            <td class="left">
              {{ scpz.sjscl2 }}{{ scpz.dw||'瓶' }}
            </td>
            <td class="right tab_apply required  req">{{ params.jhYear - 1 || "" }}实际销售量(6-9月)</td>
            <td class="left">
              {{ scpz.sjxsl2 }}{{ scpz.dw||'瓶' }}
            </td>
          </tr>
          <tr>
            <td class="right tab_apply required  req">{{ params.jhYear - 1 || "" }}预计生产量(10-12月)</td>
            <td class="left">
              {{ scpz.sjscl4 }}{{ scpz.dw||'瓶' }}
            </td>
            <td class="right tab_apply required  req">{{ params.jhYear - 1 || "" }}预计销售量(10-12月)</td>
            <td class="left">
              {{ scpz.sjxsl4 }}{{ scpz.dw||'瓶' }}
            </td>
          </tr>
          <tr>
            <td class="right tab_apply required  req" v-if="params.sbState > 30">{{ params.jhYear - 1 || "" }}实际生产量(10-12月)
            </td>
            <td class="left" v-if="params.sbState > 30">
              {{ scpz.sjscl3 }}{{ scpz.dw||'瓶' }}
            </td>
            <td class="right tab_apply required  req" v-if="params.sbState > 30">{{ params.jhYear - 1 || "" }}实际销售量(10-12月)
            </td>
            <td class="left" v-if="params.sbState > 30">
              {{ scpz.sjxsl3 }}{{ scpz.dw||'瓶' }}
            </td>
          </tr>
          <tr style="color: brown;">
            <td class="right tab_apply required  req">{{ params.jhYear - 1 || "" }}预计生产量(1-12)</td>
            <td class="left">
              {{ (parseFloat(scpz.sjscl1) * 10000 + parseFloat(scpz.sjscl2) * 10000 + parseFloat(scpz.sjscl4) * 10000) / 10000 || "" }}
              {{ scpz.dw||'瓶' }}
            </td>
            <td class="right tab_apply required  req">{{ params.jhYear - 1 || "" }}预计销售量(1-12)</td>
            <td class="left">
              {{ (parseFloat(scpz.sjxsl1) * 10000 + parseFloat(scpz.sjxsl2) * 10000 + parseFloat(scpz.sjxsl4) * 10000) / 10000 || "" }}
              {{ scpz.dw||'瓶' }}
            </td>
          </tr>
          <tr style="color: brown;">
            <td class="right tab_apply required  req">{{ params.jhYear - 1 || "" }}预计生产罂粟壳用量(1-12)</td>
            <td class="left">
              {{ parseFloat(scpz.ypgg) * parseFloat((parseFloat(scpz.sjscl1) * 10000
                + parseFloat(scpz.sjscl2) * 10000 + parseFloat(scpz.sjscl4) * 10000) / 10000) * 0.05 / 1000 || "" }}
              公斤
            </td>
            <td class="right tab_apply required  req">{{ params.jhYear - 1 || "" }}预计销售罂粟壳用量(1-12)</td>
            <td class="left">
              {{ parseFloat(scpz.ypgg) * parseFloat((parseFloat(scpz.sjxsl1) * 10000
                + parseFloat(scpz.sjxsl2) * 10000 + parseFloat(scpz.sjxsl4) * 10000) / 10000) * 0.05 / 1000 || "" }}
              公斤
            </td>
          </tr>

          <tr>
            <td class="tab_apply required  req">备注</td>
            <td class="left" colspan="3">
              {{ scpz.remarks }}
            </td>
          </tr>
        </table>
      </div>
    </a-modal>
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { saveOrUpdate } from '../PYwTyjhsq.api';
import Tools from '/@/utils/tools';
import { getDictText } from '/@/utils/dict/JDictSelectUtil';
import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';
import { message } from 'ant-design-vue';
import { defHttp } from '/@/utils/http/axios';
const scpzList = ref([]);
const scpzGxList = ref([]);
const thjlList = ref([]);
const thyj = ref(<string>"");
const params = ref({ zjsbInfo: {} });
const scxx=ref({});
const gxxx=ref({});
const scpz = ref({});
const visible0 = ref(false);
const showGx=ref(<boolean>false);
const show=ref(<boolean>false);
const columns1 = [{
  title: '购销单位', align: "center", dataIndex: 'gxdw', width: '150px'
}, {
  title: '购进数量', align: "center", dataIndex: 'gjNum', width: '80px'
}, {
  title: '销售数量', align: "center", dataIndex: 'xsNum', width: '80px'
}, {
  title: '购销日期', align: "center", dataIndex: 'gxDate', width: '80px'
}, {
  title: '折合罂粟壳', align: "center", dataIndex: 'zsxs', width: '130px'
}, {
  title: '备注', align: "center", dataIndex: 'remarks', width: '80px'
}, {
  title: '操作', key: 'actions', width: '80px', scopedSlots: { customRender: 'actions' },
}];
const columnsthjl = [{
  title: '退回时间', align: "center", dataIndex: 'createTime', width: '80px'
}, {
  title: '退回意见', align: "center", dataIndex: 'thyj', width: '150px'
}]
// Emits声明
const emit = defineEmits(['register', 'success']);
const currentYear = ref(Tools.getCurrentYear());
const isUpdate = ref(true);
const sbState = ref();
const sgdw = ref("");
const sgdwZj = ref("")
//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  //重置表单
  params.value = { zjsbInfo: {} };
  thyj.value = "";
  params.value.jhYear = currentYear.value;
  setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
  isUpdate.value = !!data?.isUpdate;
  if (unref(isUpdate)) {
    let formdata = JSON.parse(JSON.stringify(data))
    //表单赋值
    if (!formdata.record.zjsbInfo) {
      formdata.record.zjsbInfo = {};
    }
    params.value = formdata.record;
    if (formdata.sbState) {
      sbState.value = formdata.sbState;
    }
    if (formdata.record.items) {
      scpzList.value = formdata.record.items;
      let jhscl=0 ;let jhxyl=0;let yjscl=0;let yjxyl=0;let yjxsl=0;let yjxsxyl=0;
      scpzList.value.forEach(e => {
        if(e.ypgg){
          if(e.qyJhscl){
            jhscl= (jhscl*10000 + parseFloat(e.ypgg) * parseFloat(e.qyJhscl)*10000)/10000;
            // jhxyl+= ((parseFloat(e.ypgg) * parseFloat(e.qyJhscl)*10000)/10000)* 5 / 100000 ;
          }
          if(e.sjscl1&&e.sjscl2&&e.sjscl4){
            yjscl+=parseFloat(e.ypgg) * parseFloat((parseFloat(e.sjscl1) * 10000 + parseFloat(e.sjscl2) * 10000 + parseFloat(e.sjscl4) * 10000) / 10000);
            //yjxyl+=parseFloat(e.ypgg) * parseFloat((parseFloat(e.sjscl1) * 10000 + parseFloat(e.sjscl2) * 10000 + parseFloat(e.sjscl4) * 10000) / 10000) * 0.05 / 1000 ;
          }
        }
        if(e.sjxsl1&&e.sjxsl2&&e.sjxsl4){
          yjxsl+=parseFloat(e.ypgg) * parseFloat((parseFloat(e.sjxsl1) * 10000 + parseFloat(e.sjxsl2) * 10000 + parseFloat(e.sjxsl4) * 10000) / 10000)
          //yjxsxyl+=parseFloat(e.ypgg) * parseFloat((parseFloat(e.sjxsl1) * 10000 + parseFloat(e.sjxsl2) * 10000 + parseFloat(e.sjxsl4) * 10000) / 10000) * 0.05 / 1000 ;
        }  
      });
      scxx.value.jhscl=jhscl/1000;
      scxx.value.yjscl=yjscl/1000;
      scxx.value.yjxsl=yjxsl/1000;
      scxx.value.jhxyl=jhscl*5/100000;
      scxx.value.yjxyl=yjscl*5/100000;
      scxx.value.yjxsxyl=yjxsl*5/100000;
    }
    if (formdata.record.gxItems) {
      scpzGxList.value = formdata.record.gxItems;
      let yjxsl=0; let yjgjl=0;
      scpzGxList.value.forEach(e => {
        if(e.xsNum){
          yjxsl+=parseFloat(e.xsNum)
        }
        if(e.gjNum){
          yjgjl+=parseFloat(e.gjNum)
        }  
      });
      gxxx.value.yjxsl=yjxsl;
      gxxx.value.yjgjl=yjgjl;
     
    }
    if (params.value.sgdw) {
      let s = params.value.sgdw.split(',');
      sgdw.value = "国药股份：" + s[0] + "；上药股份：" + s[1] + "；重庆股份：" + s[2] + ";(总计：" + ((parseFloat(s[0]) * 10000 + parseFloat(s[1]) * 10000 + parseFloat(s[2]) * 10000) / 10000) + ")";
    }
    if (params.value.zjsbInfo.sgdw) {
      let s = params.value.zjsbInfo.sgdw.split(',');
      sgdwZj.value = "国药股份：" + s[0] + "；上药股份：" + s[1] + "；重庆股份：" + s[2] + ";(总计：" + ((parseFloat(s[0]) * 10000 + parseFloat(s[1]) * 10000 + parseFloat(s[2]) * 10000) / 10000) + ")";
    }
    if (formdata.record.thjl) {
      thjlList.value = formdata.record.thjl;
    }
  }
});
const columns = [{
  title: '药品规格(ml)', align: "center", dataIndex: 'ypgg', width: '60px'
},
{
  title: '计量单位', align: "center", dataIndex: 'dw', width: '80px'
},
{
  title: '现有库存', align: "center", dataIndex: 'scypkc', width: '80px'
}, {
  title: '本年度预计年底库存', align: "center", dataIndex: 'yjscypkc', width: '80px'
}, {
  title: '下年度计划生产量', align: "center", dataIndex: 'qyJhscl', width: '80px'
}, {
  title: '下年度计划生产罂粟壳用量(公斤)', align: "center",
  customRender: ({ text, record }) => {
    let scpz = record
    return parseFloat(scpz.ypgg) * parseFloat(scpz.qyJhscl) * 0.05 / 1000 || "";
  },
  width: '80px'
}, {
  title: '本年度预计生产罂粟壳用量(公斤)', align: "center",
  customRender: ({ text, record }) => {
    let scpz = record
    return parseFloat(scpz.ypgg) * parseFloat((parseFloat(scpz.sjscl1) * 10000 + parseFloat(scpz.sjscl2) * 10000 + parseFloat(scpz.sjscl4) * 10000) / 10000) * 0.05 / 1000 || "";
  },
  width: '80px'
}, {
  title: '本年度预计销售罂粟壳用量(公斤)', align: "center",
  customRender: ({ text, record }) => {
    let scpz = record
    return parseFloat(scpz.ypgg) * parseFloat((parseFloat(scpz.sjxsl1) * 10000 + parseFloat(scpz.sjxsl2) * 10000 + parseFloat(scpz.sjxsl4) * 10000) / 10000) * 0.05 / 1000 || "";
  },
  width: '80px'
}, {
  title: '操作', key: 'action', width: '110px', align: "center", slots: { customRender: 'action' },
}];
//设置标题
const title = computed(() => (!unref(isUpdate) ? '新增' : '审核'));
//表单提交事件
async function handleSubmit(v) {
  try {
    if (sbState.value) {
      params.value.sbState = sbState.value;
    }
    if(params.value.jhTitle=="3"&&params.value.qylx=="1"){
        params.value.yjxsl=unref(scxx.value).yjxsl;
        params.value.yjgjl=unref(scxx.value).yjxsxyl;
    }
    if(params.value.jhTitle=="3"&&params.value.qylx=="2"){
        params.value.yjxsl=unref(gxxx.value).yjxsl;
        params.value.yjgjl=unref(gxxx.value).yjgjl;
      }
    console.log(params)
    let values = unref(params.value);
    setModalProps({ confirmLoading: true });
    //提交表单
    await saveOrUpdate(values, isUpdate.value);
    //关闭弹窗
    closeModal();
    //刷新列表
    emit('success');
  } finally {
    setModalProps({ confirmLoading: false });
  }
}

function tuihui() {
  let par = {};
  par.tyjhsbId = params.value.id;
  if (!thyj.value) {
    return message.info("退回意见不可为空")
  } else {
    par.thyj = unref(thyj.value)
  }
  defHttp.post({ url: "/yw/tysb/pYwTyjhsq/tuihui", params: par }).then(res => {
    if (res == "退回成功！") {
      closeModal();
      emit('success');
    }
  });
}

function showInfo(record) {
  visible0.value = true;
  scpz.value = record;
}
function showGxlist() {
  if(!showGx.value){
    showGx.value = true;
  }else{
    showGx.value = false;
  }
  
}
function showList() {
  if(!show.value){
    show.value = true;
  }else{
    show.value = false;
  }
}
</script>

<style lang="less" scoped>
.table1 {
  margin-bottom: 10px;
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
  width: 380px;
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

.table-striped>tr:nth-child(odd)>td,
.table-striped>tr:nth-child(odd)>th {
  background-color: #f9f9f9;
}

/** 时间和数字输入框样式 */
:deep(.ant-input-number) {
  width: 100%;
}

:deep(.ant-calendar-picker) {
  width: 100%;
}</style>