import Input from '../components/Input';

const AddProductCategory = () => {
  return (
    <div>
      <h3 className='mb-4 title'>Thêm loại sản phẩm</h3>

      <div>
        <form action=''>
          <div className='mt-4'>
            <Input type='text' label='Loại sản phẩm' />
          </div>

          <button
            type='submit'
            className='btn btn-success border-0 ronded-3 my-5'
          >
            Thêm loại sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductCategory;
