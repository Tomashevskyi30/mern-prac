const {Router} = require('express')
const Todo = require('../models/Todo')
const auth = require('../middleware/auth.middleware')

const router = Router()


router.post('/generate',auth,async (req,res)=>{
    try {
        const {text} = req.body
        const todo = new Todo({
            text,owner:req.user.userId
        })
        await todo.save()
        res.status(201).json({todo})
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/delete',auth,async (req,res)=>{
    try {
        const {_id} = req.body
       await Todo.findByIdAndDelete({_id})
        const todos = await Todo.find({ owner: req.user.userId })
        res.status(201).json({todos})
    }catch (e){}
})
router.post('/update',auth,async (req,res)=>{
    try {
        const {_id,text} = req.body
        console.log(_id,text,'info')
        await Todo.findByIdAndUpdate(_id,{text})
        const todos = await Todo.find({ owner: req.user.userId })
        res.status(201).json({todos})
    }catch (e){}
})
router.post('/complete',auth,async (req,res)=>{
    try {
        const {_id,isCompleted} = req.body
        console.log(_id,isCompleted,'info')
        await Todo.findByIdAndUpdate(_id,{isCompleted})
        const todo = await Todo.findOne({ owner: req.user.userId,_id})
        res.status(201).json({todo})
    }catch (e){}
})
router.get('/', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ owner: req.user.userId })
        res.json(todos)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        res.json(todo)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router
