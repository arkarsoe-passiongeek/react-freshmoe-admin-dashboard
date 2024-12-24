import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface CBaseSelectProps {
    items: {
        [id: string]: any;
    }[],
    placeholder: string;
    onValueChange: (...event: any[]) => void;
    defaultValue: string;
    disabled?: boolean;
    selector?: string;
    valueSelector?: string;
}

export function CBaseSelect({ items, placeholder, defaultValue, disabled = false, selector = 'name', valueSelector = "id", ...rest }: CBaseSelectProps) {
    return (
        <Select disabled={disabled} defaultValue={defaultValue} {...rest}>
            <SelectTrigger className={`text-lg !h-[52px] ${defaultValue ? '' : 'text-c-contrast'}`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup className="p-[15px]">
                    <SelectLabel className="p-0 mb-[15px] text-lg font-medium">{placeholder}</SelectLabel>
                    <div className="space-y-[10px]">
                        {
                            items.map(item => {
                                return (
                                    <SelectItem className="text-lg" key={item.value ?? item.id} value={item.value ?? item[valueSelector]}>{item.label ?? item.name ?? item[`${selector}`]}</SelectItem>
                                )
                            })
                        }
                    </div>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
