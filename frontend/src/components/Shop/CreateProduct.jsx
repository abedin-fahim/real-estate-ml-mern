import React, { useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../redux/actions/product';
import { categoriesData } from '../../static/data';
import { toast } from 'react-toastify';

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [areaType, setAreaType] = useState('');
  const [bedroom, setBedroom] = useState();
  const [sqft, setSqft] = useState();
  const [bath, setBath] = useState();
  const [balcony, setBalcony] = useState();

  // const [stock, setStock] = useState();
  const stock = 1;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success('Product created successfully!');
      navigate('/dashboard');
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.set('images', image);
    });
    newForm.append('name', name);
    newForm.append('description', description);
    newForm.append('category', category);
    newForm.append('tags', tags);
    newForm.append('originalPrice', originalPrice);
    newForm.append('discountPrice', discountPrice);
    newForm.append('areaType', areaType);
    newForm.append('bedroom', bedroom);
    newForm.append('sqft', sqft);
    newForm.append('bath', bath);
    newForm.append('balcony', balcony);
    newForm.append('stock', stock);
    newForm.append('shopId', seller._id);
    dispatch(
      createProduct({
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        areaType,
        bedroom,
        sqft,
        bath,
        balcony,
        stock,
        shopId: seller._id,
        images,
      })
    );
  };

  return (
    <div className='w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll'>
      <h5 className='text-[30px] font-Poppins text-center'>Sell Property</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className='pb-2'>
            Name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='name'
            value={name}
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your product name...'
          />
        </div>
        <br />
        <div>
          <label className='pb-2'>
            Description <span className='text-red-500'>*</span>
          </label>
          <textarea
            cols='30'
            required
            rows='8'
            type='text'
            name='description'
            value={description}
            className='mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Enter your product description...'
          ></textarea>
        </div>
        <br />
        <div>
          <label className='pb-2'>
            Location <span className='text-red-500'>*</span>
          </label>
          <select
            className='w-full mt-2 border h-[35px] rounded-[5px]'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value='Choose a category'>Select area type</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option
                  value={i.title}
                  key={i.title}
                >
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className='pb-2'>
            Area type <span className='text-red-500'>*</span>
          </label>
          <select
            className='w-full mt-2 border h-[35px] rounded-[5px]'
            value={areaType}
            onChange={(e) => {
              setAreaType(e.target.value);
              // console.log(areaType);
            }}
          >
            <option value='Choose a area type'>Select area type</option>
            <option value='Super built-up Area'>Super built-up Area</option>
            <option value='Plot Area'>Plot Area</option>
            <option value='Built-up Area'>Built-up Area</option>
            <option value='Carpet Area'>Carpet Area</option>
          </select>
        </div>
        <br />
        <div className='w-full pb-5'>
          <label className='pb-2'>
            Bedroom <span className='text-red-500'>*</span>
          </label>
          <select
            className='w-1/3 ml-3 mt-2 border h-[35px] rounded-[5px]'
            value={bedroom}
            onChange={(e) => {
              setBedroom(parseInt(e.target.value));
            }}
          >
            <option value='Choose a area type'>Select BHK</option>
            <option value='1'>1 BHK</option>
            <option value='2'>2 BHK</option>
            <option value='3'>3 BHK</option>
            <option value='4'>4 BHK</option>
            <option value='5'>5 BHK</option>
            <option value='6'>6 BHK</option>
          </select>

          <label className='pb-2 ml-5'>
            Bath <span className='text-red-500'>*</span>
          </label>
          <select
            className='w-1/3 ml-3 mt-2 border h-[35px] rounded-[5px]'
            value={bath}
            onChange={(e) => {
              setBath(parseInt(e.target.value));
              // console.log(parseInt(e.target.value));
            }}
          >
            <option value='Choose a area type'>Select bath</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
          </select>

          <label className='pb-2'>
            Balcony <span className='text-red-500'>*</span>
          </label>
          <select
            className='w-1/3 ml-3 mt-2 border h-[35px] rounded-[5px]'
            value={balcony}
            onChange={(e) => {
              setBalcony(parseInt(e.target.value));
              console.log(parseInt(e.target.value));
            }}
          >
            <option value='Choose a area type'>Select balcony</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
          </select>
        </div>
        <div>
          <label className='pb-2 '>
            Total Square feet <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='name'
            value={sqft}
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            onChange={(e) => setSqft(parseInt(e.target.value))}
            placeholder='Enter the total square feet...'
          />
        </div>
        <br />
        <div>
          <label className='pb-2'>Tags</label>
          <input
            type='text'
            name='tags'
            value={tags}
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            onChange={(e) => setTags(e.target.value)}
            placeholder='Enter tags...'
          />
        </div>
        <br />
        <div>
          <label className='pb-2'>Original Price</label>
          <input
            type='number'
            name='price'
            value={originalPrice}
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder='Enter your property price (Per Sqft)'
          />
        </div>
        <br />
        <div>
          <label className='pb-2'>
            Price (With Discount) <span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            name='price'
            value={discountPrice}
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder='Enter your property price with discount (Per Sqft)'
          />
        </div>
        <br />
        {/* <div>
          <label className='pb-2'>
            Product Stock <span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            name='price'
            value={stock}
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            onChange={(e) => setStock(e.target.value)}
            placeholder='Enter your product stock...'
          />
        </div> */}
        <br />
        <div>
          <label className='pb-2'>
            Upload Images <span className='text-red-500'>*</span>
          </label>
          <input
            type='file'
            name=''
            id='upload'
            className='hidden'
            multiple
            onChange={handleImageChange}
          />
          <div className='w-full flex items-center flex-wrap'>
            <label htmlFor='upload'>
              <AiOutlinePlusCircle
                size={30}
                className='mt-3'
                color='#555'
              />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={i}
                  key={i}
                  alt=''
                  className='h-[120px] w-[120px] object-cover m-2'
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type='submit'
              value='Create'
              className='mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
