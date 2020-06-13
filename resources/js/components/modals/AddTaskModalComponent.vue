<template>
    <div>
        <b-modal id="modal-2">
          <template v-slot:modal-header="{ close }">
              <!-- Emulate built in modal header close button action -->
              <h5>Add New Task</h5>
          </template>
          <form>
              <div class="form-group">
                <label for="task_name">Task Name</label>
                <input type="text" class="form-control" id="task_name"  v-model="form.task_name">
                  <div class="invalid-feedback" v-if="errors.task_name" :style=" errors.task_name ? 'display: block;font-size: 97%;' : 'display: none;' ">
                    {{ errors.task_name[0] }}
                  </div>
              </div>
              <div class="form-group">
                <label for="priority">Priority</label>
                <select class="form-control" id="priority" v-model="form.priority_level">
                  <option v-for="priority in priority_levels">{{ priority }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="description">description</label>
                <textarea class="form-control" id="description" rows="3" v-model="form.description"></textarea>
                  <div class="invalid-feedback" v-if="errors.description" :style=" errors.description ? 'display: block;font-size: 97%;' : 'display: none;' ">
                    {{ errors.description[0] }}
                  </div>
              </div>
              <div class="form-group">
                  <label for="example-datepicker">Choose a date</label>
                <b-form-datepicker id="example-datepicker" v-model="form.due_date" class="mb-2"></b-form-datepicker>
              </div>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="is_completed" v-model="form.is_completed">
                <label class="form-check-label" for="is_completed">Completed?</label>
              </div>
            </form>
             <template v-slot:modal-footer="{ ok, cancel, hide }">
              <!-- Emulate built in modal footer ok and cancel button actions -->
              <b-button size="sm" variant="success" @click="addTask">
                Create
              </b-button>
              <b-button size="sm" variant="danger" @click="hideModal">
                Cancel
              </b-button>
            </template>
      </b-modal>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";
    export default {
        name: "AddTaskModalComponent",
        data() {
            return {
                priority_levels: [
                    'critical',
                    'important',
                    'normal',
                    'low'
                ],
                taskID: null,
                form: {
                    project_id: '',
                    task_name: '',
                    description: '',
                    priority_level: 'low',
                    due_date: '',
                    is_completed: false
                },
                currentDate: '',
                errors: {}
            }
        },
        computed: {
           ...mapGetters({
               projectID: "GET_SELECTED_PROJECT_ID"
           })
        },
        watch: {
          projectID() {
              this.form.project_id = this.projectID
          },
        },
        methods: {
          ...mapActions({
            fetchTask: "FETCH_PROJECT_TASKS"
          }),
        // Create a new task
           async addTask() {
                try {
                   let newTask = await axios.post('/vue/add-new-task', this.form)
                   if (newTask.data.success) {

                       // fetch updated task list
                        this.fetchTask(newTask.data.data.project_id)

                        // clear form fields
                        this.clearForm()

                        // close modal window
                        this.hideModal()

                       // flash message
                        this.flash(`Created A New Task:<br> <strong>${newTask.data.data.task_name}</strong>`, "success flash__message");

                   }
                } catch (error) {
                    this.errors = error.response.data
                }
            },

            // on click, hide modal
            hideModal() {
              this.clearForm()
              this.$root.$emit('bv::hide::modal', 'modal-2', '#btnShow')
            },

            // clear form fields and errors
            clearForm(){
                this.form.task_name = ''
                this.form.description = ''
                this.form.priority_level = ''
                this.form.due_date = ''
                this.is_completed = false
                this.errors = {}
            }

        },
    }
</script>

<style scoped>

</style>
