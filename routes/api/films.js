const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const Films = require('../../models/films');

/**
 * Route 'api/films'
 * @description add new film to db
 * @method put
 * @return new added film
 */
router.put(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('release', 'Release is required, must be number').not().isEmpty(),
    check('stars', 'stars is required').not().isEmpty(),
    check('format', 'Format is require').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, release, stars, format } = req.body;

    try {
      const newFilms = new Films({ title, release, stars, format });

      const film = await newFilms.save();

      res.json(film);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },
);

module.exports = router;
