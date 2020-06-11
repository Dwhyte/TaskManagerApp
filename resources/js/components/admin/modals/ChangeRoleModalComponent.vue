<template>
    <div>
        <b-modal id="modal-3">
          <template v-slot:modal-header="{ close }">
              <!-- Emulate built in modal header close button action -->
              <h5>{{ user.name }} <span class="badge status" :class="selectedRole === 'Admin' ? 'badge-danger': 'badge-secondary'" style="">{{ selectedRole }}</span></h5>
          </template>
          <form>
              <div class="form-group">
                <label for="roles">Change Role to:</label>
                <select class="form-control" id="roles" v-model="selectedRole">
                  <option v-for="role in roleNames">{{ role }}</option>
                </select>
              </div>
            </form>
             <template v-slot:modal-footer="{ ok, cancel, hide }">
              <!-- Emulate built in modal footer ok and cancel button actions -->
              <b-button size="sm" variant="success" @click="setRole(user.id)">
                Save
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
        name: "ChangeRoleModalComponent",
        data() {
            return {
                selectedRole: '',
                roleNames: [
                    'Admin',
                    'Member'
                ],
                errors: {}
            }
        },
        computed: {
            ...mapGetters({
                user: "admin/GET_SELECTED_USER",
            })
        },
        // watch if computed values change, update data accordingly
        watch: {
            user() {
                this.user.roles.forEach(role => this.selectedRole = role.name)
            }
        },
        methods: {
            ...mapActions({
                fetchUsers: 'admin/FETCH_USERS'
            }),
            // on click, hide modal
            hideModal() {
              this.$root.$emit('bv::hide::modal', 'modal-3', '#btnShow')
            },
            async setRole(id) {
                try {
                    let res = await axios.post(`/vue/admin/users/role-change/${id}`,{
                        role: this.selectedRole
                    })
                    if(res.data.success) {

                        // fetch updated user list
                        this.fetchUsers()

                        // close modal window
                        this.hideModal()

                        // flash message
                        // this.flash(`User is now a :<br> ${res.data.message}`, "success flash__message");

                        // clear errors
                        this.errors = {}
                    }
                } catch(error) {
                    console.log(error.response.data)
                    this.errors = error.response.data
                }
            }
        }

    }
</script>

<style scoped>
    .status {
        position: absolute;
        right: 11px;
    }
</style>
