<template>
    <div class="card-hover-shadow-2x mb-3 card">
        <div class="card-header-tab card-header">
            <div class="card-header-title font-size-lg text-capitalize font-weight-normal"><i class="fa fa-tasks"></i>&nbsp;<h4 class="ml-2 mb-0">My Projects</h4></div>
        </div>
        <div class="scroll-area-sm">
            <AddNewProjectComponent v-if="showForm"></AddNewProjectComponent>
            <ul v-else>
                <div v-if="projects && projects.length === 0"  class="alert alert-info" role="alert">
                    <h5 class="alert-heading">Create a new project</h5>
                </div>
                <li
                    v-else
                    v-for="project in projects"
                    @click="getProjectTasks(project.id, project.name, project.description)"
                    :class="{'selected': selectedProjectID === project.id}">
                    {{ project.name }}
                </li>
            </ul>
        </div>
        <div class="d-block text-right card-footer">
            <button class="btn btn-primary" @click="showNewProjectForm(true)" v-if="!showForm">Add New Project</button>
            <button class="mr-2 btn btn-secondary" v-if="showForm" @click="showNewProjectForm(false)">Cancel</button>
        </div>
    </div>
</template>


<script>
    import { mapActions, mapGetters } from "vuex";
    import AddNewProjectComponent from "./projects/AddNewProjectComponent";
    export default {
        props: ['projects'],
        name: "ProjectListComponent",
        data() {
            return {
                latestProjectID: null,
                latestProjectName: null,
            }
        },
        components: {
            AddNewProjectComponent
        },
        computed: {
        ...mapGetters({
                selectedProjectID: "GET_SELECTED_PROJECT_ID",
                selectedProjectName: "GET_SELECTED_PROJECT_NAME",
                showForm: "GET_ADD_NEW_PROJECT_FORM"
            }),

        },
        methods: {
         ...mapActions({
              fetchTasks: 'FETCH_PROJECT_TASKS',
              storeSelectedProjectID: "storeCurrentProjectID",
              storeSelectedProjectName: "storeCurrentProjectName",
              storeSelectedProjectDesc: "storeCurrentProjectDescription",
              storeTasks: "storeCurrentTasks",
              showNewProjectForm: "showNewProjectForm"
         }),

          // Store selected tasks in vuex storage
            getProjectTasks(projectID, projectName, projectDesc) {
             // console.log(projectID, projectName)
                this.storeSelectedProjectID(projectID)
                this.storeSelectedProjectName(projectName)
                this.storeSelectedProjectDesc(projectDesc)
                this.fetchTasks(projectID)
            },
        },
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
        background: #bfc5ce;
        color: #fff;
    }

    form {
        padding: 17px;
    }

    .selected {
        background: #7b838c;
        border: 2px solid #435261;
        color: #fff;
    }

    ul li.selected:hover {
        background: #7b838c;
    }
</style>
