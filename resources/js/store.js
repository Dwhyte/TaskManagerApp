import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

export default {
    state: {
        initialProject: null,
        initialTasks: null,
        selectedProjectID: null,
        selectedProjectName: null,
        selectedProjectDescription: null,
        selectedProjectTasks: null,
        task: null,
        tasks: [],
        projects: null,
        showAddNewProjectForm: false,
        showTaskForm: false,
        showEditProjectForm: false
    },

    getters: {
        GET_INITIAL_PROJECT(state) {
            return state.initialProject
        },
        GET_SELECTED_PROJECT_ID(state) {
            return state.selectedProjectID
        },
        GET_SELECTED_PROJECT_NAME(state) {
            return state.selectedProjectName
        },
        GET_SELECTED_PROJECT_DESCRIPTION(state) {
            return state.selectedProjectDescription
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
        },
        GET_EDIT_PROJECT_FORM_STATUS(state) {
            return state.showEditProjectForm
        }
    },

    mutations: {
        SET_INITIAL_PROJECT(state, data) {
            state.initialProject = data
        },
        SET_PROJECT_ID(state, id) {
            state.selectedProjectID = id;
        },
        SET_PROJECT_NAME(state, name) {
            state.selectedProjectName = name
        },
        SET_PROJECT_DESCRIPTION(state, desc) {
            state.selectedProjectDescription = desc;
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
        },
        SET_EDIT_PROJECT_FORM_STATUS(state, status) {
            state.showEditProjectForm = status
        }
    },

    actions: {
        // fetch all projects
       async FETCH_PROJECTS({ commit, dispatch }, option = true) {
            try {
                let projects = await axios.get('/vue/get-projects');
                if(projects.data) {
                    if(option) {
                        // set initial latest project on first load.
                        if(projects.data.data[0]) {
                            commit('SET_INITIAL_PROJECT', projects.data.data[0])
                            commit('SET_PROJECT_ID', projects.data.data[0].id)
                            commit('SET_PROJECT_NAME', projects.data.data[0].name)
                            commit('SET_PROJECT_DESCRIPTION', projects.data.data[0].description)
                            dispatch('FETCH_PROJECT_TASKS', projects.data.data[0].id)
                        }
                    }

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
                   commit('SET_EDIT_PROJECT_FORM_STATUS', false)
               }
           }  catch (error) {
               console.log(error.response.data)
           }
        },


        async UPDATE_TASK({commit, dispatch}, taskData) {
           try {
                let res = await axios.post(`/vue/update/${taskData.taskID}`, taskData)
                if(res.data.success) {
                    // retrieve latest projects
                    dispatch('FETCH_PROJECTS')
                }
           } catch(error) {
               console.log(error.response.data)
           }
        },

        async DESTROY_PROJECT({commit, dispatch}, projectID) {
           try {
               if(confirm("Are you sure? This will remove current project and all tasks assigned to it.")) {
                   let res = await axios.post(`/vue/remove-project/${projectID}`)
                   if(res.data.success) {
                        // clear
                       dispatch('clearAllSelectedProjects')

                       // remove current project
                       // dispatch('storeCurrentProjectID', null)
                       // dispatch('storeCurrentProjectName', null)

                       // retrieve latest projects
                        dispatch('FETCH_PROJECTS')

                       // retrieve latest project task
                       // if selectedProjectID is not null
                       // if(this.state.selectedProjectID) {
                       //  dispatch('FETCH_PROJECT_TASKS', this.state.selectedProjectID)
                       // }

                       // flash message
                       Vue.prototype.$flashStorage.flash(`Project Removed!`, "success flash__message", {
                           timeout: 5000,
                           pauseOnInteract: true
                       });
                   }
               }
           } catch(error) {
               console.log(error.response.data)
           }
        },

        setInitialProject({commit}, data) {
           commit('SET_INITIAL_PROJECT', data)
            console.log('DID IT DO SOMETHING ?')
        },

        // update project form status = true/false
        showNewProjectForm({commit}, value) {
           commit("SET_ADD_NEW_PROJECT_FORM", value)
        },

        // update task form status = true/false
        showTaskForm({commit}, status) {
           commit("SET_TASK_FORM_STATUS", status)
        },

        // update project form status = true/false
        showEditProject({ commit }, status) {
           commit('SET_EDIT_PROJECT_FORM_STATUS', status)
        },

        selectedTask({commit}, task) {
            commit("SET_TASK", task)
        },

        storeCurrentTasks({ commit }, tasks) {
            commit("SET_PROJECT_TASKS", tasks)
        },

        storeCurrentProjectID({ commit }, projectID) {
            commit("SET_PROJECT_ID", projectID)
        },

        storeCurrentProjectName({commit}, projectName) {
           commit("SET_PROJECT_NAME", projectName)
        },

        storeCurrentProjectDescription({ commit }, projectDescription) {
           commit('SET_PROJECT_DESCRIPTION', projectDescription)
        },

        // Reset Current Project
        UPDATE_CURRENT_PROJECT({commit}, data) {
           commit("SET_PROJECT_ID", data.id)
           commit("SET_PROJECT_NAME", data.name)
           commit('SET_PROJECT_DESCRIPTION', data.description)
        },

        // Clear everything
        clearAllSelectedProjects({commit}) {
           commit("SET_PROJECT_ID", null)
           commit("SET_PROJECT_NAME", null)
           commit("SET_PROJECT_DESCRIPTION", null)
           commit("SET_PROJECT_ID", null)
           commit("SET_PROJECT_TASKS", null)
        }


    }
}
