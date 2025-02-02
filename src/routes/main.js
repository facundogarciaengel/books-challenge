const express = require('express');
const mainController = require('../controllers/main');
const validations = require('../middlewares/validateRegisterMiddleware')
const guest = require('../middlewares/guestMiddleware')

const router = express.Router();

router.get('/', mainController.home);
router.get('/books/detail/:id', mainController.bookDetail);
router.get('/books/search', mainController.bookSearch);
router.post('/books/search', mainController.bookSearchResult);
router.get('/authors', mainController.authors);
router.get('/authors/:id/books', mainController.authorBooks);
router.get('/users/register' ,guest ,mainController.register);
router.post('/users/register',validations ,mainController.processRegister);
router.get('/users/login',guest ,mainController.login);
 router.post('/users/login', mainController.processLogin);
router.get('/users/logout', mainController.logout);
router.delete('/books/delete/:id', mainController.deleteBook);
router.put('/books/restore/:id', mainController.restoreBook);
router.get('/books/edit/:id', mainController.edit);
router.put('/books/edit/:id', mainController.processEdit);

module.exports = router;
