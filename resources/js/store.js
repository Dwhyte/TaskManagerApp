import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

export default {
    state: {
        selectedProjectID: null,
        selectedProjectTasks: null,
        task: null,
        tasks: null,
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
        GET_ALL_TASKS(state) {
          return state.tasks
        },
        GET_TASK(state) {
            return state.task
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
        SET_ALL_TASKS(state, data) {
            state.tasks = data
        },
        SET_TASK(state, task) {
          state.task = task
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


        // Fetch all project tasks by project ID
        async FETCH_PROJECT_TASKS({commit}, projectID) {
           try {
               let tasks = await axios.post(`/vue/project/tasks/${projectID}`)
               if(tasks.data){
                   // update tasks state
                   commit('SET_ALL_TASKS', tasks.data.data)
               }
           }  catch (error) {
               console.log(error.response.data)
           }
        },


        async UPDATE_TASK({commit, dispatch}, taskData) {
           try {
                let res = await axios.post(`/vue/update/${taskData.taskID}`, taskData)
                if(res.data.success) {
                    dispatch('FETCH_PROJECTS')
                    console.log('update worked from here')
                }
           } catch(error) {
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

        selectedTask({commit}, task) {
            commit("SET_TASK", task)
        },

        storeCurrentTasks({ commit }, tasks) {
            commit("SET_PROJECT_TASKS", tasks)
        },

        storeCurrentProjectID({ commit }, projectID) {
            commit("SET_PROJECT_ID", projectID)
        }

    }
}
