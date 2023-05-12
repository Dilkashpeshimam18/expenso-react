const express=require('express')
const router=express.Router()
const {authenticate}=require('../middleware/auth.js')
const incomeController=require('../controllers/income.js')

router.get('/get-userDetail',authenticate,incomeController.getUserDetail)
router.post('/add-income',authenticate,incomeController.addIncome)
router.post('/edit-income',authenticate,incomeController.editUserIncome)

module.exports=router
