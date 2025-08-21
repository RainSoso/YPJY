<script setup>
import YpjyIndexBox1 from './components/YpjyIndexBox1.vue';
import YpjyIndexBox2 from './components/YpjyIndexBox2.vue';
import YpjyIndexBox3 from './components/YpjyIndexBox3.vue';
import YpjyIndexBox4 from './components/YpjyIndexBox4.vue';
import YpjyIndexBox5 from './components/YpjyIndexBox5.vue';
import YpjyIndexBox6 from './components/YpjyIndexBox6.vue';

import { defHttp } from '/@/utils/http/axios';
import { ref, onMounted, reactive, nextTick, watch, computed } from 'vue';

// 下划线转驼峰
const underline2Hump = (str) => {
  return str.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
};

const viewData = reactive({
  b: window.innerWidth / 1920,
  showQylx: 'pf',
  areaCode: '',
  czqyList: [
    {
      url: '/src/assets/images/vimg/pf.svg',
      name: '批发企业',
      code: 'pfzs',
      num: 0,
    },
    {
      url: '/src/assets/images/vimg/lslszb.svg',
      name: '零售连锁总部',
      code: 'lszb',
      num: 0,
    },
    {
      url: '/src/assets/images/vimg/lslsmd.svg',
      name: '零售连锁门店',
      code: 'lsmd',
      num: 0,
    },
    {
      url: '/src/assets/images/vimg/ls.svg',
      name: '单体零售企业',
      code: 'ls',
      num: 0,
    },
    {
      url: '/src/assets/images/vimg/wljy.svg',
      name: '网络交易平台',
      code: 'sfpt',
      num: 0,
    }
  ],
  czqyPfData: {
    categoryList: [],
    checkInfo: {},
    ypzsInfo: [
    ]
  },
  czqyLszbData: {
    categoryList: [],
    checkInfo: {},
    ypzsInfo: []
  },
  mapInfo: [
    {
      xzqhdm: '420100',
      name: '武汉市',
    },
    {
      xzqhdm: '420200',
      name: '黄石市',
    },
    {
      xzqhdm: '420300',
      name: '十堰市',
    },
    {
      xzqhdm: '420500',
      name: '宜昌市',
    },
    {
      xzqhdm: '420600',
      name: '襄阳市',
    },
    {
      xzqhdm: '420700',
      name: '鄂州市',
    },
    {
      xzqhdm: '420800',
      name: '荆门市',
    },
    {
      xzqhdm: '420900',
      name: '孝感市',
    },
    {
      xzqhdm: '421000',
      name: '荆州市',
    },
    {
      xzqhdm: '421100',
      name: '黄冈市'
    },
    {
      xzqhdm: '421200',
      name: '咸宁市'
    },
    {
      xzqhdm: '421300',
      name: '随州市'
    },
    {
      xzqhdm: '422800',
      name: '恩施土家族苗族自治州'
    },
    {
      xzqhdm: '429004',
      name: '仙桃市'
    },
    {
      xzqhdm: '429005',
      name: '潜江市'
    },
    {
      xzqhdm: '429006',
      name: '天门市'
    },
    {
      xzqhdm: '429021',
      name: '神农架林区'
    }
  ],
  mapCurrentOption: '',
  licenseChangeList: [
    {
      name: '经营地址变更',
      value: 83,
    },
    {
      name: '经营范围变更',
      value: 22
    },
    {
      name: '高频变更',
      value: 98
    },
    {
      name: '新开办待查',
      value: 91
    },
    {
      name: '许可到期(紧急)',
      value: 75
    },
    {
      name: '许可到期(预警)',
      value: 41
    }
  ],
  taskStorageData: {
    list: [
      {
        name: '仅存储',
        insideProvince: 33,
        outsideProvince: 10
      },
      {
        name: '仅运输',
        insideProvince: 20,
        outsideProvince: 40
      },
      {
        name: '混合委托',
        insideProvince: 30,
        outsideProvince: 8
      }
    ],
    info: [
      {
        name: '总委托任务',
        value: 999
      },
      {
        name: '委托即将到期',
        value: 12
      },
      {
        name: '委托特殊品种',
        value: 9
      },
      {
        name: '冷藏冷冻',
        value: 27
      }
    ]
  },
  showTaskQylx: 'pf',
  taskPfList: [],
  taskZbList: [],
});

const year = new Date().getFullYear();
onMounted(() => {
  // TODO: 获取企业信息
  defHttp.get({ url: '/report/ypjyHomePage/homeQycount' })
    .then(res => {
      // console.log(res);
      viewData.czqyList.forEach(item => {
        item.num = res[item.code];
      })

      viewData.areaCode = res.areaCode || '';
    })

  // TODO: 获取批发、连锁总部数据
  defHttp.get({ url: '/report/ypjyHomePage/homeQylx', params: { year, zslx: '11' } })
    .then(res => {
      viewData.czqyPfData.categoryList = res || [];
    })

  defHttp.get({ url: '/report/ypjyHomePage/homeQylx', params: { year, zslx: '18' } })
    .then(res => {
      viewData.czqyLszbData.categoryList = res || [];
    })

  defHttp.get({ url: '/report/ypjyHomePage/homeJcqkCount', params: { nd: year } })
    .then(res => {
      // res.checkInfoPf所有属性下划线转驼峰
      const checkInfoPf = res?.checkInfoPf || {};
      for (const key in checkInfoPf) {
        if (Object.prototype.hasOwnProperty.call(checkInfoPf, key)) {
          const element = checkInfoPf[key];
          checkInfoPf[underline2Hump(key)] = element;
          delete checkInfoPf[key];
        }
      }

      const checkInfoZb = res?.checkInfoZb || {};
      for (const key in checkInfoZb) {
        if (Object.prototype.hasOwnProperty.call(checkInfoZb, key)) {
          const element = checkInfoZb[key];
          checkInfoZb[underline2Hump(key)] = element;
          delete checkInfoZb[key];
        }
      }

      viewData.czqyPfData.checkInfo = checkInfoPf
      viewData.czqyLszbData.checkInfo = checkInfoZb
    })

  setTimeout(() => {
    viewData.czqyPfData.ypzsInfo = [
      { name: '入驻率', value: 20 },
      { name: '已授权', value: 55 },
      { name: '扫码率', value: 98 }];
    viewData.czqyLszbData.ypzsInfo = [
      { name: '入驻率', value: 89 },
      { name: '已授权', value: 66 },
      { name: '扫码率', value: 71 }];
  }, 100)

  // TODO: 获取地图信息
  defHttp.get({ url: '/report/ypjyHomePage/homeMap', params: { nd: year } }).then(res => {
    viewData.mapInfo.forEach(item => {
      item.wholesale = res[item.xzqhdm].wholesale || 0;
      item.retailHead = res[item.xzqhdm].retailHead || res[item.xzqhdm].retail_head || 0;
      item.special = res[item.xzqhdm].special || 0;
      // item.thirdPartyLogistics = Math.floor(Math.random() * 1000);
    })
  })

  // TODO: 获取许可信息
  // viewData.licenseChangeList = [];

  // TODO: 获取委托信息

  // TODO: 获取任务信息
  defHttp.get({ url: '/report/ypjyHomePage/homeTask', params: { nd: year } })
    .then(res => {
      // console.log(res);
      viewData.taskPfList = res.taskPfList;
      viewData.taskZbList = res.taskZbList;
    })
});

</script>
<template>
  <div class="view column">
    <div class="row">
      <div class="column">
        <YpjyIndexBox1 :view-data="viewData" />
        <YpjyIndexBox2 :view-data="viewData" />
      </div>
      <YpjyIndexBox3 :view-data="viewData" />
    </div>
    <div class="row">
      <div class="box4 column">
        <span class="title">许可变更监控</span>
        <YpjyIndexBox4 :view-data="viewData" />
      </div>
      <div class="box4 column">
        <span class="title">委托储运监控</span>
        <YpjyIndexBox5 :view-data="viewData" />
      </div>
      <div class="box4">
        <YpjyIndexBox6 :view-data="viewData" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.row {
  display: flex;
  flex-direction: row;
  gap: 0.833334vw;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 0.833334vw;
}

.view {
  width: 100vw;
  min-height: 52.5vw;
  padding: 1.25vw;
  background-color: #e5e7eb;
  box-sizing: border-box;
}

.title {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-style: Bold;
  font-size: 1.041667vw;
  line-height: 1.354167vw;
  letter-spacing: 0%;
  vertical-align: middle;
}

.box-header {
  height: 1.354167vw;
  gap: 0;
  justify-content: space-between;
  align-items: flex-start;

  .header-box {
    // width: 8.958333vw;
    height: 1.25vw;
    gap: 0;

    font-family: Source Han Sans CN;
    font-weight: 400;
    font-style: Regular;
    font-size: 0.729167vw;
    line-height: 1.145833vw;
    vertical-align: middle;

    cursor: pointer;

    .header-left {
      border-width: 0.052083vw 0 0.052083vw 0.052083vw;
      padding: 0 0.416667vw;
      border-style: solid;
      border-color: #4E84FE;
      color: #4E84FE;
    }

    .header-right {
      border-width: 0.052083vw 0.052083vw 0.052083vw 0;
      padding: 0 0.416667vw;
      border-style: solid;
      border-color: #4E84FE;
      color: #4E84FE;
    }

    .header-active {
      background-color: #4E84FE;
      color: #fff;
    }
  }
}

.box4 {
  flex: 1;
  height: 19.479167vw;
  border-radius: 1.25vw;
  background-color: #fff;
  padding: 0.833333vw;
}
</style>
