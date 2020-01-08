/**
 *  @description 系统全局配置
 */
export default {
    //记住密码状态下的token在Cookie中存储的天数,
    tokenCookieExpires: 1,
    //记住密码状态细的密码在Cookie中存储的天数，默认1天
    passCookieExpires: 1,
    //此处修改网站名称
    webName: 'yhadmin',
    //token key
    TokenKey: 'YH-ADMIN-TOKEN',
    //请求超时时间，毫秒（默认2分钟）
    timeout: 1200000
}