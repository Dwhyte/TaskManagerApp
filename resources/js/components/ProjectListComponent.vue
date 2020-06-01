<template>
    <div class="card-hover-shadow-2x mb-3 card">
        <div class="card-header-tab card-header">
            <div class="card-header-title font-size-lg text-capitalize font-weight-normal"><i class="fa fa-tasks"></i>&nbsp;My Projects</div>
        </div>
        <div class="scroll-area-sm">
            <AddNewProject v-if="showForm"></AddNewProject>
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
            <button class="btn btn-primary" @click="showNewProjectForm(true)" v-if="!showForm">Add New Project</button>
            <button class="mr-2 btn btn-secondary" v-if="showForm" @click="showNewProjectForm(false)">Cancel</button>
        </div>
    </div>
</template>


<script>
    import { mapActions, mapGetters } from "vuex";
    import AddNewProject from "./projects/AddNewProject";
    export default {
        name: "ProjectListComponent",
        components: {
            AddNewProject
        },
        created() {
             // load all projects on first creation
            this.fetchProjects();
        },
        computed: {
        ...mapGetters({
                projects: "GET_PROJECTS",
                selectedProjectID: "GET_SELECTED_PROJECT_ID",
                showForm: "GET_ADD_NEW_PROJECT_FORM"
            })
        },
        methods: {
         ...mapActions({
              fetchProjects: "FETCH_PROJECTS",
              storeSelectedProjectID: "storeCurrentProjectID",
              storeTasks: "storeCurrentTasks",
              showNewProjectForm: "showNewProjectForm"
         }),

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
