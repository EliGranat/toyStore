<template>
  <section class="toy-edit">
          <label for="" v-if="toyToEdit">
          
          <h4> Name Toy: </h4>
          <el-input class="input" placeholder="Please Enter Name" v-model="toyToEdit.name"></el-input>

          <h4> Price Toy: </h4>
          <el-input  class="input" type="number" placeholder="Please Enter Price" v-model="toyToEdit.price"></el-input>

          <h4> InStock Toy: </h4>
         
          <el-switch v-model="toyToEdit.inStock" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          <setlect-filterToy @changeSelect="selectTypeBy" :labelUser="toyToEdit.labels" class="select-filter"/>
          </label>

          <p v-else> Loading... </p>
          <div>
          <el-button class="save-change" @click="saveChange" type="success">Save</el-button>
          <el-button class="remove" @click="removeToy" v-if="editToy" type="danger">Delete </el-button>
          <el-button v-else type="info" @click="$router.push('/toys')">Cancel</el-button>
          
          </div>
 
  
  

  </section>
</template>


<script>

import { toyService } from '../services/toy-service.js'
import setlectFilterToy from '../cmp/select-filer-toy.vue'
export default {

  name: 'toys-details',
  data(){
    return{
      toyToEdit: null,
      editToy:true
    }
  },
    created(){
      this.getToy()
    },
    destroyed(){
      this.toyToEdit = null
    },
    methods:{
      selectTypeBy(newLabels){
        this.toyToEdit.labels = newLabels
      },
      saveChange(){
        const {name,price,labels}=this.toyToEdit
        if (!name||!price||!labels) {
          this.msgEdit('something wrong' ,'please enter all the details', false)
          return 
        }
         this.$store.dispatch({ type: 'saveToy', upToy: this.toyToEdit })
                .then(() => {
                   this. msgEdit('Saved Success','This toy Saved ',true)
                })
      },
      removeToy(){
         this.$store.dispatch({ type: 'removeToy', toyId: this.toyToEdit._id })
                .then(() => {
                  this. msgEdit('Delete Success','This toy deleted',true)
                })
      },
      msgEdit(msgTitle,msg,isPush){
        this.$notify.success({ title: `${msgTitle}`, message: `${msg}`,offset: 100})
        if (isPush) {
          this.$router.push('/toys')
        }
      },
      getToy(){
        const {toyId}= this.$route.params
        if(toyId){
          this.$store.dispatch({ type: 'toysById' ,  toyId})
                .then(toy=>{ this.toyToEdit = toy}) 
        }else{
              this.toyToEdit = toyService.getEmptyToy()
              this.editToy = false
        }
      },
    },
      components:{
        setlectFilterToy
      }  
 
}
</script>


