import { Prisma, PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// TODO: improve error handling, currently very blunt force -> https://www.prisma.io/docs/reference/api-reference/error-reference
// TODO:  You can UPDATE
// TODO: add filters -> https://www.prisma.io/docs/concepts/components/prisma-client/crud#delete


/* you can POST */
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
});

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
});

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

/* You can READ */
app.get('/expense-type', async (req, res) => {
  const expenseTypes = await prisma.expenseType.findMany()
  res.send(expenseTypes)
});

app.get('/payment-type', async (req, res) => {
  const paymentTypes = await prisma.paymentType.findMany()
  res.send(paymentTypes)
});

app.get('/recipient', async (req, res) => {
  const recipients = await prisma.recipient.findMany()
  res.send(recipients)
});

app.get('/payments', async (req, res) => {
  const payment = await prisma.payment.findMany({
    include: { expenseType: true, paymentType: true, recipient: true }
  })
  res.send(payment)
});

app.get('/payments/:id', async (req, res) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.send(payment)
});

/* You can DELETE */
app.delete('/expense-type/:id', async (req, res) => {
  const deleteItem = await prisma.expenseType.delete({
    where: {
      id: req.params.id,
    },
  });
  res.send(deleteItem);
});

app.delete('/payment-type/:id', async (req, res) => {
  const deleteItem = await prisma.paymentType.delete({
    where: {
      id: req.params.id,
    },
  });
  res.send(deleteItem);
});

app.delete('/recipient/:id', async (req, res) => {
  const deleteItem = await prisma.recipient.delete({
    where: {
      id: req.params.id,
    },
  });
  res.send(deleteItem);
});

app.delete('/payments/:id', async (req, res) => {
  const deleteItem = await prisma.payment.delete({
    where: {
      id: req.params.id,
    },
  });
  res.send(deleteItem);
});

const server  =app.listen(5000, () => 
console.log('Server ready at localhost 5000'))
