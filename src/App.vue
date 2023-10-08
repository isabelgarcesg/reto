<template>
<div class="container">
  <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="nav navbar-nav">
          
          <router-link to="/crear" class="navbar-brand">Crear usuario</router-link> 
          <router-link to="/listar" class="navbar-brand">Listar</router-link>     
          <router-link to="/operations" class="navbar-brand">Operations</router-link>     
          <router-link to="/CrearEntidad" class="navbar-brand">Crear entidad</router-link> 
          <router-link to="/ListarUsuario" class="navbar-brand">Listar usuario</router-link>    
      </div>
  </nav>
</div>
<br>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<!-- ESTILO -->
