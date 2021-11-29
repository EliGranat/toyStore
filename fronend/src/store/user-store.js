import { userService } from '../services/user-service.js'
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service'

export const myUserStore = {
    state: {
        userLog: userService.getLoggedinUser(),
        users: [],
        watchedUser: null
    },
    getters: {
        getUserLog(state) {
            return state.userLog
        },
        // users({ users }) { return users },
        // loggedinUser({ loggedinUser }) { return loggedinUser },
        // watchedUser({ watchedUser }) { return watchedUser }
    },

    mutations: {
        setLoggedinUser(state, { user }) {
            state.userLog = (user) ? {...user } : null;
        },
        // setWatchedUser(state, { user }) {
        //     state.watchedUser = user;
        // },       
        setUsers(state, { users }) {
            state.users = users;
        },
        // removeUser(state, { userId }) {
        //     state.users = state.users.filter(user => user._id !== userId)
        // },
    },
    actions: {

        async logSign({ commit }, { userLogSign }) {
            if (!userLogSign.fullname) {
                try {
                    const userConnect = await userService.login(userLogSign)
                    commit({ type: 'setLoggedinUser', user: userConnect })
                    return userConnect
                } catch (err) {
                    return err
                }

            } else {
                try {
                    const LogSign = await userService.signup(userLogSign)
                    commit({ type: 'setLoggedinUser', user: LogSign })
                    return LogSign
                } catch (err) {
                    return err
                }
            }
        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'setLoggedinUser', user: null })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
        async loadUsers({ commit }) {
            // TODO: loading
            try {
                const users = await userService.getUsers();
                console.log(users);
                commit({ type: 'setUsers', users })
            } catch (err) {
                console.log('userStore: Error in loadUsers', err)
                throw err
            }
        },
        // async removeUser({ commit }, { userId }) {
        //     try {
        //         await userService.remove(userId);
        //         commit({ type: 'removeUser', userId })
        //     } catch (err) {
        //         console.log('userStore: Error in removeUser', err)
        //         throw err
        //     }
        // },
        // async updateUser({ commit }, { user }) {
        //     try {
        //         user = await userService.update(user);
        //         commit({ type: 'setUser', user })
        //     } catch (err) {
        //         console.log('userStore: Error in updateUser', err)
        //         throw err
        //     }

        // },    
    },
    watch: {
        userLog() {
            this.userLog = userService.getLoggedinUser()
        }
    }
}