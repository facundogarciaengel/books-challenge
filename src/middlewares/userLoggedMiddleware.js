const db = require('../database/models');

//  let userLoggedMiddleware = async (req, res, next) => {
//   console.log('PASE por el MIDDLEWARE de USERLOGGED')
//   res.locals.isLogged = false; //bandera para saber si el usuario esta logueado

//   let emailInCookie = req.cookies.userEmail; //busco el email en la cookie

//   // Verificar si emailInCookie tiene un valor antes de realizar la consulta 
//   if(emailInCookie){
//     let userFromCookie = await db.User.findOne({
//       where: {
//         Email: emailInCookie
//       }
//     }); //busco el usuario en la base de datos
   
  
//       if (userFromCookie) {
//           req.session.userLogged = userFromCookie; //si lo encuentro, lo guardo en la session
//           }
  
//       if (req.session && req.session.userLogged) {
//           res.locals.isLogged = true; //si esta logueado, la bandera es true
//           res.locals.userLogged = req.session.userLogged; //guardo el usuario en la variable locals
//           }
//   } 

//     next();

// }

// module.exports = userLoggedMiddleware;

async function userLoggedMiddleware(req,res,next){
res.locals.isLogged = false;
let emailInCookie = req.cookies.userEmail;

console.log('emailInCookie', emailInCookie);
if(emailInCookie){
    let userFromCookie = await db.User.findOne({ 
        where: { 
            Email: emailInCookie 
        }
    });
    console.log('userFromCookie', userFromCookie);
if(userFromCookie){
    req.session.userLogged = userFromCookie;
}
} 

if(req.session && req.session.userLogged){
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
}


next()
}

module.exports = userLoggedMiddleware;