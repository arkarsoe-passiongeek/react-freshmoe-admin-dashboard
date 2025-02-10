import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { SelectProps } from '@radix-ui/react-select';

interface CBaseSelectProps extends SelectProps {
   items: {
      [id: string]: any;
   }[];
   placeholder: string;
   onValueChange: (..._event: any[]) => void;
   defaultValue: string;
   disabled?: boolean;
   getValue?: (item: any) => string;
   selector?: string;
   valueSelector?: string;
}

export function CBaseSelect({
   items,
   placeholder,
   defaultValue,
   disabled = false,
   selector = 'name',
   getValue,
   valueSelector = 'id',
   ...rest
}: Readonly<CBaseSelectProps>) {
   return (
      <Select disabled={disabled} defaultValue={defaultValue} {...rest}>
         <SelectTrigger className={`${defaultValue ? '' : 'text-c-contrast'}`}>
            <SelectValue placeholder={placeholder} />
         </SelectTrigger>
         <SelectContent>
            <SelectGroup>
               <SelectLabel>{placeholder}</SelectLabel>
               <div className='space-y-[10px]'>
                  {items.map(item => {
                     return (
                        <div key={item.id}>
                           <SelectItem value={`${item[valueSelector]}`}>
                              {!getValue && item[`${selector}`]}
                              {getValue && getValue(item)}
                           </SelectItem>
                        </div>
                     );
                  })}
               </div>
            </SelectGroup>
         </SelectContent>
      </Select>
   );
}
