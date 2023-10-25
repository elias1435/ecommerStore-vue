<script setup>
import { userAuth } from '../store/auth';
const auth = userAuth();

</script>

<template>
    <div class="bg-white ">
        <div class="flex items-center justify-center " >
            <h1 class="font-medium text-xl">Home Page</h1>
        </div>
    </div>
</template>