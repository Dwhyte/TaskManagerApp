<template>
<div class="container">
    <div class="row">
        <div class="col-md-3">
            <project-list-component></project-list-component>
        </div>
        <div class="col-md-9">
                <div class="card-hover-shadow-2x mb-3 card">
                <div class="card-header-tab card-header">
                    <div class="card-header-title font-size-lg text-capitalize font-weight-normal"><i class="fa fa-tasks"></i>&nbsp;Task Lists</div>
                </div>
                    <div class="mt-5" v-if="!tasks && !selectedProjectID" style="text-align: center">
                        <h3>Select A Project</h3>
                    </div>
                <div class="scroll-area-sm">
                      <div style="position: static;" class="ps ps--active-y">
                            <div class="ps-content">
                                <ul v-if="showForm">
                                    <form class="mt-3 form-group">
                                        <div
                                            v-if="errors"
                                            :style="{ display: errors ? 'block' : 'none' }"
                                            class="invalid-feedback"
                                        >
                                            <li v-if="errors.task_name">{{ errors.task_name }}</li>
                                            <li v-if="errors.description">{{ errors.description }}</li>
                                        </div>
                                        <input type="text" hidden v-model="form.project_id = selectedProjectID">
                                      <div>
                                        <label for="task_name">Task name</label>
                                        <input type="text" v-model="form.task_name" class="form-control mb-2 mr-sm-2" id="task_name" placeholder="please add task name">
                                      </div>
                                        <div>
                                        <label for="description">Description</label>
                                            <textarea v-model="form.description" class="form-control mb-2 mr-sm-2" id="description" placeholder="please add description"></textarea>
                                      </div>
                                        <div class="form-group">
                                            <label for="priority">Example select</label>
                                            <select v-model="form.priority_level" class="form-control" id="priority">
                                              <option v-for="priority in priority_levels">{{priority}}</option>
                                            </select>
                                        </div>
                                    </form>
                                </ul>
                                <ul v-else class=" list-group list-group-flush">
                                    <task-component v-for="task in tasks" :task="task" :key="task.id"></task-component>
                                </ul>
                            </div>
                        </div>
                </div>
                <div class="d-block text-right card-footer">
                    <button class="mr-2 btn btn-secondary" v-if="showForm" @click="showForm = false">Cancel</button>
                    <button class="btn btn-primary" @click="showForm = !showForm" v-if="!showForm && selectedProjectID">Create New Task</button>
                    <button class="btn btn-success" v-if="showForm" @click="addTask">Add Task</button>
                </div>
        </div>
    </div>
</div>
</div>
</template>
<script>
    import { mapGetters } from "vuex";
    import TaskComponent from "./TaskComponent";
    export default {
        name: "TaskManagerComponent.vue",
        components: {
            TaskComponent
        },
        data() {
            return {
                errors: null,
                showForm: false,
                priority_levels: [
                        'critical',
                        'important',
                        'normal',
                        'low'
                ],
                form: {
                    project_id: '',
                    task_name: '',
                    description: '',
                    priority_level: 'low',
                    is_completed: false

                }
            }
        },
        created() {

        },
        computed: {
        ...mapGetters({
                selectedProjectID: "GET_SELECTED_PROJECT_ID",
                tasks: "GET_SELECTED_PROJECT_TASKS"
            })
        },
        methods: {
            // Create a new task
            addTask() {
                axios.post('/vue/add-new-task', this.form)
                    .then(res => {
                        console.log(res)

                        // push new results to tasks array
                        this.tasks.push(res.data.data)

                        // clear form fields
                        this.form.task_name = ''
                        this.form.description = ''
                        this.form.priority_level = ''
                        this.is_completed = false

                        // close form
                        this.showForm = false
                    })
                    .catch(error => {
                       console.log(error.response.data)
                        this.errors = error.response.data
                    })
            },

            // Remove tasks from project
            removeTask(id, index) {
                axios.post(`/vue/remove-task/${id}`)
                    .then(res => {
                        console.log(res.data)

                        // splice out selected task by index position from task list.
                        this.tasks.splice(index, 1);
                    })
                    .catch(err => console.log(err))
            },

            changePriority(id, index) {
                axios.post(`/vue/set-priority${id}`, )
            }
        }
    }
</script>

<style scoped>
    form {
        padding: 17px;
        width: 650px;
    }
</style>
