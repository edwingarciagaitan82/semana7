const Redis = require('ioredis')

const redis = new Redis({
    host : 'localhost',
    port : 6379
})

redis.on('connect', ()=>{
    console.log('Conectado a Redis')
})

redis.on('error', (err)=>{
    console.error("Redis ERror", err)
})

redis.on('ready', ()=>{
    console.log("Redis está escuchando")
})

// redis.set("data", "prueba", (err,res) =>{
//     if(err)
//         console.error("error", err)
//     else
//         console.log("Ejecutado", res)
// })

// redis.get("data", (err,res) =>{
//     if(err)
//         console.error("error",err)
//     else
//         console.log("data", res)
// })