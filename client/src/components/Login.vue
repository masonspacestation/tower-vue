<script setup>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'

const user = computed(() => AppState.user)
const account = computed(() => AppState.account)
async function login() {
  AuthService.loginWithPopup()
}
async function logout() {
  AuthService.logout({ returnTo: window.location.origin })
}

</script>

<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase" @click="login" v-if="!user?.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown">
        <div type="button" class="bg-border-0 selectable no-select px-4" data-bs-toggle="dropdown"
          aria-expanded="false">
          <div v-if="account?.picture || user?.picture">
            <img :src="account?.picture || user?.picture" alt="account photo" height="40" class="login-picture" />
            <h6 class="ms-3 d-none d-sm-inline">{{ account?.name }}</h6>
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-sm-end dropdown-menu-end p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Account
              </div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<style lang="scss" scoped>
.login-picture {
  height: 5dvh;
  aspect-ratio: 1/1;
  border-radius: 50em;
  background-position: center;
  background-size: cover;
  border: 2px solid rgb(203, 142, 10)
}
</style>
