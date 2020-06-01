import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

export default {
    state: {
        selectedProjectID: null,
        selectedProjectTasks: null,
        projects: null,
        showAddNewProjectForm: false,
        showTaskForm: false,
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
        },
        GET_ADD_NEW_PROJECT_FORM(state) {
            return state.showAddNewProjectForm
        },
        GET_TASK_FORM_STATUS(state) {
            return state.showTaskForm
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
        },
        SET_ADD_NEW_PROJECT_FORM(state, status) {
            state.showAddNewProjectForm = status
        } ,
        SET_TASK_FORM_STATUS(state, status) {
            state.showTaskForm = status
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

        // update project form status = true/false
        showNewProjectForm({commit}, value) {
           commit("SET_ADD_NEW_PROJECT_FORM", value)
        },

        // update task form status = true/false
        showTaskForm({commit}, status) {
           commit("SET_TASK_FORM_STATUS", status)
        },


        storeCurrentTasks({ commit }, tasks) {
            commit("SET_PROJECT_TASKS", tasks)
        },

        storeCurrentProjectID({ commit }, projectID) {
            commit("SET_PROJECT_ID", projectID)
        }

    }
}
