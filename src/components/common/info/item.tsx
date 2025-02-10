const InfoItem = ({ label, data }: any) => {
   return (
      <div className='flex gap-5'>
         <span className='inline-block w-[189px] font-medium text-c-contrast'>
            {label}
         </span>
         <span>:</span>
         <span className='inline-block w-[189px]'>{data}</span>
      </div>
   );
};

export default InfoItem;
