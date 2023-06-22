const express=require('express')
const app=express()
const expressLayouts=require('express-ejs-layouts')
const port=8000

//set up view engine
app.use(express.static('./assets'))
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('views', './views')
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//use express router
app.use('/', require('./routes'))
app.listen(port, (err)=>{
    if(err){
        console.log(`Error: ${err}`)
    }
    console.log(`Server is up and running on port: ${port}`)
})