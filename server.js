require('dotenv').config() // já está no topo, ok!

const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const categoryRoutes = require('./src/routes/category')
const expenseRoutes = require('./src/routes/expense')

app.use('/categories', categoryRoutes)
app.use('/expenses', expenseRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})