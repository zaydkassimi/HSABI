const prisma = require('../config/prisma');

const getMovements = async (req, res) => {
  try {
    const movements = await prisma.stockMovement.findMany({
      where: { userId: req.userId },
      include: { product: true },
      orderBy: { date: 'desc' }
    });
    res.json(movements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMovement = async (req, res) => {
  try {
    const { productId, type, quantity, note } = req.body;
    
    // Update product quantity
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const newQuantity = type === 'IN' ? product.quantity + parseInt(quantity) : product.quantity - parseInt(quantity);
    
    const [movement] = await prisma.$transaction([
      prisma.stockMovement.create({
        data: {
          productId,
          type,
          quantity: parseInt(quantity),
          note,
          userId: req.userId
        }
      }),
      prisma.product.update({
        where: { id: productId },
        data: { quantity: newQuantity }
      })
    ]);

    res.status(201).json(movement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMovements, addMovement };
