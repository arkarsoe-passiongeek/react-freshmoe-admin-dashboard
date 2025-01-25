import { FormLabel } from '../ui/form';

interface CFormLabelProps {
   children: React.ReactNode;
   htmlFor?: string;
   className?: string;
}

const CFormLabel: React.FC<CFormLabelProps> = ({
   children,
   className,
   ...rest
}) => {
   return (
      <FormLabel className={`text-base font-normal ${className}`} {...rest}>
         {children}
      </FormLabel>
   );
};

export default CFormLabel;
