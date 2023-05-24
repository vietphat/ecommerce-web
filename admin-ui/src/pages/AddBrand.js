import Input from '../components/Input';

const AddBrand = () => {
  return (
    <div>
      <h3 className='mb-4 title'>Thêm thương hiệu</h3>

      <div>
        <form action=''>
          <div className='mt-4'>
            <Input type='text' label='Thương hiệu' />
          </div>

          <button
            type='submit'
            className='btn btn-success border-0 ronded-3 my-5'
          >
            Thêm thương hiệu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
