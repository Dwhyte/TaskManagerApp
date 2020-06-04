<template>
    <li class="list-group-item">
            <div class="todo-indicator"
                 :class="{
                    'bg-danger': task.priority_level === 'critical',
                    'bg-warning': task.priority_level === 'important',
                    'bg-success': task.priority_level === 'normal',
                    'bg-info': task.priority_level === 'low',
                }"
            ></div>
        <div class="widget-content p-0">
            <div class="widget-content-wrapper">
                <div class="widget-content-left">
                    <div class="widget-heading">
                       <span :class="{'strikeout': task.is_completed}">{{ task.task_name }}</span>
                        <div class="badge ml-2"
                             :class="{
                                'badge-danger': task.priority_level === 'critical',
                                'badge-warning': task.priority_level === 'important',
                                'badge-success': task.priority_level === 'normal',
                                'badge-info': task.priority_level === 'low',
                            }"
                        >
                            {{ task.priority_level }}
                        </div>
                    </div>
                    <div class="widget-subheading"><i>{{ task.description }}</i></div>
                </div>
                <div class="widget-content-right">
                    <button class="border-0 btn-transition btn btn-outline-success"
                            data-toggle="modal" data-target="#editTaskModal"
                            @click="showModal(task)">
                        <i class="fa fa-pencil" title="change priority"></i>
                    </button>
                    <button class="border-0 btn-transition btn btn-outline-danger"
                            @click="removeTask(task.id)">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    import { mapActions } from "vuex";
    export default {
        props: ['task'],
        name: "TaskComponent",
        methods: {
          ...mapActions({
              selectedTask: "selectedTask",
              fetchTask: "FETCH_PROJECT_TASKS"
          }),
            removeTask(id) {
              if(confirm("Do you really want to delete?")) {
                axios.post(`/vue/remove-task/${id}`)
                    .then(res => {
                        console.log(res.data)

                        // fetch updated task list
                        this.fetchTask(this.task.project_id)

                        // flash message
                        this.flash(`Removed Task: ${this.task.task_name}`, "success flash__message");

                    })
                    .catch(err => console.log(err))
              }

            },
            showModal(task) {
              this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')

              // send task data to state
              this.selectedTask(task)
            },

            changePriority(id) {
                axios.post(`/vue/set-priority${id}`)
            }
        },
    }
</script>

<style scoped>
    .strikeout {
      /*font-size: 4em;*/
      position: relative;
    }
    .strikeout::after {
      border-bottom: 0.125em solid rgba(255, 0, 0, 0.5);
      content: "";
      left: 0;
      line-height: 1em;
      margin-top: calc(0.125em / 2 * -1);
      position: absolute;
      right: 0;
      top: 50%;
    }
</style>
