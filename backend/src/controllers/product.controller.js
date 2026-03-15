const prisma = require('../config/prisma');

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, category, quantity, unitPrice, description, lowStockThreshold } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        category,
        quantity: parseInt(quantity) || 0,
        unitPrice: parseFloat(unitPrice),
        description,
        lowStockThreshold: parseInt(lowStockThreshold) || 5,
        userId: req.userId
      }
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, quantity, unitPrice, description, lowStockThreshold } = req.body;
    const product = await prisma.product.update({
      where: { id, userId: req.userId },
      data: {
        name,
        category,
        quantity: parseInt(quantity),
        unitPrice: parseFloat(unitPrice),
        description,
        lowStockThreshold: parseInt(lowStockThreshold)
      }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id, userId: req.userId } });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLowStockAlerts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId: req.userId,
        quantity: { lte: prisma.product.fields.lowStockThreshold } // This might need raw query or logic
      }
    });
    // Prisma doesn't support comparing fields in 'where' easily without raw or filtering in JS
    const allProducts = await prisma.product.findMany({ where: { userId: req.userId } });
    const lowStock = allProducts.filter(p => p.quantity <= p.lowStockThreshold);
    res.json(lowStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct, getLowStockAlerts };
