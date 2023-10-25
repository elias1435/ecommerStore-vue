<script setup>
import { reactive } from 'vue';
import { userAuth } from '../store/auth';
import { Form, Field, ErrorMessage  } from 'vee-validate';
import * as yup from 'yup';

const auth = userAuth();
const userInfo = reactive({})

const Registration = ()=>{
    auth.isLoading = true
    auth.Register(userInfo)
};


const schema = yup.object({
    name: yup.string().required(),
    email : yup.string().required().email(),
    password : yup.string().required().min(4),
    confirm_password : yup.string().required().oneOf([yup.ref('password'), null],'Passwords must match'),
});

</script>

<template>
    <div class="bg-white h">
        <div class="w-full  p-2">
            <div class="flex justify-center items-center ">
                <div class="bg-base-900 w-4/12 shadow-xl rounded-md shadow-indigo-100 p-5 space-y-3">
                    <div class="title border-b-2 pb-3">
                        <h1 class="text-2xl text-gray-500 font-semibold">Registration</h1>
                    </div>

                    <Form @submit="Registration" :validation-schema="schema" v-slot="{ errorMessage  }">
                        <div class="login-form ">
                            <div class="form-control">
                                <label class="label text-lg text-gray-600" for="name">Name</label>
                                <Field type="text" name="name" v-model="userInfo.name" class="input w-full input-bordered focus:border-none" id="name" placeholder="Name"/>
                                <ErrorMessage class="text-sm text-red-600 font-semibold" name="name" />
                            </div>
                            <div class="form-control">
                                <label class="label text-lg text-gray-600" for="email">Email</label>
                                <Field type="email" name="email" v-model="userInfo.email" class="input w-full input-bordered focus:border-none" id="email" placeholder="Email"/>
                                <ErrorMessage class="text-sm text-red-600 font-semibold" name="email" />
                            </div>
                            <div class="form-control">
                                <label class="label text-lg text-gray-600" for="password">Password</label>
                                <Field type="password" name="password" v-model="userInfo.password" class="input w-full input-bordered focus:border-none" id="password" placeholder="Password"/>
                                <ErrorMessage class="text-sm text-red-600 font-semibold" name="password" />
                            </div>
                            <div class="form-control">
                                <label class="label text-lg text-gray-600" for="confirmPass">Confirm password</label>
                                <Field type="password" name="confirm_password" v-model="userInfo.confirm_password" class="input w-full input-bordered focus:border-none" id="confirmPass" placeholder="Confirm password"/>
                                <ErrorMessage class="text-sm text-red-600 font-semibold" name="confirm_password" />
                            </div>
                            <div class="mt-5">
                                <button class="btn btn-primary"><span v-if="auth.isLoading" class="loading loading-spinner loading-md"></span>Register</button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>