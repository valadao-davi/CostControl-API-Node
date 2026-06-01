const express = require('express')
const router = express.Router()

const prisma = require('../prisma')


router.get('/', async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      include: {
        category: true
      }
    })

    res.json(expenses)

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const expense = await prisma.expense.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        category: true
      }
    })

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      })
    }

    res.json(expense)

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

router.get('/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params

    const expenses = await prisma.expense.findMany({
      where: {
        categoryId: Number(categoryId)
      },
      include: {
        category: true
      }
    })

    res.json(expenses)

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const {
      description,
      value,
      date,
      categoryId
    } = req.body

    const result = await prisma.expense.create({
      data: {
        description,
        value,
        date: new Date(date),
        categoryId: Number(categoryId)
      }
    })

    res.status(201).json(result)

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const {
      description,
      value,
      date,
      categoryId
    } = req.body

    const result = await prisma.expense.update({
      where: {
        id: Number(id)
      },
      data: {
        description,
        value,
        date: new Date(date),
        categoryId: Number(categoryId)
      }
    })

    res.json(result)

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.expense.delete({
      where: {
        id: Number(id)
      }
    })

    res.json({
      message: 'Deleted.'
    })

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

module.exports = router