import { reactive, unref, Ref, VNode, defineAsyncComponent, render, ExtractPropTypes } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import { AppProvider } from '/@/components/Application';
import { propTypes } from '/@/utils/propTypes';
import { default as Tools } from '/@/utils/tools';

export const ChooseUserProps = {
    multiple: propTypes.bool.def(true),
    title: propTypes.string.def('选择用户'),
    width: propTypes.oneOfType([propTypes.string, propTypes.number]).def('80%'),
    /* 强制选择该单位及其下级单位的用户 */
    forceOrgIds: propTypes.string
}

export declare type ChooseUserOptions = ExtractPropTypes<typeof ChooseUserProps> & {
    target: any
};

export const chooseUser = (opt?: Partial<ChooseUserOptions>): Promise<{ isConfirm: boolean, ids: any[], data: Recordable[] }> => {
    let resolve, res = new Promise<{ isConfirm: boolean, ids: any[], data: Recordable[] }>((r, _) => {
        resolve = r;
    });
    opt = opt || {};
    let target: HTMLElement | Ref<ElRef> = opt.target || document.getElementById('chooseUser');
    if (!target) {
        let div = document.createElement('div');
        div.setAttribute('id', 'chooseUser');
        document.body.appendChild(target = div);
    }

    const data = reactive({
        ...opt,
    });
    let vm: Nullable<VNode> = Tools.createVNode(ConfigProvider, { locale: unref(Tools.locale) },
        () => Tools.createVNode(AppProvider, {},
            () => Tools.createVNode(defineAsyncComponent(() => import("./ChooseUser.vue")), {
                getContainer: () => target, onResult: result, ...data
            })
        )
    );

    function result(res) {
        resolve(res);
        setTimeout(() => {
            const t = unref(target as Ref<ElRef>);
            if (!t) return;
            if (t.parentNode) t.parentNode.removeChild(t);
        }, 200);
    }
    function open(target: HTMLElement = document.body) {
        if (!vm || !vm.el) return;
        target.appendChild(vm.el as HTMLElement);
    }

    setTimeout(() => {
        render(vm, document.createElement('div'));

        if (target) {
            const t = unref(target as Ref<ElRef>);
            if (!t) return;
            open(t);
        }
    }, 0);
    return res;
}