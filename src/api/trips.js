const express = require('express');
const prisma = require('../prismaClient');

const router = express.Router();

// MAIN TRIP
router.get('/', async (req, res) => {
  const trips = await prisma.trip.findMany({
    include: {
      step: true,
    },
  });
  return res.status(200).json(trips);
});

// FILTER TRIPS BY ID
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  const trip = await prisma.trip.findUnique({
    where: {
      id: +id,
    },
    include: {
      step: true,
    },
  });
  if (!trip) {
    return next();
  }
  return res.status(200).json(trip);
});

// ADD A NEW TRIP
router.post('/', async (req, res) => {
  const { title, duration, description } = req.body;

  try {
    const newTrip = await prisma.trip.create({
      data: {
        title,
        duration,
        description,
      },
    });
    return res.status(201).json(newTrip);
  } catch (err) {
    return res
      .status(400)
      .json(
        `Oops, this trip doesn't seem to exist yet, please create a trip first`
      );
  }
});

// DELETE A TRIP
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  await prisma.trip.delete({
    where: {
      id: +id,
    },
  });
  if (!id) {
    return next();
  }
  return res.sendStatus(200);
});

// MODIFY A TRIP
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, duration, description, id_user } = req.body;

  const updateTrip = await prisma.trip.update({
    where: {
      id: +id,
    },
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
  res.status(200).json(updateTrip);
});

module.exports = router;
