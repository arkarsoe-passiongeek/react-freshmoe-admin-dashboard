import { FormLabel } from '../ui/form';

interface CFormLabelProps {
   children: React.ReactNode;
   className?: string;
}

const CFormLabel: React.FC<CFormLabelProps> = ({
   children,
   className,
   ...rest
}) => {
   return (
      <FormLabel className={`text-lg font-normal ${className}`} {...rest}>
         {children}
      </FormLabel>
   );
};

export default CFormLabel;
