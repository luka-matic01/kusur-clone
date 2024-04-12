const express = require("express");
const prisma = require("../prismaClient");
const { faker } = require("@faker-js/faker");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Check if user exists
    let user = await prisma.user.findUnique({
      where: {
        phoneNumber,
      },
      include: {
        relusertenant: {
          include: {
            tenant: {
              include: {
                vouchers: true,
                coupons: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      // Create a new user with predefined data
      user = await prisma.user.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: phoneNumber,
          relusertenant: {
            create: Array.from({ length: 3 }, () => ({
              tenant: {
                create: {
                  description: faker.lorem.words(),
                  imageUrl: faker.image.imageUrl(),
                  vouchers: {
                    createMany: {
                      data: Array.from({ length: 3 }, () => ({
                        description: faker.lorem.words(),
                        name: faker.commerce.productName(),
                        imageUrl: faker.image.imageUrl(),
                      })),
                    },
                  },
                  coupons: {
                    createMany: {
                      data: Array.from({ length: 3 }, () => ({
                        description: faker.lorem.words(),
                        name: faker.commerce.productName(),
                        imageUrl: faker.image.imageUrl(),
                      })),
                    },
                  },
                },
              },
            })),
          },
        },
        include: {
          relusertenant: {
            include: {
              tenant: true,
            },
          },
        },
      });
    }

    console.log(user);
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
