import { Prisma, PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// TODO: improve error handling, currently very blunt force
// https://www.prisma.io/docs/reference/api-reference/error-reference

/* you can add a new expense type */
app.post('/expense-type', async (req, res) => {
  const { label } = req.body
  
  try {
    const result = await prisma.expenseType.create({
      data: {
        label
      }
    })
    res.json(result)
  } catch (error) {
    let errorResponse;
    if (error instanceof Prisma.PrismaClientValidationError) {
      errorResponse = 'Missing field make sure label exists'
    } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      errorResponse = 'Expense type already exists'
    } else {
      errorResponse = 'Something has gone wrong'
    }
    res.json(errorResponse)
  } 
})

/* you can get expense types */
app.get('/expense-type', async (req, res) => {
  const expenseTypes = await prisma.expenseType.findMany()
  res.send(expenseTypes)
})

/* you can add a new payment type */
app.post('/payment-type', async (req, res) => {
  const { label } = req.body
  try {
    const result = await prisma.paymentType.create({
      data: {
        label
      }
    })
    res.json(result)
  } catch (error) {
    let errorResponse;
    if (error instanceof Prisma.PrismaClientValidationError) {
      errorResponse = 'Missing field make sure label exists'
    } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      errorResponse = 'Payment type already exists'
    } else {
      errorResponse = 'Something has gone wrong'
    }
    res.json(errorResponse)
  }  
})

/* you can get payment types */
app.get('/payment-type', async (req, res) => {
  const paymentTypes = await prisma.paymentType.findMany()
  res.send(paymentTypes)
})

/* you can add a new recipient */
app.post('/recipient', async (req, res) => {
  const { name } = req.body
  try {
    const result = await prisma.recipient.create({
      data: {
        name
      }
    })
    res.json(result)
  } catch (error) {
    let errorResponse;
    if (error instanceof Prisma.PrismaClientValidationError) {
      errorResponse = 'Missing field make sure label exists'
    } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      errorResponse = 'Payment type already exists'
    } else {
      errorResponse = 'Something has gone wrong'
    }
    res.json(errorResponse)
  } 
})

/* you can get recipients */
app.get('/recipient', async (req, res) => {
  const recipients = await prisma.recipient.findMany()
  res.send(recipients)
})

/* you can add a new payment */
app.post('/payment', async (req, res) => {
  const { expenseTypeId, paymentTypeId, recipientId, date, paidTo, amount } = req.body
  try {
    const result = await prisma.payment.create({
      data: {
        expenseType:  { connect: { id: expenseTypeId } },
        paymentType:  { connect: { id: paymentTypeId } },
        date,
        recipient: { connect: { id: recipientId }},
        amount
      }
    })
    res.json(result)
  } catch (error) {
    let errorResponse;
    if (error instanceof Prisma.PrismaClientValidationError) {
      errorResponse = 'Missing field(s))'
    } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      errorResponse = error.meta
    } else {
      console.log(error)
      errorResponse = 'Something has gone wrong'
    }
    res.json(errorResponse)
  } 
})

/* You can get all payments */
app.get('/payments', async (req, res) => {
  const payment = await prisma.payment.findMany({
    include: { expenseType: true, paymentType: true, recipient: true }
  })
  res.send(payment)
})

/* TODO: you can update an existing payment */

/* TODO: you can delete a payment */

/* TODO: add filters see https://www.prisma.io/docs/concepts/overview/prisma-in-your-stack/rest */
/* TODO: get a specific item see https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-express/src/index.ts */


const server  =app.listen(5000, () => 
console.log('Server ready at localhost 5000'))
