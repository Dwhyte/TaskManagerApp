<template>
        <form @submit.prevent="createNewProject">
      <div class="form-group">
        <label for="project_name">Project Name</label>
        <input type="text" class="form-control" id="project_name" v-model="form.name">
      <div class="invalid-feedback" v-if="errors.name" :style=" errors.name ? 'display: block;font-size: 97%;' : 'display: none;' ">
        {{ errors.name[0] }}
      </div>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control" id="description" rows="3" v-model="form.description"></textarea>
      </div>
      <div class="form-group">
          <button type="submit" style="width: 100%;" class="mr-2 btn btn-success">Save</button>
      </div>
    </form>
</template>

<script>
    import { mapActions } from "vuex";
    export default {
        name: "AddNewProjectComponent",
        data() {
            return {
                errors: {},
                form: {
                    name: '',
                    description: '',
                    is_completed: false
                }
            }
        },
        methods: {
         ...mapActions({
             fetchProjects: "FETCH_PROJECTS",
             showNewProjectForm: "showNewProjectForm"
         }),
            // Create a new project
              async createNewProject() {
                 try {
                     let newProject = await axios.post('/vue/add-new-project', this.form);
                     if(newProject.data.success) {

                        // load new projects
                        this.fetchProjects();

                        // clear form fields
                        this.clearFields()

                        // close form
                        this.showNewProjectForm(false)

                         // flash message
                        this.flash(`Created A New Project: <strong>${newProject.data.data.name}<strong>`, "success flash__message");
                     }
                 } catch (error) {
                    this.errors = error.response.data
                 }
              },

            clearFields() {
                this.form.name = ''
                this.form.description = ''
                this.form.is_completed = false
                this.errors = {}
            }
        }
    }
</script>

<style scoped>

</style>
