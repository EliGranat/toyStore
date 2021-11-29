import vue from 'vue'
import vuex from 'vuex'
import { myToyStore } from "./toy-store.js";
import { myUserStore } from "./user-store.js";
import { myReviewStore } from "./review.store.js";

vue.use(vuex)
export default new vuex.Store({
    modules: {
        myToyStore,
        myUserStore,
        myReviewStore
    },
})