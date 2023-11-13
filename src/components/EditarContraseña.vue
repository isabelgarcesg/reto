<template>
    <div>
       <label for="current-password">Contraseña actual:</label>
       <input type="password" id="current-password" v-model="currentPassword" />
   
       <label for="new-password">Nueva contraseña:</label>
       <input type="password" id="new-password" v-model="newPassword" />
   
       <button @click="changePassword">Cambiar contraseña</button>
    </div>
   </template>
   
   <script>
   export default {
    data() {
       return {
         passwordUser: '',
         passwordNew: '',
       };
    },
    methods: {
       changePassword() {
         // Implementación del cambio de contraseña aquí
         let operation = "UpdatePassword"
         let tna = 6
         let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
         let userId = this.$route.params.id
         let passwordUser = this.$refs.password.value;
         let passwordNew = this.passwordNew;
         fetch('https://redb.qsystems.co/QS3100/QServlet?operation=' +
            operation +
            '&tna=' + tna +
            '&userId=' + userId +
            '&passwordNew='+ passwordNew +
            '&passwordUser='+ passwordUser +
            '&key=' + key
            
            )
       },
    },
   };
   </script>