const bcrypt = require('bcrypt');
const saltRounds = 10;
const User =require('../models/users')
const Sensor =require('../models/sensors')
const ObjectsToCsv = require('objects-to-csv')
const fs = require('fs');
const stringify = require('csv-stringify');
const { Parser } =require('json2csv');
module.exports ={
    getpatient: async (req,res)=>{
            const result=[]
            const user =  await Sensor.findOne({email:req.params.email},(err,result)=>{
                if(err){
                    res.status(400).json({
                        status: "FAILED",
                        message: err
                    })
                }
                else{
                    res.status(200).json({
                        status:"SUCCESS",
                        message:"User Successfully created",
                        data:result
                    })
                }
                
            })
        


    },
    addObserver:async (req,res)=>{
        const patients={
                email:req.body.patient}
        const observers={
                email:req.body.email}
        
        User.findOneAndUpdate(
            {email:req.body.patient},
            {$push : {observers:observers}},
             (err,result)=>{
                if(err){
                    res.status(400).json({
                        status: "FAILED",
                        message: err
                    })
                }
                else{
                    User.findOneAndUpdate(
                        {email:req.body.email},
                        {$push : {patients:patients}},
                         (err,result)=>{
                            if(err){
                                res.status(400).json({
                                    status: "FAILED",
                                    message: err
                                })
                            }
                            else{
                                res.status(200).json({
                                    status:"SUCCESS",
                                    message:"User Successfully created",
                                })
                            }
                        })
                }
                
            })
         

    } ,
    create: async (req,res)=>{
        const password = req.body.password;    
        const encryptedPassword = await bcrypt.hash(password, saltRounds)
        const user =new User({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPassword,
            status:req.body.status,
            
        })
        await user.save((err,result)=>{
            if((req.body.status === "patient") && (!err)){
                const patient = new Sensor({
                    email: req.body.email,
                    name: req.body.name
                })
                patient.save((err,results)=>{
                    if(err){
                        res.status(400).json({
                            status: "FAILED",
                            message: err
                        })
                    }
                    else{
                        res.status(200).json({
                            status:"SUCCESS",
                            message:"User Successfully created",
                            data:result
                        })
                    }
                })
            }
            else{
                if(err){
                    res.status(400).json({
                        status: "FAILED",
                        message: err
                    })
                }
                else{
                    res.status(200).json({
                        status:"SUCCESS",
                        message:"User Successfully created",
                        data:result
                    })
                }
            }
            
        })

      
    },
    login: async (req,res)=>{
        const password = req.body.password;    
        const user =  await User.findOne({email:req.body.email},(err,result)=>{
            if(err){
                return (res.status(400).json({
                    status: "FAILED",
                    message: "email is not registered"
                }))
            }
            
            
        })
        if(!user){
            
                return (res.status(400).json({
                    status: "FAILED",
                    message: "email is not registered"
                }))
            
        }
        const comparison = await bcrypt.compare(password, user.password)
                if(!comparison){
                    res.status(400).json({
                        status: "FAILED",
                        message: "email and password didn't match"
                    })  
                }
                else{
                    res.status(200).json({
                        status: "SUCCESS",
                        message: "user is successfully login",
                        data:user
                    })
                }

      
    },
    generateCSV: async(req,res)=>{
        const user =  await Sensor.findOne({email:req.params.email},(err,result)=>{
            if(err){
                res.status(400).json({
                    status: "FAILED",
                    message: "email is not registered"
                })
            }
            else{
                return result;
            }
            
            
        })
        console.log(user.sensorData)
        let data="spo2,bpm,date\n";
        user.sensorData.forEach(el => {
            data+=el.spo2+","+el.bpm+","+el.date.toISOString().replace(/T/, ' ').replace(/\..+/, '') +"\n"
        });

          console.log(data);
          res.header('Content-Type', 'text/csv');
          res.header('Access-Control-Allow-Origin','*');
          res.attachment(`${user.name}.csv`);
          return res.send(data);      
    },
    get_list_patient: async (req,res)=>{
        const result=[]
        console.log(req.query.email)
        const user =  await User.findOne({email:req.query.email},(err,result)=>{
            if(err){
                return res.status(400).json({
                    status: "FAILED",
                    message: err
                })
            }
            
            
        })
        if(user){
            user.patients.forEach(element => {
                result.push(element.email)
            });
            return res.status(200).json({
                status:"SUCCESS",
                message:"User Successfully created",
                data:result
            })
        }
        return res.status(400).json({
            status: "FAILED"
        })


},
}