const passport = require('passport')


const isStaff = async function(req, res, next){
  try{
    let userRoles = [];
    if(req.user){
      req.user.roles.forEach(role => {
        userRoles.push(role.name)
      })
    }
     if(!userRoles.includes("staff")){
       return res.status(401).send({
         message: 'Access denied'
       })
     }
    next()
  }catch (error){
    return res.status(401).json({message: "Access denied"})
  }
  
}

const isStudent = async function(req, res, next) {
  try {
    let userRoles = [];
    if (req.user) {
      req.user.roles.forEach(role => {
        userRoles.push(role.name)
      })
    }
    if (!userRoles.includes("student")) {
      return res.status(401).send({
        message: 'Access denied'
      })
    }
    next()
  } catch (error) {
    return res.status(401).json({message: "Access denied"})
  }
}

const isInstructor = async function(req, res, next) {
  try {
    let userRoles = [];
    if (req.user) {
      req.user.roles.forEach(role => {
        userRoles.push(role.name)
      })
    }
    if (!userRoles.includes("student")) {
      return res.status(401).send({
        message: 'Access denied'
      })
    }
    next()
  } catch (error) {
    return res.status(401).json({message: "Access denied"})
  }
}




module.exports = {
  isStaff,
  isStudent,
  isInstructor
};


