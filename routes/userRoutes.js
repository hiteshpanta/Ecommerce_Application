import express from 'express'
import { getUser } from '../controller/userController.js';
// import { notAllowed } from '../utils/notAllowed.js';

const router = express.Router();

// router.route('/api/users/login').post().all(notAllowed);
// router.route('/api/users/register').post().all(notAllowed)

router.route('/api/users/:id').get(getUser)

export default router;