const { Router } = require('express');
const jwt = require('jsonwebtoken');
const express = require('express');
const prisma = require('../prismaClient');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //Check if this user exists in database
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(404);
      throw new Error('User does not exists');
    }

    //if yes, continue by comparing both password

    if (password !== user.password) {
      res.status(401);
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.SECRET,
      {
        expiresIn: '2h',
      }
    );
    res.status(200).json({
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
