<template>
<div class="container">
    <EditTaskModalComponent></EditTaskModalComponent>
    <AddTaskModalComponent></AddTaskModalComponent>
    <div class="row">
        <div class="col-md-3">
            <project-list-component :projects="projects"></project-list-component>
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
                                    <task-component v-for="task in tasks" :task="task" :key="task.id"></task-component>
                                </ul>
                            </div>
                        </div>
                </div>
                <div class="d-block text-right card-footer">
                    <button class="btn btn-primary" @click="showModal" v-if="tasks && selectedProjectID">Create New Task</button>
                </div>
        </div>
    </div>
</div>
</div>
</template>
<script>
    import { mapActions, mapGetters } from "vuex";
    import TaskComponent from "./TaskComponent";
    import EditTaskModalComponent from "./modals/EditTaskModalComponent";
    import AddTaskModalComponent from "./modals/AddTaskModalComponent";
    export default {
        name: "TaskManagerComponent.vue",
        components: {
            TaskComponent,
            EditTaskModalComponent,
            AddTaskModalComponent
        },
        created() {
             // load all projects on first creation
            this.fetchProjects();
        },
        computed: {
        ...mapGetters({
                projects: 'GET_PROJECTS',
                selectedProjectID: "GET_SELECTED_PROJECT_ID",
                tasks: "GET_ALL_TASKS",
            })
        },
        methods: {
          ...mapActions({
              fetchProjects: "FETCH_PROJECTS",
              showTaskForm: "showTaskForm"
          }),

            showModal() {
              this.$root.$emit('bv::show::modal', 'modal-2', '#btnShow')
            },
        },
    }
</script>

<style scoped>
    form {
        padding: 17px;
        width: 650px;
    }
</style>
