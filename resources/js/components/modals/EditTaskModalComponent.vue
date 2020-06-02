<template>
    <div class="modal fade" id="editTaskModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="editTaskModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Edit Task</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form v-if="task">
          <div class="form-group">
            <label for="name">Task Name</label>
            <input type="text" class="form-control" id="name"  v-model="form.task_name">
          </div>
          <div class="form-group">
            <label for="priority">Priority</label>
            <select class="form-control" id="priority" v-model="form.priority_level">
              <option v-for="priority in priority_levels">{{ priority }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" id="description" rows="3" v-model="form.description"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Update</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    import { mapActions, mapGetters, mapState } from "vuex";
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
                form: {
                    project_id: '',
                    task_name: '',
                    description: '',
                    priority_level: 'low',
                    is_completed: false

                }
            }
        },
        computed: {
            // ...mapGetters({
            //     task: "GET_TASK",
            // }),
            ...mapState(['task']),
            taskData: {
                get() {
                    this.form.project_id = this.task.project_id
                    this.form.description = this.task.description
                    this.form.priority_level = this.task.priority_level
                    this.form.task_name = this.task.task_name
                }
            }

        },
    }
</script>

<style scoped>

</style>
