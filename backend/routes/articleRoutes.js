const express = require("express");
const router = express.Router();
const {
  createArticle,
  getArticleById,
  getArticles,
  updateArticle,
  deleteArticle,
  publishArticle,
} = require("../controllers/articleController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/role");

// Public (or view filtered based on auth)
router.get("/", auth, getArticles);
router.get("/:id", auth, getArticleById);

// Protected
router.post("/", auth, checkRole(["writer"]), createArticle);
router.put("/:id", auth, checkRole(["writer", "admin"]), updateArticle);
router.delete("/:id", auth, checkRole(["admin"]), deleteArticle);
router.patch("/:id/publish", auth, checkRole(["admin"]), publishArticle);

module.exports = router;
