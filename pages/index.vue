<script setup lang="ts">
import type { BaseResponse } from "~/types/BaseResponse";
import "../assets/css/default.scss";

let form = {
    email: "",
    password: "",
}

async function submit(e) {
    e.stopPropagation();

    var { status } = await useFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
    });
    
    if(status.value == 'error')
    {
        alert("Usuario ou senha incorretos")
        return;
    }

    navigateTo("/tasks");
}

</script>
<template>
    <NuxtLayout name="login">
        <div>
            <div class="loginBox">
                <form @submit.prevent="submit">
                    <h1>Login</h1>
                    <div class="input-box">
                        <input class="form-control" type="text" v-model="form.email" required placeholder="Email" />
                        <font-awesome-icon class="icon" :icon="['fas', 'user']" />
                    </div>
                    <div class="input-box">
                        <input class="form-control" type="password" v-model="form.password" required placeholder="Senha" />
                        <font-awesome-icon class="icon" :icon="['fas', 'lock']" />
                    </div>
                    <div class="input-box">
                        <button class="btn btn-primary me-3" type="submit">Login</button>
                    </div>
                    <div class="input-box">
                        <NuxtLink class="register-link" to="/sign-in">Não Tem Conta?</NuxtLink>
                    </div>
                </form>
            </div>
        </div>
    </NuxtLayout>
</template>