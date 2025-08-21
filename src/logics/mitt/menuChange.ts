/**
 * 用于菜单间通信，主要用于头部菜单触发左侧菜单更新
 */

import mitt from '/@/utils/mitt';

const emitter = mitt();

const LEFT_MENU_UPDATE_KEY = Symbol('LEFT_MENU_UPDATE');

export function triggerLeftMenuUpdate(parentPath: string) {
  emitter.emit(LEFT_MENU_UPDATE_KEY, parentPath);
}

export function onLeftMenuUpdate(callback: (parentPath: string) => void): () => void {
  emitter.on(LEFT_MENU_UPDATE_KEY, callback);

  // 返回清理函数，移除特定的监听器
  return () => {
    emitter.off(LEFT_MENU_UPDATE_KEY, callback);
  };
}

export function offLeftMenuUpdate() {
  emitter.clear();
}
