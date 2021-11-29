import { toyService } from '../services/toy-service.js'

export const myToyStore = {
    state: {
        toys: [],
        isUserLog: '',
        filterBy: {
            inStock: true,
            sortBy: 'name',
            name: '',
            labels: [
                "On wheels",
                "Box game",
                "Art",
                "Baby",
                "Doll",
                "Puzzle",
                "Outdoor"
            ]
        }

    },
    getters: {
        filterBy(state) {
            return state.filterBy
        },
        getAllLabels() {
            return [
                "On wheels",
                "Box game",
                "Art",
                "Baby",
                "Doll",
                "Puzzle",
                "Outdoor"
            ]
        },
        getToys(state) {
            return state.toys
        },
        getStatisticByPrice(state) {
            const arrayLabels = state.filterBy.labels
            const pricesAccordingCategory = [0, 0, 0, 0, 0, 0, 0];
            arrayLabels.forEach((labelKey, idx) => {
                let count = 0
                state.toys.forEach(toy => {
                    const answer = toy.labels.some(toyLabel => {
                        return toyLabel.includes(labelKey)
                    })
                    if (answer) {
                        count++
                        pricesAccordingCategory[idx] += +toy.price;
                    }
                })
                pricesAccordingCategory[idx] = Math.floor(pricesAccordingCategory[idx] / count)
            });

            return pricesAccordingCategory;
        },
        getStatisticByType(state) {
            const arrayLabels = state.filterBy.labels
            const typeAccordingCategory = [0, 0, 0, 0, 0, 0, 0];
            arrayLabels.forEach((labelKey, idx) => {
                state.toys.forEach(toy => {
                    const answer = toy.labels.some(toyLabel => {
                        return toyLabel.includes(labelKey)
                    })
                    if (answer) {
                        typeAccordingCategory[idx] += 1
                    }
                })
            })
            return typeAccordingCategory;
        },
    },

    mutations: {
        setToys(state, { toys }) {
            state.toys = toys
        },
        saveToy(state, { toy }) {
            const idx = state.toys.findIndex(currToy => currToy._id === toy._id)
            if (idx >= 0) {
                state.toys.splice(idx, 1, toy)
            } else {
                state.toys.push(toy)
            }
        },
        removeToy(state, { toyId }) {
            const idx = state.toys.findIndex(currToy => currToy._id === toyId)
            state.toys.splice(idx, 1)
        },
        changeFilterBy(state, { filterBy }) {
            state.filterBy = filterBy
        }
    },
    actions: {
        async loadToys({ commit }, { filterBy }) {
            const toys = await toyService.query(filterBy)
            commit({ type: 'setToys', toys })
        },
        async saveToy({ commit }, { upToy }) {
            const toy = await toyService.save(upToy)
            commit({ type: 'saveToy', toy })
        },
        async removeToy({ commit }, { toyId }) {
            await toyService.remove(toyId)
            commit({ type: 'removeToy', toyId })
        },
        async toysById({ commit }, { toyId }) {
            return await toyService.getById(toyId)

        },

    }
}