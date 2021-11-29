<template>
<section>
  <div class="review-user" >
                <h1> Reviews </h1>
             <div v-for=" (review,idx) in reviews" :key="idx" class="review">
                  <div class="review-contant">
                 <avatar  :size=70 :username="`${review.byUser.fullname}`" ></avatar>
                <div class="right-side"> 
                    <h3>
                    Name: {{review.byUser.fullname}}
                    </h3>
                    <h3>
                    Toy name: {{review.aboutToy.name}}
                    </h3>
                    <p>
                    Review: {{review.txt}}
                    </p>
                </div>
                  </div>
              </div>
           
      </div>

</section>
    </template>

<script>
import Avatar from 'vue-avatar'
export default {
  name: 'home',
  data() {
    return {
      reviewToEdit: {
        txt: '',
        aboutUserId: null
      }
    }
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews;
    },
    users() {
      return this.$store.getters.users
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser
    }
  },
  created() {
    this.$store.dispatch({type: 'loadUsers'})
    this.$store.dispatch({type: 'loadReviews'})
  },
  methods: {
    // async addReview() {
    //   await this.$store.dispatch({type: 'addReview', review: this.reviewToEdit})
    //   this.reviewToEdit = {txt: '', aboutUserId: null}
    // }
  },
  components:{
      Avatar,

  }

  
}
</script>
