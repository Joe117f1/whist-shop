import { useState } from 'react';
import Image from 'next/image';
import ProductModal from './ProductModal';
import Card from '../../ui/Card';
import classes from './ProductItem.module.css';
import { sendDataToServer } from '../../utils/helper-functions/httpFunction';

const ProductItem = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id, title, image, description, price, isAdmin } = props;
  const product = { id, title, image, description, price };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onBuyProduct = () => {
    props.buyProductHandler(product);
  };

  const deleteProductHandler = () => {
    sendDataToServer(id, '/api/admin-controllers/postDeleteProduct');
  };

  const productClass = isAdmin ? classes.row : classes.card;

  return (
    <Card>
      <div className={productClass}>
        <h1 className={classes.title}>{title}</h1>
        <div className={classes.img}>
          <Image src={image} alt={title} width={400} height={400} />
        </div>
        <div className={classes.description}>
          <p>{description}</p>
        </div>
        <h3>$ {price}</h3>
        {isModalOpen && <ProductModal
          onCloseModal={onCloseModal}
          id={id}
          title={title}
          img={image}
          description={description}
          price={price}
          isEdit={true}
        />}

        {isAdmin && <div className={classes.control} >
          <button onClick={onOpenModal.bind(null, true)}>Edit Products</button>
          <button onClick={deleteProductHandler}>Delete Product</button>
        </div>}

        {!isAdmin && <div className={classes.control} >
          <button onClick={onBuyProduct}>Buy it now</button>
        </div>}
      </div>
    </Card>
  );
};

export default ProductItem;