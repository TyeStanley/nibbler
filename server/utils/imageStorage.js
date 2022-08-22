// init multer for photo upload
const multer = require('multer');
// setups up path for for file structure
const path = require('path');

// setups up pathing for multer
    const storage = multer.diskStorage({

        destination: (req, file,cb ) => {
          cb(null, 'public/img')
        },
      
        filename:(req,file,cb) =>{
          console.log(file)
          cb(null, file.originalname)
        }

       
      });
      
   const upload = multer({storage: storage})

module.exports = upload;