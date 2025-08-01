import axios from 'axios';
import { message } from 'ant-design-vue';
import { getConfig } from '/@/utils/configUtils';

function createAxios() {
    let res = {
        request: axios.create({
            baseURL: getConfig('qy.wssb.url'),
            responseType: 'json',
            validateStatus(status) {
                return status === 200
            }
        }),
        post(url: string, params = {}, opts = {}) {
            return this.request.post(url, params, Object.assign({
                transformRequest: [(params) => {
                    let result = ''
                    Object.keys(params).forEach((key) => {
                        if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
                            result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
                        }
                    })
                    return result
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }, opts));
        },
        downloadByData(url, params, filename) {
            message.loading('文件传输中');
            this.post(url, params, {
                responseType: 'blob'
            }).then((res) => {
                message.destroy();
                const content = res.data as BlobPart;
                const blob = new Blob([content]);
                if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    window.navigator.msSaveBlob(blob, filename);
                } else {
                    const elink = document.createElement('a');
                    elink.download = filename;
                    elink.style.display = 'none';
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    URL.revokeObjectURL(elink.href);
                    document.body.removeChild(elink);
                }
            }).catch((r) => {
                console.log(r);
                message.error('下载失败');
            });
        }
    };
    return res;
}

export function leftByByte(str, len) {
    str = (str || '').replace(/(^\s+)|(\s+$)/ig, '');
    let res = '', total = 0, c, l;
    for (let i = 0; i < str.length; i++) {
        c = str.charAt(i);
        l = str.charCodeAt(i) > 128 ? 2 : 1;
        total += l;
        if (total <= len) {
            res += c.toString();
            if (total == len) return res;
        } else return res;
    }
    return res;
};

export const defHttp = createAxios();

export function getAttchList(fileId: string, type: string = ''): Promise<object[]> {
    type = leftByByte(type, 40);
    return new Promise((resolve, reject) => {
        defHttp.post('ym/editNdbgFj', { id: fileId, type: type }).then((res) => {
            if (res && res.data && res.data.code == '200') {
                resolve(res.data.data || []);
            } else {
                resolve([]);
            }
        }).catch(() => {
            resolve([]);
        });
    });
};