<template>
    <div class="card-hover-shadow-2x mb-3 card">
            <div class="card-header-tab card-header">
                <div class="card-header-title font-size-lg text-capitalize font-weight-normal"><i class="fa fa-tasks"></i>&nbsp;My Projects</div>
            </div>
            <div class="scroll-area-sm">
                <form v-if="showForm">
                    <div
                    v-if="errors"
                    :style="{ display: errors ? 'block' : 'none' }"
                    class="invalid-feedback"
                >
                    {{ errors.name[0] }}
                </div>
                  <div class="form-group">
                    <label for="project_name">Project Name</label>
                    <input type="text" class="form-control" id="project_name" v-model="form.name">
                  </div>
                  <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description" rows="3" v-model="form.description"></textarea>
                  </div>
                </form>
                <ul v-else>
                    <div v-if="!projects" style="padding: 17px">Create a new Project</div>
                    <li
                        v-else
                        v-for="project in projects"
                        @click="getProjectTasks(project.id,project.tasks)"
                        :class="{'selected': selectedProjectID === project.id}">
                        {{ project.name }}
                    </li>
                </ul>
            </div>
            <div class="d-block text-right card-footer">
                <button class="btn btn-primary" @click="showForm = !showForm" v-if="!showForm">Add New Project</button>
                <button class="mr-2 btn btn-secondary" v-if="showForm" @click="showForm = false">Cancel</button>
                <button class="mr-2 btn btn-success" @click="createNewProject" v-if="showForm">Save</button>
            </div>
        </div>
</template>


<script>
    import { mapActions, mapGetters } from "vuex";
    export default {
        name: "ProjectListComponent",
        data() {
            return {
                showForm: false,
                errors: null,
                form: {
                    name: '',
                    description: '',
                    is_completed: false
                }
            }
        },
        created() {
             // load all projects on first creation
            this.fetchProjects();
        },
        computed: {
        ...mapGetters({
                projects: "GET_PROJECTS",
                selectedProjectID: "GET_SELECTED_PROJECT_ID"
            })
        },
        methods: {
         ...mapActions({
              fetchProjects: "FETCH_PROJECTS",
              storeSelectedProjectID: "storeCurrentProjectID",
              storeTasks: "storeCurrentTasks",
         }),

         // Create a new project
          async createNewProject() {
             try {
                 let newProject = await axios.post('/vue/add-new-project', this.form);
                 if(newProject.data.success) {
                     console.log(newProject)

                    // load new projects
                    // this.getProjects()
                    this.fetchProjects();

                    // clear form fields
                    this.form.name = ''
                    this.form.description = ''
                    this.form.is_completed = false

                    // close form
                    this.showForm = false
                 }
             } catch (error) {
                 console.log('ERROR')
                 console.log(error.response)
                this.errors = error.response.data
             }
            },

          // Store selected tasks in vuex storage
            getProjectTasks(projectID, tasks) {
                this.storeSelectedProjectID(projectID)
                this.storeTasks(tasks)
                // console.log(tasks)
            }
        }
    }
</script>

<style scoped>
    ul {
        list-style: none;
        padding: 0;
    }

    ul li {
        cursor: pointer;
        padding: 17px;
        background: #e6e9ec;
        border-bottom: 1px solid #c6d4e2;
    }

    ul li:hover {
        background: #e6e9ec9e;
    }

    form {
        padding: 17px;
    }

    .selected {
        background: #c7def5;
    }

    ul li.selected:hover {
        background: #c7def5;
    }
</style>
