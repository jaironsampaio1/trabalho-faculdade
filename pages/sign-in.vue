<script setup lang="ts">
import "../assets/css/default.scss";

const form = {
    name: "",
    email: "",
    password: "",
}

async function submit() {
    var { data } = await useFetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: form
    });

    if (data.value?.statusCode != 200) {
        alert(data.value?.statusMessage)
        return;
    }

    navigateTo('/');
}

</script>
<template>
    <NuxtLayout name="login">
        <div>
            <div class="loginBox">
                <form @submit.prevent="submit">
                    <h1>Cadastro</h1>
                    <div class="input-box">
                        <input class="form-control" name="username" type="text" v-model="form.name" required
                            placeholder="Nome de Usuario" />
                        <font-awesome-icon class="icon" :icon="['fas', 'user']" />
                    </div>
                    <div class="input-box">
                        <input class="form-control" name="email" type="text" v-model="form.email" required placeholder="Email" />
                        <font-awesome-icon class="icon" :icon="['fas', 'envelope']" />
                    </div>
                    <div class="input-box">
                        <input class="form-control" name="password" type="password" v-model="form.password" required placeholder="Senha" />
                        <font-awesome-icon class="icon" :icon="['fas', 'lock']" />
                    </div>
                    <div class="input-box">
                        <button class="btn btn-primary me-3" type="submit">Cadastrar</button>
                    </div>
                    <div class="input-box">
                        <NuxtLink class="register-link" to="/">Já Tem Uma Conta?</NuxtLink>
                    </div>
                </form>
            </div>
        </div>
    </NuxtLayout>
</template>