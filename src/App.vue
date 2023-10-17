<template>
<!-- <div class="container">
  <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="nav navbar-nav">
          
          <router-link to="/crear" class="navbar-brand">Crear usuario</router-link> 
          <router-link to="/listar" class="navbar-brand">Listar</router-link>     
          <router-link to="/operations" class="navbar-brand">Operations</router-link>     
          <router-link to="/CrearEntidad" class="navbar-brand">Crear entidad</router-link>   
      </div>
  </nav>
</div>
<br>
  <router-view/> -->
  <div class="app">
    <SideBar />

    <router-view/>
  </div>
</template>

<script setup>
import SideBar from './components/SideBar.vue';
import './style.css'
</script>

<style lang="scss">
:root{
  --primary: #97c1e7;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --light-blue: #deebf7;
  --white: #ffffff
  --sidebar-width: 300px;
}
* {
  margin: 0;
  padding: 0;
box-sizing: border-box;
font-family: 'Lato', sans-serif;
}

body{
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;

}

.app{
  display: flex;

  main{
    flex: 1 1 0;
    padding: 2rem;
    @media (max-width:768px){
      padding: 6rem;
    }

  } 
}

</style>
<!-- ESTILO -->
