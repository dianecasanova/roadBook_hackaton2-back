const { Router } = require('express');
const express = require('express');
const prisma = require('../prismaClient');

const router = express.Router();

//GET ALL STEPS
router.get('/', async (req, res) => {
  const steps = await prisma.step.findMany({
    include: {
      trip: true,
    },
  });
  return res.status(200).json(steps);
});

//GET STEP BY ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  prisma.step
    .findUnique({
      where: {
        id: parseInt(id, 10),
      },
    })
    .then((step) => {
      if (step !== null) {
        res.status(200).json(step);
      }
      next();
    })
    .catch((err) => {
      res.sendStatus(404);
      next(err);
    });
});

//POST STEP
router.post('/', async (req, res) => {
  const { city, duration, description, media_path, id_trip } = req.body;

  try {
    const newStep = await prisma.step.create({
      data: {
        city,
        duration,
        description,
        media_path,
        trip: {
          connect: {
            id: id_trip,
          },
        },
      },
    });
    return res.status(201).json(newStep);
  } catch (err) {
    return res
      .status(400)
      .json(
        `Oops, this step doesn't seem to exist yet, please create a user first`
      );
  }
});

//MODIFIER STEP
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { city, duration, description, media_path } = req.body;
    const updateStep = await prisma.step.update({
      where: {
        id: parseInt(id, 10),
      },
      data: { city, duration, description, media_path },
    });
    res.status(200).json(updateStep);
  } catch (err) {
    next(err);
  }
});

//DELETE STEP BY ID
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  prisma.step
    .delete({
      where: {
        id: parseInt(id, 10),
      },
    })
    .then(() => {
      res.status(204);
    })
    .catch((err) => {
      res.sendStatus(404);
      next(err);
    });
});

module.exports = router;
