// authRoutes.js

const express = require("express");
const prisma = require("../prismaClient");
const { faker } = require("@faker-js/faker");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { phoneNumber } = req.body;

  console.log(phoneNumber);

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        phoneNumber,
      },
    });

    if (!user) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      // Create a new user with faker firstName and lastName
      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          phoneNumber,
        },
      });
      return res
        .status(200)
        .json({ message: "Login successful", user: newUser });
    } else {
      console.log("User already in use");
    }
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
