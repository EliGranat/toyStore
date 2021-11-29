<template>
    <section class="toy-details">
        <div class="card-details" v-if="toysSelect" >
            <h2>{{toysSelect.name}}</h2>
            <h3>{{toysSelect.price}} $</h3>
            <div class="tags-head">
            <el-button v-if="toysSelect.inStock" type="success" icon="el-icon-check" circle></el-button>
            <el-button v-else type="info" icon="el-icon-check" circle></el-button>
            <el-tag class="tag"   :type="'info'" effect="dark">  <span> Update {{ toysSelect.createdAt | moment('from') }}</span> </el-tag>
            </div>

            <img :src="require(`@/assets/img/${toysSelect.img}.png`)" >
            <pre>
            {{toysSelect.description}}
            </pre>
            <div class="tag-group">
            <el-tag class="tag" v-for="(label,idx) in toysSelect.labels" :key="label" :type="items[idx].type" effect="dark"> {{ label}} </el-tag>
            </div>
            <el-button  @click="closeDetails" type="success" plain>Close</el-button>

              <chat-room  :toyId="toyId"/>

              <div>
                 <h1>Reviews</h1>
                <input type="text" placeholder="Add Review" v-model="emptyReview.txt">
                <button @click="addReview"> Send </button>

              </div>

              <div v-for=" (review,idx) in getReviews" :key="idx" class="review">
                  <div class="review-contant">
                <avatar  :size=70 :username="`${review.byUser.fullname}`" ></avatar>
                <div class="right-side"> 
                    <h3>
                    Show reviews: {{review.txt}}
                    </h3>
                    <h3>
                    name: {{review.byUser.fullname}}
                    </h3>
                </div>
                  </div>
              </div>
        </div>
        <p v-else> Loading.... </p>
    </section>
</template>

<script>
import Avatar from 'vue-avatar'
   import chatRoom from '@/cmp/chat-room.vue'


  export default {
  
    name: 'toys-details',
    data(){
      return{
        reviews:[],
        emptyReview:{
        byUserId:null,
        aboutToyId : null,
        txt : "",
        toyId:''
        },
        toysSelect: null,
         items: [
          { type: '' },
          { type: 'success' },
          { type: 'info' },
          { type: 'danger' },
          { type: 'warning' },
          { type: '' },
          { type: 'success'  }
        ]
      }
    },
    created(){
        this.getToy()
        this.getReviewsByIdToy()
        
    },
    methods:{
      async addReview(){
        this.emptyReview.byUserId = this.$store.getters.getUserLog._id
        if(!this.$store.getters.getUserLog)return
        console.log(this.emptyReview);
        await this.$store.dispatch({type: 'addReview', review: this.emptyReview})
        this.getReviewsByIdToy()
      },
      getToy(){
        const {toyId}= this.$route.params
        this.toyId=toyId
        console.log(toyId);
        this.emptyReview.aboutToyId = toyId
        this.$store.dispatch({ type: 'toysById' ,  toyId})
       .then(toy=>{
            this.toysSelect = toy
       })
      },
      closeDetails(){
        this.$router.push('/toys')
      },
      async getReviewsByIdToy(){
        const {toyId}= this.$route.params
        const review = await this.$store.dispatch({ type: 'reviewsById' ,  toyId})
        this.reviews =review
      }

    },
    computed:{
      getReviews(){
        return this.reviews
      }
    },
    components:{
      Avatar,
      chatRoom

    }
  }

</script>
