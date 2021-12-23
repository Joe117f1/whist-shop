import { Fragment, useState, useContext } from 'react';
import CartContext from '../../store/cart-context';
import ProductModal from './ProductModal'
import Card from '../../ui/Card';
import ProductItem from './ProductItem';
import classes from './ProductList.module.css';

const ProductList = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartCtx = useContext(CartContext);
  const { products, isAdminPage } = props.data;

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const buyProduct = product => {
    cartCtx.addItem({
      id: product.id,
      title: product.title,
      amount: 1,
      price: product.price,
      imageUrl: product.image
    });
  };

  const galleryClass = isAdminPage ? classes.board : classes.grid;

  return (
    <Fragment>
      <div className={galleryClass}>
        {isAdminPage &&
          <Card>
            <div className={classes.adminPannel}>
              <h1> Admin panel</h1>
              <button onClick={onOpenModal} >Add Product</button>
            </div>
          </Card>}

        {isModalOpen && <ProductModal
          onCloseModal={closeModalHandler}
          isEdit={false} />}

        {products.map(prod => {
          return (
            <ProductItem
              key={prod.id}
              id={prod.id}
              title={prod.title}
              image={prod.imageUrl}
              description={prod.description}
              price={prod.price}
              isAdmin={isAdminPage}
              buyProductHandler={buyProduct}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default ProductList;