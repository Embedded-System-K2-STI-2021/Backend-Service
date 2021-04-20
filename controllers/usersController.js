const User =require('../models/users')
const Sensor =require('../models/sensors')
module.exports ={
    getpatient: async (req,res)=>{
            const result=[]
            const user =  await User.findOne({email:req.body.email},(err,result)=>{
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
                        data:result.patients
                    })
                }
                
            })
        


    },
    addObserver:async (req,res)=>{
        const patients={
                email:req.body.patient}
        
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
                        data:result
                    })
                }
            })

    } ,
    create: async (req,res)=>{
        const user =new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
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

      
    }
}