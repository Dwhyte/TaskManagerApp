<template>
    <div>
        <form>
            <input class="form-control mb-2 mt-4" type="text" name="project_name" v-model="form.name" placeholder="project name" style="width: 50%;">
            <input class="form-control" type="text" name="project_desc" v-model="form.description" placeholder="project description" style="width: 50%;">
<!--        <input type="checkbox" class="form-check-input" id="is_completed" v-model="form.is_completed">-->
        </form>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";
    export default {
        name: "EditProjectComponent",
        data() {
            return {
                form: {
                    name: '',
                    description: '',
                    is_completed: false
                }
            }
        },
        mounted() {
            this.form.name = this.selectedProjectName
            this.form.description = this.selectedProjectDesc
        },
        computed: {
            ...mapGetters({
                // initialProject: "GET_INITIAL_PROJECT",
                selectedProjectID: "GET_SELECTED_PROJECT_ID",
                selectedProjectName: "GET_SELECTED_PROJECT_NAME",
                selectedProjectDesc: "GET_SELECTED_PROJECT_DESCRIPTION",
            })
        },
        watch: {
            selectedProjectName() {
               this.form.name = this.selectedProjectName
            },
            selectedProjectDesc() {
                this.form.description = this.selectedProjectDesc
            }
        }
    }
</script>

<style scoped>

</style>
