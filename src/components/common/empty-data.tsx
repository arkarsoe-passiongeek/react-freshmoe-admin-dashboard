import EmptyResult from '@/assets/media/images/empty-result.png';

const EmptyData = () => {
   return (
      <div className='space-y-7'>
         <img
            className='mx-auto'
            src={EmptyResult}
            width={250}
            height={324}
            alt='empty result logo'
         />
         <h1 className='text-center text-3xl text-c-contrast font-semibold'>
            Empty result is here!
         </h1>
      </div>
   );
};

export default EmptyData;
