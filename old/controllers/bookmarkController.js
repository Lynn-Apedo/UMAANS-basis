const models = require("../models");

const { Project, Bookmark } = models;

module.exports = {
  addBookmark: async (data) => {
    const { userId, projectId, bookmarkId, bookmarkName } = data;
    return Bookmark.create({
      userId,
      projectId,
      bookmarkId,
      bookmarkName,
    });
  },

  //   getAllBookmarks: () => {
  //     return Bookmark.findAll({
  //       //   include: [
  //       //     {
  //       //       model: Country,
  //       //       attributes: ["countryName"],
  //       //     },
  //       //   ],
  //       order: [["id", "DESC"]],
  //       limit: 10,
  //       raw: true,
  //       attributes: ["id", "userId", "projectId", "bookmarkId", "bookmarkName"],
  //     });
  //   },
  //   getBookmarktById: (projectId) => {
  //     return Bookmark.findByPk(projectId, {
  //       //   include: [
  //       //     {
  //       //       model: Country,
  //       //       attributes: ["countryName"],
  //       //     },
  //       //   ],
  //     });
  //   },
  deleteBookmarkById: (id) => {
    return Bookmark.destroy({
      where: {
        id,
      },
    });
  },
};
