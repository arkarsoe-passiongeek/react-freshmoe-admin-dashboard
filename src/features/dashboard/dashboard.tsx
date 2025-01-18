import EmptyData from '@/components/layout/empty-data';

const Dashboard = () => {
   return (
      <div>
         {/* <FormattedMessage
                id="myDashboard"
                defaultMessage="this is dashboard"
            /> */}
         <div className='flex justify-center items-center h-[70vh]'>
            <EmptyData />
         </div>
      </div>
   );
};

export default Dashboard;
