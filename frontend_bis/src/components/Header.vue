<template>

    <header class="bg-blue-gm container-fluid">
        <div class="d-flex row justify-content-center align-middle">
            <div class="col-sm text-center">
                <router-link to="/">
                    <img src="../assets/icon-left-font-monochrome-white.svg" class="mx-auto logo-top"/>
                </router-link>
            </div>
            <div class="col-sm text-center text-nowrap bg-gray-gm pt-4">
                <h3 class="text-center title-gm">Postmania</h3>
                 <hr class="hr bg-red-gm mt-0"/>
            </div>
        </div>
    </header>


</template>

<script>
export default {
    name: "Header"
}
</script>