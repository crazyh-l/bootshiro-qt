<template>
    <div class="login">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
            <h3>浩哥儿后台管理系统</h3>
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="请输入账号">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="请输入密码" @keyup.enter.native="doLogin('loginForm')">
                </el-input>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;float:left;">记住密码</el-checkbox>  
            <el-form-item style="width:100%">
                <el-button :loading="loading" size="medium" type="primary" @click.native.prevent="doLogin('loginForm')" style="width:100%">
                    <span v-if="!loading">登录</span>
                    <span v-else>登录中</span>
                </el-button>
            </el-form-item>    
        </el-form>
    </div>
</template>

<script>
import Config from '@/config'
import Cookies from 'js-cookie'
import utils from "@/utils/utils"

export default {
    name : 'Login',
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
                rememberMe: false
            },
            loginRules: {
                username : [{
                    required: true,
                    trigger: 'blur',
                    message: '用户名不能为空',
                }],
                password: [{
                    required: true,
                    trigger: 'blur',
                    message: '密码不能为空'
                }],
            },
            loading: false,
            redirect: undefined
        }
    },
    created () {
       // this.getLocalStorage();
        this.getCookie();
    },
    methods: {
        getCookie() {
            //这里暂时存在localStorage
            let username = Cookies.get('username');
            let password = Cookies.get('password');
            let rememberMe = Cookies.get('rememberMe');
            //保存在localStorage里面的加密后的密码
            this.loginForm = {
                username : username || '',
                password : password || '',
                rememberMe : rememberMe === undefined ? false : Boolean(rememberMe)
            }
        },
        doLogin(_loginForm) {
            this.$refs[_loginForm].validate(valid => {
                const user = this.loginForm;
                if (valid) {
                  this.loading = true;
                  if (user.rememberMe) {
                      Cookies.set('username',user.username,{expires: Config.passCookieExpires});
                      Cookies.set('password',user.password,{expires: Config.passCookieExpires});
                      Cookies.set('rememberMe',user.rememberMe,{expires: Config.passCookieExpires});
                  } else {
                      Cookies.remove('username');
                      Cookies.remove('password');
                      Cookies.remove('rememberMe');
                  }
                  this.$store.dispatch('Login',user).then(() => {
                    this.loading = true;
                  }).catch(() => {
                      this.loading = false;
                  })

                // utils.axiosMethod({
                //     method : "post",
                //     url : "/doLogin",
                //     //baseURL: '/api',
                //     data: this.loginForm,
                //     callback: (response) => {
                //         let userId = response.data.obj.id
                //         console.log(response.data)
                //     }
                // })

                } else {
                    alert("验证失败");
                }
 

            })
        }
    }
}
</script>

<style scoped>
    .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    /* background:#282b34; */
    /* background-image:url(	https://aurora-1255840532.cos.ap-chengdu.myqcloud.com/1547428971990.jpg); */
    background-size: cover;
  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 365px;
    padding: 25px 25px 5px 25px;
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
</style>