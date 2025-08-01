<template>
    <PageWrapper class="title-center" contentBackground>
        <div class="page p-4" style="border:1px;">
            <div class="panel-heading" style="margin-top:0;">
                <div class="panel">
                    基本信息
                    <div class="inline text-sm align-baseline" v-if="FormData.bh || FormData.slbh">
                        （
                        <span v-if="FormData.bh">申报编号: {{ FormData.bh }}</span>
                        <span v-if="FormData.slbh">受理编号: {{ FormData.slbh }}</span>
                        ）
                    </div>
                </div>
            </div>
            <table class="my-table mb-2">
                <colgroup>
                    <col style="width:235px;" />
                    <col />
                    <col style="width:240px" />
                    <col />
                </colgroup>
                <tr v-if="FormData.title">
                    <td class="text-blue font-600 text-right">事项标题</td>
                    <td colspan="3">{{ FormData.title }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">申请项目</td>
                    <td v-if="isSave">{{ FormData.sqxm && getDictText('sqsx_xm', FormData.sqxm) }}</td>
                    <td v-else>
                      <a-select v-model:value="OptFormData.sqxm" :options="dictOptions" style="width: 300px" :disabled="FormData.sqxm"
                      @change="handleChange"></a-select>
                    </td>
                    <td class="text-blue font-600 text-right"> <span v-show="FormData.sqxm == 'sqsx-yyjc' || (!isSave && OptFormData.sqxm == 'sqsx-yyjc')">来源</span></td>
                    <td v-if="!isSave && OptFormData.sqxm == 'sqsx-yyjc'">
                        <a-select v-model:value="OptFormData.source" :options="dictyyjc" style="width: 300px"
                            ></a-select>
                    </td>
                    <td v-else><span v-if="FormData.sqxm == 'sqsx-yyjc'">{{FormData.source == 1?'监督检查':'举报'}}</span></td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">检查单位名称</td>  
                    <td v-if="isSave"><a-button type="link"  @click="openXzk(FormData.shxydm)" class="bt-class">{{ FormData.qymc }}</a-button></td>
                    <td v-else>
                        <a-input v-model:value="OptFormData.qymc" maxLength="500"/>
                    </td>
                    <td class="text-blue font-600 text-right">检查单位社会信用代码</td>
                    <td v-if="isSave">{{ FormData.shxydm }}</td>
                    <td v-else>
                        <a-input v-model:value="OptFormData.shxydm" maxLength="120"/>
                    </td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">检查场地地址</td>
                    <td colspan="3" v-if="isSave">{{ FormData.qydz }}</td>
                    <td colspan="3" v-else>
                        <a-input v-model:value="OptFormData.qydz" maxLength="1000"/>
                    </td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">检查范围/品种</td>
                    <td colspan="3" class="whitespace-pre-wrap" v-if="isSave">
                        <div v-for="(item, idx) in formItems" :key="idx">
                            {{ item.sync ? item.fw + ' (与注册核查同步)' : (item.fw + '; ' + item.wh) }}
                        </div>
                    </td>
                    <td v-if="!isSave" colspan="3">
                        <div style="overflow:auto;">
                            <table style="width:100%;min-width:800px;table-layout:fixed;text-align:center;">
                                <colgroup>
                                    <col style="width:110px;"/>
                                    <col/>
                                    <col style="width:210px;"/>
                                    <col style="width:170px;"/>
                                    <col style="width:160px;"/>
                                    <col style="width:50px;"/>
                                </colgroup>
                                <tr v-for="(item, idx) in formItems" :key="idx">
                                    <td class="text-blue font-600">检查范围/品种</td>
                                    <td class="py-1"><a-input v-model:value="item.fw"/></td>
                                    <td class="text-blue font-600">药品批准文号(原料药登记号)</td>
                                    <td><a-input v-model:value="item.wh" :disabled="!!item.sync" :required="!item.sync" placeholder="请填写药品批准文号"/></td>
                                    <td><a-checkbox :checked="item.sync" @change="onChange(item)">与注册核查同步</a-checkbox></td>
                                    <td>
                                        <a-button type="link" shape="circle" style="color:#ED6F6F;" v-if="idx < formItems.length - 1 || idx == 3 - 1" @click="formItems.splice(idx, 1)">
                                            <a-icon type="minus-circle" style="font-size:22px;" />
                                        </a-button>
                                        <a-button type="link" shape="circle" style="color:#1890ff;" v-if="idx >= formItems.length - 1 && idx < 3 - 1" @click="addFormItem">
                                            <a-icon type="plus-circle" style="font-size:22px;" />
                                        </a-button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">检查生产车间</td>
                    <td v-if="isSave">{{ FormData.jccj }}</td>
                    <td v-else>
                        <a-input v-model:value="OptFormData.jccj" maxLength="256"/>
                    </td>
                    <td class="text-blue font-600 text-right">检查生产线</td>
                    <td v-if="isSave">{{ FormData.jccx }}</td>
                    <td v-else>
                        <a-input v-model:value="OptFormData.jccx" maxLength="256"/>
                    </td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">企业联系人姓名</td>
                    <td v-if="isSave">{{ FormData.lxrmc }}</td>
                    <td v-else>
                        <a-input v-model:value="OptFormData.lxrmc" maxLength="255"/>
                    </td>
                    <td class="text-blue font-600 text-right">企业联系人手机号</td>
                    <td v-if="isSave">{{ FormData.lxrsjh }}</td>
                    <td v-else>
                        <a-input v-model:value="OptFormData.lxrsjh" maxLength="20"/>
                    </td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">企业联系人联系电话</td>
                    <td v-if="isSave">{{ FormData.lxrlxdh }}</td>
                    <td v-else>
                        <a-input v-model:value="OptFormData.lxrlxdh" maxLength="32"/>
                    </td>
                    <td class="text-blue font-600 text-right"></td>
                    <td></td>
              </tr>
                <tr>
                    <td class="text-blue font-600 text-right">转办意见</td>
                    <td colspan="3" class="whitespace-pre-wrap" v-if="isSave">{{ FormData.jcfqsy }}</td>
                    <td v-else colspan="3"><a-textarea v-model:value="zyjj" :rows="4" maxLength="1000" class="whitespace-pre-wrap" /></td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">备注</td>
                    <td colspan="3" class="whitespace-pre-wrap" v-if="isSave">{{ FormData.bz }}</td>
                    <td v-else colspan="3"><a-textarea v-model:value="OptFormData.bz" :rows="2" maxLength="1000" class="whitespace-pre-wrap" /></td>
                </tr>
                <tr>
                  <td class="text-blue font-600 text-right">上传附件</td>
                    <td colspan="3">
                        <MUpload :bisId="FormData.id || OptFormData.id" :download="true" accept=".pdf" :disabled="isSave"  :source="getDictText('sqsx_xm', FormData.sqxm || OptFormData.sqxm)" category="来源附件" :maxSize="1024 * 1024 * 10" :maxCount="10"/>
                    </td>
                </tr>
            </table>
            <div class="bd-center" style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: center;">
                    <template v-if="(isshow && FormData.state == 0) || !route.query?.id">
                        <template v-if="isSave">
                            <a-button type="primary" @click="saveSx('0')">修改</a-button>
                        </template>
                        <template v-else>
                            <a-popconfirm title="您确认保存吗?" ok-text="确认" cancel-text="取消" @confirm="saveSx('1')">
                                <a-button type="primary" style="margin-right:8px;">保存</a-button>
                            </a-popconfirm>
                            <a-button @click="saveSx('9')" v-if="FormData.id">取消</a-button>
                        </template>
                    </template>
                </div>
            </div>
            <div class="panel-heading">
                <div class="panel" style="margin-top: 20px">转办信息（{{statedict(ys.czlx)}}）</div>
            </div>
            <table class="my-table mb-2">
                <colgroup>
                    <col style="width:10%" />
                    <col />
                    <col style="width:10%" />
                    <col />
                </colgroup>
                <tr>
                    <td class="text-blue font-600 text-right">转办人</td>
                    <td v-if="ys.spr">{{ ys.spr }}</td>
                    <td v-else><span v-if="isshow">{{ userStore.getUserInfo.realname }}</span></td>
                    <td class="text-blue font-600 text-right">转办时间</td>
                    <td v-if="ys.czsj">{{ ys.czsj }}</td>
                    <td v-else><span v-if="isshow">{{ acceptanceTime }}</span></td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">意见说明</td>
                    <td colspan="3" v-if="isshow && !ys.spyj && FormData.state == 0">
                        <div class="mb-1">
                            <a v-for="link in linkList" :key="link.id" @click="yjFz(link)" v-if="isshow">{{ link.yjbt }};
                            </a>
                        </div>
                        <a-textarea v-model:value="spjl.spyj" placeholder="意见说明" :rows="4"
                           :disabled="!isshow" class="whitespace-pre-wrap"/>
                    </td>
                    <td v-else colspan="3" class="whitespace-pre-wrap">
                       {{ys.spyj}}
                    </td>
                </tr>
         
            </table>
            <div class="panel-heading" v-if="isckJC">
                <div class="panel" style="margin-top: 20px">
                  技术检查
                  <span v-if="jczxTaskData?.updateTime">（接收时间：{{jczxTaskData.updateTime}}）</span>
                </div>
            </div>
            <table class="my-table mb-2" v-if="isckJC">
                <colgroup>
                    <col style="width:10%" />
                    <col />
                    <col style="width:10%" />
                    <col />
                </colgroup>
                <tr>
                    <td class="text-blue font-600 text-right">检查基本情况</td>
                    <td colspan="3" class="whitespace-pre-wrap">{{ FormData.jcjbqk }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">检查中心结论</td>
                    <td colspan="3" class="whitespace-pre-wrap">{{ FormData.jczxjl }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">检查人(检查时间)</td>
                    <td>{{ FormData.jcrs }} ({{ FormData.jcsj }})</td>
                    <td class="text-blue font-600 text-right">综合评定结论</td>
                    <td>{{ FormData.zhpdjl && getDictText('jdjcZhpdjl', FormData.zhpdjl) }}</td>
              </tr>
                <tr>
                    <td class="text-blue font-600 text-right">附件查看</td>
                    <td colspan="3">
                        <span>检查报告：
                            <MUpload :bisId="FormData.id" :disabled="true" :download="true" category="检查报告" source="申请事项" class="pt-2" />
                        </span>
                        <span>综合评定报告书：
                            <MUpload :bisId="FormData.id" :disabled="true" :download="true" category="综合评定报告书" source="申请事项" class="pt-2" />
                        </span>
                        <span>审核签：
                            <MUpload :bisId="FormData.id" :disabled="true" :download="true" category="审核签" source="申请事项" class="pt-2" />
                        </span>
                        <span>其他材料：
                            <MUpload :bisId="FormData.id" :disabled="true" :download="true" category="其他材料" source="申请事项" class="pt-2" />
                        </span>
                    </td>
                </tr>
            </table>
            <div class="panel-heading"
                v-if="(FormData.dqbz == 'JCSH' || FormData.dqbz == 'CHSH' || FormData.dqbz == 'JLDSH' || FormData.dqbz == 'GZ' || FormData.dqbz == 'ZZ' || FormData.state == '6' || FormData.state == '7' || FormData.state == '8' || FormData.dqbz == 'ZQY')">
                <div class="panel" style="margin-top: 20px">审核</div>
            </div>
            <table class="my-table mb-2"
                v-if="(FormData.dqbz == 'JCSH' || FormData.dqbz == 'CHSH' || FormData.dqbz == 'JLDSH' || FormData.dqbz == 'GZ' || FormData.dqbz == 'ZZ' || FormData.state == '6' || FormData.state == '7' || FormData.state == '8' || FormData.dqbz == 'ZQY' )">
                <colgroup>
                    <col style="width:10%" />
                    <col />
                    <col style="width:10%" />
                    <col />
                </colgroup>
                <tr>
                    <td class="text-blue font-600 text-right">审核人</td>
                    <td v-if="jcsh.spr">{{ jcsh.spr }}</td>
                    <td v-else>
                        <span v-if="isshow">{{ userStore.getUserInfo.realname }}</span>
                    </td>
                    <td class="text-blue font-600 text-right">审核日期</td>
                    <td>{{ jcsh.czsj }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">审核意见</td>
                    <td colspan="3" v-if="jcsh.sftg || FormData.dqbz != 'JCSH'">
                        <a-select v-model:value="jcsh.sftg" :options="options" style="width: 100px"
                            :disabled="true"></a-select>
                    </td>
                    <td colspan="3" v-else>
                        <a-select v-model:value="spjl.sftg" :options="options" style="width: 100px"
                            :disabled="!isshow"></a-select>
                    </td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">意见说明</td>
                    <td colspan="3" v-if="jcsh.spyj" class="whitespace-pre-wrap">
                        {{ jcsh.spyj }}
                    </td>
                    <td colspan="3" v-if="!jcsh.spyj && FormData.dqbz == 'JCSH' && isshow">
                        <div class="mb-1">
                            <a v-for="link in linkList" :key="link.id" @click="yjFz(link)">{{ link.yjbt }} ; </a>
                        </div>
                        <a-textarea v-model:value="spjl.spyj" placeholder="意见说明" :rows="4"
                            :disabled="FormData.dqbz != 'JCSH'" class="whitespace-pre-wrap" />
                    </td>
                    <td colspan="3" v-if="(!jcsh.spyj && FormData.dqbz != 'JCSH' && isshow) || (!jcsh.spyj && !isshow)" ></td>
                </tr>
                <tr v-if="FormData.sqxm == 'sqsx-yyjc'">
                  <td class="text-blue font-600 text-right">上传附件</td>
                    <td colspan="3">
                          <MUpload :bisId="FormData.id" :download="true" accept=".pdf" :disabled="FormData.dqbz != 'JCSH'" :source="getDictText('sqsx_xm', FormData.sqxm)" category="检查报告" :maxSize="1024 * 1024 * 10" class="pt-2" :maxCount="10"/>
                    </td>
               </tr>
            </table>
            <div class="panel-heading" v-if="(FormData.dqbz == 'CHSH' || FormData.dqbz == 'JLDSH' || FormData.dqbz == 'GZ' || FormData.dqbz == 'ZZ' || FormData.state == '6' || FormData.state == '8') ">
                <div class="panel" style="margin-top: 20px">审定</div>
            </div>
            <table class="my-table mb-2" v-if="(FormData.dqbz == 'CHSH' || FormData.dqbz == 'JLDSH' || FormData.dqbz == 'GZ' || FormData.dqbz == 'ZZ' || FormData.state == '6' || FormData.state == '8')">
                <colgroup>
                    <col style="width:10%" />
                    <col />
                    <col style="width:10%" />
                    <col />
                </colgroup>
                <tr>
                    <td class="text-blue font-600 text-right">审核人</td>
                    <td v-if="chsh.spr">{{ chsh.spr }}</td>
                    <td v-else>
                        <span v-if="jdzbBUtton()">{{ userStore.getUserInfo.realname }}</span>
                    </td>
                    <td class="text-blue font-600 text-right">审核时间</td>
                    <td>{{ chsh.czsj }}</td>
              </tr>
                <tr>
                    <td class="text-blue font-600 text-right">审核意见</td>
                    <td colspan="3" v-if="chsh.sftg || FormData.dqbz != 'CHSH'">
                        <a-select v-model:value="chsh.sftg" :options="options" style="width: 100px"
                            :disabled="true"></a-select>
                    </td>
                    <td colspan="3" v-else>
                        <a-select v-model:value="spjl.sftg" :options="options" style="width: 100px"
                            :disabled="!isshow"></a-select>
                    </td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">意见说明</td>
                    <td colspan="3" v-if="chsh.spyj" class="whitespace-pre-wrap">
                        {{ chsh.spyj }}
                    </td>
                    <td colspan="3" v-if="jdzbBUtton() && (!chsh.spyj && FormData.dqbz == 'CHSH')">
                        <a v-for="link in linkList" :key="link.id" @click="yjFz(link)" v-if="isshow">{{ link.yjbt }} ; </a>
                        <a-textarea v-model:value="spjl.spyj" placeholder="意见说明" :rows="4"
                            :disabled="FormData.dqbz != 'CHSH' || !isshow" />
                    </td>
                    <td colspan="3" v-if="(!chsh.spyj && FormData.dqbz != 'CHSH') || (!chsh.spyj && !isshow)"></td>
                </tr>
            </table>
            <div class="panel-heading" v-if="(FormData.dqbz == 'JLDSH' || FormData.dqbz == 'GZ' || FormData.dqbz == 'ZZ' || FormData.state == '6' || FormData.state == '8')">
                <div class="panel" style="margin-top: 20px">决定</div>
            </div>
            <table class="my-table mb-2" v-if="(FormData.dqbz == 'JLDSH' || FormData.dqbz == 'GZ' || FormData.dqbz == 'ZZ' || FormData.state == '6' || FormData.state == '8')">
                <colgroup>
                    <col style="width:10%" />
                    <col />
                    <col style="width:10%" />
                    <col />
                </colgroup>
                <tr>
                    <td class="text-blue font-600 text-right">审核人</td>
                    <td v-if="jldsh.spr">{{ jldsh.spr }}</td>
                    <td v-else>
                        <span v-if="jdzbBUtton()">{{ userStore.getUserInfo.realname }}</span>
                    </td>
                    <td class="text-blue font-600 text-right">审核时间</td>
                    <td>{{ jldsh.czsj }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">审核意见</td>
                    <td colspan="3" v-if="jldsh.sftg || FormData.dqbz != 'JLDSH'">
                        <a-select v-model:value="jldsh.sftg" :options="options" style="width: 100px"
                            :disabled="true"></a-select>
                    </td>
                    <td colspan="3" v-else>
                        <a-select v-model:value="spjl.sftg" :options="options" style="width: 100px"
                            :disabled="!jdzbBUtton()"></a-select>
                    </td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">意见说明</td>
                    <td colspan="3" v-if="jldsh.spyj" class="whitespace-pre-wrap">
                        {{ jldsh.spyj }}
                    </td>
                    <td colspan="3" v-if="jdzbBUtton() && (!jldsh.spyj && FormData.dqbz == 'JLDSH')">
                        <div class="mb-1">
                            <a v-for="link in linkList" :key="link.id" @click="yjFz(link)" v-if="isshow">{{ link.yjbt }} ;
                            </a>
                        </div>
                        <a-textarea v-model:value="spjl.spyj" placeholder="意见说明" :rows="4"
                            :disabled="FormData.dqbz != 'JLDSH' || !isshow" />
                    </td>
                    <td colspan="3" v-if="(!jldsh.spyj && FormData.dqbz != 'JLDSH') || (!jldsh.spyj && !isshow)"></td>
                </tr>
            </table>
            <div class="panel-heading" v-if="FormData.sqxm != 'sqsx-yyjc' && (FormData.dqbz == 'ZZ' || FormData.dqbz == 'GZ' || FormData.state == '6' || FormData.state == '8')">
                <div class="panel" style="margin-top: 20px">制证</div>
            </div>
            <table class="my-table mb-2" v-if="FormData.sqxm != 'sqsx-yyjc' && (FormData.dqbz == 'ZZ' || FormData.dqbz == 'GZ' || FormData.state == '6' || FormData.state == '8')">
                <colgroup>
                    <col style="width:10%" />
                    <col />
                    <col style="width:10%" />
                    <col />
                </colgroup>
                <tr>
                    <td class="text-blue font-600 text-right">审核人</td>
                    <td v-if="zz.spr">{{ zz.spr }}</td>
                    <td v-else>
                        <span v-if="isshow">{{ userStore.getUserInfo.realname }}</span>
                    </td>
                    <td class="text-blue font-600 text-right">审核时间</td>
                    <td>{{ zz.czsj }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">审核意见</td>
                    <td colspan="3" v-if="zz.sftg || FormData.dqbz != 'ZZ'">
                        <a-select v-model:value="zz.sftg" :options="options" style="width: 100px"
                            :disabled="true"></a-select>
                    </td>
                    <td colspan="3" v-else>
                        <a-select v-model:value="spjl.sftg" :options="options" style="width: 100px"
                            :disabled="!isshow"></a-select>
                    </td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">意见说明</td>
                    <td colspan="3" v-if="zz.spyj" class="whitespace-pre-wrap">
                        {{ zz.spyj }}
                    </td>
                    <td colspan="3" v-if="!zz.spyj && FormData.dqbz == 'ZZ'">
                        <div class="mb-1">
                            <a v-for="link in linkList" :key="link.id" @click="yjFz(link)" v-if="isshow">{{ link.yjbt }} ;
                            </a>
                        </div>
                        <a-textarea v-model:value="spjl.spyj" placeholder="意见说明" :rows="4"
                            :disabled="FormData.dqbz != 'ZZ' || !isshow"  class="whitespace-pre-wrap"/>
                    </td>
                    <td colspan="3" v-if="!zz.spyj && FormData.dqbz != 'ZZ'"></td>
                </tr>
            </table>
            <div class="panel-heading" v-if="FormData.sqxm != 'sqsx-yyjc' && (FormData.dqbz == 'GZ' || FormData.state == '6')">
                <div class="panel" style="margin-top: 20px">盖章</div>
            </div>
            <table class="my-table mb-2" v-if="FormData.sqxm != 'sqsx-yyjc' &&  (FormData.dqbz == 'GZ' || FormData.state == '6')">
                <colgroup>
                    <col style="width:10%" />
                    <col />
                    <col style="width:10%" />
                    <col />
                </colgroup>
                <tr>
                    <td class="text-blue font-600 text-right">盖章人</td>
                    <td>{{ FormData.gzr }}</td>
                    <td class="text-blue font-600 text-right">盖章时间</td>
                    <td>{{ FormData.gzsj }}</td>
                </tr>
                <tr v-if="FormData.fileUrl">
                    <td class="text-blue font-600 text-right">证书文件</td>
                    <td colspan="3">
                       <a-button type="primary" @click="ZsXz(FormData.fileUrl,'1')" style="margin-right: 8px;"> 下载 </a-button>
                       <a-button type="primary" @click="ZsXz(FormData.fileUrl,'2')"> 预览 </a-button>
                    </td>
                </tr>
            </table>
            <div class="bd-center" style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: center;">
                    <a-button type="primary" style="margin-right: 8px;" @click="opentzs(gmpxx,FormData.dqbz)"
                        v-if="!isScy && 0 != FormData.state && FormData.sqxm != 'sqsx-yyjc' " :disabled="!isSave">通知书</a-button>
                    <a-popconfirm title="您确认办结吗？该操作将会结束办理，不会生成结果通知书！" ok-text="确认" cancel-text="取消" @confirm="reQy(8)">
                        <a-button type="primary" danger v-if="FormData.dqbz == 'JCSH'&& isshow" :disabled="!isSave || isNoRe"
                            style="margin-right: 8px;">办结</a-button>
                    </a-popconfirm>
                    <a-popconfirm title="您确认办结吗？该操作将会结束办理，不会生成结果通知书！" ok-text="确认" cancel-text="取消" @confirm="reQy(9)">
                        <a-button type="primary" danger v-if="FormData.dqbz == 'ZZ' && isshow" :disabled="!isSave || isNoRe"
                            style="margin-right: 8px;">办结</a-button>
                    </a-popconfirm>
                    <a-popconfirm title="您确认通过吗?" ok-text="确认" cancel-text="取消" @confirm="reQy(1)">
                        <a-button type="primary" v-if="isshow && jdzbBUtton()" :disabled="!isSave || isNoRe" style="margin-right: 8px;">通过</a-button>
                    </a-popconfirm>
                    <a-popconfirm title="您确认退回吗?" ok-text="确认" cancel-text="取消" @confirm="reQy(4)">
                        <a-button type="primary" v-if="isshow && (FormData.dqbz == 'YS' || FormData.dqbz == 'JCSH')" :disabled="!isSave"
                            style="margin-right: 8px;" class="!bg-red-600 !border-red-600">退回</a-button>
                    </a-popconfirm>
                </div>
            </div>
            <a-collapse v-model="collapseActive">
                <a-collapse-panel header="操作记录查看" style="background-color:#eee5de ;">
                    <table class="my-table mb-2">
                      <colgroup>
                          <col style="width:200px;"/>
                          <col style="width:100px;"/>
                          <col/>
                          <col style="width:165px;"/>
                          <col style="width:100px;"/>
                      </colgroup>
                        <tr>
                            <th class="text-blue font-600 text-center">审批人</th>
                            <th class="text-blue font-600 text-center">环节名称</th>
                            <th class="text-blue font-600 text-center">审批意见</th>
                            <th class="text-blue font-600 text-center">操作时间</th>
                            <th class="text-blue font-600 text-center">操作类型</th>
                        </tr>
                        <tr v-for="(item, index) in spList" :key="index">
                            <td class="text-center">{{ statedict(item.spr, true) }}</td>
                            <td class="text-center">{{ item.hjm && getDictText('sqsx_currentstep', item.hjm) }}
                            </td>
                            <td class="text-center">{{ item.spyj }}</td>
                            <td class="text-center">{{ item.czsj }}</td>
                            <td class="text-center">{{ statedict(item.czlx,item.hjm) }}</td>
                        </tr>
                    </table>
                </a-collapse-panel>
            </a-collapse>
        </div>
    </PageWrapper>
    <fjsh @register="fjshModal" @success="fjhandleSuccess"></fjsh>
    <SqsxSpjlModal @register="registerModal" @success="handleSuccess"></SqsxSpjlModal>
    <ypscxzkModel @register="xkzModel"></ypscxzkModel>
    <tzs @register="tzsModel"></tzs>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, unref, watch, defineComponent } from 'vue';
  import { formatToDate } from '/@/utils/dateUtil';
  import { getDictText ,getDictItems} from '/@/utils/dict/JDictSelectUtil';
  import { useModal } from '/@/components/Modal';
  import { queryById } from '../SqsxSqsx.api';
  import { useUserStore } from '/@/store/modules/user';
  import { useRoute } from 'vue-router';
  import SqsxSpjlModal from './SqsxSpjlModal.vue';
  import ypscxzkModel  from './ypscxzkModel.vue';
  import fjsh from './fjsh.vue';
  import { useGo } from '/@/hooks/web/usePage';
  import { PageWrapper } from '/@/components/Page';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { saveOrUpdate } from '../SqsxSpjl.api';
  import { sqsxsaveOrUpdate } from '../SqsxSqsx.api';
  import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';
  import tzs from './tzsModel.vue';
  import { downloadByUrl } from '/@/utils/file/download';
  import Tools from '/@/utils/tools';
  import { message } from 'ant-design-vue';
  import { buildUUID } from '/@/utils/uuid';
  
  const go = useGo();
  const { closeCurrent } = useTabs();
  const [registerModal, { openModal }] = useModal();
  const [fjshModal, { openModal: openFjModal }] = useModal();
  const [tzsModel, { openModal: opentzsModel }] = useModal();
  const [xkzModel, { openModal: openxzkModel }] = useModal();
  const userStore = useUserStore();
  const route = useRoute();
  const id = ref('');
  const spid = ref('');
  const spList = ref([]);
  const collapseActive = ref(['0']);
  const FormData = ref({ id: '',jcpzfw:'' });
  const OptFormData = ref({ id: buildUUID(),jcfqsy:'',sqxm:'gmpxm-zb'});
  const linkList = ref([]);
  const options = ref([{ label: '通过', value: '通过' }, { label: '不通过', value: '不通过' }]);
  const jcxx = ref({});
  const spjl = ref({ id: spid, sqsxId: route.query?.id || id, spyj: '', czlx: '', sftg: '' })
  const jcsh = ref({});
  const chsh = ref({});
  const jldsh = ref({});
  const zz = ref({});
  const ys = ref({});
  const gmpxx = ref({});
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const acceptanceTime = ref(year + '-' + month + '-' + day + ' ' + new Date().toLocaleTimeString())
  const isSave = ref(true);
  const formItems = ref([{ fw: '', wh: '',sync: false }])
  const zyjj = ref('');
  const isNoRe = ref(false);
  const dictOptions = ref([]);
  const dictyyjc = ref([{ label: '举报', value: 0 }, { label: '监督检查' , value: 1 }]);
  const uuid = ref('');

  const isshow = computed(() =>
    route.query?.sfbl == 'Y'
  );
  const isxs = computed(() =>
    FormData.value.dqbz == 'YS' || FormData.value.dqbz == 'JCSH'
  );
  const isckJC = computed(() =>
    FormData.value.dqbz == 'JCZX' || FormData.value.dqbz == 'JCSH' || FormData.value.dqbz == 'CHSH' ||
    FormData.value.dqbz == 'JLDSH' || FormData.value.dqbz == 'GZ' || FormData.value.dqbz == 'ZZ' || FormData.value.state == '6' || FormData.value.dqbz == 'ZQY' || FormData.value.state == '7' || FormData.value.state == '8'
  );
  const isScy = computed(() =>
    FormData.value.dqbz == 'YS'
  );
  
  const isCreateByCurrentUser = computed(() => FormData.value.createBy === userStore.getUserInfo.username);
  
  const jczxTaskData = computed(() => {
      let res;
      spList.value?.forEach(item => {
          if (!res && item.hjm == 'JCZX') res = item;
      });
      return res || {updateTime: ''};
  });
  
  getDictItems('sqsx_xm').then((res) => {
      dictOptions.value = res;
      const filteredDictOptions = dictOptions.value.filter(
      (option) => option.value !== "gmpxm"
      );
      dictOptions.value = filteredDictOptions;
  }); 

  
  function load() {
    if(id.value || route.query?.id){
      queryById({ id: id.value || route.query?.id }).then(res => {
        FormData.value = res.sqsx;
        spid.value = res.spid || '';
        spList.value = res.spjls || [];
        jcxx.value = res.jcxx || {};
        jcsh.value = res.jcsh || {};
        chsh.value = res.chsh || {};
        jldsh.value = res.jldsh || {};
        zz.value = res.zz || {};
        ys.value = res.ys || {};
        linkList.value = res.bts || [];
        gmpxx.value = res.gmpxx || {};
        if (res.sqsx.jcpzfw) {
            const dataArr = res.sqsx.jcpzfw.split('\n').map(data => data.split(';'));
            formItems.value = dataArr.map(arr => ({ fw: arr[0], wh: arr[1] || '', sync: !arr[1] }));
        }
        jdzbBUtton();
      })
    }else{
      saveSx('0');

    } 
  
  }
  
  function jdzbBUtton(){
      const isJcshOrZz = FormData.value.state == '0' || FormData.value.dqbz === 'YS' || FormData.value.dqbz === 'JCSH' || FormData.value.dqbz === 'ZZ';
      const isChshOrJld = FormData.value.dqbz == 'CHSH' || FormData.value.dqbz == 'JLDSH';
    
     if (isshow.value) {
       if (isCreateByCurrentUser.value && isJcshOrZz) {
        return true;
    } else if(isChshOrJld){
      return true;
    }
   }
  }
  
  load();
  
  function opentzs(record,dqbz) {
    opentzsModel(true, Object.assign({}, { record: record }, { dqbz: dqbz }))
  }
  function reQy(czlx) {
    if(FormData.value.state!='0' && !spjl.value.sftg) return message.info("请填选审核意见!");
    spjl.value.czlx = czlx;
    isNoRe.value = true;
    saveOrUpdate(spjl.value, false).then(res => {
        if (res == '操作成功') { 
            closeCurrent();
            isNoRe.value = false;
        }
    })
  }
  function openXzk(record){
    openxzkModel(true,record);
  }
  function yjFz(item) {
    spjl.value.spyj = item.yjnr;
  }
  
  function saveSx(lx) {
    if ('0' == lx) {
        isSave.value = false;
        OptFormData.value = Tools.deepMerge({}, FormData.value);
        if(!OptFormData.value.id) OptFormData.value.id = buildUUID();
    } else if ('9' == lx) {
        isSave.value = true;
        if (FormData.value?.jcpzfw) {
            const dataArr = FormData.value?.jcpzfw?.split('\n').map(data => data.split(';'));
            formItems.value = dataArr.map(arr => ({ fw: arr[0], wh: arr[1] || '', sync: !arr[1] }));
        }
    } else if ('1' == lx) {
       if(!OptFormData.value.sqxm){
          message.info("请选择申请项目!")
          return;
        }
        if(!OptFormData.value.qymc){
          message.info("请填写检查单位名称!")
          return;
        }
        if(!OptFormData.value.shxydm){
          message.info("请填写检查单位社会信用代码!")
          return;
        }
        if(!OptFormData.value.qydz){
          message.info("请填写检查场地地址!")
          return;
        }
        for (let idx = 0; idx < formItems.value.length; idx++) {
            let item = formItems.value[idx] || {}; 
            if (!item.fw) {
              message.info('第' + (idx + 1) + '个品种的检查范围/品种不能为空!');
              return;
            }
            if (!item.sync && !item.wh) {
              message.info('第' + (idx + 1) + '个品种的药品批准文号不能为空!');
              return;
            }
          }
  
        if(!OptFormData.value.jccj){
          message.info("请填写检查生产车间!")
          return;
        }
        if(!OptFormData.value.jccx){
          message.info("请填写检查生产线!")
          return;
        }
        OptFormData.value.jcfqsy = zyjj.value;
        OptFormData.value.jcpzfw = formItems.value.map(item => `${item.fw}${item.wh?';':''}${item.wh}`).join('\n');
        sqsxsaveOrUpdate(OptFormData.value, true).then(res => {
            if (res) {
                id.value = res.id;
                spid.value = res.spId;
                isSave.value = true;
                load();
            }
        });
    }
  }
  
  function addFormItem() {
    if (formItems.value.length < 3) {
         formItems.value.push({ fw: '', wh: '', sync: false});
     }
  }
  
  function onChange(item) {
    if (item.sync) {
        item.sync = false;
      } else {
        item.wh = '';
        item.sync = true;
      }
  }
  
  const handleChange = (value: string) => {
        if(value == 'gmpxm-zb') zyjj.value = '请你中心按照《药品生产监督管理办法》、GMP等法规要求，实施现场检查和技术审评。其综合评定意见，请及时报我处。'
        else zyjj.value = ''
    };

  function ZsXz(item,lx) {
    const toolsUrl = Tools.getLocationDomain();
    let url  = item;
    let match = url.substring(url.indexOf("/", 8));
    if('1' == lx){
        downloadByUrl({
          url: toolsUrl + match,
          target: '_self',
     });
    }else{
        Tools.toPreview(toolsUrl + match)
    }
  
  }
  
  function statedict(state, hjm ,isSpr = false) {
    let dict = '';
    if (state == '1') {
        if('ZQY' == hjm) dict = '提交'
        else dict = '通过'
    } else if (state == '0') {
        dict = '不通过'
    } else if (state == '3') {
        dict = '驳回'
    } else if (state == '4') {
        dict = '退回'
    } else if (state == 'JCZX'){
        dict = '检查中心'
    } else if (state == 'inf-end'){
        dict = isSpr ? '' : '盖章'
    } else if (state == '-1'){
        dict = '待处理'
    } else if(state == 'ZQY'){
        dict = '转企业'
    } else if(state == '7'){
        dict = '转企业'
    } else if(state == '8'){
        dict = '取消'
    } else if(state == 'ZZ'){
        dict = '制证'
    } else if(state == '9'){
        dict = '办结'
    } else {
        dict = state;
     
    }
    
    return dict;
  }
  defineExpose({ getDictText, formatToDate });
  
  function fjhandleSuccess({ isUpdate, values }) {
    load();
  }
  function handleSuccess({ isUpdate, values }) {
    closeCurrent();
  }
  
  
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
  
  .ant-switch-loading-icon,
  .ant-switch::after {
    width: 26px;
    height: 26px;
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
  }
  
  .panel {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 15px;
  }
  
  .ant-switch {
    width: 95px;
    height: 31px;
  }
  
  .custom-title {
    font-weight: bold;
    color: red;
  }
  
  .bd-center {
    margin-left: auto;
    margin-right: auto;
    width: 600px;
  }
  :deep(.ant-upload-list-text) {
    &>div{
        .ant-upload-list-item {
            margin-top: 0;
        }
    }
  }
  .bt-class {
  left: -15px;
  z-index: 1;
  }
  </style>