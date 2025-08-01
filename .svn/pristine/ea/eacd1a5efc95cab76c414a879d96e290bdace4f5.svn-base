import { getAuthCache } from '/@/utils/auth';
import { DB_CONFIG_DATA_KEY } from '/@/enums/cacheEnum';

export function getConfig(name: string) {
  const obj = getAuthCache<any>(DB_CONFIG_DATA_KEY);
  if (obj && obj[name]) {
    return obj[name];
  }
}
