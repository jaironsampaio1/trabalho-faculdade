<script setup lang="ts">
    import "../assets/css/login/login.scss";
    import bgImage from "../assets/img/bg.jpg";
</script>
<template>
    <div :style="{ backgroundImage: `url(${bgImage})`  }" class="main">
        <slot />
    </div>
</template>