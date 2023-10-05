<template>
    <aside :class="`${is_expanded && 'is-expanded' } `">
        <div class="logo">
            <img src="../assets/logo.png" alt="Vue"> <!--CAMBIAR ESTO LUEGO A ALGO MAS-->
        </div>

        <div class="menu-toggle-wrap">
            <button class="menu-toggle" @click="ToggleMenu">
                <span class="material-symbols-rounded">keyboard_double_arrow_right</span> <!--salió de los iconos de google-->
            </button>
        </div>
    </aside> 
</template>

<script setup>
import {ref} from 'vue'

const is_expanded=ref(false)
const ToggleMenu = () =>{
    is_expanded.value =!is_expanded.value //Me va a permitir colapsar el menú
}
</script>

<style lang="scss" scoped>
aside{
    display: flex;
    flex-direction: column;
    //width: var(--sidebar-width);
    width: calc(2rem + 32px);
    min-height: 100vh;
    overflow: hidden;
    padding: 1rem;
    

    background-color: var(--dark);
    color:var(--light);

    transition: 0.2 ease-out;

    .logo{
        margin-bottom: 1rem;
        img{

            width: 2rem;
        }
    }

    .menu-toggle-wrap{
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;

        position: relative;
        top: 0;
        transition: 0.2s ease-out; //hace que el doble arrow button se mueva a la parte superior rápidamente

        .menu-toggle {
            transition: 0.2 ease-out;
           
            .material-icons {
                font-size: 2rem; 
                color: var(--light) }// No se pone blanco, why????
        }

    }

    &.is-expanded{
        width: var(--sidebar-width); // Cuando se de click en el logo se llama a expanded y este cambia el tamaño del side bar
        .menu-toggle-wrap{
            top: -3rem;
        }
    }

    @media(max-width: 768px){
        position: fixed;
        z-index: 99;
    }
}
</style>