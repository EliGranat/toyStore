<template>

  <section>
      <h2> Welcome To The Toys Store </h2>
      
      <label v-if="!signUp" for="">
      <el-input placeholder="Please Enter username" v-model="userLog.username"></el-input>
      <el-input placeholder="Please Enter Password" v-model="userLog.password"></el-input>
      <el-button type="primary" @click="logIn"> login </el-button>
      <el-button type="primary" @click="signUp=!signUp">SignUp</el-button>
      </label>
      <label v-else for="">
      <el-input placeholder="Please Enter username" v-model="userLog.username"></el-input>
      <el-input placeholder="Please Enter fullname" v-model="userLog.fullname"></el-input>
      <el-input placeholder="Please Enter Password" v-model="userLog.password"></el-input>
      <el-button type="primary" @click="UserSignUp"> SignIn </el-button>
      <el-button type="primary" @click="signUp=!signUp">login</el-button>
      </label>
  </section>
     
</template>

<script>
export default {
        data(){
            return{
                userLog: {username:'', fullname:'',password:'' }
                ,signUp: false
            } 
        },
        methods:{
            logIn(){
                const {username,password}=this.userLog
                if (!username||!password) {
                    return
                }
                this.$emit('log',this.userLog)
            },
            UserSignUp(){
                  const {username,password,fullname}=this.userLog
                if (!username||!password||!fullname) {
                    return
                }
                this.$emit('signUp',this.userLog)

            }
        }
}
</script>

<style>

</style>