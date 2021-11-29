<template>
    <header>
       <div class="app-Header full">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> |
          <router-link to="/toys">Toys</router-link> |
          <router-link to="/dashboard">Dashboard</router-link> 
          <button  v-if="$store.getters.getUserLog" @click="goUserPage"> Profile </button> 
        <button v-if="$store.getters.getUserLog" @click="logOut" > LogOut </button>          
        </div>
    </header>
</template>

<script>
export default {
    methods:{
        async logOut(){
          await this.$store.dispatch({type:'logout'})
            this.$router.push('/')
      },
      goUserPage(){
        this.$router.push(`review-user/${this.$store.getters.getUserLog._id}`)
      }
    }
}

</script>

<style>

</style>