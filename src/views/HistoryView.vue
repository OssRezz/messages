<script>
export default { name: 'History' };
</script>

<template>
    <div class="col-12 text-center">
        <div class="row d-flex justify-content-center mx-3">
            <div class="col-12 col-lg-10">
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
                                    <td class="text-center">Date</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="history in histories" :key="history.id">
                                    <td>{{ history.messages.message }}</td>
                                    <td>{{ history.date }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import store from '@/store'

const histories = computed(() => store.state.histories.data);
store.dispatch('GetHistories');

</script>