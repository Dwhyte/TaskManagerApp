import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

export default {
    state: {
        selectedProjectID: null,
        selectedProjectTasks: null,
        projects: null
    },

    getters: {
        GET_SELECTED_PROJECT_ID(state) {
            return state.selectedProjectID
        },
        GET_SELECTED_PROJECT_TASKS(state) {
            return state.selectedProjectTasks
        },
        GET_PROJECTS(state) {
            return state.projects
        }
    },

    mutations: {
        SET_PROJECT_ID(state, value) {
            state.selectedProjectID = value;
        },
        SET_PROJECT_TASKS(state, tasks) {
            state.selectedProjectTasks = tasks;
        },
        SET_PROJECTS(state, data) {
            state.projects = data
        }
    },

    actions: {
        // fetch all projects
       async FETCH_PROJECTS({ commit }) {
            try {
                let projects = await axios.get('/vue/get-projects');
                if(projects.data) {
                    // update projects state
                    commit('SET_PROJECTS', projects.data.data)
                }
            } catch (error) {
                console.log(error.response.data)
            }
        },


        storeCurrentTasks({ commit }, tasks) {
            commit("SET_PROJECT_TASKS", tasks)
        },

        storeCurrentProjectID({ commit }, projectID) {
            commit("SET_PROJECT_ID", projectID)
        }

    }
}
