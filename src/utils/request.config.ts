export const baseOption: Partial<Taro.request.Option> = {
  header: {
    'content-type': 'application/json;charset=UTF-8',
  },
  timeout: 5000,
  method: 'GET'
}

export const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? 'https://www.luonet.com'
    : 'https://www.luonet.com'
}


export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const HTTP_STATUS_MAP = new Map([
  ['200', '成功'],
  ['400', '请求参数错误'],
  ['401', '需要鉴权'],
  ['403', '没有权限访问'],
  ['404', '请求资源不存在'],
  ['405', '请求方式错误'],
  ['500', '服务器错误'],
  ['501', '服务没有实现'],
  ['502', '服务网关出现了问题'],
  ['503', '服务器无法处理请求'],
  ['504', '服务器网关超时'],
])
