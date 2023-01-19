const express =  require('express');
const authRouter = express.Router();
const {signup,login,list,customer,removeCustomer,updateCustomer,customerSchduler} = require('../controller/authcontrol')

authRouter.post('/signup',signup);

authRouter.post('/login',login);
authRouter.post('/customer',customer);
authRouter.get('/customer-list' ,list);
authRouter.delete('/remove-customer/:id',removeCustomer);
authRouter.put('/update-customer/:id',updateCustomer);
authRouter.post('/customer-scheduler',customerSchduler);

module.exports = authRouter

