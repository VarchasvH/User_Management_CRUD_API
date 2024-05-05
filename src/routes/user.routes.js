import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// ! register route
router.route('/register').post(
  // Middleware using multer
  upload.fields([
  {
    name: 'avatar',
    maxCount: 1
  }, {
    name: 'coverImage',
    maxCount: 1
  }
]), registerUser);

// ! login route
router.route('/login').post( loginUser );

// ! secured routes
router.route('/logout').post( verifyJWT, logoutUser );
router.route('/refresh-token').post( refreshAccessToken );
router.route('/change-password').post( verifyJWT ,changeCurrentPassword );
router.route('/current-user').get(verifyJWT, getCurrentUser);
router.route('/update-account').patch(verifyJWT, updateAccountDetails);
router.route('/update-avatar').patch(verifyJWT, upload.single('avatar'), updateUserAvatar)
router.route('/cover-image').patch(verifyJWT, upload.single('coverImage'), updateUserCoverImage);
router.route('/channel/:username').get(verifyJWT, getUserChannelProfile);
router.route('/watch-history').get(verifyJWT, getWatchHistory);

// ? Export
export default router;