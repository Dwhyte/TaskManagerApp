<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col"># ID</th>
                      <th scope="col">Role</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col"># of Projects</th>
                      <th scope="col"># of Tasks</th>
                      <th scope="col">Created</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(user, index) in users">
                      <th scope="row">{{ user.id }}</th>
                      <td v-if="user.roles.length !== 0" v-for="role in user.roles">{{ role.name }}</td>
                      <td v-if="user.roles.length === 0"> Member </td>
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.projects_count }}</td>
                      <td>{{ user.tasks_count }}</td>
                      <td>{{ user.created_at | moment("dddd, MMMM Do YYYY") }}</td>
                      <td><button class="btn btn-danger btn-sm" @click="deleteUser(user.id, user.name)">Remove User</button></td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AdminComponent",
        data() {
            return {
                users: null,
                errors: {}
            }
        },
        created() {
          this.getAllUsers()
        },
        methods: {
            async getAllUsers() {
                try {
                    let res = await axios.post('/vue/admin/users');
                    if(res.data.success) {
                        this.users = res.data.data;
                    }
                } catch (errors) {
                    this.errors = errors.response.data
                }
            },

            async deleteUser(id, name) {
                if (confirm("Are you sure you want to delete this user?")) {
                    try {
                        let res = await axios.post(`/vue/admin/users/delete/${id}`)
                        if (res.data.success) {
                            // refresh table with current user list.
                            this.getAllUsers()

                            // flash message
                            this.flash(`Removed User: ${name}`, "success flash__message");
                        }
                    } catch (errors) {
                        this.errors = errors.response.data
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
