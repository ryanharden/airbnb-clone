const router = require('express').Router();
const { setTokenCookie } = require('../../utils/auth.js');
const { restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require("./spots");
const reviewsRouter = require("./reviews");
const bookingsRouter = require("./bookings");
const spotImagesRouter = require("./spot-images");
const reviewImagesRouter = require("./review-images");

// GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

// GET /api/restore-user

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use("/spots", spotsRouter);

router.use("/reviews", reviewsRouter);

router.use("/bookings", bookingsRouter);

router.use("/spot-images", spotImagesRouter);

router.use("/review-images", reviewImagesRouter);

// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

module.exports = router;
