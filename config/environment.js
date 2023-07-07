const fs=require('fs')
const rfs=require('rotating-file-stream')
const path=require('path')

const logDirectory=path.join(__dirname, '../production_logs')

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream=rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
})

const development={
    name:'',
    port:8000,
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codial_development',
    smtp:{},
    google_client_id: "672768157038-e945e0usin7rga7bs4pbtedl8tckbf84.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "https://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production={
    name:'',
    asset_path:'',
    session_cookie_key:'',
    db:'',
    smtp:{},
    google_client_id:'',
    google_client_secret:'',
    google_call_back_url:'',
    jwt_secret:'',
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports=eval(process.env.CODEIAL_ENVIRONMENT==undefined?development:eval(process.env.CODEIAL_ENVIRONMENT))