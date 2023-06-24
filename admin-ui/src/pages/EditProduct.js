import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import 'react-quill/dist/quill.snow.css';

import Input from '../components/Input';
import { editAProduct, getProductById } from '../features/product/productSlice';
import { getBrands } from '../features/brand/brandSlice';
import { getProductCategories } from '../features/product-category/productCategorySlice';
import { getColors } from '../features/color/colorSlice';

let productSchema = Yup.object({
  title: Yup.string().required('Tên sản phẩm không được để trống'),
  description: Yup.string().required('Mô tả không được để trống'),
  price: Yup.number()
    .min(1, 'Giá không hợp lệ')
    .required('Giá  không được để trống'),
  category: Yup.string().required('Loại sản phẩm không được để trống'),
  tag: Yup.string().required('Tags không được để trống'),
  brand: Yup.string().required('Thương hiệu không được để trống'),
  colors: Yup.array()
    .min(1, 'Vui lòng chọn ít nhất 1 màu')
    .required('Màu sản phẩm không được để trống'),
  quantity: Yup.number()
    .min(1, 'Số lượng không hợp lệ')
    .required('Số lượng sản phẩm không được để trống'),
});

const EditProduct = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Lấy thông tin sản phẩm
  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getBrands());
    dispatch(getProductCategories());
    dispatch(getColors());
  }, [id, dispatch]);

  const { currentProduct } = useSelector((state) => state.product);
  const { brands } = useSelector((state) => state.brand);
  const { productCategories } = useSelector((state) => state.productCategory);
  const { colors } = useSelector((state) => state.color);
  // const { images } = useSelector((state) => state.upload);

  useEffect(() => {
    if (currentProduct?.colors?.length > 0) {
      setSelectedColors(() => currentProduct.colors.map((c) => c._id));
    }
  }, [currentProduct]);

  const formik = useFormik({
    enableReinitialize: true,
    isInitialValid: false,
    initialValues: {
      title: currentProduct?.title,
      description: currentProduct?.description,
      price: currentProduct?.price,
      category: currentProduct?.category?._id,
      tag: currentProduct?.tag,
      brand: currentProduct?.brand?._id,
      colors: selectedColors || [],
      quantity: currentProduct?.quantity,
      // images: [],
    },
    validationSchema: productSchema,
    // SUBMIT
    onSubmit: async (values) => {
      const editResult = await dispatch(
        editAProduct({ _id: id, product: values })
      );

      if (editResult.meta.requestStatus === 'fulfilled') {
        navigate('/admin/products-list');
      }
    },
  });

  const handleColors = (e) => {
    setSelectedColors(e);
  };

  return (
    <div>
      <h3 className='mb-4 title'>{`Sửa thông tin sản phẩm ${currentProduct?.title}`}</h3>

      <div>
        <form
          onSubmit={formik.handleSubmit}
          className='d-flex gap-3 flex-column'
        >
          {/* ID */}
          <Input
            type='text'
            label='Mã sản phẩm'
            name='idSanPham'
            disabled={true}
            value={currentProduct?._id}
          />
          <div></div>

          {/* MÀU */}
          <Select
            mode='multiple'
            allowClear
            className='w-100'
            placeholder='Chọn màu'
            value={selectedColors}
            onChange={(i) => handleColors(i)}
            options={colors.map((c) => {
              return { label: `${c.title}`, value: c._id };
            })}
          />
          <div className='error'>
            {formik.touched.colors && formik.errors.colors}
          </div>

          {/* TÊN */}
          <Input
            type='text'
            label='Tên sản phẩm'
            name='title'
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            value={formik.values?.title}
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
              value={formik.values?.description}
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
            value={formik.values?.price}
          />
          <div className='error'>
            {formik.touched.price && formik.errors.price}
          </div>

          {/* LOẠI SẢN PHẨM */}
          <select
            className='form-control form-select py-3 mb-3'
            name='category'
            onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
            value={formik.values?.category}
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
            className='form-control form-select py-3 mb-3'
            name='tags'
            onChange={formik.handleChange('tag')}
            onBlur={formik.handleBlur('tag')}
            value={formik.values?.tag}
          >
            <option value=''>Chọn tags</option>
            <option value='featured'>Nổi bật</option>
            <option value='popular'>Phổ biến</option>
            <option value='special'>Đặc biệt</option>
          </select>
          <div className='error'>{formik.touched.tag && formik.errors.tag}</div>

          {/* THƯƠNG HIỆU */}
          <select
            className='form-control form-select py-3 mb-3'
            name='brand'
            onChange={formik.handleChange('brand')}
            onBlur={formik.handleBlur('brand')}
            value={formik.values?.brand}
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
            value={formik.values?.quantity}
          />
          <div className='error'>
            {formik.touched.quantity && formik.errors.quantity}
          </div>

          <button
            type='submit'
            disabled={!formik.isValid}
            className='btn btn-success border-0 rounded-3 my-5'
          >
            Lưu thay đổi
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
