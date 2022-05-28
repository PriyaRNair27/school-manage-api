const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")
var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS" ); 
    next(); });

var schoolmodel=Mongoose.model("schools",
new Mongoose.Schema({
    admin:String,
    rollno:String,
    name:String,
    clas:String,
    parentname:String,
    mobile:String,
    address:String

}))
var facultymodel=Mongoose.model("faculties",
new Mongoose.Schema({
   
    name:String,
    education:String,
    mobile:String,
    address:String,
    pincode:String,
    district:String

}))
Mongoose.connect("mongodb+srv://mzcbook:807826@cluster0.2sbk9.mongodb.net/schoolDb")
app.post("/api/studentdelete",(req,res)=>{
    var getId=req.body
    schoolmodel.findByIdAndRemove(getId,(error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
          res.send({"status":"success","data":data})
        }
    })
})
app.post("/api/studentsearch",(req,res)=>{
    var getadmin=req.body
    schoolmodel.find(getadmin,(error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
          res.send({"status":"success","data":data})
        }
    })
    })




app.post("/api/facultydelete",(req,res)=>{
    var getId=req.body
    facultymodel.findByIdAndRemove(getId,(error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
          res.send({"status":"success","data":data})
        }
    })
})
app.post("/api/facultysearch",(req,res)=>{
    var getname=req.body
    facultymodel.find(getname,(error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
          res.send({"status":"success","data":data})
        }
    })
    })


app.post("/api/schoolmanage",(req,res)=>
{
    var getadmin=req.body.admin
    var getrollno=req.body.rollno
    var getname=req.body.name
    var getclas=req.body.clas
    var getparentname=req.body.parentname
    var getmobile=req.body.mobile
    var getaddress=req.body.address
    data={"admin":getadmin,"rollno":getrollno,"name":getname,"clas":getclas,"parentname":getparentname,"mobile":getmobile,"address":getaddress}
 let myschool=new schoolmodel(data)
 myschool.save((error,data)=>{
     if(error)
     {
         res.send({"status":"error","data":error})
     }
     else
     {
         res.send({"status":"success","data":data})
     }

 })
})
app.post("/api/facultymanage",(req,res)=>
{
    var data=req.body
 let facul=new facultymodel(data)
 facul.save((error,data)=>{
     if(error)
     {
         res.send({"status":"error","data":error})
     }
     else
     {
         res.send({"status":"success","data":data})
     }

 })
})



app.get("/api/school",(req,res)=>
{

        schoolmodel.find(
            (error,data)=>{
                if(error)
         {
             res.send({"status":"error","data":error})
         }
         else
         {
             res.send({"status":"success","data":data})
         }
    
                
            }
        )
    })


app.get("/api/faculty",(req,res)=>
{
        facultymodel.find(
            (error,data)=>{
                if(error)
         {
             res.send({"status":"error","data":error})
         }
         else
         {
             res.send({"status":"success","data":data})
         }
    
                
            }
        )

})
app.listen(5000,()=>{
    console.log("server running")
})