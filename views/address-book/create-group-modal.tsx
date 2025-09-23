"use client";

import CancelIcon from "@/components/icons/cancel";
import DoneIcon from "@/components/icons/done";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { createAddressBookGroup } from "@/lib/mutation/address-book-group/address-book-group";
import { cn, shortenText } from "@/lib/utils";
import { geist, inter } from "@/public/fonts";
import { useModalCreateGroup } from "@/store/modal-create-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import InputColor from "react-input-color";
import { useCompanyStore } from "@/store/company";
import { getAddressBookRecipients } from "@/lib/query/address-book-recipients";
import { useDebounce } from "react-use";
import { toast } from "sonner";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  tag: z.string().min(1, "Group tag is required"),
  color: z.string().min(1, "Group color is required"),
  recipientIds: z.array(z.string()).min(1, "At least one recipient required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateGroupModal() {
  const queryClient = useQueryClient();
  const { isOpen, onClose } = useModalCreateGroup((store) => store);

  const company = useCompanyStore((s) => s.company);

  // color presets
  const presets = [
    "#F4C430",
    "#F28C28",
    "#E94B3C",
    "#E91E63",
    "#9C27B0",
    "#2196F3",
    "#26C6DA",
    "#2ECC71",
  ];

  // search + debounce
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  useDebounce(() => setDebouncedSearch(search), 500, [search]);

  // pagination
  const [page, setPage] = React.useState(1);
  const [allRecipients, setAllRecipients] = React.useState<any[]>([]);

  // fetch recipients
  const { data, isFetching } = useQuery({
    queryKey: ["address-book-recipients", company?.id, debouncedSearch, page],
    queryFn: async () =>
      getAddressBookRecipients({
        companyId: company?.id || "",
        limit: 20,
        offset: (page - 1) * 20,
        search: debouncedSearch,
      }),
    enabled: !!company?.id,
    staleTime: 1000 * 60 * 5,
  });

  // merge pages into allRecipients
  React.useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        setAllRecipients(data.data);
      } else {
        setAllRecipients((prev) => [...prev, ...data.data]);
      }
    }
  }, [data, page]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tag: "",
      color: "#F4C430",
      recipientIds: [],
    },
  });

  const { mutate: createGroup, isPending } = useMutation({
    mutationFn: createAddressBookGroup,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["address-book-groups", company?.id],
      });

      toast.success(`Group "${variables.name}" created successfully!`);

      // reset state after success
      form.reset();
      setPage(1);
      setSearch("");
      setAllRecipients([]);

      onClose();
    },
    onError: () => {
      toast.error("Failed to create group. Please try again.");
    },
  });

  function onSubmit(values: FormValues) {
    if (!company?.id) return;
    createGroup({ ...values, companyId: company.id });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center bg-black_v2-32 backdrop-blur w-full h-full z-[3]">
      <div className="flex flex-col items-start justify-start p-8 gap-6 max-w-[500px] w-full grow rounded-lg border border-white_v2-16 bg-black_v2-100">
        {/* Header */}
        <div className="flex justify-between items-start w-full">
          <div>
            <h3
              className={cn(inter.className, "text-white_v2-100 ty-subheading")}
            >
              Create a Group
            </h3>
            <p
              className={cn(
                geist.className,
                "ty-descriptions text-white_v2-50",
              )}
            >
              Organize subscribers into a new mailing group.
            </p>
          </div>
          <button onClick={onClose}>
            <CancelIcon />
          </button>
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full"
          >
            {/* Group Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel className="min-w-[96px] text-white_v2-32 ty-descriptions">
                    Group Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your group name here.."
                      className="rounded-lg border border-white_v2-8 bg-white_v2-8 text-white_v2-100 grow p-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Group Tag */}
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel className="min-w-[96px] text-white_v2-32 ty-descriptions">
                    Group Tag
                  </FormLabel>
                  <FormControl>
                    <div className="relative grow">
                      <div className="flex items-center gap-2 absolute top-1/2 left-3 transform -translate-y-1/2">
                        <p
                          className={cn(
                            geist.className,
                            "text-white_v2-72 ty-descriptions",
                          )}
                        >
                          @
                        </p>
                        <div className="bg-white_v2-16 w-[1px] h-[29px]" />
                      </div>
                      <Input
                        placeholder="Tag name here."
                        className="rounded-lg border border-white_v2-8 bg-white_v2-8 text-white_v2-100 grow py-3 pr-3 pl-11"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Group Color */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel className="text-white_v2-32 min-w-[96px] ty-descriptions">
                    Tag Color
                  </FormLabel>
                  <div className="flex flex-col gap-2 items-start">
                    {/* color text input */}
                    <Input
                      type="text"
                      readOnly
                      {...field}
                      value={field.value}
                      placeholder="#F4C430"
                      className="rounded-lg border border-white_v2-8 bg-white_v2-8 text-white_v2-100 p-3 hidden"
                    />

                    {/* presets */}
                    <div className="flex items-center gap-2">
                      {presets.map((hex) => {
                        const preset = hex.toLowerCase();
                        const isActive = field.value?.toLowerCase() === preset;
                        return (
                          <button
                            key={hex}
                            type="button"
                            onClick={() =>
                              form.setValue("color", preset, {
                                shouldValidate: true,
                              })
                            }
                            className="w-[34.5px] h-[34.5px] rounded flex items-center justify-center transition"
                            style={{ backgroundColor: preset }}
                            aria-label={`Pick ${hex}`}
                          >
                            {isActive && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="14"
                                viewBox="0 0 17 14"
                                fill="none"
                              >
                                <path
                                  d="M1.25 9.16284L4.75 12.6628L15.25 1.66284"
                                  stroke="#000205"
                                  strokeWidth="1.5"
                                  strokeLinecap="square"
                                />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* free picker */}
                    <div className="flex items-center gap-1">
                      <InputColor
                        initialValue={field.value || "#F4C430"}
                        onChange={(v: any) =>
                          form.setValue("color", v?.hex || "#F4C430", {
                            shouldValidate: true,
                          })
                        }
                        placement="right"
                      />
                      <p className="text-white_v2-50 ty-descriptions">
                        {(form.watch("color") || "#F4C430").toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Recipients */}
            <FormField
              control={form.control}
              name="recipientIds"
              render={({ field }) => (
                <FormItem className="flex flex-col items-end  gap-2 w-full">
                  <div className="flex items-center gap-2 w-full">
                    <FormLabel className="text-white_v2-32 ty-descriptions min-w-[96px]">
                      Recipients
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="w-full text-left text-white_v2-100 bg-white_v2-8 border border-white_v2-8 p-3 rounded-lg text-white_v2-32 ty-descriptions hover:border-white_v2-100 ease-out">
                            Add a recipient here..
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-full max-w-sm">
                          <Command>
                            <CommandInput
                              placeholder="Search recipients..."
                              value={search}
                              onValueChange={(val) => {
                                setSearch(val);
                                setPage(1);
                              }}
                            />
                            <CommandEmpty>No recipient found.</CommandEmpty>
                            <CommandGroup>
                              {allRecipients.map((r: any) => (
                                <CommandItem
                                  key={r.id}
                                  onSelect={() => {
                                    if (!field.value.includes(r.id)) {
                                      field.onChange([...field.value, r.id]);
                                    }
                                  }}
                                >
                                  <div className="flex items-center gap-3">
                                    {r?.photoUrl ? (
                                      <img
                                        src={r.photoUrl}
                                        alt={r.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                      />
                                    ) : (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="15"
                                        viewBox="0 0 16 15"
                                        fill="none"
                                        className="min-w-[32px] min-h-[32px]"
                                      >
                                        <path
                                          d="M8 0.496094C11.958 0.496094 15.167 3.70505 15.167 7.66309C15.167 11.6211 11.958 14.8301 8 14.8301C4.04196 14.8301 0.833008 11.6211 0.833008 7.66309C0.833008 3.70505 4.04196 0.496094 8 0.496094ZM8 9.16309C6.56944 9.16309 5.26976 9.72416 4.32031 10.6357C4.22221 10.7299 4.16708 10.8601 4.16699 10.9961C4.16699 11.1322 4.22211 11.2631 4.32031 11.3574C5.26975 12.2689 6.56951 12.8301 8 12.8301C9.43049 12.8301 10.7303 12.2689 11.6797 11.3574C11.7779 11.2631 11.833 11.1322 11.833 10.9961C11.8329 10.8601 11.7778 10.7299 11.6797 10.6357C10.7302 9.72416 9.43056 9.16309 8 9.16309ZM7.99414 3.83008C6.79709 3.83019 5.82537 4.79903 5.8252 5.99609C5.8252 7.19331 6.79698 8.16297 7.99414 8.16309C9.1914 8.16309 10.1631 7.19338 10.1631 5.99609C10.1629 4.79896 9.19129 3.83008 7.99414 3.83008Z"
                                          fill="#F3BC30"
                                        />
                                      </svg>
                                    )}

                                    <div className="flex flex-col">
                                      <span className="font-medium text-white_v2-100">
                                        {r.name}
                                      </span>
                                      <span className="text-xs text-white_v2-50">
                                        {r.emailAddress}
                                      </span>
                                    </div>
                                  </div>
                                </CommandItem>
                              ))}
                              {data?.meta?.hasNextPage && (
                                <CommandItem
                                  disabled={isFetching}
                                  onSelect={() => setPage((p) => p + 1)}
                                >
                                  {isFetching ? "Loading..." : "Load more…"}
                                </CommandItem>
                              )}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </div>

                  {/* Selected badges */}
                  <div className="flex flex-wrap justify-end gap-2 mt-2 max-w-[330px]">
                    {field.value.map((id) => {
                      const r = allRecipients.find((rec) => rec.id === id);
                      return (
                        <span
                          key={id}
                          className="px-2 py-1 rounded-full bg-white_v2-8 text-white_v2-100 ty-subtext flex items-center gap-1"
                        >
                          {r?.photoUrl ? (
                            <Image
                              src={r?.photoUrl}
                              alt={r?.name}
                              height={24}
                              width={24}
                              className="rounded-full"
                            />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="15"
                              viewBox="0 0 16 15"
                              fill="none"
                            >
                              <path
                                d="M8 0.496094C11.958 0.496094 15.167 3.70505 15.167 7.66309C15.167 11.6211 11.958 14.8301 8 14.8301C4.04196 14.8301 0.833008 11.6211 0.833008 7.66309C0.833008 3.70505 4.04196 0.496094 8 0.496094ZM8 9.16309C6.56944 9.16309 5.26976 9.72416 4.32031 10.6357C4.22221 10.7299 4.16708 10.8601 4.16699 10.9961C4.16699 11.1322 4.22211 11.2631 4.32031 11.3574C5.26975 12.2689 6.56951 12.8301 8 12.8301C9.43049 12.8301 10.7303 12.2689 11.6797 11.3574C11.7779 11.2631 11.833 11.1322 11.833 10.9961C11.8329 10.8601 11.7778 10.7299 11.6797 10.6357C10.7302 9.72416 9.43056 9.16309 8 9.16309ZM7.99414 3.83008C6.79709 3.83019 5.82537 4.79903 5.8252 5.99609C5.8252 7.19331 6.79698 8.16297 7.99414 8.16309C9.1914 8.16309 10.1631 7.19338 10.1631 5.99609C10.1629 4.79896 9.19129 3.83008 7.99414 3.83008Z"
                                fill="#F3BC30"
                              />
                            </svg>
                          )}
                          {shortenText(r?.name || id, 17)}
                          {/* {r?.name || id} */}
                          <button
                            type="button"
                            onClick={() =>
                              field.onChange(
                                field.value.filter((x) => x !== id),
                              )
                            }
                          >
                            <CancelIcon />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end w-full gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                <DoneIcon /> Done
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
