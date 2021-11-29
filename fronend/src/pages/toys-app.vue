<template>

    <section class="toy-app main-layout">
        <toys-filter  @changeFilter="filterBy"/>
        <toys-list :toys="getToysFromStore" />

    </section>
</template>

<script>
  import toysFilter from '../cmp/toys-filter.vue'
  
  import toysList from "../cmp/toys-list.vue";
  export default {
    name: "toy-app",
    created(){
        if (!this.$store.getters.getUserLog) {
          this.$router.push('/')
          
      }

      
    },
    components: {
      toysList,
      toysFilter
    },
    computed:{
      getToysFromStore() {
        return this.$store.getters.getToys
    }
     
    },
    methods:{
      filterBy(filterBy){
            this.$store.commit('changeFilterBy', { filterBy })
      },
    }
  }
  
</script>
