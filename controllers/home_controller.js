module.exports.home=function(req, res){
    // console.log(`Res session: ${res.user.id}`)
    console.log(`REQ.cookies in home:`,req.cookies)
    return res.render('home', {title:'Home'})
}