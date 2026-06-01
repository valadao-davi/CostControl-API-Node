const express = require('express')
const router = express.Router()
const prisma = require('../prisma')


router.get('/', async (req, res) => {
  const categories = await prisma.category.findMany()
  res.json(categories)
})

router.post('/', async (req, res) => {
  const { name } = req.body
  const result = await prisma.category.create({data: {name: name}})
  res.json(result)
})

router.put('/:id', async (req, res) => {
  const { name } = req.body
  const { id } = req.params
  const result = await prisma.category.update({ 
    where: {
       id: Number(id)
    },  
    data: {
        name
    }
  }
  )
  res.json(result)
})


router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await prisma.category.delete({where: {
    id: Number(id)
  }})
  res.json({ message: 'Deleted.' })
})

module.exports = router