import { reviewService } from '../services/review.service.js'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from '../services/socket.service'

export const myReviewStore = {
    state: {
        reviews: []

    },
    getters: {
        reviews(state) { return state.reviews },
    },
    mutations: {
        setReviews(state, { reviews }) {
            console.log(reviews);
            state.reviews = reviews;
        },
        addReview(state, { review }) {
            state.reviews.push(review)
        },
        removeReview(state, { reviewId }) {
            state.reviews = state.reviews.filter(review => review._id !== reviewId)
        },
    },
    actions: {
        async reviewsById({ commit }, { toyId }) {
            const filterBy = { id: toyId }
            const reviews = await reviewService.query(filterBy)

            return reviews
        },
        async addReview(context, { review }) {
            try {
                const newReview = await reviewService.add(review)
                context.commit({ type: 'addReview', review: newReview })
                return newReview
            } catch (err) {
                console.log('reviewStore: Error in addReview', err)
                throw err
            }
        },

        async loadReviews(context) {
            console.log('hi');
            try {
                const reviews = await reviewService.query();
                context.commit({ type: 'setReviews', reviews })
                console.log(reviews);
                // socketService.off(SOCKET_EVENT_REVIEW_ADDED)
                // socketService.on(SOCKET_EVENT_REVIEW_ADDED, review => {
                //     console.log('Got review from socket', review);
                //     context.commit({ type: 'addReview', review })
                // })
                // socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
                // socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, review => {
                //     console.log('Review about me!', review);

                // })

            } catch (err) {
                console.log('reviewStore: Error in loadReviews', err)
                throw err
            }
        },
        async removeReview(context, { reviewId }) {
            try {
                await reviewService.remove(reviewId);
                context.commit({ type: 'removeReview', reviewId })
            } catch (err) {
                console.log('reviewStore: Error in removeReview', err)
                throw err
            }
        },

    }
}