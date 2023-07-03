const nodeMailer=require('../config/nodemailer')

//another way of exporting a method
exports.newComment=(comment)=>{
    console.log('Inside newComment mailer:', comment.user.email)

    let htmlString=nodeMailer.renderTemplate({
        comment: comment},
        '/comments/new_comment.ejs')
        
    nodeMailer.transporter.sendMail({
        from: 'shivam.kesarwani001@gmail.com',
        to: comment.user.email,
        subject: 'New comment published!',
        html: htmlString
    },(err, info)=>{
        if(err){
            console.log('Error in sending mail:', err)
            return
        }
        console.log('Mail sent:', info)
        return;
    });
}

// module.exports=newComment

