<template>
<div class="container">
    <flash-message  outerClass="flashpool flash__wrapper" transitionName="flash-enter flash-leave-to flash-leave-active"></flash-message>
    <EditTaskModalComponent></EditTaskModalComponent>
    <AddTaskModalComponent></AddTaskModalComponent>
    <div class="row">
        <div class="col-sm-12 col-lg-3">
            <project-list-component :projects="projects"></project-list-component>
        </div>
        <div class="col-sm-12 col-lg-9">
                <div class="card-hover-shadow-2x mb-3 card">
                <div class="card-header-tab card-header"
                     :style="showEditProject ? 'height: 8.5rem;' : 'height: 4.5rem;'">
                    <div class="card-header-title font-size-lg text-capitalize font-weight-normal" style="width: 100%;">
                        <div v-if="selectedProjectName" style="width: 100%;">
                            <h4 v-if="!showEditProject" class=" mb-0 mt-3 "><i class="fa fa-tasks"></i> {{ selectedProjectName }}</h4>
                            <EditProjectComponent v-if="showEditProject"></EditProjectComponent>
                            <i v-if="selectedProjectDesc && !showEditProject" class="widget-subheading">{{ selectedProjectDesc }}</i>
                            <div
                                class="float-right"
                                style="position: relative;bottom: 29px;">
                                <h4
                                    v-if="showEditProject"
                                    style="position: absolute;right: 12px;bottom: 57px;"
                                >Edit Project
                                </h4>
                                <button
                                    class="border-0 btn-transition btn"
                                    :class="showEditProject ? 'btn-outline-secondary': 'btn-outline-success'"
                                    :title="showEditProject ? 'Close Window':'Edit Project'"
                                    @click="!showEditProject ? toggleProjectForm(true) : toggleProjectForm(false)">
                                    <i :class="showEditProject ? 'fa fa-times' : 'fa fa-pencil'"></i>
                                </button>
                                <button
                                    class="border-0 btn-transition btn btn-outline-danger"
                                    @click="removeProject(selectedProjectID)">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                       <h4 else class="ml-2 mb-0" v-else><i class="fa fa-tasks"></i> Tasks</h4>
                    </div>
                </div>
                <div class="scroll-area-sm">
                      <div style="position: static;" class="ps ps--active-y">
                            <div class="ps-content">
                                <ul class="list-group list-group-flush">
                                    <div v-if="!selectedProjectID"  class="alert alert-warning" role="alert">
                                      <h5 class="alert-heading">Select a project to get started</h5>
                                    </div>
                                    <div v-else-if="tasks.length === 0 && selectedProjectID" class="alert alert-info" role="alert">
                                          <h5 class="alert-heading">You have no task for this project.</h5>
                                          <p>Select "Create New Task" to add a task to this project.</p>
                                    </div>
                                    <task-component v-else v-for="task in tasks" :task="task" :key="task.id"></task-component>
                                </ul>
                            </div>
                        </div>
                </div>
                <div class="d-block text-right card-footer" v-if="selectedProjectID">
                    <button class="btn btn-primary" @click="showModal">Create New Task</button>
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
    import EditProjectComponent from "./projects/EditProjectComponent";
    export default {
        name: "TaskManagerComponent.vue",
        components: {
            TaskComponent,
            EditTaskModalComponent,
            AddTaskModalComponent,
            EditProjectComponent
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
                selectedProjectDesc: "GET_SELECTED_PROJECT_DESCRIPTION",
                tasks: "GET_ALL_TASKS",
                showEditProject: "GET_EDIT_PROJECT_FORM_STATUS"
            })
        },
        methods: {
          ...mapActions({
              fetchProjects: "FETCH_PROJECTS",
              showTaskForm: "showTaskForm",
              removeProject: "DESTROY_PROJECT",
              toggleProjectForm: "showEditProject"
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
