<template>
    <main class="home-page">
        <h1>LifeTech Solutions</h1>
        <p>This is the home page</p>
        <div v-if="user">
            <h2>Perfil de Usuario</h2>
            <p>{{ user.name }}</p>
            <p>{{ user.nickname }}</p>
            <!-- Otras propiedades del usuario según las necesidades -->
        </div>
    </main>
</template>

<script>
export default {
    computed: {
        user() {
            const user = JSON.parse(localStorage.getItem("user"));
            return user;
        }
    }
}
</script>