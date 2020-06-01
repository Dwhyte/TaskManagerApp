<template>
    <form @submit.prevent="addTask" class="mt-3 form-group">
        <div
            v-if="errors"
            :style="{ display: errors ? 'block' : 'none' }"
            class="invalid-feedback"
            >
            <li v-if="errors.task_name">{{ errors.task_name }}</li>
            <li v-if="errors.description">{{ errors.description }}</li>
        </div>
            <input type="text" hidden v-model="form.project_id = selectedProjectID">
        <div>
        <label for="task_name">Task name</label>
        <input type="text" v-model="form.task_name" class="form-control mb-2 mr-sm-2" id="task_name" placeholder="please add task name">
          </div>
            <div>
            <label for="description">Description</label>
                <textarea v-model="form.description" class="form-control mb-2 mr-sm-2" id="description" placeholder="please add description"></textarea>
          </div>
        <div class="form-group">
            <label for="priority">Priority</label>
            <select v-model="form.priority_level" class="form-control" id="priority">
              <option v-for="priority in priority_levels">{{priority}}</option>
            </select>
        </div>
         <div class="form-group">
          <button type="submit" class="mr-2 btn btn-success">Save</button>
        </div>
    </form>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";
    export default {
        name: "AddNewTask",
        data() {
            return {
                errors: null,
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
        ...mapGetters({
                selectedProjectID: "GET_SELECTED_PROJECT_ID",
                tasks: "GET_SELECTED_PROJECT_TASKS"
            })
        },
        methods: {
           ...mapActions({
              showForm: "showTaskForm"
         }),
           // Create a new task
            addTask() {
                axios.post('/vue/add-new-task', this.form)
                    .then(res => {
                        console.log(res)

                        // push new results to tasks array
                        // this.tasks.push(res.data.data)
                        // reload new tasks list.
                        this.tasks();

                        // clear form fields
                        this.form.task_name = ''
                        this.form.description = ''
                        this.form.priority_level = ''
                        this.is_completed = false

                        // close form
                        this.showForm(false)
                    })
                    .catch(error => {
                       console.log(error.response.data)
                        this.errors = error.response.data
                    })
            },
        }
    }
</script>

<style scoped>

</style>
