<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router'

const navigation = [
    { name: "Dashboard", to: { name: "Dashboard" } },
    { name: "History", to: { name: "History" } },
    { name: "Messages", to: { name: "Messages" } },
];


export default {
    name: "DefaultLayout",
    setup() {
        const store = useStore();
        const router = useRouter();

        function logout() {
            store.dispatch('logout').then(() => {
                router.push({
                    name: "Login"
                })
            })
        }

        return {
            user: computed(() => store.state.user.data),
            navigation,
            logout
        }
    }
};

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm border-bottom mb-4">
        <div class="container-fluid">
            <span class="material-icons text-danger" style="font-size: 40px;">
                favorite
            </span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="col">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link class="nav-link active" aria-current="page" to="/">Dashboard</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="messages">Message</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="history">History</router-link>
                        </li>
                    </ul>
                </div>
                <button class="btn btn-outline-secondary btn-sm d-flex align-items-center" @click="logout">
                    Out
                    <span class="material-icons mx-1" style="font-size: 15px;">
                        logout
                    </span>
                </button>

            </div>
        </div>
    </nav>
    <router-view>

    </router-view>
</template>