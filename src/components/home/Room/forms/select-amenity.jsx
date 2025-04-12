import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function SelectField({
  control,
  label = "",
  placeholder = "",
  name = "",
  children,
  icon: IconComponent,
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm">{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger
                className={`relative w-full ${IconComponent ? "pr-13" : ""}`}
              >
                <SelectValue placeholder={placeholder} />
                {IconComponent && (
                  <>
                    <Separator
                      orientation="vertical"
                      className="absolute right-10 h-full"
                    />
                    <IconComponent className="text-secondary-foreground absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2" />
                  </>
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {children}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
