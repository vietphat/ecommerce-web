import Input from '../components/Input';

const AddColor = () => {
  return (
    <div>
      <h3 className='mb-4 title'>Thêm màu sản phẩm</h3>

      <div>
        <form action=''>
          <div className='mt-4'>
            <Input type='color' label='Màu sản phẩm' />
          </div>

          <button
            type='submit'
            className='btn btn-success border-0 ronded-3 my-5'
          >
            Thêm màu sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
