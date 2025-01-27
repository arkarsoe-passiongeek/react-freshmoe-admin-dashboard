import Loading from '@/components/layout/loading';
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
      <div>
         <div>
            <h3>Title</h3>
            <p>{content.title}</p>
         </div>
      </div>
   );
};
