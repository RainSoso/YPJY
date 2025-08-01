<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { getCurrentInstance } from 'vue';
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';
  import Tools from '/@/utils/tools';

  // support Multi-language
  const { getAntdLocale } = useLocale();

  useTitle();

  Tools.setAppContext(getCurrentInstance()?.appContext, getAntdLocale);
</script>

<style lang="less">
@import 'assets/less/commons.less';

.ant-modal-header {
  border-bottom-color: #d4d4d8 !important;
}
</style>
