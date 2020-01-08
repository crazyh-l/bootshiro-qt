<template>
    <div class="main">
        <div class="userInfo">
             <h3>个人简介</h3>
            <div>姓名 : {{userInfo.name}}</div>
            <div>邮箱 : {{userInfo.email}}</div>
            <div>职位 : {{userInfo.role.name}}</div>
            <div>职位描述 : {{userInfo.role.description}}</div>
            <div>角色 : {{userInfo.permission.name}}</div>
            <div>角色描述 : {{userInfo.permission.description}}</div>
        </div>
         <div class="userList">
             <button @click="addUserPannel">新增</button>
            <table>
                <th>ID</th>
                <th>姓名</th>
                <th>操作</th>
                <tr v-for="item in userList" v-bind:key="item.id" @click="showUser(item.id)">
                    <td>{{item.id}}</td>
                     <td>{{item.name}}</td>
                     <td> 
                        <button @click="showEditPannel(item.id)">编辑</button>   
                        <button @click="deleteUser(item.id)">删除</button>       
                    </td>
                </tr>
            </table>
         </div>
         <div v-if="showPannel">
            <div class="editPannel">
                <div>姓名 : <input  v-model="editUserInfo.name"/></div>
                <div>邮箱 : <input  v-model="editUserInfo.email"/></div>
                <div>账号 : <input  v-model="editUserInfo.account"/></div>
                <div>密码 : <input  v-model="editUserInfo.password"/></div>
                <button @click="editUser">确定</button>
                <button @click="showPannel = !showPannel">取消</button>
            </div>
          </div>

          <div v-if="showAddPannel">
            <div class="editPannel">
                <div>姓名 : <input  v-model="addUserInfo.name"/></div>
                <div>邮箱 : <input  v-model="addUserInfo.email"/></div>
                <div>账号 : <input  v-model="addUserInfo.account"/></div>
                <div>密码 : <input  v-model="addUserInfo.password"/></div>
                <button @click="addUser">确定</button>
                <button @click="showAddPannel = !showAddPannel">取消</button>
            </div>
          </div>
    </div>
   
</template>

<script>
import utils from "@/utils/utils"
export default {
    name : "Main",
    data () {
        return {
            userInfo : {
                id : '',
                name : '',
                email: '',
                role : {
                    id : '',
                    name : '',
                    description: ''
                },
                permission: {
                    id : '',
                    name : '',
                    description:''
                }
            },
            editUserInfo : {
                id : '',
                name : '',
                email: '',
                account:'',
                password:''
            },
            addUserInfo : {
                id : '',
                name : '',
                email: '',
                account:'',
                password:''
            },
            userList : [],
            showPannel : false,
            showAddPannel : false
        }
    },
    created: function () {
        this.showUserInfo();
        this.getAllUser();
    },
    methods : {
        showUserInfo () {
            let userId = this.$route.params.userId;
            utils.axiosMethod({
                method : "post",
                url : "/getUserById",
                //baseURL : '/api',
                data: {userId : userId},
                callback: (response) => {
                    this.userInfo.id = response.data.id
                    this.userInfo.name = response.data.name
                    this.userInfo.email = response.data.email
                    this.userInfo.role.id = response.data.roles.id
                    this.userInfo.role.name = response.data.roles.name
                    this.userInfo.role.description = response.data.roles.description
                    this.userInfo.permission.id = response.data.permissions.id
                    this.userInfo.permission.name = response.data.permissions.name
                    this.userInfo.permission.description = response.data.permissions.description
                }
            })
        },
        showUser (_userId) {
            let userId = _userId;
            utils.axiosMethod({
                method : "post",
                url : "/getUserById",
                data: {userId : userId},
                callback: (response) => {
                    this.userInfo.id = response.data.id
                    this.userInfo.name = response.data.name
                    this.userInfo.email = response.data.email
                    this.userInfo.role.id = response.data.roles.id
                    this.userInfo.role.name = response.data.roles.name
                    this.userInfo.role.description = response.data.roles.description
                    this.userInfo.permission.id = response.data.permissions.id
                    this.userInfo.permission.name = response.data.permissions.name
                    this.userInfo.permission.description = response.data.permissions.description
                }
            })
        },
        getAllUser () {
            utils.axiosMethod({
                method : "post",
                url : "/getAllUser",
                callback: (response) => {
                    let users = response.data;
                    users.forEach(element => {
                        this.userList.push(element);
                    });
                }
            })
        },
        showEditPannel (_userId) {
            this.showPannel = true;
            let userId = _userId;
            utils.axiosMethod({
                method : "post",
                url : "/getUserById",
                //baseURL : '/api',
                data: {userId : userId},
                callback: (response) => {
                    this.editUserInfo.id = response.data.id;
                    this.editUserInfo.name = response.data.name;
                    this.editUserInfo.email = response.data.email;
                    this.editUserInfo.account = response.data.account;
                    this.editUserInfo.password = response.data.password;
                }
            })
        },
        editUser () {
            utils.axiosMethod({
                method : "post",
                url : "/updateUserInfo",
                data: this.editUserInfo,
                callback: (response) => {
                   let status = response.data.code;
                   let msg = response.data.msg;
                   if (status && status == 200) {
                       alert(msg);
                       this.userList = [];
                       this.getAllUser();
                       this.showPannel = false;
                   }
                }
            })
        },
        deleteUser (_userId) {
            utils.axiosMethod({
                method : "post",
                url : "/deleteUser",
                data: {id : _userId},
                callback: (response) => {
                   let status = response.data.code;
                   let msg = response.data.msg;
                   if (status && status == 200) {
                       alert(msg);
                       this.userList = [];
                       this.getAllUser();
                   }
                }
            })
        },
        addUserPannel () {
            this.showAddPannel = true;
        },
        addUser () {
            utils.axiosMethod({
                method : "post",
                url : "/addUser",
                data: this.addUserInfo,
                callback: (response) => {
                   let status = response.data.code;
                   let msg = response.data.msg;
                   if (status && status == 200) {
                       alert(msg);
                       this.userList = [];
                       this.getAllUser();
                       this.addUserPannel = false;
                   }
                }
            })
        }

    }
}
</script>

<style scoped>
    .main {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .userInfo {
        width: 35%;
        height: 400px;
        border:1px solid #ccc;
        display: inline-block;
        overflow: -webkit-paged-x;
    }
    .userList {
        width: 60%;
        height: 400px;
        border:1px solid #ccc;
        display: inline-block;
        overflow: -webkit-paged-x;
    }
    table {
        width: 100%;
        border: 1px solid #ccc;
    }
    table tr:hover {
        cursor: pointer;
        background: #ccc;
    }
    .editPannel{
        width: 400px;
        height: 200px;
        border:1px solid #ccc;
        border-radius: 4px;
        position:absolute;
        top: 30%;
        left:30%;
        background: #ccc;
        z-index: 9999;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

</style>
