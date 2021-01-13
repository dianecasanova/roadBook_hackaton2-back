const { Router } = require('express');
const express = require('express');
const prisma = require('../prismaClient');

const router = express.Router();

// GET ALL TRIPS
router.get('/', async (req, res) => {
  const trips = await prisma.trip.findMany({
    include: {
      user: true,
    },
  });
  return res.status(200).json(properties);
});

//POST TRIP
router.post('/', async (req, res) => {
  const { title, duration, description, id_user } = req.body;

  try {
    const newTrip = await prisma.trip.create({
      data: {
        title,
        duration,
        description,
        user: {
          connect: {
            id: id_user,
          },
        },
      },
    });
    return res.status(201).json(newTrip);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json(
        `Oops, this user doesn't seem to exist yet, please create a user first`
      );
  }
});

// GET TRIP BY ID
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  prisma.trip
    .findUnique({
      where: {
        id: parseInt(id, 10),
      },
    })
    .then((trip) => {
      if (trip !== null) {
        res.status(200).json(trip);
      }
      next();
    })
    .catch((err) => {
      res.sendStatus(404);
      next(err);
    });
});

//Modifier TRIP
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, duration, description } = req.body;
    const updateTrip = await prisma.trip.update({
      where: {
        id: parseInt(id, 10),
      },
      data: { title, duration, description },
    });

    res.status(200).json(updateTrip);
  } catch (err) {
    next(err);
  }
});

//DELETE TRIP BY ID
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  prisma.trip
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
