const { PrismaClient } = require('@prisma/client');
const sendReferralEmail = require('../services/emailService');
const validator = require('../utils/validator');

// Initialize Prisma Client
const prismaClient = new PrismaClient();

const createReferral = async (req, res) => {
  const { referredBy, name, email } = req.body;

  // Validate referral data
  if (!validator.isValidReferralData(referredBy, name, email)) {
    return res.status(400).json({ message: 'Invalid referral data' });
  }

  try {
    // Create referral record in the database
    const referral = await prismaClient.referral.create({
      data: { referredBy, name, email },
    });

    // Send referral email
    await sendReferralEmail(email, referredBy, name);

    
    return res.status(201).json({ message: 'Referral created successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createReferral };
