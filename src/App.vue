<template>
  <div class="app">
    <SideBar v-if="currentRouteHasSidebar" />
    <router-view />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import SideBar from './components/SideBar.vue';

const route = useRoute();
const currentRouteHasSidebar = ref(false);

watch(() => route.meta, () => {
  currentRouteHasSidebar.value = route.meta && route.meta.hasSidebar;
});
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
