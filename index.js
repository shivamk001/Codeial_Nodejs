const express=require('express')
const app=express()
const expressLayouts=require('express-ejs-layouts')
const db=require('./config/mongoose')
const cookieParser=require('cookie-parser');
const sassMiddleware=require('node-sass-middleware')
const flash=require('connect-flash')
const customMware=require('./config/middleware.js')
const cors=require('cors')
const port=8000
//const whitelist = ['http://localhost:5000', 'http://localhost:8000'];
// const corsOptions = {
//   credentials: true, // This is important.
//   origin: (origin, callback) => {
//     console.log('ORIGIN:', origin)
//     if((!origin || whitelist.indexOf(origin) !== -1))
//       return callback(null, true)

//       callback(new Error('Not allowed by CORS'));
//   }
// }
// app.use(cors())

//setup the chat server to be used with socket.io
// app.use((req, res, next)=>{
//     console.log('REQUEST HEADER ORIGIN:', req.header('Origin'))

//     res.setHeader("Access-Control-Allow-Origin",'http://localhost:8000')
//     res.setHeader('Access-Control-Allow-Credentials',true)
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//     next()
// })
const chatServer=require('http').Server(app)
const chatSockets=require('./config/chat_socket').chatSockets(chatServer)
chatServer.listen(5000)
console.log('Chat server listening on port 5000')

//user for session cookie
const session=require('express-session')
const passport=require('passport')
const passportLocal=require('./config/passport-local-strategy')
const passportJwt=require('./config/passport-jwt-strategy')
const passportGoogle=require('./config/passport-google-oauth2-strategy')
const MongoStore=require('connect-mongo');
const { nextTick } = require('process');
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
app.use(passport.initialize())
app.use(passport.session())

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