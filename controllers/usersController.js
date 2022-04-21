const bcrypt = require('bcrypt');
const saltRounds = 10;
const User =require('../models/users')
const Sensor =require('../models/sensors')
const ObjectsToCsv = require('objects-to-csv')
const fs = require('fs');
const stringify = require('csv-stringify');
const { Parser } =require('json2csv');
module.exports ={
    getroom: async (req,res)=>{
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
        const rooms={
                email:req.body.room}
        const observers={
                email:req.body.email}
        
        User.findOneAndUpdate(
            {email:req.body.room},
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
                        {$push : {rooms:rooms}},
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
            if((req.body.status === "room") && (!err)){
                const room = new Sensor({
                    email: req.body.email,
                    name: req.body.name
                })
                room.save((err,results)=>{
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
        let data="ppm,date\n";
        user.sensorData.forEach(el => {
            data+=el.ppm+","+el.date.toISOString().replace(/T/, ' ').replace(/\..+/, '') +"\n"
        });

          console.log(data);
          res.header('Content-Type', 'text/csv');
          res.header('Access-Control-Allow-Origin','*');
          res.attachment(`${user.name}.csv`);
          return res.send(data);      
    },
    get_list_room: async (req,res)=>{
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
            user.rooms.forEach(element => {
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