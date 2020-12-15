const express = require("express");
const router = express.Router();

const bookmarkController = require("../controllers/bookmarkController");
const NotFoundError = require("../utils/errors/not_found_404_error");

router.post("/bookmarks", async (req, res) => {
  const newBookmark = await bookmarkController.addBookmark(req.body);
  console.log("newBookmark", newBookmark);
  res.status(201).json({
    id: newBookmark.id,
    userId: newBookmark.userId,
    projectId: newBookmark.projectId,
    bookmarkId: newBookmark.bookmarkId,
    bookmarkName: newBookmark.bookmarkName,
  });
});

router.delete("/bookmark/:projectId", async (req, res) => {
  const bookmarkFound = await bookmarkController.deleteBookmarkById(
    req.params.projectId
  );
  if (bookmarkFound) {
    res.status(200).json({
      message: "Bookmark supprimé",
    });
  } else {
    throw new NotFoundError(
      "Mauvaise requête - erreur client",
      "Ce bookmark n'a pas été supprimé correctement"
    );
  }
});

module.exports = router;
