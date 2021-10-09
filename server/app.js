const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
// async function main() {
//   await prisma.user.create({
//     data: {
//       email: "huzaifa2000@gmail.com",
//       name: "Huzaifa",
//       password: "123456",
//     },
//   });
//   const allUsers = await prisma.user.findMany({});
//   console.log(allUsers);
//   // ... you will write your Prisma Client queries here
// }

// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

app.listen(5000, () => {
  console.log("Server Up and Running!");
});
