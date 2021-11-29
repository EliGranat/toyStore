<template>
  <section class="toys-preview">
    <!-- <h1>welcome to toys-preview</h1> -->
      <div class="card-preview" >
        <h3>{{toy.name}}</h3>
        <h3>{{toy.price}} $</h3>
        <el-button v-if="toy.inStock" type="success" icon="el-icon-check" circle></el-button>
        <el-button v-else type="info" icon="el-icon-check" circle></el-button>

      </div>
        <img :src="require(`@/assets/img/${toy.img}.png`)" >
  </section>
</template>

<script>
export default {
  props:{
    toy:{ type : Object }
  }
  ,
  name: 'toys-list',
}
</script>
