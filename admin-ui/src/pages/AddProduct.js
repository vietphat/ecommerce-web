import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

import Input from '../components/Input';
import { getBrands } from '../features/brand/brandSlice';
import { getProductCategories } from '../features/product-category/productCategorySlice';
import { getColors } from '../features/color/colorSlice';
import { uploadImg, deleteImg } from '../features/upload/uploadSlice';
import { createProduct } from '../features/product/productSlice';

let productSchema = Yup.object({
  title: Yup.string().required('Tên sản phẩm không được để trống'),
  description: Yup.string().required('Mô tả không được để trống'),
  price: Yup.number().required('Giá sản phẩm không được để trống'),
  category: Yup.string().required('Loại sản phẩm không được để trống'),
  tag: Yup.string().required('Tags không được để trống'),
  brand: Yup.string().required('Thương hiệu không được để trống'),
  colors: Yup.array()
    .min(1, 'Vui lòng chọn ít nhất 1 màu')
    .required('Màu sản phẩm không được để trống'),
  quantity: Yup.number().required('Số lượng sản phẩm không được để trống'),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedColors, setSelectedColors] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: undefined,
      category: '',
      tag: '',
      brand: '',
      colors: [],
      quantity: '',
      images: [],
    },
    validationSchema: productSchema,
    // SUBMIT
    onSubmit: (values) => {
      console.log(values);
      dispatch(createProduct(values));
      formik.resetForm();
      setSelectedColors(null);
      setTimeout(() => {
        navigate('/admin/products-list');
      }, 3000);
    },
  });

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProductCategories());
    dispatch(getColors());
  }, [dispatch]);

  const { brands } = useSelector((state) => state.brand);
  const { productCategories } = useSelector((state) => state.productCategory);
  const { colors } = useSelector((state) => state.color);
  const { images } = useSelector((state) => state.upload);

  useEffect(() => {
    formik.values.colors = selectedColors;
    formik.values.images = images.map((img) => {
      return { public_id: img.public_id, url: img.url };
    });
  }, [formik.values, selectedColors, images]);

  const handleColors = (e) => {
    setSelectedColors(e);
  };

  return (
    <div>
      <h3 className='mb-4 title'>Thêm sản phẩm</h3>

      <div>
        <form
          onSubmit={formik.handleSubmit}
          className='d-flex gap-3 flex-column'
        >
          {/* TÊN */}
          <Input
            type='text'
            label='Tên sản phẩm'
            name='title'
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            value={formik.values.title}
          />
          <div className='error'>
            {formik.touched.title && formik.errors.title}
          </div>

          {/* MÔ TẢ */}
          <div>
            <ReactQuill
              theme='snow'
              name='description'
              onChange={formik.handleChange('description')}
              value={formik.values.description}
            />
          </div>
          <div className='error'>{formik.errors.description}</div>

          {/* GIÁ */}
          <Input
            type='number'
            label='Giá'
            name='price'
            onChange={formik.handleChange('price')}
            onBlur={formik.handleBlur('price')}
            value={formik.values.price}
          />
          <div className='error'>
            {formik.touched.price && formik.errors.price}
          </div>

          {/* LOẠI SẢN PHẨM */}
          <select
            className='form-control py-3 mb-3'
            name='category'
            onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
            value={formik.values.category}
          >
            <option value=''>Chọn loại sản phẩm</option>
            {productCategories.map((pc) => {
              return (
                <option key={pc._id} value={pc._id}>
                  {pc.title}
                </option>
              );
            })}
          </select>
          <div className='error'>
            {formik.touched.category && formik.errors.category}
          </div>

          {/* TAG */}
          <select
            className='form-control py-3 mb-3'
            name='tags'
            onChange={formik.handleChange('tag')}
            onBlur={formik.handleBlur('tag')}
            value={formik.values.tag}
          >
            <option value=''>Chọn tags</option>
            <option value='featured'>Nổi bật</option>
            <option value='popular'>Phổ biến</option>
            <option value='special'>Đặc biệt</option>
          </select>
          <div className='error'>{formik.touched.tag && formik.errors.tag}</div>

          {/* MÀU */}
          <Select
            mode='multiple'
            allowClear
            className='w-100'
            placeholder='Chọn màu'
            defaultValue={selectedColors}
            onChange={(i) => handleColors(i)}
            options={colors.map((c) => {
              return { label: c.title, value: c._id };
            })}
          />
          <div className='error'>
            {formik.touched.colors && formik.errors.colors}
          </div>

          {/* THƯƠNG HIỆU */}
          <select
            className='form-control py-3 mb-3'
            name='brand'
            onChange={formik.handleChange('brand')}
            onBlur={formik.handleBlur('brand')}
            value={formik.values.brand}
          >
            <option value=''>Chọn thương hiệu</option>
            {brands.map((brand) => {
              return (
                <option key={brand._id} value={brand._id}>
                  {brand.title}
                </option>
              );
            })}
          </select>
          <div className='error'>
            {formik.touched.brand && formik.errors.brand}
          </div>

          {/* SỐ LƯỢNG */}
          <Input
            type='number'
            label='Nhập số lượng'
            name='quantity'
            onChange={formik.handleChange('quantity')}
            onBlur={formik.handleBlur('quantity')}
            value={formik.values.quantity}
          />
          <div className='error'>
            {formik.touched.quantity && formik.errors.quantity}
          </div>

          {/* HÌNH ẢNH */}
          <div className='bg-white border-1 p-5 text-center'>
            <Dropzone
              onDrop={(acceptedFiles) => {
                dispatch(uploadImg(acceptedFiles));
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Kéo thả file hình ảnh hoặc nhấp vào đây để thêm hình</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <div className='showimages d-flex flex-wrap gap-3'>
            {images.map((img) => {
              return (
                <div className='position-relative' key={img.public_id}>
                  <button
                    className='btn-close position-absolute'
                    style={{ top: '10px', right: '10px' }}
                    onClick={() => dispatch(deleteImg(img.public_id))}
                    type='button'
                  />
                  <img
                    className='img-fluid'
                    src={img.url}
                    alt='product'
                    width={200}
                    height={200}
                  />
                </div>
              );
            })}
          </div>

          <button
            type='submit'
            className='btn btn-success border-0 ronded-3 my-5'
          >
            Thêm sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
