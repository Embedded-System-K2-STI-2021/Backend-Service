const Sensor =require('../models/sensors')
const User = require('../models/users')
const nodemailer = require('nodemailer')
let transport = nodemailer.createTransport({
  host: "smtp.pepipost.com",
  port: 25,
  auth: {
    user: "rahmatwibowoitb",
    pass: "rahmatwibowoitb_b52152c0b476575a5be41f4411550d47"
  }
});
module.exports ={
    insert: async (req,res)=>{
        const sensordata={
            ppm:req.body.ppm,
        }
        const room= await User.findOne({email:req.body.email})
         Sensor.findOneAndUpdate(
            {email:req.body.email},
            {$push : {sensorData:sensordata}},
             (err,result)=>{
                if(err){
                    res.status(400).json({
                        status: "FAILED",
                        message: err
                    })
                }
                else{
                    return result;
                }
                
            })
            if(req.body.ppm < 1000){
            }
            else{
                
                for(let i=0;i<room.observers.length;i++){
            let message={
                from:'embedded@pepisandbox.com',
                to:room.observers[i].email,
                subject:'PPM is not normal',
                html:`<!DOCTYPE html><html lang="en"><head><title>Lupa kata sandi akun</title><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style type="text/css"> #outlook a{padding:0;} .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} body, table, td, a{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} img{-ms-interpolation-mode:bicubic;} body{margin:0; padding:0;} img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;} table{border-collapse:collapse !important;} body{height:100% !important; margin:0; padding:0; width:100% !important;} .appleBody a {color:#68440a; text-decoration: none;} .appleFooter a {color:#999999; text-decoration: none;} @media screen and (max-width: 525px) { table[class="wrapper"]{ width:100% !important; } td[class="logo"]{ text-align: left; padding: 20px 0 20px 0 !important; } td[class="logo"] img{ margin:0 auto!important; } td[class="mobile-hide"]{ display:none;} img[class="mobile-hide"]{ display: none !important; } img[class="img-max"]{ max-width: 100% !important; height:auto !important; } table[class="responsive-table"]{ width:100%!important; } td[class="padding"]{ padding: 10px 5% 15px 5% !important; } td[class="padding-copy"]{ padding: 10px 5% 10px 5% !important; text-align: center; } td[class="padding-meta"]{ padding: 30px 5% 0px 5% !important; text-align: center; } td[class="no-pad"]{ padding: 0 0 20px 0 !important; } td[class="no-padding"]{ padding: 0 !important; } td[class="section-padding"]{ padding: 50px 15px 50px 15px !important; } td[class="section-padding-bottom-image"]{ padding: 50px 15px 0 15px !important; } td[class="mobile-wrapper"]{ padding: 10px 5% 15px 5% !important; } table[class="mobile-button-container"]{ margin:0 auto; width:100% !important; } a[class="mobile-button"]{ width:80% !important; padding: 15px !important; border: 0 !important; font-size: 16px !important; } }</style></head><body style="margin: 0; padding: 0;"><!-- HEADER --><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td bgcolor="#ffffff"> <div align="center" style="padding: 0px 15px 0px 15px;"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="wrapper"> <!-- LOGO/PREHEADER TEXT --> <tr> <td style="padding: 20px 0px 30px 0px;" class="logo"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" width="100" align="left"><img alt="Logo" src="https://pbs.twimg.com/profile_images/1258982865380896768/75hSx09s_400x400.jpg" width="60" height="78" style="display: block;" border="0"></td> <td bgcolor="#ffffff" width="100" align="right"><img alt="Logo" src="https://avatars.githubusercontent.com/u/8663791?s=280&v=4" width="60" height="78" style="display: block;" border="0"></td> <!-- https://kaderisasi.salmanitb.com/themes/eventr/assets/img/logo-header.png --> </tr> </table> </td> </tr> </table> </div> </td> </tr></table><!-- ONE COLUMN SECTION --><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 70px 15px;" class="section-padding"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="responsive-table"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <!-- HERO IMAGE --> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tbody> <tr> <td class="padding-copy"> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/48935/responsive-email.jpg" width="500" height="200" border="0" alt="Verify" style="display: block; width: 500px; height: 200px;" class="img-max"> <!-- https://kaderisasi.salmanitb.com/themes/eventr/assets/img/responsive-email.jpg --> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td> <!-- COPY --> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td align="center" style="font-size: 25px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding-copy">Kondisi Darurat</td> </tr> <tr> <td align="center" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Ruangan dengan email <b>${req.body.email}</b> memiliki tingkat PPM yang tidak normal. Harap segera hubungi rumah sakit terdekat</td> </tr> </table> </td> </tr> <tr> <td> <!-- BULLETPROOF BUTTON --> <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mobile-button-container"> <tr> <td align="center" style="padding: 25px 0 0 0;" class="padding-copy"> <table border="0" cellspacing="0" cellpadding="0" class="responsive-table"> <tr> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr></table><!-- FOOTER --><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td bgcolor="#ffffff" align="center"> <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center"> <tr> <td style="padding: 20px 0px 20px 0px;"> <!-- UNSUBSCRIBE COPY --> <table width="500" border="0" cellspacing="0" cellpadding="0" align="center" class="responsive-table"> <tr> <td align="center" valign="middle" style="font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:#666666;"> <span class="appleFooter" style="color:#666666;">Embedded System </span><br> </td> </tr> </table> </td> </tr> </table> </td> </tr></table></body></html>`
            };
            transport.sendMail(message,(err,info)=>{
                if(err){
                    res.status(400).json({
                        status: "FAILED",
                        message: err
                    })
                }
                
            })}}
            res.status(200).json({
                status: "SUCCESS",
                message: "Data successfully sent"
            })
        
      
    }
}