import {login, getInfo} from '@/api/login'
import {getToken,setToken,removeToken} from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        user: {},
        roles: [],
        //loadMenus: false
        loadMenus: false
    },
    mutations: {
        SET_TOKEN: (state,token) => {
            state.token = token;
        },
        SET_USER: (state,user) => {
            state.user = user;
        },
        SET_ROLES : (state,roles) => {
            state.roles = roles;
        },
        SET_LOAD_MENUS: (state,loadMenus) => {
            state.loadMenus = loadMenus;
        }
    },
    actions: {
        //登录
        Login({commit},userInfo) {
            const username = userInfo.username;
            const password = userInfo.password;
            const rememberMe = userInfo.rememberMe;
            return new Promise((resolve,reject) => {
                login(username,password).then(res => {
                    console.log(res)
                    //setToken(res.token,rememberMe);
                    //commit('SET_TOKEN',res.token);
                    //setUserInfo(res.user,commit);
                    //第一次加载菜单时用到
                    //commit('SET_LOAD_MENUS',true);
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },
        //获取登录用户信息
        GetInfo({ commit }) {
            return new Promise((resolve,reject) => {
                getInfo().then(res => {
                    setUserInfo(res,commit);
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //登出
        Logout({ commit }) {
            return new Promise((resolve,reject) => {
                commit('SET_TOKEN','');
                commit('SET_ROLES',[]);
                removeToken();
                resolve();
            })
        },
        updateLoadMenus({ commit }) {
            return new Promise((resolve,reject) => {
                commit('SET_LOAD_MENUS',false);
            })
        }
    }
}

export const setUserInfo = (res,commit) => {
    //如果没有任何权限，则赋予一个默认的权限，避免请求死循环
    if (res.roles.length === 0) {
        commit('SET_ROLES',[ROLE_SYSTEM_DEFAULT]);
    } else {
        commit('SET_ROLES',res.roles);
    }
    commit('SET_USER',res);
}

export default user