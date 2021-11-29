<template>
  <section class="toy-list">
      <div class="card-toy" v-for="toy in toys" :key="toy._id">
          <toys-preview :toy="toy" />
          <div>
          <el-button type="success" plain class="edit-toy" @click="goToEdit(toy._id)">Edit</el-button>
          <el-button type="danger" plain class="details-toy" @click="goToDetails(toy._id)">Details</el-button>
          </div>
      </div>
      <el-button @click="addToy" type="primary" icon="el-icon-edit" circle class="btn-add-card"></el-button>
  </section>
</template>

<script>
import toysPreview from "./toys-preview.vue";
export default {
  name: "toys-list",
  props:{
    toys:{type:Array}
  },
  methods:{
      goToEdit(toysId){
        this.$router.push(`/edit/${toysId}`)
      },
      goToDetails(toysId){
        this.$router.push(`/details/${toysId}`)
      },
      addToy(){
        this.$router.push('/edit/')
      }
  },
  
  components: {
    toysPreview,
  },

};
</script>
