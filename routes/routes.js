const Router = require('express')
const { signup, getAll, getOne, deleteOne, login, updateOneUser } = require('../controllers/ctrl')
const { addProduct, getAllProducts, getOneProduct, uploadImage, updateProduct, deleteProduct } = require('../controllers/product_ctrl')
const { addStore, getAllStores, getOneStore } = require('../controllers/stores_ctrl')
const router = Router()


//USERS
router.post('/signup', signup)
router.post('/login', login)
router.get('/getAll', getAll)
router.get('/getOne/:id', getOne)
router.delete('/deleteOne/:id', deleteOne)
router.put('/updateOneUser/:id', updateOneUser)

//PRODUCTS
router.post('/addProduct',uploadImage, addProduct)
router.get('/getAllProducts',getAllProducts)
router.get('/getOneProduct', getOneProduct)
router.put('/updateProduct/:id', updateProduct);
router.patch('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);

//STORES
router.post('/addStore', addStore)
router.get('/getAllStores', getAllStores)
router.get('/getOneStore/:id', getOneStore)



module.exports = router