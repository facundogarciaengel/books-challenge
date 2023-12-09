// const db = require('../database/models');

// async function userLoggedMiddleware(req, res, next) {
//   res.locals.isLogged = false; //bandera para saber si el usuario esta logueado

//   let emailInCookie = req.cookies.userEmail; //busco el email en la cookie
//   console.log(emailInCookie)
//   let userFromCookie = await db.User.findOne({
//     where: {
//       Email: emailInCookie
//     }
//   }); //busco el usuario en la base de datos
//   console.log(userFromCookie)

//     if (userFromCookie) {
//         req.session.userLogged = userFromCookie; //si lo encuentro, lo guardo en la session
//         }

//     if (req.session && req.session.userLogged) {
//         res.locals.isLogged = true; //si esta logueado, la bandera es true
//         res.locals.userLogged = req.session.userLogged; //guardo el usuario en la variable locals
//         }

//     next();

// }

// module.exports = userLoggedMiddleware;

  