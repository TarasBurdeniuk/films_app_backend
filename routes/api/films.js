const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Films = require('../../models/films');

/**
 * Route 'api/films'
 * @description adding new film to data base
 * @method PUT
 * @param {string} title - the title of film
 * @param {number} release - the year of release film
 * @param {array} stars - the list of stars
 * @param {string} format - the format of film
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
      const newFilms = new Films({
        title,
        release,
        stars,
        format,
      });

      const film = await newFilms.save();

      res.json(film);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },
);

/**
 * Route 'api/films'
 * @description get all films
 * @method GET
 * @return all films
 */
router.get('/', async (req, res) => {
  try {
    const films = await Films.find();
    res.json(films);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * Route 'api/films/:id'
 * @description remove film by id
 * @method DELETE
 * @param {string} id - the id of film
 * @return message that film is removed
 */
router.delete('/', async (req, res) => {
  try {
    const { id } = req.query;
    const film = await Films.findById(id);

    if (!film) {
      return res.status(404).json({ msg: 'Film not found' });
    }

    await film.remove();
    res.json({ msg: 'Film removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * Route 'api/films/:id'
 * @description get one film by id
 * @method GET
 * @param {string} id - the id of film
 * @return {object} - one film
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Films.findById(id);

    res.json(film);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * Route 'api/films'
 * @description find film by name and/or star
 * @method POST
 * @param {string} title - the title of film
 * @param {array} star - list of stars
 * @return {array} - list of films
 */
router.post('/', async (req, res) => {
  try {
    const { title, star } = req.body;
    const query = {};

    if (title) {
      query.title = title;
    }
    if (star.length) {
      query.stars = { $in: star };
    }
    const films = await Films.find(query);

    res.json(films);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
