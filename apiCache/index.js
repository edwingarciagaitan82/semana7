const express = require('express')
const app = express()
const port = 3005
const axios = require('axios')
const ApiCache = require('apicache')
const productsCache = ApiCache.middleware
app.use(express.json())
app.get('/', productsCache('1 minutes')  ,async (req, res) => {
    const url = `https://fakestoreapi.com/products`
    const response = await axios.get(url)
    //console.log(response)
    res.json({data : response.data})
})

app.listen(port, () => {
      console.log(`Servidor ApiCache , puerto ${port}`)
    })
    
