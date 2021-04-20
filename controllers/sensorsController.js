const Sensor =require('../models/sensors')

module.exports ={
    insert: async (req,res)=>{
        const sensordata={
            spo2:req.body.spo2,
            bpm:req.body.bpm
        }
        await Sensor.findOneAndUpdate(
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
                    res.status(200).json({
                        status:"SUCCESS",
                        message:"User Successfully created",
                        data:result
                    })
                }
            })
        
      
    }
}