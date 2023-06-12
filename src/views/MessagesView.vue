<script>
export default { name: 'Messages' };
</script>  

<template>
    <div class="row d-flex justify-content-center mx-3">
        <div class="col-12 col-lg-4">
            <div class="card">
                <div class="card-header d-flex align-items-center">
                    <span class="material-icons text-danger">
                        message
                    </span>

                    <div class="mx-1">Create message</div>
                </div>
                <div class="card-body">
                    <form @submit="CreateMessage">
                        <div class="row g-3">
                            <div class="col-12">
                                <div class="form-floating">
                                    <textarea class="form-control" placeholder="Message"
                                        v-model="ModelMessage.message"></textarea>
                                    <label for="">Message <b class="text-danger">*</b></label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-floating">
                                    <input type="number" class="form-control" placeholder="Number"
                                        v-model="ModelMessage.number">
                                    <label for="">Number</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-floating">
                                    <select class="form-select" placeholder="Type of message" v-model="ModelMessage.type">
                                        <option value="moment">moment</option>
                                        <option value="Love">Love</option>
                                        <option value="Remember">Remember</option>
                                    </select>
                                    <label for="">Type of message <b class="text-danger">*</b></label>
                                </div>
                            </div>
                            <div class="col-12 text-center">
                                <button class="btn btn-outline-danger btn-sm">New message</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-8">
            <div class="card">
                <div class="card-header d-flex align-items-center">
                    <span class="material-icons text-danger">
                        list_alt
                    </span>
                    <div class="mx-1">Message list</div>
                </div>
                <div class="card-body">
                    <table class="table table-bordered table-hover table-sm">
                        <thead>
                            <tr>
                                <td>Message</td>
                                <td>Type</td>
                                <td class="text-end">Number</td>
                                <td class="text-center">Sended</td>
                                <td class="text-center">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="message in messages" :key="message.id">
                                <td>{{ message.message.slice(0, 250) }}</td>
                                <td>{{ message.type }}</td>
                                <td class="text-end">{{ message.number }}</td>
                                <td class="text-center">{{ message.sended === 0 ? 'No' : 'Si' }}</td>
                                <td class="text-center">
                                    <div class="col ">
                                        <div class="btn-group">
                                            <button class="btn btn-outline-primary btn-sm border-0" :value="message.id">
                                                <span class="material-icons ">
                                                    info
                                                </span>
                                            </button>
                                            <button class="btn btn-outline-primary btn-sm border-0" :value="message.id">
                                                <span class="material-icons ">
                                                    edit_note
                                                </span>
                                            </button>
                                            <button class="btn btn-outline-danger btn-sm border-0" :value="message.id">
                                                <span class="material-icons ">
                                                    delete
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
      
<script setup>
import { ref, computed } from 'vue';
import store from '@/store'
import Swal from 'sweetalert2';

const messages = computed(() => store.state.messages.data);

store.dispatch('GetMessages');

let ModelMessage = ref({
    message: '',
    type: '',
    number: ''
})




function CreateMessage(e) {
    e.preventDefault();
    store.dispatch("SaveMessage", ModelMessage.value).then((res) => {
        if (res.status !== 200) {
            let html = "";
            Object.values(res.data).forEach(error => {
                html += `<li class="list-group-item"><small>${error}</small></li>`;

            });
            return Swal.fire({
                title: res.message,
                html: `<ul class="list-group list-group-flush">${html}</ul>`,
                icon: 'warning',
                confirmButtonColor: 'rgb(223, 71, 89)',
            });
        }
        store.dispatch('GetMessages');
        ModelMessage.value.message = "";
        ModelMessage.value.type = "";
        ModelMessage.value.number = "";
        return Swal.fire({
            title: res.message,
            icon: 'success',
            confirmButtonColor: 'rgb(223, 71, 89)',
        });
    })
}

</script>
