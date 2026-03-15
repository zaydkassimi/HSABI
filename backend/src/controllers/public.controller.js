const prisma = require('../config/prisma');

const getPublicStore = async (req, res) => {
  try {
    const { slug } = req.params;
    const company = await prisma.user.findUnique({
      where: { companySlug: slug },
      include: {
        products: {
          select: {
            name: true,
            category: true,
            quantity: true,
            unitPrice: true,
            description: true
          }
        }
      }
    });

    if (!company) return res.status(404).json({ message: 'Company not found' });

    res.json({
      companyName: company.companyName,
      products: company.products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPublicStore };
