const express=require('express')
const app=express()
const port=8000

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views')

//use express router
app.use('/', require('./routes'))
app.listen(port, (err)=>{
    if(err){
        console.log(`Error: ${err}`)
    }
    console.log(`Server is up and running on port: ${port}`)
})