<template>
<section>
  <el-select v-model="selectType" class="select" multiple placeholder="Select">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
  
  
</section>
</template>

<script>

  export default {
    props:{
      labelUser:{
        type:Array,
        default:function (){
          return []
        }
    }
    },
    created(){
      this.selectType = this.labelUser
    },
    data() {
      return {
        
        options: [{
          value: "On wheels",
          label: "On wheels"
        }, {
          value: "Box game",
          label:  "Box game"
        }, {
          value: "Art",
          label: "Art"
        }, {
          value: "Baby",
          label: "Baby"
        }, 
         {
          value: "Doll",
          label: "Doll"
        }, 
        {
          value: "Puzzle",
          label: "Puzzle"
        },
        {
          value: "Outdoor",
          label: "Outdoor"
        }
        ],
        selectType:[]
      }
    },
    watch:{
        selectType(){
            this.$emit('changeSelect',this.selectType)
        }
    }
  }
</script>