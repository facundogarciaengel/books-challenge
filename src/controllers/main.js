const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

const mainController = {
  home: (req, res) => {
    console.log(req.cookies.userEmail)
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },

  bookDetail: async(req, res) => {
    // Implement look for details in the database
    let book = await db.Book.findByPk(req.params.id, {
      include: [{ association: 'authors' }]
    });
    let user = req.session.userLogged
    console.log('user en bookDetail', user)
    let dataBook = book.dataValues
    let dataAuthor = book.dataValues.authors[0].dataValues
    res.render('bookDetail', {dataBook, dataAuthor});
  },

  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },

  bookSearchResult: async (req, res) => {
    // Implement search by title
    let books = await db.Book.findAll({
      where: {
        title: {
          [Op.like]: `%${req.body.title}%`
        }
      },
      include: [{ association: 'authors' }]
    })
    res.render('search', { books });
  },

  deleteBook: (req, res) => {
    // Implement delete book
    res.render('home');
  },

  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },

  authorBooks: async(req, res) => {
    // Implement books by author
    let authorBooks = await db.Author.findByPk(req.params.id, {
      include: [{ association: 'books' }]
    });
   let booksData = []
    for (book of authorBooks.books){
      booksData.push(book.dataValues)
    } 
    console.log('authorbooks', authorBooks.dataValues.name)
console.log(booksData)
    res.render('authorBooks', { booksData, authorName: authorBooks.dataValues.name});
  },

  register: (req, res) => {
   
   return res.render('register');
  },

  processRegister: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render('register', {
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    }
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },

  login: (req, res) => {
    // Implement login process
  
    return res.render('login');
  },

  processLogin: async (req, res) => {
    // Implemetar el proceso de inicio de sesión
  
    // Buscar el usuario en la base de datos por correo electrónico
    let userToLogin = await db.User.findOne({
      where: {
        Email: req.body.email
      }
    });
    // Imprimir en la consola el usuario encontrado (o null si no se encuentra)
    console.log('loginprocss usertoLogin', userToLogin);
  
    // Verificar si el usuario existe
    if (userToLogin) {
      // Comparar la contraseña ingresada con la almacenada en la base de datos
      let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.Pass);
  
      // Si la contraseña es correcta
      if (passwordOk) {
        // Eliminar la contraseña del objeto antes de almacenar en la sesión
        delete userToLogin.Pass;
  
        // Guardar el usuario en la sesión
        req.session.userLogged = userToLogin;
        console.log(req.session.userLogged);
  
        // Si el usuario marcó la casilla "remember_user"
        if (req.body.remember_user) {
          // Guardar la cookie con el correo electrónico por 20 minutos
          res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 });
        }
  
        // Redirigir al usuario a la página de inicio
        return res.redirect('/');
      } else {
        // Si la contraseña es incorrecta, renderizar la página de inicio de sesión con un mensaje de error
        return res.render('login', {
          errors: {
            email: {
              msg: 'Las credenciales son inválidas'
            }
          }
        });
      }
    }
  
    // Si el usuario no existe, renderizar la página de inicio de sesión con un mensaje de error
    return res.render('login', {
      errors: {
        email: {
          msg: 'No se encuentra este correo electrónico en nuestra base de datos'
        }
      }
    });
  },
  
  logout: (req, res) => {
    // Implement logout process
    res.clearCookie('userEmail') //borro la cookie
    req.session.destroy() //destruyo la session
    console.log('logout')
   return res.redirect('/');
  },

  edit: (req, res) => {
    // Implement edit book
    res.render('editBook', {id: req.params.id})
  },

  processEdit: (req, res) => {
    // Implement edit book
    res.render('home');
  }
};

module.exports = mainController;
