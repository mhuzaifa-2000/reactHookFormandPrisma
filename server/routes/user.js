const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", (req, res) => {
  prisma.user
    .findMany({})
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  prisma.user
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  var hashed = "";
  bcrypt.hash(password, saltRounds, function (err, hash) {
    prisma.user
      .create({
        data: {
          name: name,
          email: email,
          password: hash,
        },
      })
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(err));
  });
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const toUpdate = req.body;

  prisma.user
    .update({
      where: { id: id },
      data: toUpdate,
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json(err));
});
module.exports = router;
