const express=require('express')
const app=express()
const expressLayouts=require('express-ejs-layouts')
const db=require('./config/mongoose')
const cookieParser=require('cookie-parser');
const sassMiddleware=require('node-sass-middleware')
const flash=require('connect-flash')
const customMware=require('./config/middleware.js')
const colors=require('colors')
const port=8000

//user for session cookie
const session=require('express-session')
const passport=require('passport')
require('./config/passport-local-strategy')
require('./config/passport-jwt-strategy')
require('./config/passport-google-oauth2-strategy')
const MongoStore=require('connect-mongo');
app.use(express.urlencoded())
app.use(cookieParser())

//set up view engine
app.use(sassMiddleware({
    src:'./assets/scss',
    dest: './assets/css',
    debug: false,
    outputStyle: 'extended',
    prefix: '/css'
}))
app.use(express.static('./assets'))
//the route /upload mapped to the uploads folder to access the files
app.use('/uploads', express.static(__dirname+'/uploads'))
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('views', './views')
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use((req,res,next)=>{console.log(colors.green.bgMagenta('INDEXJS SESSION COOKIE: %s'), req.session); next()})
app.use((req,res,next)=>{console.log(colors.green.bgGreen('INDEXJS SESSION PASSPORT: %s'), req.session); next()})
app.use((req,res,next)=>{console.log(colors.green.bgWhite('INDEXJS SESSION FLASH: %s'), req.session); next()})

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongoUrl: 'mongodb://127.0.0.1/codial_development',
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));
app.use((req,res,next)=>{console.log(colors.green.bgRed('INDEXJS URL: %s'), req.url); next()})
app.use((req,res,next)=>{console.log(colors.green.bgYellow('INDEXJS USER: %s'), req.user); next()})
app.use((req,res,next)=>{console.log(colors.green.bgMagenta('INDEXJS COOKIE: %s'), req.session.cookie); next()})
app.use((req,res,next)=>{console.log(colors.green.bgGreen('INDEXJS PASSPORT: %s'), req.session.passport); next()})
app.use((req,res,next)=>{console.log(colors.green.bgWhite('INDEXJS FLASH: %s'), req.session.flash); next()})
console.log(colors.bgCyan('BERFORE PASSPORT INITIALIZE'))
app.use(passport.initialize())
console.log(colors.bgRed('BERFORE PASSPORT SESSION'))
app.use(passport.session())
app.use((req,res,next)=>{console.log(colors.green.bgCyan('INDEXJS USER: %s'), req.user); next()})
//set logged in user in response
//the information which we get in user_profile page is set here
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash)
//use express router
app.use('/', require('./routes'))

app.listen(port, (err)=>{
    if(err){
        console.log(`Error: ${err}`)
    }
    console.log(`Server is up and running on port: ${port}`)
})