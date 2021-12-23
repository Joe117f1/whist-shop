import { useState } from 'react';
import { getMongoConnection } from '../../utils/db-utils/dbUtils';
import Product from '../../utils/db-utils/modeles/product';
import Cart from '../../components/cart/Cart';
import HeaderCartButton from '../../components/layout/HeaderCartButton';
import ProductList from '../../components/shop/productList';
import { onCloseModal } from '../../utils/helper-functions/utilFunction';

const CONNECTION_STRING = process.env.MONGODB_KEY;

const Home = props => {
  const [isCartShown, setIsCartShown] = useState(false);

  const toggleCartHandler = () => {
    !isCartShown ? setIsCartShown(true) : setIsCartShown(false);
  };

  const toggleConfirmOrderHandler = () => {
    !isInOrder ? setIsInOrder(true) : setIsInOrder(false);
    setIsCartShown(!isCartShown);
  };
  const data = {
    products: props.products,
    isAdminPage: false
  };

  return (
    <div >
      <HeaderCartButton onToggleCart={toggleCartHandler} />
      {isCartShown && <Cart
        onToggleCart={toggleCartHandler}
        onToggleOrder={toggleConfirmOrderHandler}
        onCloseModal={onCloseModal.bind(null, setIsCartShown)}
      />}
      <ProductList data={data} />
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  try {
    const mongoose = await getMongoConnection(CONNECTION_STRING);
    if (!mongoose) {
      throw new Error('could not connect to database.');
    };
    console.log('CONNECTED TO MONGODB!')
    const products = await Product.find();

    return {
      props: {
        products: products.map(prod => ({
          title: prod.title,
          imageUrl: prod.imageUrl,
          description: prod.description,
          price: prod.price,
          id: prod._id.toString()
        }))
      },
      revalidate: 10
    }
  } catch (error) {
    console.log(error.message);
    return { notFound: true };
  };
};
