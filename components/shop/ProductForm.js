import { useState, useRef, useEffect } from 'react';
import Card from '../../ui/Card';
import LoadingSpinner from '../../ui/LoadingSpinner';
import classes from './ProductForm.module.css';

const ProductForm = props => {
  const [isEditing, setISEditing] = useState(false);
  // TODO: isLoading useState for loading spinner
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const descriptionInputRef = useRef();
  const priceInputRef = useRef();

  const { id, title, imageUrl, description, price, edit } = props;

  useEffect(() => {
    if (edit) {
      setISEditing(true);
    }
  }, [edit]);

  const submitHandler = event => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;

    // TODO: add input validation step (and another one on the backend)
    const productData = {
      id,
      title: enteredTitle,
      image: enteredImage,
      price: enteredPrice,
      description: enteredDescription,
    };

    props.onSubmitProduct(productData);
  };

  const actionBtn = isEditing ? 'Save Changes' : 'Add Product';

  return (
    <Card>
      {props.isLoading && (
        <div className={classes.loading}>
          <LoadingSpinner />
        </div>
      )}
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Product Title</label>
          <input type='text' required id='title' placeholder={title} ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Product Image</label>
          <input type='url' required id='image' placeholder={imageUrl} ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            maxLength='120'
            placeholder={description}
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor='price'>Price</label>
          <input type='number' step='0.1' required id='price' placeholder={price} ref={priceInputRef} />
        </div>
        <div className={classes.actions}>
          <button>{actionBtn}</button>
        </div>
      </form>
    </Card>
  );
};

export default ProductForm;
