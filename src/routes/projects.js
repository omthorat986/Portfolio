const express = require('express');
const { getProjects } = require('../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const projects = await getProjects();

    return res.status(200).json({
      data: projects,
      meta: {
        count: projects.length
      }
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
