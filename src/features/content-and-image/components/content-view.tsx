import Loading from '@/components/layout/loading';
import { getImageUrl } from '@/lib/utils';
import { useContent } from '../api/get-content';

export const ContentView = ({
   contentId,
   page,
   section,
}: {
   contentId: string;
   page: string;
   section: string;
}) => {
   const contentQuery = useContent({
      contentId,
      page,
      section,
   });

   if (contentQuery.isLoading) {
      return <Loading />;
   }

   const content = contentQuery?.data?.data;

   if (!content) return null;

   return (
      <div className='space-y-7 max-w-[500px]'>
         <div>
            <h3 className='text-base text-c-black font-medium mb-2'>Upload Image</h3>
            <img className='max-h-[200px] object-cover w-full' src={getImageUrl(content.imgUrl)} alt={content.title} />
         </div>
         <div>
            <h3 className='text-base text-c-black font-medium'>Title</h3>
            <p className='text-base text-c-contrast'>{content.title}</p>
         </div>
         <div>
            <h3 className='text-base text-c-black font-medium'>Description</h3>
            <p className='text-base text-c-contrast'>{content.description}</p>
         </div>
      </div>
   );
};
