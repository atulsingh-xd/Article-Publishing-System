const Article = require("../models/Article");

// POST /articles (Writer)
const createArticle = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const newArticle = new Article({
      title,
      content,
      tags,
      author: req.user.id,
      status: "draft",
    });
    const article = await newArticle.save();
    res.json(article);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// GET /articles (Public + Filter logic)
const getArticles = async (req, res) => {
  try {
    let query = { status: "published" }; // Default public view
    const viewMode = req.query.view;

    // Only apply filters if we have a verified user
    if (req.user) {
      if (req.user.role === "admin" && viewMode === "all") {
        query = {};
      } else if (viewMode === "mine") {
        query = { author: req.user.id };
      }
    }
    const articles = await Article.find(query).populate("author", "username");
    res.json(articles);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
// GET /articles/:id (Public)
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!article) return res.status(404).json({ msg: "Article not found" });

    // Visibility check
    if (article.status === "draft") {
      // Allow if author or admin
      /* Note: Since this is a public route, middleware might not run if no token provided.
         If token is provided, req.user exists. */
      // If no user is logged in, they can't see drafts
      if (!req.user) return res.status(404).json({ msg: "Article not found" });

      if (
        req.user.role !== "admin" &&
        article.author._id.toString() !== req.user.id
      ) {
        return res.status(403).json({ msg: "Access denied" });
      }
    }

    res.json(article);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// PUT /articles/:id (Writer - own, Admin)
const updateArticle = async (req, res) => {
  try {
    let article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ msg: "Article not found" });

    // Ownership check
    if (
      article.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Logic: Writers edit only before publication
    if (req.user.role === "writer" && article.status === "published") {
      return res.status(400).json({ msg: "Cannot edit published articles" });
    }

    const { title, content, tags } = req.body;
    article.title = title || article.title;
    article.content = content || article.content;
    article.tags = tags || article.tags;

    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// DELETE /articles/:id (Admin)
const deleteArticle = async (req, res) => {
  try {
    let article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ msg: "Article not found" });

    await Article.findByIdAndDelete(req.params.id);
    res.json({ msg: "Article removed" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// PATCH /articles/:id/publish (Admin)
const publishArticle = async (req, res) => {
  try {
    let article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ msg: "Article not found" });

    article.status = article.status === "draft" ? "published" : "draft";
    article.publishedAt = article.status === "published" ? Date.now() : null;

    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createArticle,
  getArticleById,
  getArticles,
  updateArticle,
  deleteArticle,
  publishArticle,
};
