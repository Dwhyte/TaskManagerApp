<template>
    <form @submit.prevent="createNewProject">
        <div
            v-if="errors"
            :style="{ display: errors ? 'block' : 'none' }"
            class="invalid-feedback"
            >
            {{ errors.name[0] }}
        </div>
      <div class="form-group">
        <label for="project_name">Project Name</label>
        <input type="text" class="form-control" id="project_name" v-model="form.name">
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
        name: "AddNewProject",
        data() {
            return {
                errors: null,
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
         }),
            // Create a new project
              async createNewProject() {
                 try {
                     let newProject = await axios.post('/vue/add-new-project', this.form);
                     if(newProject.data.success) {
                         console.log(newProject)

                        // load new projects
                        // this.getProjects()
                        this.fetchProjects();

                        // clear form fields
                        this.form.name = ''
                        this.form.description = ''
                        this.form.is_completed = false

                        // close form
                        this.showForm = false
                        this.errors = null
                     }
                 } catch (error) {
                     console.log('ERROR')
                     console.log(error.response)
                    this.errors = error.response.data
                 }
              },
        }
    }
</script>

<style scoped>

</style>
