<script setup>
import { useRouter } from 'vue-router';
import store from '@/store';
import Swal from 'sweetalert2';
const router = useRouter();
const user = {
    email: "",
    password: "",
}

function login(ev) {
    ev.preventDefault();
    store.dispatch('login', user)
        .then((res) => {
            if (res.status !== 200) {
                let html = "";
                Object.values(res.errors).forEach(error => {
                    html += `<li class="list-group-item"><small>${error}</small></li>`;

                });
                return Swal.fire({
                    title: res.message,
                    html: `<ul class="list-group list-group-flush">${html}</ul>`,
                    icon: 'warning',
                    confirmButtonColor: 'rgb(223, 71, 89)',
                });

            }
            router.push({ name: "dashboard" })
        })
        .catch((error) => {
            return Swal.fire({
                title: error.message,
                html: `¡Ups! Parece que el servidor está teniendo un problema técnico. Por favor, inténtalo de nuevo más tarde.<br> ¡Lo solucionaremos lo antes posible!`,
                icon: 'error',
                confirmButtonColor: 'rgb(223, 71, 89)',
            });
        })
}
</script>
<template>
    <div class="container my-5">
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4  mt-5">
                <div class="card  mt-5 shadow-sm border">
                    <div class="card-body">
                        <div class="row mb-4">
                            <div class="col-12 text-center">
                                <span class="material-icons text-danger" style="font-size: 80px;">
                                    favorite
                                </span>
                            </div>
                            <div class="col-12 text-center">
                                <div class="fs-4" style="font-weight: 600;">You & Me</div>
                            </div>
                        </div>
                        <form @submit="login">
                            <div class="row g-4 d-flex justify-content-center">
                                <div class="col-11 text-white bg-danger p-2 rounded" v-if="errorMsg">
                                    <div class="row d-flex align-items-center">
                                        <div class="col-2">
                                            <span style="cursor: pointer;">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="email" class="form-control" id="input-1" placeholder="Enter email"
                                            v-model="user.email">
                                        <label for="">Email</label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="password" class="form-control" id="input_password"
                                            placeholder="Enter password" v-model="user.password">
                                        <label for="">Password</label>
                                    </div>
                                </div>
                                <div class="col-12 d-flex justify-content-center">
                                    <button type="submit" class="btn btn-outline-danger d-flex justify-content-center">
                                        Login
                                        <span class="material-icons">
                                            login
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>