import { FormLabel } from "../ui/form";

interface CFormLabelProps {
   children: React.ReactNode;
   htmlFor?: string;
   className?: string
}

const CFormLabel = ({ children, className, ...rest }: CFormLabelProps) => {
   return (
      <FormLabel className={`${className}`} {...rest}>{children}</FormLabel>
   );
};

export default CFormLabel;
