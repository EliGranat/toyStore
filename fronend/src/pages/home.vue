<template>
    <div class="home">

      <log-in class="card-log" @log="log" @signUp="signUp"/>
    </div>
</template>

<script>
  import logIn from '../cmp/log-in.vue'
  export default {
    name: 'home',
    components: {
      logIn
    },
    created(){
      if(this.$store.getters.getUserLog){
        this.$router.push('/toys')
      }
    },
    methods:{
      log(userLogSign){
         this.$store.dispatch({ type: 'logSign', userLogSign })
         .then(res=>{
           this.msgConnect(res.fullname,'/toys')
         }).catch(()=>{
           this.msgConnect(false,'/')
         })
      },
      signUp(userLogSign){
        this.$store.dispatch({ type: 'logSign', userLogSign })
         .then(res=>{
           this.msgConnect(res.fullname,'/toys')
         }).catch(()=>{
           this.msgConnect(false,'/')
         })
      },
      msgConnect(msgWelcome,push){
        const msgWel = msgWelcome ?`Welcome ${msgWelcome}`  : 'oops!'
        const msg = msgWelcome? 'your connected ': ' have a problem  try again '
        this.$notify.success({ title: `${msgWel}`, message: `${msg}`,offset: 100})
        this.$router.push(push)
      }
    }
  }
</script>
