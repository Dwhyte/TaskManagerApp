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
                                <ul class=" list-group list-group-flush">
                                    <AddNewTask v-if="showForm"></AddNewTask>
                                    <task-component v-else v-for="task in tasks" :task="task" :key="task.id"></task-component>
                                </ul>
                            </div>
                        </div>
                </div>
                <div class="d-block text-right card-footer">
                    <button class="mr-2 btn btn-secondary" v-if="showForm" @click="showTaskForm(false)">Cancel</button>
                    <button class="btn btn-primary" @click="showTaskForm(true)" v-if="!showForm && selectedProjectID">Create New Task</button>
                </div>
        </div>
    </div>
</div>
</div>
</template>
<script>
    import { mapActions, mapGetters } from "vuex";
    import TaskComponent from "./TaskComponent";
    import AddNewTask from "./task/AddNewTask";
    export default {
        name: "TaskManagerComponent.vue",
        components: {
            TaskComponent,
            AddNewTask
        },
        computed: {
        ...mapGetters({
                selectedProjectID: "GET_SELECTED_PROJECT_ID",
                tasks: "GET_SELECTED_PROJECT_TASKS",
                showForm: "GET_TASK_FORM_STATUS"
            })
        },
        methods: {
          ...mapActions({
              showTaskForm: "showTaskForm"
          }),
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
