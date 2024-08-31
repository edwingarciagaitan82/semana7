const express = require('express')
const app = express()
const puerto = 3005
const axios = require('axios')
const responseTime = require('response-time')
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

app.use(responseTime())
app.use(express.json())
app.get("/", async (req,res)=>{
        redis.get("products", (err,resr) =>{
        if(err)
            res.status(400).json({"error":err})
        else
            res.status(200).json(JSON.parse(resr))
    })
})

const productsRedis = async() =>{
    const response =  await axios.get("https://fakestoreapi.com/products")
    // res.status(200).json(response.data)
    redis.set("products", JSON.stringify(response.data),(err, reply)=>{
        if(err)
            console.error("err", err)
        else    
            console.log("redis products Actualizado", reply)
    })
}

setInterval( productsRedis , 30000  )

app.listen(puerto, ()=>{ console.log("servidor redis test puerto", puerto ) })