<template>
    <div class="container">
        <ChangeRoleModalComponent></ChangeRoleModalComponent>
        <flash-message  outerClass="flashpool flash__wrapper" transitionName="flash-enter flash-leave-to flash-leave-active"></flash-message>
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
                      <th scope="col">Change Role</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(user, index) in users">
                      <th scope="row">{{ user.id }}</th>
                      <td v-for="role in user.roles">{{ role.name }}</td>
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.projects_count }}</td>
                      <td>{{ user.tasks_count }}</td>
                      <td>{{ user.created_at | moment("dddd, MMMM Do YYYY") }}</td>
                      <td>
                          <button
                              v-if="authUser.id !== user.id"
                              class="btn btn-info btn-sm"
                              @click="showModal(user)">
                              Change Role
                          </button>
                          <button
                              v-else
                              disabled
                              title="You cannot change your own role"
                              class="btn btn-info btn-sm">
                              Change Role
                          </button>
                      </td>
                      <td>
                          <button
                              v-if="authUser.id !== user.id"
                              class="btn btn-danger btn-sm"
                              @click="deleteUser(user.id, user.name)">
                              Remove User
                          </button>
                          <button
                              v-else
                              disabled
                              title="You cannot delete your own admin account"
                              class="btn btn-danger btn-sm">
                              Remove User
                          </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";
    import ChangeRoleModalComponent from "./modals/ChangeRoleModalComponent";
    export default {
        name: "AdminComponent",
        components: {
            ChangeRoleModalComponent
        },
        data() {
            return {
                errors: {}
            }
        },
        created() {
          this.fetchUsers()
        },
        computed: {
          ...mapGetters({
              users: 'admin/GET_USERS',
              authUser: 'admin/GET_AUTH_USER'
          })
        },
        methods: {
            ...mapActions({
                fetchUsers: 'admin/FETCH_USERS',
                selectUser: 'admin/SELECTED_USER'
            }),

            async deleteUser(id, name) {
                if (confirm("Are you sure you want to delete this user?")) {
                    try {
                        let res = await axios.post(`/vue/admin/users/delete/${id}`)
                        if (res.data.success) {
                            // refresh table with current user list.
                            this.fetchUsers()

                            // flash message
                            this.flash(`Removed User`, "success flash__message");
                        }
                    } catch (errors) {
                        this.errors = errors.response
                    }
                }
            },

            showModal(user) {
              this.$root.$emit('bv::show::modal', 'modal-3', '#btnShow')

              // send user data to state
              this.selectUser(user)
            },
        }
    }
</script>

<style scoped>

</style>
