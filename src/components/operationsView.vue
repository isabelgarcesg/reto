<template>
    Prueba de conexión con la API de Q
</template>
<script>
    export default {
            created:function(){
            this.createEntity();
            this.readEntity();
        },
        methods: {
            readEntity(){
                fetch('https://redb.qsystems.co/QS3100/QServlet?operation=queryEntityByTenancy&tna=2&key=29ee694f-0e5b-43e4-8fa4-3ba865f7d8dd')
                .then(respuesta=>respuesta.json())
                .then((datosRespuesta)=>{
                console.log(datosRespuesta)
                })
                .catch(console.log)
                },
                createEntity(){
                let operation="SaveEntity"
                let tna=6
                let key="11e2e476-717b-4898-ac02-693abdecdc9b"
                let nameEntity="Hospital la cima"
                let phoneEntity="6018259654"
                let adressEntity="Kra 23 No. 85 - 67"
                fetch('https://redb.qsystems.co/QS3100/QServlet?operation='+operation+'&tna='+tna+'&key='+key+'&nameEntity='+nameEntity+'&phoneEntity='+phoneEntity+'&adressEntity='+adressEntity)
                .then(respuesta=>respuesta.json())
                .then((datosRespuesta=>{
                console.log(datosRespuesta);
                }))
            }
        }
    }
</script>