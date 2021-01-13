const { Router } = require('express');
const express = require('express');
const prisma = require('../prismaClient');

const router = express.Router();

// GET ALL USERS
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      trip: true,
    },
  });
  return res.status(200).json(users);
});

// GET USER BY ID
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  prisma.user
    .findUnique({
      where: {
        id: parseInt(id, 10),
      },
    })
    .then((user) => {
      if (user !== null) {
        res.status(200).json(user);
      }
      next();
    })
    .catch((err) => {
      res.sendStatus(404);
      next(err);
    });
});

//POST USER
router.post('/', (req, res, next) => {
  const data = req.body;

  prisma.user
    .create({
      data: { ...data },
    })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.sendStatus(400);
      next(err);
    });
});

//Modifier USER
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, password } = req.body;
    const updateUser = await prisma.user.update({
      where: {
        id: parseInt(id, 10),
      },
      data: { firstname, lastname, email, password },
    });

    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
});

//DELETE USER BY ID
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  prisma.user
    .delete({
      where: {
        id: parseInt(id, 10),
      },
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(404);
      next(err);
    });
});

module.exports = router;
