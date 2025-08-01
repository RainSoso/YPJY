import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

let lbFilters = [];
'药包材,药用辅料,原料药'.split(',').forEach((item)=>{
    lbFilters.push({text:item, value:item});
});

export function getColumns(showCategory: boolean = true): BasicColumn[] {
    let array: BasicColumn[] = [{
        title: '登记号', dataIndex: 'djh', width: 130, sorter: true
    }, {
        title: '药品名称', dataIndex: 'yptymc'
    }, {
        title: '统一社会信用代码', dataIndex: 'shxydm', defaultHidden: true
    }, {
        title: '企业名称', dataIndex: 'qymc'
    }, {
        title: '企业地址', dataIndex: 'qydz', defaultHidden: true
    }, {
        title: '境外企业名称', dataIndex: 'jwqymc', defaultHidden: true
    }, {
        title: '境外企业地址', dataIndex: 'jwqydz', defaultHidden: true
    }, {
        title: '来源', dataIndex: 'source', width: 90
    }, {
        title: '包装规格', dataIndex: 'bzgg', width: 150
    }, {
        title: '登记日期', dataIndex: 'djrq', width: 110, sorter: true
    }];
    if (showCategory) {
        array.splice(1, 0, {
            title: '类别', dataIndex: 'category', width: 90,filters: lbFilters
        });
    }
    return array;
};

export function getSearchFormSchema(showCategory: boolean = true): FormSchema[] {
    let array: FormSchema[] = [ {
        label: '所属地市', field: 'xzqhdm', component: 'JDictSelectTag', componentProps: { dictCode: 'area_city' }, colProps: { xxl: { span: 4 } }
    }, {
        label: '登记号', field: 'djh', component: 'JInput',
        colProps: { xxl: { span: 4 } }
    }, {
        label: '企业名称', field: 'qymc', component: 'JInput',
        colProps: { xxl: { span: 4 } }
    }, {
        label: '药品名称', field: 'yptymc', component: 'JInput',
        colProps: { xxl: { span: 4 } }
    }];
    if (showCategory) {
        array.splice(1, 0, {
            label: '类别', field: 'category', component: 'JInput',
            colProps: { xxl: { span: 4 } }
        });
    }
    return array;
};

export const formSchema: FormSchema[] = [{
    label: '登记号', field: 'djh', component: 'Input', componentProps: { readonly: true }
}, {
    label: '类别', field: 'category', component: 'Input', componentProps: { readonly: true }
}, {
    label: '药品名称', field: 'yptymc', component: 'Input', rules: [{ required: true }]
}, {
    label: '统一社会信用代码', field: 'shxydm', labelWidth: 150, component: 'Input', rules: [{ required: true }]
}, {
    label: '企业名称', field: 'qymc', component: 'Input', rules: [{ required: true }]
}, {
    label: '企业地址', field: 'qydz', component: 'Input',
}, {
    label: '境外企业名称', field: 'jwqymc', component: 'Input',
}, {
    label: '境外企业地址', field: 'jwqydz', component: 'Input',
}, {
    label: '标签选择', field: 'tags', component: 'MCategorySelect', componentProps: { pcode: 'A02', multiple: true, getPopupContainer: () => document.body }
}, {
    label: '来源', field: 'source', component: 'Input',
}, {
    label: '包装规格', field: 'bzgg', component: 'Input',
}, {
    label: '登记日期', field: 'djrq', component: 'DatePicker', componentProps: { showTime: false, valueFormat: 'YYYY-MM-DD', },
}, {
    label: '规格', field: 'ypgg', component: 'Input',
}, {
    label: '批准日期', field: 'pzrq', component: 'DatePicker', componentProps: { showTime: false, valueFormat: 'YYYY-MM-DD', },
}, {
    label: '药品批准文号', field: 'yppzwh', component: 'Input',
}, {
    label: '批准文号有效期', field: 'yppzwhyxq', component: 'DatePicker', componentProps: { showTime: false, valueFormat: 'YYYY-MM-DD', },
}, {
    label: '审批结论', field: 'ypspjl01', component: 'InputTextArea', componentProps: { rows: 5 }
}, {
    label: '注销时间', field: 'ztbzsj', component: 'Input',
}, {
    label: '证书状态说明', field: 'ztbzyy', component: 'Input',
}];
