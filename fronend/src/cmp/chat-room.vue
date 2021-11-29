
<template>
  
  <section class="chat-room">
      <h1>Chat room </h1>
      <input type="text" @input="typing" v-model="msg.txt" placeholder="send msg">
      <button @click="sendMsg"> send </button>
    <ul>
      <li v-for="(msg , idx) in msgs" :key="idx" class="msg">
          <h3>User: {{msg.from}}</h3>
          <h3> Msg: {{msg.txt}}  </h3>    
      </li>
      <li v-if="typingUser"> {{typingUser}}</li>
    </ul>
  </section>
</template>

<script>
  import { socketService} from '../services/socket.service'
export default {
  data(){
    return {
      msg:{from:this.$store.getters.getUserLog.fullname ,txt: ''},
      msgs:[],
      typingUser:''
      // topic: this.toyId

    }
    
  },
  created(){
    socketService.emit('chat topic',this.toyId)
    socketService.on('chat addMsg',this.addMsg)
    socketService.on('user typing',this.userTyping)
    socketService.on('stopTyping',this.stopTyping)

  },
  destroyed() {
    socketService.off('chat addMsg',this.addMsg)
  },
  methods:{
    addMsg(msg){
        this.msgs.unshift(msg)
    },
    sendMsg(){
    socketService.emit('chat newMsg',this.msg)
    this.msg.txt=''
    socketService.emit('stopTyping')
      
    },
    typing(){
      socketService.emit('user typing',this.msg.from)

    },
    userTyping(user){
      this.typingUser = user + ' typing...'
    },
    stopTyping(){
      this.typingUser =''
    }
  },
  watch:{
    'this.$route.params'(){
        // const {toyId}= this.$route.params

    }
  },
  props:{
    toyId:{ type : String }
  },
  
  name: "chat-room",
}
</script>

