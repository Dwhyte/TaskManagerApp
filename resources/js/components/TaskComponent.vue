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
                    <button class="border-0 btn-transition btn btn-outline-success">
                        <i class="fa fa-pencil" title="change priority"></i></button>
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
    export default {
        props: ['task'],
        name: "TaskComponent",
        data() {
            return {

            }
        },

        methods: {
            removeTask(id) {
                axios.post(`/vue/remove-task/${id}`)
                    .then(res => {
                        console.log(res.data)
                        this.task.splice(id, 1);
                    })
                    .catch(err => console.log(err))
            }
        }


    }
</script>

<style scoped>

</style>
