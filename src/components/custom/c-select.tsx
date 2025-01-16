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
            <SelectTrigger className={`text-base !h-[46px] !mt-[6px] ${defaultValue ? '' : 'text-c-contrast'}`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="!p-0">
                <SelectGroup className="p-[15px]">
                    <SelectLabel className="p-0 mb-[15px] text-base font-medium">{placeholder}</SelectLabel>
                    <div className="space-y-[10px]">
                        {
                            items.map(item => {
                                return (
                                    <div key={item.id}>
                                        <SelectItem className="text-base" value={`${item[valueSelector]}`}>{item[`${selector}`]}</SelectItem>
                                    </div>
                                )
                            })
                        }
                    </div>
                </SelectGroup>
            </SelectContent>
        </Select >
    )
}
