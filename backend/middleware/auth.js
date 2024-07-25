const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const headers = req.headers[`auth`]
  console.log(headers);
   
  if(!headers || !headers.startsWith('Bearer ')){
      return res.status(401).json({ message: 'Unauthorized: Missing or malformed access token' })
  }

  const token = headers.split(' ')[1];

  if(!token){
      res.status(404).json({message:"No Token Found"})
  }
   jwt.verify(token, process.env.SECRET_KEY, (err)=>{
         if(err){
          return res.status(400).json({message: "Invalid Token"})
         }

   })
   next();
  }
module.exports = authentication;