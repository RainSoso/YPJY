<template>
    <div>
      <BasicModal v-bind="$attrs" @register="register" :title="modalTitle" width="80%" wrapClassName="j-user-select-modal" @ok="handleOk" destroyOnClose @visible-change="visibleChange">
        <a-row>
          <a-col :span="showSelected ? 18 : 24">
            <BasicTable
              :columns="columns"
              :useSearchForm="true"
              :formConfig="formConfig"
              :api="list"
              :rowSelection="rowSelection"
              :indexColumnProps="indexColumnProps"
              :beforeFetch="getypmc"
              v-bind="getBindValue"
            ></BasicTable>
          </a-col>
          <a-col :span="showSelected ? 6 : 0">
            <BasicTable v-bind="selectedTable" :dataSource="selectRows" :useSearchForm="true" :formConfig="{ showActionButtonGroup: false, baseRowStyle: { minHeight: '40px' } }">
              <!--操作栏-->
              <template #action="{ record }">
                <a href="javascript:void(0)" @click="handleDeleteSelected(record)"><Icon icon="ant-design:delete-outlined"></Icon></a>
              </template>
            </BasicTable>
          </a-col>
        </a-row>
      </BasicModal>
    </div>
  </template>
  <script lang="ts">
    import { defineComponent,  unref } from 'vue';
    import { BasicModal, useModalInner } from '/@/components/Modal';
    import { list } from '/@/views/ypsczhjg/ypyd/gcyppz/JcPzYpzcscjy.api';
    import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
    import { useSelectBiz } from '/@/components/Form/src/jeecg/hooks/useSelectBiz';
    import { useAttrs } from '/@/hooks/core/useAttrs';
    import { selectProps } from '/@/components/Form/src/jeecg/props/props';
  
    export default defineComponent({
      name: 'JcPzSelectModal',
      components: {
        //此处需要异步加载BasicTable
        BasicModal,
        BasicTable: createAsyncComponent(() => import('/@/components/Table/src/BasicTable.vue'), {
          loading: true,
        }),
      },
      props: {
        ...selectProps,
        //选择框标题
        modalTitle: {
          type: String,
          default: '药品选择',
        },
        isRadioSelection: { type: true, default: true }
      },
      emits: ['register', 'getSelectResult'],
      setup(props, { emit }) {
        //注册弹框
        const [register, { closeModal }] = useModalInner();
        const attrs = useAttrs();
        //表格配置
        const config = {
          canResize: false,
          bordered: true,
          size: 'small',
          rowKey: 'yppzwh',
        };
        
        const getBindValue = Object.assign({}, unref(props), unref(attrs), config);
  
        const [{ rowSelection , visibleChange, indexColumnProps, getSelectResult, handleDeleteSelected, selectRows }] = useSelectBiz(list, getBindValue);
        //查询form
        const formConfig = {
          labelWidth: 80,
          autoSubmitOnEnter: true,
          schemas: [{
            label: '通用名称', field: 'yptymc', component: 'JInput', colProps: { span: 5 },
          },{
            label: '药品生产企业', labelWidth: 110, field: 'ypscqymc', component: 'JInput', colProps: { span: 6 },
          }]
        };
        //定义表格列
        const columns = [{
          title: '药品批准文号', dataIndex: 'yppzwh', width: 170, sorter: true
        }, {
          title: '药品通用名称', dataIndex: 'yptymc', sorter: true
        },{
          title: '药品商品名称', dataIndex: 'ypspmc', sorter: true
        } ,{
          title: '剂型', sorter: true, dataIndex: 'bzjx', width: 120, defaultHidden: true
        }, {
          title: '规格', dataIndex: 'ypgg', width: 150
        }, {
          title: '药品生产企业', dataIndex: 'ypscqymc', sorter: true
        } ];
        //已选择的table信息
        const selectedTable = {
          pagination: false,
          showIndexColumn: false,
          scroll: { y: 390 },
          size: 'small',
          canResize: false,
          bordered: true,
          rowKey: 'yppzwh',
          columns: [{
            title: '品种名称', dataIndex: 'yppzwh', width: 40,
          }, {
            title: '操作', dataIndex: 'action', align: 'center', width: 40, slots: { customRender: 'action' },
          }]
        };
        /**
         * 确定选择
         */
        function handleOk() {
          getSelectResult(async () => {
            (unref(selectRows)).forEach((item) => {
                let pz=item
                //回传选项和已选择的值
                emit('getSelectResult', pz);
            });
            
            

            //关闭弹窗
            closeModal();
          });
        }
        function getypmc(params){
          return params;
        }
  
        indexColumnProps.width = 60;
        return {
          handleOk,
          list,
          getypmc,
          register,
          visibleChange,
          getBindValue,
          formConfig,
          indexColumnProps,
          columns,
          rowSelection,
  
          selectedTable,
          selectRows,
          handleDeleteSelected,
        };
      },
    });
  </script>
  