const express = require("express");
const prisma = require("../prismaClient");

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
          firstName: "John",
          lastName: "Doe",
          phoneNumber: phoneNumber,
          relusertenant: {
            create: {
              tenant: {
                create: {
                  description: "Test Tenant",
                  imageUrl: "https://example.com/tenant-image.jpg",
                  vouchers: {
                    create: {
                      description: "Test Voucher",
                      name: "Voucher Name",
                      imageUrl: "https://example.com/voucher-image.jpg",
                    },
                  },
                  coupons: {
                    create: {
                      description: "Test Coupon",
                      name: "Coupon Name",
                      imageUrl: "https://example.com/coupon-image.jpg",
                    },
                  },
                },
              },
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
