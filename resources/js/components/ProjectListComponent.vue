<template>
    <div class="card-hover-shadow-2x mb-3 card">
        <div class="card-header-tab card-header">
            <div class="card-header-title font-size-lg text-capitalize font-weight-normal"><i class="fa fa-tasks"></i>&nbsp;<h4 class="ml-2 mb-0">My Projects</h4></div>
        </div>
        <div class="scroll-area-sm">
            <AddNewProjectComponent v-if="showForm"></AddNewProjectComponent>
            <ul class="list" v-else>
                <div v-if="projects && projects.length === 0"  class="alert alert-info" role="alert">
                    <h5 class="alert-heading">Create a new project</h5>
                </div>
                <sortable
                    v-else
                    v-for="(project, index) in projects"
                    v-model="dragData"
                    :key="project.id"
                    :index="index"
                    drag-direction="vertical"
                    @sortend="sortend($event, projects)"
                    @real-click="getProjectTasks(project.id, project.name, project.description)"
                    :class="{'selected': selectedProjectID === project.id}">
                    <div class="mb-0">{{ project.name }}
                        <i class="fa fa-arrows mr-3 mt-1" aria-hidden="true"></i>
                    </div>
                </sortable>
<!--                <li-->

<!--                    v-for="project in projects"-->
<!--                    @click="getProjectTasks(project.id, project.name, project.description)"-->
<!--                    :class="{'selected': selectedProjectID === project.id}">-->
<!--                    {{ project.name }}-->
<!--                </li>-->
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
    import Sortable from 'vue-drag-sortable'
    import AddNewProjectComponent from "./projects/AddNewProjectComponent";
    export default {
        props: ['projects'],
        name: "ProjectListComponent",
        components: {
            Sortable,
            AddNewProjectComponent
        },
        data() {
            return {
                dragData: {},
            }
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

            sort (e) {
              const { oldIndex, newIndex } = e
              console.log(oldIndex, newIndex)
            },
            sortend (e, list) {
              const { oldIndex, newIndex } = e
              this.rearrange(list, oldIndex, newIndex)
                // console.log(oldIndex, newIndex)
              this.saveSortedList()
            },
            rearrange (array, oldIndex, newIndex) {
              if (oldIndex > newIndex) {
                array.splice(newIndex, 0, array[oldIndex])
                array.splice(oldIndex + 1, 1)
              }
              else {
                array.splice(newIndex + 1, 0, array[oldIndex])
                array.splice(oldIndex, 1)
              }
            },

          async saveSortedList() {
                try {
                    let res = await axios.post('/vue/sort-projects', {
                        projects: this.projects
                    });
                } catch(error) {
                    // flash message
                    this.flash(`System Error:<br> <strong>Could not sort projects list</strong>`, "danger flash__message");
                }
            }
        },
    }
</script>

<style scoped>
    .list {
      position: relative; /* position of list container must be set to `relative` */
      width: 300px;
      height: 400px;
      overflow: auto;
    }
    /* dragging item will be added with a `dragging` class */
    /* so you can use this class to define the appearance of it */
    .list > *.dragging {
      box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
    }

    .list .fa-arrows {
        /*float: right;*/
        /*margin-right: 40px;*/
        /*margin-top: 7px;*/
        /*display: none;*/
        float: left;
    }

    .drag-sortable {
        /*cursor: move;*/
        width: 255px;
        cursor: pointer;
        padding: 17px;
        background: #e6e9ec;
        border-bottom: 1px solid #c6d4e2;
    }

    .drag-sortable:hover {
        background: #bfc5ce;
        color: #fff;
    }

    .drag-sortable.dragging.anim {
        cursor: move;
    }

    .drag-sortable.dragging.anim .fa-arrows {
        display: none;
    }

    .drag-sortable.anim .fa-arrows {
        display: none;
    }

    .drag-sortable:hover .fa-arrows {
        display: block;
    }


    .drag-sortable.selected {
        background: #7b838c;
        border: 2px solid #435261;
        color: #fff;
    }

    @media(max-width: 500px) {
        .list {
            width: 100%;
        }
        .drag-sortable {
            width: 100%;
        }

        .widget-subheading {
            width: 200px;
        }
    }


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
