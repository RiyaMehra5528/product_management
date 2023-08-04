const multer = require("multer");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
    
      cb(null, file.fieldname + '-' +Date.now()+"-"+file.originalname);
      console.log("FILE UPLOADED")
    }
    
    });
  
   function multerfilter(req,file,cb){
    console.log(file.mimetype);
    if(file.mimetype.split("/")[1]==='jpeg'|| file.mimetype.split("/")[1] === 'png'|| file.mimetype.split("/")[1] === 'jpg')
    {
      cb(null,true);
    
    }
    else{
      cb(new Error("NOT IN FORMAT"),false);
    }
   };

   const upload=multer({storage:storage})

module.exports=upload