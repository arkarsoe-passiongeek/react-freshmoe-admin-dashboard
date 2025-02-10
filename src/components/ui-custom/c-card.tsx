import { Card } from "../ui/card";

interface CCardProps {
   children: React.ReactNode;
   className?: string
}

const CCard = ({ children, className, ...rest }: CCardProps) => {
   return (
      <Card {...rest} className={`p-[30px] ${className}`}>
         {children}
      </Card>
   );
};

export default CCard;
