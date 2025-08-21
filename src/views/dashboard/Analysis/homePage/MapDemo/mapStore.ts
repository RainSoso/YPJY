import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { defHttp } from '/@/utils/http/axios';

/**
 * 地图要素数据类型
 * @param xzqhdm 区域编码
 * @param value 总数
 * @param wholesale 药品数量
 * @param retailHead 器械数量
 * @param special 化妆品数量
 */
export interface viewData {
    xzqhdm: string
    value: number | 0
    wholesale: number
    retailHead: number
    special: number
}

export const mapSelectMap = {
  '批发企业': 'wholesale',
  '连锁总部': 'retailHead',
  '特殊药品企业': 'special',
  // '三方物流': 'thirdPartyLogistics',
}

// 创建地图数据store
export const useMapStore = defineStore('map', () => {

    // 定义地图要素数据
    const viewData = ref<viewData[]>([]);
    // 当前选中类型
    const currDataType = ref<string>('');
    const currDataTypeValue = computed(() => mapSelectMap[currDataType.value]);

    //定义当前地图的层级区划代码
    const currAreaCode = ref<string>('');

    const currAreaName = ref<string>('');

    /**
     * 根据传入的区域代码组装对应区域的地图要素数据
     * @param xzqhdm 城市代码
     * @returns
     */
    function getFeaturesCityData(xzqhdm:string): viewData {
        if(viewData.value.length == 0) return {
            xzqhdm: xzqhdm,
            value: 0,
            wholesale: 0,
            retailHead: 0,
            special: 0,
        };

        if (xzqhdm.endsWith("00")) { //市级
            let cityCodeStart = xzqhdm.substring(0, 4);
            let wholesale = 0;
            let retailHead = 0;
            let special = 0;
            viewData.value.filter(item => item.xzqhdm.startsWith(cityCodeStart)).forEach(item => {
                wholesale+=item.wholesale;
                retailHead+=item.retailHead;
                special+=item.special;
            })
            return {
                xzqhdm: xzqhdm,
                value: wholesale + retailHead + special,
                wholesale: wholesale,
                retailHead: retailHead,
                special: special,
            }
        } else {
            let item = viewData.value.find(item => item.xzqhdm == xzqhdm);
            if(item) {
                item.value = item.wholesale + item.retailHead + item.special;
                return item
            } else {
                return {
                    xzqhdm: xzqhdm,
                    value: 0,
                    wholesale: 0,
                    retailHead: 0,
                    special: 0,
                }
            }
        }
    }

    // 更新方法
    const updateMapData = (data: viewData[]) => {
        viewData.value = data
    }

    // 加载地图数据
  // TODO: 获取地图信息
  const fetchMapData = async () => {
    try {
      // 使用接口返回的 result，直接构建新的要素数组
      // 说明：后端字段包含 retail_head，需要在此统一映射为 retailHead
      const res = await defHttp.get<Record<string, any>>({ url: '/report/ypjyHomePage/homeMap', params: { nd: '2025' } });

      const mapped: viewData[] = Object.keys(res || {}).map((key) => {
        const item = res[key] || {};
        const wholesale = Number(item.wholesale) || 0;
        const retailHead = Number(item.retailHead ?? item.retail_head) || 0;
        const special = Number(item.special) || 0;
        const total = wholesale + retailHead + special;
        return {
          xzqhdm: key,
          value: total,
          wholesale,
          retailHead,
          special,
        };
      });

      // 直接替换为新数组，触发响应式更新
      viewData.value = mapped;
      console.log('[mapStore] viewData loaded:', viewData.value);
    } catch (error) {
      console.error('获取地图数据失败:', error);
    }
  }
    // const fetchMapData = async () => {
    //     try {

    //         if (res.code == 200) {
    //             viewData.value = res.data;
    //         }
    //     } catch (error) {
    //         console.error('获取地图数据失败:', error)
    //     }
    // }

    /**
     * 更新当前地图的层级区划代码
     * @param xzqhdm 区域代码
     * @param areaName 区域名称
     */
    const updateCurrAreaCode = (xzqhdm:string, areaName:string) => {
        currAreaCode.value = xzqhdm
        currAreaName.value = areaName
    }

    const updateCurrDataType = (dataType:string) => {
        currDataType.value = dataType
    }

    return {
        viewData,
        updateMapData,
        fetchMapData,
        getFeaturesCityData,
        currAreaCode,
        currAreaName,
        updateCurrAreaCode,
        currDataType,
        updateCurrDataType,
        currDataTypeValue
    }
})
