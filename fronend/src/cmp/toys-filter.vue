<template>

    <section class="toy-filter full">
        <setlect-filterToy @changeSelect="selectTypeBy" class="select-filter"/>
        <input type="search" @input="debounce" v-model="filterBy.name" placeholder="Search" name="" id="search">
        <el-switch v-model="filterBy.inStock" @change="debounce"  active-color="#13ce66" inactive-color="#ff4949"></el-switch>
       
        <select @change="searchBy" class="sort" value="name" v-model="filterBy.sortBy">
                <option value="name">Sort</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Created</option>
        </select>
    </section>

</template>

<script>
import {utilService} from '../services/util.service.js'
import setlectFilterToy from './select-filer-toy.vue'

export default {
  name: "toys-list",
  data(){
    return{
      filterBy:{
        inStock:true,
        sortBy:'name',
        name: '',
        labels:[]
      }
    }
  },
  created(){
    this.debounce = utilService.debounce(this.searchBy, 1500)
  }
  ,
  methods:{
    searchBy(){
       const filterCopy = JSON.parse(JSON.stringify(this.filterBy))
            this.$emit('changeFilter', filterCopy)
  },
        debounce() {}
    ,
   selectTypeBy(newSelect){
        this.filterBy.labels = newSelect
        this.debounce()
      }
  },
  components:{
setlectFilterToy 
  }
}
</script>
