import { FormSchema } from '/@/components/Form';

// 部门基础表单
export function useBasicFormSchema() {
  const basicFormSchema: FormSchema[] = [
    {
      field: 'departName',
      label: '机构名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入机构/部门名称',
      },
      rules: [{ required: true, message: '机构名称不能为空' }],
    },
    {
      field: 'parentId',
      label: '上级部门',
      component: 'TreeSelect',
      componentProps: {
        treeData: [],
        placeholder: '无',
        dropdownStyle: { maxHeight: '200px', overflow: 'auto' },
      },
    },
    {
      field: 'orgCategory',
      label: '机构类型',
      component: 'RadioButtonGroup',
      componentProps: { options: [] },
      rules: [{ required: true, message: '机构类型必须选择' }],
    },
    {
      field: 'code',
      label: '机构编码',
      component: 'Input',
      componentProps: {
        placeholder: '请输入机构编码'
      }
    },
    {
      field: 'category',
      label: '机构类别',
      component: 'RadioButtonGroup',
      componentProps: { options: ['省', '市', '区县', '所'] }
    },
    {
      field: 'areaCode',
      label: '管辖区划',
      component: 'MAreaSelectMultiple',
      componentProps: { provinceCodes: '420000', required: [false] }
    },
    {
      field: 'departOrder',
      label: '排序',
      component: 'InputNumber',
      componentProps: {},
    },
    {
      field: 'mobile',
      label: '电话',
      component: 'Input',
      componentProps: {
        placeholder: '请输入电话',
      },
    },
    {
      field: 'fax',
      label: '传真',
      component: 'Input',
      componentProps: {
        placeholder: '请输入传真',
      },
    },
    {
      field: 'address',
      label: '地址',
      component: 'Input',
      componentProps: {
        placeholder: '请输入地址',
      },
    },
    {
      field: 'memo',
      label: '备注',
      component: 'InputTextArea',
      componentProps: {
        placeholder: '请输入备注',
      },
    },
  ];
  return { basicFormSchema };
}

// 机构类型选项
export const orgCategoryOptions = {
  // 一级部门
  root: [{ value: '1', label: '单位' }],
  // 父为单位的子级部门
  unitChild: [{ value: '1', label: '单位' }, { value: '2', label: '部门' }, { value: '3', label: '岗位' }],
  // 父为部门的子级部门
  child: [{ value: '2', label: '部门' }, { value: '3', label: '岗位' }],
  // 父为岗位的子级部门
  positionChild: [{ value: '3', label: '岗位' }]
}

export function getOrgCategoryOptions(orgCategory) {
  if (1 == orgCategory) return orgCategoryOptions.unitChild;
  else if (2 == orgCategory) return orgCategoryOptions.child;
  else if (3 == orgCategory) return orgCategoryOptions.positionChild;
  return orgCategoryOptions.root;
}

export function getOrgCategoryOptionsByCode(code) {
  if (1 == code) return [{ value: '1', label: '单位' }];
  else if (2 == code) return [{ value: '2', label: '部门' }];
  else if (3 == code) return [{ value: '3', label: '岗位' }];
  return [];
}
