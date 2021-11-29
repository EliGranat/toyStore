<template>
    <div id="app">
   
      <app-header />
      <router-view />
      <app-footer />

    </div>
</template>

<script>
import appHeader from '@/cmp/app-header.vue'
import appFooter from '@/cmp/app-footer.vue'
export default {

  name: 'app',
  created(){
      this.$store.dispatch({ type: 'loadToys' ,filterBy:  JSON.parse(JSON.stringify(this.$store.getters.filterBy))})

},
components:{
  appHeader,
  appFooter
},
watch:{
  '$store.getters.filterBy'(){
       this.$store.dispatch({ type: 'loadToys' ,filterBy:  JSON.parse(JSON.stringify(this.$store.getters.filterBy))})

},
// methods: {
//   loadToys(){
//     this.$store.dispatch({ type: 'loadToys' ,filterBy:  JSON.parse(JSON.stringify(this.$store.getters.filterBy))})
//   }
  
// },
}

}
</script>

