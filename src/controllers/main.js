const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

const mainController = {
  home: (req, res) => {
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
    // Implement login process
    let userToLogin = await db.User.findOne({where : {Email: req.body.email}}) //busco el usuario en la base de datos por email 
    if(userToLogin){ //si existe el usuario
      let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.Pass) //comparo la contraseña ingresada con la de la base de datos
      if(passwordOk){ //si la contrase;a es correcta
        delete userToLogin.Pass //borro la contrase;a del objeto
        req.session.userLogged = userToLogin //guardo el usuario en la session
        console.log(req.session.userLogged)
        if(req.body.remember_user){ //si el usuario tildo el checkbox
       res.cookie('userEmail' , req.body.email, {maxAge: (1000* 60) * 20 }) //guardo la cookie con el email por 20 minutos 
    }
    res.redirect('/') //redirijo a la home
      } else {
        res.render('login', {errors: {
          email: {
            msg: 'Las credenciales son invalidas'
          }
        }})
      }
    }

  },

  logout: (req, res) => {
    // Implement logout process
    res.clearCookie('userEmail') //borro la cookie
    req.session.destroy() //destruyo la session
    res.redirect('/');
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
