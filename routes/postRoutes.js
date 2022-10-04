const express = require("express")
const postController = require("../controllers/postController")
const router = express.Router()
const protect = require("../middleware/authMiddleware")
//localhost:3000
router.route('/').get(postController.getAllPosts).post(protect, postController.createPost)
router.route('/:id').get(postController.getOnePost).patch(postController.updatePost).delete(postController.deletePost)
module.exports = router;