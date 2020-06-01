import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

export default {
    state: {
        selectedProjectID: null,
        selectedProjectTasks: null
    },

    getters: {
        GET_SELECTED_PROJECT_ID(state) {
            return state.selectedProjectID
        },
        GET_SELECTED_PROJECT_TASKS(state) {
            return state.selectedProjectTasks
        },
    },

    mutations: {
        SET_PROJECT_ID(state, value) {
            state.selectedProjectID = value;
        },
        SET_PROJECT_TASKS(state, tasks) {
            state.selectedProjectTasks = tasks;
        },
    },

    actions: {
        storeCurrentTasks({ commit }, tasks) {
            commit("SET_PROJECT_TASKS", tasks)
        },

        storeCurrentProjectID({ commit }, projectID) {
            commit("SET_PROJECT_ID", projectID)
        }

    }
}
