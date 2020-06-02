<template>
    <div>
      <b-modal id="modal-1">
          <template v-slot:modal-header="{ close }">
              <!-- Emulate built in modal header close button action -->
              <h5>{{ form.task_name }}</h5>
              <b-button size="sm" variant="outline-danger" @click="close()">
                Close Modal
              </b-button>
          </template>
          <form>
              <div class="form-group">
                <label for="task_name">Task Name</label>
                <input type="text" class="form-control" id="task_name" v-model="form.task_name">
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
              </div>
            </form>
             <template v-slot:modal-footer="{ ok, cancel, hide }">
              <!-- Emulate built in modal footer ok and cancel button actions -->
              <b-button size="sm" variant="success" @click="updateTask">
                Update
              </b-button>
              <b-button size="sm" variant="danger" @click="cancel(hideModal)">
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
                    is_completed: ''

                },
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
                        console.log(res.data)

                        // fetch update task list
                        this.fetchTask(this.form.project_id)

                        // close modal window
                        this.hideModal()
                    }
                } catch(error) {
                    console.log(error.response)
                }
            },

            // on click, hide modal
            hideModal() {
              this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
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
                this.form.is_completed = this.task.is_completed
            }
        }
    }
</script>

<style scoped>

</style>
