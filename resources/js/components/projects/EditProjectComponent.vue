<template>
    <div>
        <form @submit.prevent="updateProject">
            <input
                class="form-control mb-2 mt-4"
                :class="errors.name ? 'is-invalid' : ''"
                type="text" name="project_name"
                v-model="form.name"
                placeholder="project name"
                style="width: 50%;">
            <input
                class="form-control"
                type="text"
                name="project_desc"
                v-model="form.description"
                placeholder="project description" style="width: 50%;">
<!--        <input type="checkbox" class="form-check-input" id="is_completed" v-model="form.is_completed">-->
            <button
                style="position: absolute;right: 81px;top: 78px;"
                type="submit"
                class="mr-2 btn btn-sm btn-success"
            >
                Update
            </button>
        </form>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";
    export default {
        name: "EditProjectComponent",
        data() {
            return {
                form: {
                    id: '',
                    name: '',
                    description: '',
                    is_completed: false
                },
                errors: {}
            }
        },
        mounted() {
            this.form.id = this.selectedProjectID
            this.form.name = this.selectedProjectName
            this.form.description = this.selectedProjectDesc
        },
        computed: {
            ...mapGetters({
                selectedProjectID: "GET_SELECTED_PROJECT_ID",
                selectedProjectName: "GET_SELECTED_PROJECT_NAME",
                selectedProjectDesc: "GET_SELECTED_PROJECT_DESCRIPTION",
            })
        },
        methods: {
           ...mapActions({
              setInitialProject: 'setInitialProject',
              setCurrentProject: 'UPDATE_CURRENT_PROJECT',
              fetchProjects: "FETCH_PROJECTS",
              toggleEditProject: "showEditProject"

          }),
            // Create a new project
            async updateProject() {
                try {
                    let res = await axios.post(`/vue/edit-project/${this.form.id}`, this.form);
                    if (res.data.success) {
                        // console.log(res.data)
                        const RES_DATA = {
                            id: res.data.data.id,
                            name: res.data.data.name,
                            user_id: res.data.data.user_id,
                            description: res.data.data.description
                        }

                        // first check if the current project name and the updated data name matches
                        // load new projects
                        // set to false - (so initial project is not loaded from DB projects list)
                        this.fetchProjects(false)

                        // set this to current project
                        this.setCurrentProject(RES_DATA);

                        // close form
                        this.toggleEditProject(false)

                        // flash message
                        this.flash(`Updated Project:<br> <strong>${RES_DATA.name}<strong>`, "success flash__message");
                    }
                } catch (error) {
                    this.errors = error.response.data
                }
            },
        },

        // Watch if selected data has changed.
        watch: {
            selectedProjectID() {
                this.form.id = this.selectedProjectID
            },
            selectedProjectName() {
               this.form.name = this.selectedProjectName
            },
            selectedProjectDesc() {
                this.form.description = this.selectedProjectDesc
            }
        }
    }
</script>

<style scoped>

</style>
