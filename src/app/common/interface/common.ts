/**
 * @description: 公共的interface
 */

// 公共请求的参数
interface HttpOptions {
  url: string;
  method?: | 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'link' | 'LINK'
    | 'unlink' | 'UNLINK';
  params?: object;
  headers?: any;
  type?: any; // 根据类型设置请求头
  isRepeatable?: boolean; // 请求是否可以重复
  flag?: string;
  isManualDealError?: boolean; // 是否手动处理后台返回的错误
  isManualDealHttpError?: boolean; // 是否手动处理http请求错误
  isLoading?: boolean; // 是否添加loading
  loadingConfig?: any; // loading的相关配置
}

// 后台接口返回的数据
interface ServerResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// 日期搜索返回的数据
interface DateSearchParams {
  isForceSearch: boolean;
  date: Date[];
}

export {
  HttpOptions,
  ServerResponse,
  DateSearchParams
};
