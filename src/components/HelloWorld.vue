<template>
  <div class="hello">
    <div>
        <label class="loginLabel">用户名:</label><input class="loginInput" type="text" v-model="loginInfo.account" placeholder="请输入用户名"/>
        <br/>
        <label class="loginLabel">密码:</label><input class="loginInput" tpye="password" v-model="loginInfo.password" placeholder="请输入密码"/>
        <br/>
        <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import utils from "@/utils/utils"
export default {
  name: 'doLogin',
  data () {
    return {
      loginInfo : {
        account : "",
        password : ""
      },
      responseResult : []
    }
  },
  methods: {
    login () {
      let success = (response) => {
        let userId = response.data.obj.id
        let status = response.data.code
        if (status && status == 200) {
            this.$router.push({
             name: `Main`,
                params: {
                userId : userId
              }
            })
        }
      }
      utils.axiosMethod({
        method : "post",
        url : "/doLogin",
        //baseURL: '/api',
        data: this.loginInfo,
        callback: success
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginLabel{
  width: 100px;
  display: inline-block;
}
.loginInput{
   border: none;
   outline: none;
   border: 1px solid #ccc;
   border-radius: 4px;
   line-height: 25px
}
</style>
