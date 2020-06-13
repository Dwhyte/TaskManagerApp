<template>
    <div>
      <b-modal id="modal-1">
          <template v-slot:modal-header="{ close }">
              <!-- Emulate built in modal header close button action -->
              <h5>{{ form.task_name }}</h5>
          </template>
          <form>
              <div class="form-group">
                <label for="task_name">Task Name</label>
                <input type="text" class="form-control" id="task_name" v-model="form.task_name">
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
                 <div class="invalid-feedback" v-if="errors.description" :style="errors.description ? 'display: block;font-size: 97%;' : 'display: none;' ">
                    {{ errors.description[0] }}
                  </div>
              </div>
              <div class="form-group">
                  <label>Choose a due date</label>
                <b-form-datepicker
                    v-model="form.due_date"
                    today-button
                    reset-button
                    close-button
                    class="mb-2"
                ></b-form-datepicker>
              </div>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="is_completed" v-model="form.is_completed">
                <label class="form-check-label" for="is_completed">Completed?</label>
              </div>
            </form>
             <template v-slot:modal-footer="{ ok, cancel, hide }">
              <!-- Emulate built in modal footer ok and cancel button actions -->
              <b-button size="sm" variant="success" @click="updateTask">
                Update
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
        name: "EditTaskModalComponent",
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
                    priority_level: '',
                    due_date: '',
                    is_completed: ''
                },
                errors: {}
            }
        },
        computed: {
            ...mapGetters({
                task: "GET_TASK",
            }),
        },
        methods: {
            ...mapActions({
                updateTask: "UPDATE_TASK",
                fetchTask: "FETCH_PROJECT_TASKS"
            }),
            // update current Task
            async updateTask() {
                try {
                    let res = await axios.post(`/vue/update/${this.taskID}`, this.form)
                    if(res.data.success) {

                        // fetch updated task list
                        this.fetchTask(this.form.project_id)

                        // close modal window
                        this.hideModal()

                        // flash message
                        this.flash(`Updated Task:<br> ${res.data.data.task_name}`, "success flash__message");

                        // clear errors
                        this.errors = {}
                    }
                } catch(error) {
                    console.log(error.response)
                    this.errors = error.response.data
                }
            },

            // on click, hide modal
            hideModal() {
              this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
              this.fetchTask(this.form.project_id)
              // clear errors
              this.errors = {}
            },
        },

        // watch if computed values change, update data accordingly
        watch: {
            task() {
                this.taskID = this.task.id
                this.form.task_name = this.task.task_name
                this.form.project_id = this.task.project_id
                this.form.description = this.task.description
                this.form.priority_level = this.task.priority_level
                this.form.due_date = this.task.due_date ? this.form.due_date = this.task.due_date : ''
                this.form.is_completed = this.task.is_completed
            }
        }
    }
</script>

<style scoped>

</style>
