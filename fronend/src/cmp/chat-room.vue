
<template>
  
  <section class="chat-room">
      <h1>Chat room </h1>
      <input type="text" v-model="msg" placeholder="send msg">
      <button> send </button>
 
  </section>
</template>

<script>
export default {
  data(){
    return {
      msg:''
    }
  },
  // props:{
  //   toy:{ type : Object }
  // }
  // ,
  name: "chat-room",
}
</script>
