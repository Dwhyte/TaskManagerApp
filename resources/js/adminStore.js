import Vue from "vue"
import Vuex from "vuex"

const AUTH_USER = window.User;

export default {
    namespaced: true,
    state: {
        AuthUser: AUTH_USER,
        users: null,
        selectedUser: null,
        errors: {}
    },
    getters: {
        GET_AUTH_USER(state) {
            return state.AuthUser
        },
        GET_USERS(state) {
            return state.users
        },
        GET_SELECTED_USER(state) {
            return state.selectedUser
        },
        GET_ERRORS(state) {
            return state.errors
        }
    },
    mutations: {
        SET_USERS(state, data) {
            state.users = data
        },
        SET_SELECTED_USER(state, user) {
            state.selectedUser = user
        },
        SET_ERRORS(state, data) {
            state.errors = data
        }
    },
    actions: {
        // fetch all users
       async FETCH_USERS({ commit, dispatch }) {
            try {
                let users = await axios.post('/vue/admin/users');
                if(users.data.success) {
                    // update users state
                    commit('SET_USERS', users.data.data)
                }
            } catch (error) {
                // console.log(error.response.data)
                commit('SET_ERRORS', error.response.data)
            }
        },

        SELECTED_USER({commit}, user) {
            commit("SET_SELECTED_USER", user)
        },
    }
}
