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
                    <div class="widget-heading">{{ task.task_name }}
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
                </div>
                <div class="widget-content-right">
                    <button class="border-0 btn-transition btn btn-outline-success" data-toggle="modal" data-target="#editTaskModal" @click="selectedTask(task)">
                        <i class="fa fa-pencil" title="change priority"></i>
                    </button>
                    <b-button id="show-btn" @click="showModal(task)">Open Modal</b-button>
                    <button class="border-0 btn-transition btn btn-outline-danger"
                            @click="removeTask(task.id, index)">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";
    export default {
        props: ['task'],
        name: "TaskComponent",
        methods: {
          ...mapActions({
              selectedTask: "selectedTask",
              fetchProjects: "FETCH_PROJECTS"

          }),
            removeTask(id) {
                axios.post(`/vue/remove-task/${id}`)
                    .then(res => {
                        console.log(res.data)
                        // this.task.splice(id, 1);
                        this.fetchProjects()
                    })
                    .catch(err => console.log(err))
            },
            showModal(task) {
              this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow', this.task)
              this.selectedTask(task)
            },
        },
    }
</script>

<style scoped>

</style>
