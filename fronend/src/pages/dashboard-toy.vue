
<template>
    <section class="dashboard-container">
        <doughnut-byPrice :getStaticPrice="getStaticPrice" class="des"/>
        <doughnut-byType :getStaticType="getStaticType" class="des"/>
    </section>
</template>

<script>
    import doughnutByType from '@/cmp/doughnut-toy-type.vue'
    import doughnutByPrice from '@/cmp/doughnut-toy-price.vue'
    
    export default {
      components:{
        doughnutByType,
        doughnutByPrice
      },
    computed:{
      getStaticPrice(){
        return this.$store.getters.getStatisticByPrice
      },
      getStaticType(){
        return this.$store.getters.getStatisticByType
      }
    }
      }

</script>

<style>
    .des{
        width: 250px;
        height: 250px;
    }
    .dashboard-container{
      display: flex;
    }
</style>


