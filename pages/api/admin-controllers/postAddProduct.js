import Product from '../../../utils/db-utils/modeles/product';

const handler = async (req, res) => {
  const { title, image, description, price } = req.body;
  try {
    const product = new Product({
      title, price, description, imageUrl: image
    })
    const savedProduct = await product.save();

    console.log(savedProduct);
  } catch (err) {
    console.log('PRMOISE ERROR (postAddProduct): ', err);
  }
  res.status(201).json({ message: 'Product added successfuly!' });
};

export default handler;