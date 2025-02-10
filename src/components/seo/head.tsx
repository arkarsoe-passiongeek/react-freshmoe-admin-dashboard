import { Helmet, HelmetData } from 'react-helmet-async';

interface IHeadProps {
   title: string;
   description: string;
}

const helmetData = new HelmetData({});

export default function Head({ title, description }: Readonly<IHeadProps>) {
   return (
      <Helmet helmetData={helmetData} title={title}>
         <meta name='description' content={description} />
      </Helmet>
   );
}
