const router = require("express").Router();
const { Post } = require("../../models/");
const withAuth = require("../../utils/auth");

// TODO - create a POST route for creating a new post
// This should be a protected route, so you'll need to use the withAuth middleware

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      body: req.body.body,
      userId: req.session.userId,
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", withAuth, async (req, res) => {
  try {
    const getPosts = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });
    res.json(getPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});
// TODO - create a PUT route for updating a post's title or body
// This should be a protected route, so you'll need to use the withAuth middleware

router.put("/:id", withAuth, async (req, res) => {
  console.log("BODY", req.body);
  try {
    const updateBody = await Post.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    console.log(updateBody);
    if (!updateBody) {
      res.status(404).json({ message: "incorrect" + req.params.id });
    }
    res.status(200).json(updateBody);
  } catch (err) {
    console.log("update error: " + err.message);
    res.status(500).json(err);
  }
});

// TODO - create a DELETE route for deleting a post with a specific id
// This should be a protected route, so you'll need to use the withAuth middleware
router.delete("/:id", withAuth, async (req, res) => {
  console.log(req.params.id);
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(deletePost);
    /*if (!deletePost) {
      res
        .status(404)
        .json({ message: "There is no post with this id. Please try again!" });
      return;
    }*/
    res.status(200).json("ok");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
