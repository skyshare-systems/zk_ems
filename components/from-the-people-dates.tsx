"use client";

import { cn, colorizeButton } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon, XIcon } from "lucide-react";
import { Control, useFieldArray } from "react-hook-form";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useCompanyStore } from "@/store/company";

type Props = {
  index: number;
  control: Control<any>;
  label: string
};

export const FromThePeopleDates = ({ index, control, label }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `fromThePeople.${index}.dates`,
  });

  const { company } = useCompanyStore();
  if (!company) return null;

  return (
    <div className="w-full flex items-center gap-4 p-2">
      <p className="max-w-[96px] w-full shrink-0 text-[14px]">{label}</p>

      <div className="flex flex-col gap-3 w-full">
        {fields.map((field, k) => (
          <FormField
            key={field.id}
            control={control}
            name={`fromThePeople.${index}.dates.${k}.date`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <div className="flex items-center gap-2">
                    <PopoverTrigger asChild>
                      <FormControl className="border-black/[.08]">
                        <Button
                          variant={"outline"}
                          className={cn(
                            "relative w-full border-black/[.08] bg-transparent pl-3 text-left font-normal",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <Button
                      type="button"
                      onClick={() => remove(k)}
                      className="bg-red-500"
                      variant={"ghost"}
                      size={"icon"}
                    >
                      <XIcon className="h-2 w-2 text-white" />
                    </Button>
                  </div>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          onClick={() => append({ date: "" })}
          type="button"
          className={cn(
            "bg-black w-fit flex px-3 py-2 gap-2 hover:bg-black/80",
            colorizeButton(company.name),
          )}
        >
          <PlusIcon color="white" />
          <span className="text-white ty-subtitle">Add a date</span>
        </Button>
      </div>
    </div>
  );
};
