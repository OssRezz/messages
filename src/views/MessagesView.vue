<script>
export default { name: 'Messages' };
</script>  

<template>
    <div class="row d-flex justify-content-center mx-3">
        <div class="col-12 col-lg-4 mb-4">
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
                    <div class="mx-1">Messages list</div>
                </div>
                <div class="card-body">
                    <table class="table table-bordered table-hover table-sm" v-if="messages.length">
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
                                            <button class="btn btn-outline-primary btn-sm border-0" :value="message.id"
                                                @click="ShowMessage(message.id)">
                                                <span class="material-icons ">
                                                    info
                                                </span>
                                            </button>
                                            <button class="btn btn-outline-primary btn-sm border-0"
                                                @click="ModalEditMessage(message.id)">
                                                <span class="material-icons ">
                                                    edit_note
                                                </span>
                                            </button>
                                            <button class="btn btn-outline-danger btn-sm border-0" :value="message.id"
                                                @click="DeleteMessage(message.id)">
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
                    <b v-else>There are no messages registered in the database</b>
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
            text: res.message,
            icon: 'success',
            confirmButtonColor: 'rgb(223, 71, 89)',
        });
    })
}

function ModalEditMessage(id) {
    store.dispatch('GetMessageById', id).then((res) => {
        if (res.status !== 200) {
            return Swal.fire({
                text: res.message,
                icon: 'warning',
                confirmButtonColor: 'rgb(223, 71, 89)',
            });
        }
        console.log(res)
        return Swal.fire({
            html: `
                <div class="col-12">
                    <div class="card">
                        <div class="card-header d-flex align-items-center">
                            <span class="material-icons text-danger">
                                message
                            </span>

                            <div class="mx-1">Edit message</div>
                        </div>
                        <div class="card-body">
                            <form @submit="CreateMessage">
                                <div class="row g-3">
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <textarea class="form-control" placeholder="Message" id='message'>${res.data.message}</textarea>
                                            <label for="">Message <b class="text-danger">*</b></label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" placeholder="Number" id='number' value="${res.data.number}">
                                            <label for="">Number</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <select class="form-select" placeholder="Type of message" id='type' v-model="ModelMessageEdit.type">
                                                <option value="moment" ${res.data.type === "moment" ? 'selected' : ''}>moment</option>
                                                <option value="Love" ${res.data.type === "Love" ? 'selected' : ''}>Love</option>
                                                <option value="Remember" ${res.data.type === "Remember" ? 'selected' : ''}>Remember</option>
                                            </select>
                                            <label for="">Type of message <b class="text-danger">*</b></label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `,
            confirmButtonColor: 'rgb(223, 71, 89)',
            confirmButtonText: "Editar",
            showCancelButton: true,

        }).then((result) => {
            if (result.isConfirmed) {
                const MessageEdit = document.querySelector('#message').value;
                const NumberEdit = document.querySelector('#number').value;
                const TypeEdit = document.querySelector('#type').value;
                if (MessageEdit == "" || NumberEdit == "" || TypeEdit == "") {
                    return Swal.fire({
                        text: "Todos los campos son requeridos",
                        icon: 'warning',
                        confirmButtonColor: 'rgb(223, 71, 89)',
                    });
                }

                EditarMessage({
                    id: id,
                    message: MessageEdit,
                    number: NumberEdit,
                    type: TypeEdit
                });
            }
        })
    });
}

function EditarMessage(MessageArray) {
    store.dispatch('EditMessage', MessageArray).then((res) => {
        console.log(res)
        if (res.status !== 200) {
            return Swal.fire({
                text: res.message,
                icon: 'danger',
                confirmButtonColor: 'rgb(223, 71, 89)',
            });
        }
        store.dispatch('GetMessages');
        return Swal.fire({
            text: res.message,
            icon: 'success',
            confirmButtonColor: 'rgb(223, 71, 89)',
        });
    });

}

function ShowMessage(id) {
    store.dispatch('GetMessageById', id).then((res) => {
        if (res.status !== 200) {
            return Swal.fire({
                text: res.message,
                icon: 'warning',
                confirmButtonColor: 'rgb(223, 71, 89)',
            });
        }
        return Swal.fire({
            html: `
            <div class="col-12">
                <small>
                    <ul class="list-group text-start">
                        <li class="list-group-item"><b>#</b>: ${res.data.id}</li>
                        <li class="list-group-item"><b>Message</b>: ${res.data.message}</li>
                        <li class="list-group-item"><b>Number</b>: ${res.data.number}</li>
                        <li class="list-group-item"><b>Type</b>: ${res.data.type}</li>
                    </ul>
                </small>
            </div>
            `,
            confirmButtonColor: 'rgb(223, 71, 89)',
            icon: 'info',
        });
    });
}

function DeleteMessage(id) {
    store.dispatch('DeleteMessage', id).then((res) => {
        if (res.status !== 200) {
            return Swal.fire({
                text: res.message,
                icon: 'warning',
                confirmButtonColor: 'rgb(223, 71, 89)',
            });
        }
        store.dispatch('GetMessages');
        return Swal.fire({
            text: res.message,
            icon: 'success',
            confirmButtonColor: 'rgb(223, 71, 89)',
        });
    });
}

</script>


<style>
#swal2-html-container {
    margin: 10px 10px 0px 10px !important;
}
</style>