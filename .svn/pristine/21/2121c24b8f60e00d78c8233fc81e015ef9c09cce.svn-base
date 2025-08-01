import { isRef, unref, createVNode, VNode } from 'vue';
import { merge } from 'lodash-es';
import { RoleEnum } from '/@/enums/roleEnum';
import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';
import { defHttp } from '/@/utils/http/axios';
import { isUnDef, isNumber, isNullOrUnDef, isString } from '/@/utils/is';
import { openWindow } from '/@/utils/index';
import { useGlobSetting } from '/@/hooks/setting';
import { getConfig } from '/@/utils/configUtils';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { usePermission } from '/@/hooks/web/usePermission';
import { getToken } from '/@/utils/auth';
import { chooseUser } from '/@/components/Custom/ChooseUser';

const globSetting = useGlobSetting();
const userStore = useUserStoreWithOut();
const { hasPermission } = usePermission();

function getPreviewInfo() {
    let url = getConfig('file.preview.url') || '',
        version = getConfig('file.preview.v') || '2',
        isBase64 = false;
    if (!/^(http|https):\/\//ig.test(url) && url.startsWith('/')) {
        url = location.origin + url;
    }
    version = parseInt(version.split('.')[0].replace(/\D/, '')) || 0;
    isBase64 = !isNaN(version) && 2 < version;
    if (!url) console.error('file.preview.url is null', url);
    return {
        url, version, isBase64, getPreviewUrl(target) {
            return url + '?' + tools.toUrlParams({ url: isBase64 ? tools.toBase64(target) : target });
        }
    };
}

function getTableData<E extends Element = Element>(node: E | undefined): TableProps;
function getTableData<E extends Element = Element>(node: NodeListOf<E> | undefined): TableProps[];
function getTableData<E extends Element = Element>(node: NodeListOf<E> | E | undefined): TableProps[] | TableProps | undefined {
    if (node == undefined) return;
    if ((<NodeListOf<E>>node).forEach) {
        let res: Array<any> = [];
        (node as NodeListOf<E>).forEach((item) => {
            item && res.push(getTableData(item));
        });
        return res;
    } else {
        let res: TableProps = { header: [], body: [], footer: [] };
        (node as E).childNodes.forEach((box) => {
            if (box.nodeName != 'THEAD' && box.nodeName != 'TBODY' && box.nodeName != 'TFOOT') return;
            let target: Array<Array<TableTdProps>> = box.nodeName.toUpperCase() == 'THEAD' ? res.header : (box.nodeName.toUpperCase() == 'TBODY' ? res.body : res.footer);
            box.childNodes.forEach(tr => {
                if (tr.nodeName != 'TR') return;
                let row: Array<TableTdProps> = [];
                tr.childNodes.forEach(item => {
                    if (item.nodeName != 'TD' && item.nodeName != 'TH') return;
                    let td: HTMLTableCellElement = item as HTMLTableCellElement;
                    row.push({
                        ...(1 < td.rowSpan ? { rowSpan: td.rowSpan } : {}),
                        ...(1 < td.colSpan ? { colSpan: td.colSpan } : {}),
                        ...(td.style.textAlign == 'center' ? { align: 'center' } : (td.style.textAlign == 'right' ? { align: 'right' } : {})),
                        ...(td.style.verticalAlign == 'top' ? { valign: 'top' } : (td.style.verticalAlign == 'bottom' ? { valign: 'bottom' } : {})),
                        content: td.innerText
                    });
                });
                target.push(row);
            });
        });
        return res;
    }
}

const tools = {
    baseApiUrl: globSetting.domainUrl,
    isNumber,
    endsWith(val: any, suffix: string) {
        val = val ? val + '' : '';
        return 0 < val.length && suffix && val.substring(val.length - 1) == suffix;
    },
    deepMerge(...objs: any[]) {
        if (objs.length > 2) {
            let res = objs[0];
            for (let i = 1; i < objs.length; i++) {
                tools.deepMerge(res, objs[i]);
            }
            return res;
        } if (objs.length > 1) {
            let dest = isNullOrUnDef(objs[0]) ? {} : objs[0], source = isNullOrUnDef(objs[1]) ? {} : objs[1];
            if (isRef(dest)) dest = unref(dest);
            if (isRef(source)) source = unref(source);
            merge(dest, source);
            return dest;
        } else {
            return 0 < objs.length ? objs[0] : null;
        }
    },
    toUrlParams(obj: any) {
        let array: string[] = [];
        for (const key in obj) {
            array.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return array.join('&');
    },
    getAppInnerUrl() {
        return getConfig('app.inner.url') || location.origin;
    },
    getFileAccessHttpUrl(fileUrl, isIntranet = false): string {
        if (fileUrl && (fileUrl.startsWith('http://') || fileUrl.startsWith('https://'))) return fileUrl;
        let prefix = '/sys/common/static/', res = fileUrl;
        if (isIntranet) {
            prefix = tools.getAppInnerUrl() + globSetting.apiUrl + prefix;
        } else {
            prefix = globSetting.domainUrl + prefix;
        }
        if (!fileUrl.startsWith(prefix)) res = `${prefix}${fileUrl}`;
        return res;
    },
    getLocationDomain(containsCtx = false) {
        return location.origin + (containsCtx ? '' : '');
    },
    toBase64(str: unknown) {
        let val: string = '';
        if (isUnDef(str)) val = '';
        else if (isNumber(str)) val += str + '';
        else val = str;
        return Base64.stringify(Utf8.parse(val));
    },
    getPreviewUrl() {
        return getPreviewInfo().url;
    },
    getFileSize(size, len: number = 2) {
        let kb = 1024.0, mb = kb * 1024.0, gb = mb * 1024.0;
        if (size >= gb) {
            return tools.numberFormat(size / gb, len) + 'G';
        } else if (size >= mb) {
            return tools.numberFormat(size / mb, len) + 'M';
        } else if (size >= kb) {
            return tools.numberFormat(size / kb, len) + 'K';
        } else {
            return tools.numberFormat(size / 1.0, len) + 'dB';
        }
    },
    toPreview(url) {
        window.open(this.getToPreviewUrl(url));
    },
    getToPreviewUrl(url) {
        //排除图片格式
        if(!this.validateImageFormat(url)) {
            var uu = getConfig('app.inner.url') || location.origin;
            url = url.replace('https://zhsc.hubyjj.cn:3100',uu);
        }
        return getPreviewInfo().getPreviewUrl(url);
    },
    
    validateImageFormat(filename) {
        if(filename.indexOf('.jpg') > -1 || filename.indexOf('.jpeg') > -1 
            || filename.indexOf('.png') > -1 || filename.indexOf('.gif') > -1
            || filename.indexOf('.bmp') > -1
        )  {
            return true;
        } else {
            return false;
        }
    },
    
    numberFormat(val, len) {
        let v = Math.pow(10, len);
        return Math.round(val * v) / v;
    },
    /**
     * 防抖，一定时间内，只有最后一次操作，再过delay毫秒后才执行函数
     * @param {Function} fn 要执行的回调函数
     * @param {Number} delay 延时的时间
     * @param {Boolean} immediate 是否立即执行 
     */
    debounce: (() => {
        let timer = {};
        return function (fn, delay = 500, immediate = false) {
            let context = this,
                args = arguments,
                callNow = !timer[fn];
            if (timer[fn] != null && timer[fn] != undefined) clearTimeout(timer[fn]);
            if (immediate) {
                timer[fn] = setTimeout(function () {
                    timer[fn] = null;
                }, delay);
                if (callNow) fn.apply(context, args);
            } else {
                timer[fn] = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            }
        };
    })(),
    /**
     * 节流，在一定时间内，只能触发一次
     * @param {Function} fn 要执行的回调函数
     * @param {Number} delay 延时的时间
     */
    throttle: (() => {
        let timer = {},
            flag;
        return function (fn, delay = 500) {
            if (!flag) {
                flag = true;
                fn.apply(this, arguments);
                timer[fn] = setTimeout(() => {
                    flag = false;
                }, delay);
            }
        };
    })(),
    alert(msg) {
        alert(msg);
    },
    hasRole(role: RoleEnum | string) {
        return 0 < userStore.getRoleList.filter(i => i == role).length;
    },
    hasPermission(value?: RoleEnum | RoleEnum[] | string | string[], def = true): boolean {
        return hasPermission(value, def);
    },
    isSysAdmin() {
        return userStore.getUserInfo?.username == 'sysAdm';
    },
    isSubOrg(orgCode: string) {
        let code = userStore.getUserInfo?.orgCode || '';
        return orgCode && code && orgCode.startsWith(code);
    },
    isImageUrl(url) {
        return url && /.*\.(jpg|jpeg|png|gif|bmp|webp)$/ig.test(url);
    },
    isThirdTesting() {
        return false;
    },
    getCurrentYear() {
        return new Date().getFullYear();
    },
    getYearArray(year: number | null = null) {
        let array: any = [];
        if (!year) year = tools.getCurrentYear();
        for (let i = -3; i < 4; i++) {
            array.push(year + i);
        }
        return array;
    },
    getYearArrayOptions(year: number | null = null) {
        let array: any = [];
        if (!year) year = tools.getCurrentYear();
        for (let i = -3; i < 4; i++) {
            array.push({ value: year + i, label: year + i });
        }
        return array;
    },
    getTableData,
    downloadExcel(filename: string, data: any) {
        let form = document.createElement('form'), field = document.createElement('input');
        field.type = 'hidden';
        field.name = 'json';
        field.value = JSON.stringify(data || {});
        form.appendChild(field);
        field = document.createElement('input');
        field.type = 'hidden';
        field.name = 'token';
        field.value = getToken();
        form.appendChild(field);
        form.method = 'post';
        form.action = `${this.baseApiUrl}/sys/common/excel/${filename}.xlsx`;
        form.target = '_blank';
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    },
    goToZsPreview(yppzwh: string, zszt: string) {
        defHttp.get({ url: '/jc/pz/yppz/getZsPreviewUrl', params: { yppzwh, zszt } }).then(res => {
            res && openWindow(res);
        });
    },
    getParentElem(e, selector: string) {
        if (!e || !selector) return null;
        if (e.path) {
            for (let idx = 0; idx < e.path.length; idx++) {
                if (e.path[idx].matches(selector)) return e.path[idx];
            }
        } else {
            let last, elem = e.target || e.srcElement;
            while ((elem = elem.parentNode) !== last) {
                if (elem.matches(selector)) return elem;
                last = elem;
            }
        }
        return null;
    },
    indexOf(list, elem) {
        if (!list || !elem) return -1;
        for (let idx = 0; idx < list.length; idx++) {
            if (list[idx] === elem) return idx;
        }
        return -1;
    },
    appContext: null,
    locale: null,
    setAppContext(ctx?, locale?) {
        tools.appContext = ctx;
        tools.locale = locale;
    },
    createVNode(type, props?, children?): Nullable<VNode> {
        let vm: Nullable<VNode> = createVNode(type, props, children);
        tools.appContext && (vm.appContext = tools.appContext);
        return vm;
    },
    chooseUser(opt?: Parameters<typeof chooseUser>[0]): ReturnType<typeof chooseUser> {
        return chooseUser(opt);
    },
    calcRowSpan(data: Array<any>, id: string | Function = 'name', rowSpanField: string = 'rowSpan') {
        let last = { item: { qyRowSpan: 1 }, id: '', idx: 0 }, generateId = (item) => {
            return isString(id) ? item[id] : id(item);
        }, setRowSpan = (item, rowSpan, reset = true) => {
            if (!reset && item[rowSpanField]) return;
            item[rowSpanField] = rowSpan;
        };
        data.forEach((item, idx) => {
            let id = generateId(item);
            setRowSpan(item, 0);
            if (last.id && last.id != id) setRowSpan(last.item, idx - last.idx);
            if (!last.id || last.id != id) last = { item, idx, id: id };
        });
        setRowSpan(last.item, data.length - last.idx, false);
    },
    calcPercent(total: string | number, value: string | number, decimals: number = 2, suffix: string = '%'): number | string {
        if (!tools.isNumber(total)) total = parseFloat(total) || 0;
        if (!tools.isNumber(value)) value = parseFloat(value) || 0;
        let res = 0 < total || 0 > total ? Math.round(value * Math.pow(10, decimals + 2) * 1.0 / total) / Math.pow(10, decimals) : 0;
        return suffix ? res + suffix : res;
    }
};

export default tools;

export interface TableProps {
    title?: string;
    header: TableTdProps[][];
    body: TableTdProps[][];
    footer: TableTdProps[][];
};

export interface TableTdProps {
    rowSpan?: number;
    colSpan?: number;
    align?: 'left' | 'center' | 'right';
    valign?: 'top' | 'middle' | 'bottom';
    content?: string;
}
