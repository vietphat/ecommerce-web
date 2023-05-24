import Input from '../components/Input';

const AddBlogCategory = () => {
  return (
    <div>
      <h3 className='mb-4 title'>Thêm bài viết</h3>

      <div>
        <form action=''>
          <div className='mt-4'>
            <Input type='text' label='Danh mục bài viết' />
          </div>

          <button
            type='submit'
            className='btn btn-success border-0 ronded-3 my-5'
          >
            Thêm danh mục bài viết
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
