<template>
    <aside :class="`${is_expanded && 'is-expanded' } `">
        <div class="logo">
            <img src="../assets/logo.png" alt="Vue"> <!--CAMBIAR ESTO LUEGO A ALGO MAS-->
        </div>

        <div class="menu-toggle-wrap">
            <button class="menu-toggle" @click="ToggleMenu">
                <span class="material-icons">keyboard_double_arrow_right</span> <!--salió de los iconos de google-->
            </button>
        </div>
        <!-- <h5>Menu</h5> lo puedo quitar después -->
        <div class="menu">
            <router-link class="botton" to="/"> <!--A futuro acá es donde debo poner lo que puse en el path del router-->
                <span class="material-icons">home</span>
                <span class="text">Home</span>
            </router-link>

            <!-- <router-link class="botton" to="/about"> 
                <span class="material-icons">document</span>
                <span class="text">About</span>
            </router-link> -->
            <router-link class="botton" to="/ListarEntidad">
                <span class="material-icons">apartment</span>
                <span class="text">Entidad</span>
            </router-link> 

            <router-link class="botton" to="/PruebaUsuario">
                <span class="material-icons">person</span>
                <span class="text">Usuarios</span>
            </router-link>

        
        </div>
    </aside> 
</template>

<script setup>
import {ref} from 'vue'

const is_expanded = ref(localStorage.getItem("is_expanded")==="true")

const ToggleMenu = () =>{
    is_expanded.value =!is_expanded.value //Me va a permitir colapsar el menú

    localStorage.setItem("is_expanded", is_expanded.value)
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

            width: 40px;

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

            .material-icons{
                font-size: 2rem; 
                color: var(--light) // No se pone blanco, why????
            }
            &:hover{
                .material-icons{
                    color:var(--primary);
                    transform: translateX(0.5rem);// esto era para que se moviera un poquito pero lo de material-icons no me funciona :(
                    transition: 0.2 ease-out;
                }

            }
        }

    }

h3, .botton .text {
    opacity: 0;
    transition: 0.3s ease-out;
}

// h3 {
//     color: var(--grey); nunca le puse título a esto, entonces no es necesario
//     font-size: 0.875rem;
//     margin-bottom: 0.5rem;
//     text-transform: uppercase;
// }
    .menu{
        margin: 0 -1rem;
        .botton{
            display: flex;
            align-items: center;
            text-decoration: none;

            padding: 0.5rem 1rem;
            transition: 0.2s ease-out;

            .material-icons{
                font-size: 2rem;
                color: var(--light);
                margin-right: 1rem;
                transition: 0.2s ease-out;
            }
            .text{
                color: var(--light);
                transition: 0.2s ease-out;

            }

            &:hover, &.router-link-exact-active {
                background-color: var(--dark-alt);

                .material-icons, .text{
                    color: var(--primary);
                }
            }
            &.router-link-exact-active{
                border-right: 5px solid var(--primary);
            }
        }

    }
    &.is-expanded{
        width: var(--sidebar-width); // Cuando se de click en el logo se llama a expanded y este cambia el tamaño del side bar
        .menu-toggle-wrap{
            top: -3rem;
            .menu-toggle{
                transform: rotate(-180deg); // Lo gira 180 para que parezca que va a esconder el menú again
            }
        }

        h3, .botton .text {
            opacity: 1;
            
        }

        .logo{
            img{
                width: 4rem;
                transition: 0.2s ease-out;
            }
        }
        
    }

    @media(max-width: 768px){
        position: fixed;
        z-index: 99;
    }
}
</style>