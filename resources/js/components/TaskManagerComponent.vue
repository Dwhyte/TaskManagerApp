<template>
<div class="container">
    <flash-message  outerClass="flashpool flash__wrapper" transitionName="flash-enter flash-leave-to flash-leave-active"></flash-message>
    <EditTaskModalComponent></EditTaskModalComponent>
    <AddTaskModalComponent></AddTaskModalComponent>
    <div class="row">
        <div class="col-md-3">
            <project-list-component :projects="projects"></project-list-component>
        </div>
        <div class="col-md-9">
                <div class="card-hover-shadow-2x mb-3 card">
                <div class="card-header-tab card-header">
                    <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                        <i class="fa fa-tasks"></i>
                       <h4 class="ml-2 mb-0"> Project - {{ selectedProjectName }}</h4>
                    </div>
                </div>
<!--                    <div class="mt-5" v-if="!tasks && !selectedProjectID" style="text-align: center">-->
<!--                        <h3>Select A Project</h3>-->
<!--                    </div>-->
                <div class="scroll-area-sm">
                      <div style="position: static;" class="ps ps--active-y">
                            <div class="ps-content">
                                <ul class="list-group list-group-flush">
                                    <div v-if="tasks.length === 0" class="alert alert-info" role="alert">
                                      <h4 class="alert-heading">You have no task for this project.</h4>
                                      <p>Select "Create New Task" to add a task to this project.</p>
                                    </div>
                                    <task-component v-for="task in tasks" :task="task" :key="task.id"></task-component>
                                </ul>
                            </div>
                        </div>
                </div>
                <div class="d-block text-right card-footer">
                    <button class="btn btn-primary" @click="showModal" v-if="">Create New Task</button>
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
                selectedProjectName: "GET_SELECTED_PROJECT_NAME",
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
