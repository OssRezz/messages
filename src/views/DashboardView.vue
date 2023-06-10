<script>
export default { name: 'Dashboard' };
</script>
<template>
    <div class="row d-flex justify-content-center m-3 m-sm-5" >
        <div class="col-12 col-lg-6 col-xl-4 text-center mb-4 mb-sm-5">
            <div class="card shadow-sm text-white bg-secondary">
                <div class="card-body">
                    <div class="row">
                        <div class="col-6 d-flex justify-content-center">
                            <span class="material-icons-outlined" style="font-size: 80px;">
                                messages
                            </span>
                        </div>
                        <div class="col-6 d-flex align-items-center justify-content-center">
                            <div class="row">
                                <div class="col-12 text-center">0</div>
                                <div class="col-12 text-center">Messages </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-6 col-xl-4 text-center mb-4 mb-sm-5">
            <div class="card shadow-sm text-white bg-success">
                <div class="card-body">
                    <div class="row">
                        <div class="col-6 d-flex justify-content-center">
                            <span class="material-icons-outlined" style="font-size: 80px;">
                                send
                            </span>
                        </div>
                        <div class="col-6 d-flex align-items-center justify-content-center">
                            <div class="row">
                                <div class="col-12 text-center">0</div>
                                <div class="col-12 text-center">Sended </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-6 col-xl-4">
            <div class="card shadow-sm text-white bg-primary">
                <div class="card-body">
                    <div class="row">
                        <div class="col-6 d-flex justify-content-center">
                            <span class="material-icons" style="font-size: 80px;">
                                schedule_send
                            </span>
                        </div>
                        <div class="col-6 d-flex align-items-center justify-content-center">
                            <div class="row">
                                <div class="col-12 text-center">0</div>
                                <div class="col-12 text-center">Peding </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>