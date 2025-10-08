"use client";

import { useState, useEffect, useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "react-use";
import InputColor from "react-input-color";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CancelIcon from "@/components/icons/cancel";
import DoneIcon from "@/components/icons/done";
import { cn, shortenText } from "@/lib/utils";
import { geist, inter } from "@/public/fonts";
import { updateAddressBookGroup } from "@/lib/mutation/address-book-group/address-book-group";
import { getAddressBookRecipients } from "@/lib/query/address-book-recipients";
import { useAddressBookGroupStore } from "@/store/address-book-groups";
import { useCompanyStore } from "@/store/company";
import { toast } from "sonner";
import Image from "next/image";

// Popover + Command
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

// -------- Validation schema
const formSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  tag: z.string().min(1, "Tag is required"),
  color: z.string().min(1, "Color is required"),
  recipientIds: z.array(z.string()).optional(),
});
type FormValues = z.infer<typeof formSchema>;

// -------- Types
interface Recipient {
  id: string;
  name: string;
  emailAddress: string;
  photoUrl?: string | null;
}

interface IEditGroup {
  onClose: () => void;
  actionType: "edit" | "delete" | null;
}

interface UpdateAddressBookGroupPayload {
  name?: string;
  tag?: string;
  color?: string;
  recipientIds?: string[];
}

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

export default function EditGroup({ actionType, onClose }: IEditGroup) {
  const { group } = useAddressBookGroupStore();
  const { company } = useCompanyStore();
  const queryClient = useQueryClient();

  const [color, setColor] = useState<{ hex: string }>({
    hex: group?.color || "#F4C430",
  });

  // API search with debounce
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  useDebounce(() => setDebouncedSearchQuery(searchQuery), 500, [searchQuery]);

  // Query recipients with API search
  const { data: recipientsData, isFetching } = useQuery({
    queryKey: ["address-book-recipients", company?.id, debouncedSearchQuery],
    queryFn: () =>
      getAddressBookRecipients({
        companyId: company?.id || "",
        search: debouncedSearchQuery,
        limit: 50, // Reduced limit for API efficiency
        offset: 0,
      }),
    enabled: !!company?.id,
    staleTime: 30000, // Cache results for 30 seconds
  });

  const recipients: Recipient[] = recipientsData?.data ?? [];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: group?.name || "",
      tag: group?.tag?.replace("@", "") || "",
      color: group?.color || "#F4C430",
      recipientIds: group?.recipients.map((r) => r.id) || [],
    },
  });

  const { mutate: updateGroup, isPending } = useMutation({
    mutationFn: (payload: UpdateAddressBookGroupPayload) =>
      updateAddressBookGroup({
        id: group?.id || "",
        ...payload,
        setIds: payload.recipientIds,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["address-book-groups", company?.id],
      });
      toast.success("Group updated successfully");
      onClose();
    },
    onError: (error) => {
      toast.error(`Failed to update group: ${error}`);
    },
  });

  // Reset form when group changes
  useEffect(() => {
    if (group) {
      form.reset({
        name: group.name,
        tag: group.tag.replace("@", ""),
        color: group.color,
        recipientIds: group.recipients.map((r) => r.id),
      });
      setColor({ hex: group.color });
    }
  }, [group, form]);

  // Create a map for selected recipients to ensure they're always available for badge rendering
  const selectedRecipientsMap = useMemo(() => {
    const map = new Map<string, Recipient>();

    // Add current search results
    recipients.forEach((r) => map.set(r.id, r));

    // Always include existing group recipients for badge display
    group?.recipients?.forEach((r: any) => {
      if (!map.has(r.id)) {
        map.set(r.id, r);
      }
    });

    return map;
  }, [recipients, group]);

  if (actionType !== "edit" || !group) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black_v2-32 backdrop-blur z-[3]">
      <div className="flex flex-col items-start justify-start p-8 gap-4 max-w-[500px] w-full rounded-lg border border-white_v2-16 bg-black_v2-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between w-full">
          <h3
            className={cn(inter.className, "text-white_v2-100 ty-subheading")}
          >
            Edit Group
          </h3>
          <button onClick={onClose} disabled={isPending}>
            <CancelIcon />
          </button>
        </div>
        <p className={cn(geist.className, "ty-descriptions text-white_v2-50")}>
          Make changes to your group's name, contacts, or preferences.
        </p>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              updateGroup({
                ...values,
                color: color.hex,
                tag: values.tag.startsWith("@") ? values.tag : `@${values.tag}`,
              }),
            )}
            className="flex flex-col w-full gap-4"
          >
            {/* Group Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex items-center w-full gap-2">
                  <FormLabel className="min-w-[96px]">Group Name</FormLabel>
                  <div className="flex flex-col grow">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your group name here.."
                        className="p-3 border rounded-lg border-white_v2-8 bg-white_v2-8 text-white_v2-100 grow"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Tag */}
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem className="flex items-center w-full gap-2">
                  <FormLabel className="min-w-[96px]">Group Tag</FormLabel>
                  <div className="flex flex-col grow">
                    <FormControl>
                      <div className="relative grow">
                        <div className="absolute flex items-center gap-2 -translate-y-1/2 top-1/2 left-3">
                          <span className="text-white_v2-72">@</span>
                          <div className="bg-white_v2-16 w-[1px] h-[29px]" />
                        </div>
                        <Input
                          {...field}
                          placeholder="Tag name here."
                          className="py-3 pr-3 border rounded-lg pl-11 border-white_v2-8 bg-white_v2-8 text-white_v2-100"
                          disabled={isPending}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Color */}
            <FormItem className="flex items-start w-full gap-2">
              <FormLabel className="min-w-[96px] mt-2">Color</FormLabel>
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  {presets.map((hex) => {
                    const preset = hex.toLowerCase();
                    const isActive = color.hex.toLowerCase() === preset;
                    return (
                      <button
                        key={hex}
                        type="button"
                        disabled={isPending}
                        onClick={() => {
                          setColor({ hex: preset });
                          form.setValue("color", preset);
                        }}
                        className={cn(
                          "w-[34.5px] h-[34.5px] rounded flex items-center justify-center transition disabled:opacity-50",
                        )}
                        style={{ backgroundColor: preset }}
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
                <div className="flex items-center gap-1">
                  <InputColor
                    initialValue={color.hex}
                    onChange={(v: any) => {
                      setColor({ hex: v?.hex || "#F4C430" });
                      form.setValue("color", v?.hex || "#F4C430");
                    }}
                    placement="right"
                    disabled={isPending}
                  />
                  <p className="text-white_v2-50">{color.hex.toUpperCase()}</p>
                </div>
              </div>
            </FormItem>

            {/* Recipients - API Search */}
            <FormField
              control={form.control}
              name="recipientIds"
              render={({ field }) => (
                <FormItem className="flex flex-col items-end gap-2 w-full">
                  <div className="flex items-center gap-2 w-full">
                    <FormLabel className="text-white_v2-32 ty-descriptions min-w-[96px]">
                      Recipients
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="w-full text-left text-white_v2-100 bg-white_v2-8 border border-white_v2-8 p-3 rounded-lg text-white_v2-32 ty-descriptions hover:border-white_v2-100 ease-out">
                            Search and add recipients
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full max-w-sm p-0">
                          <Command shouldFilter={false}>
                            <CommandInput
                              placeholder="Search recipients..."
                              value={searchQuery}
                              onValueChange={setSearchQuery}
                            />
                            <CommandEmpty>
                              {isFetching
                                ? "Searching..."
                                : searchQuery.trim()
                                  ? "No recipients found for your search."
                                  : "Type to search recipients..."}
                            </CommandEmpty>
                            <CommandGroup>
                              {isFetching && searchQuery.trim() && (
                                <div className="flex items-center justify-center py-4">
                                  <div className="w-4 h-4 border-2 rounded-full border-white_v2-50 border-t-transparent animate-spin" />
                                </div>
                              )}
                              {!isFetching &&
                                recipients.length > 0 &&
                                recipients.map((r) => {
                                  const selected = (field.value || []).includes(
                                    r.id,
                                  );
                                  return (
                                    <CommandItem
                                      key={r.id}
                                      onSelect={() => {
                                        if (selected) {
                                          field.onChange(
                                            (field.value || []).filter(
                                              (x) => x !== r.id,
                                            ),
                                          );
                                        } else {
                                          field.onChange([
                                            ...(field.value || []),
                                            r.id,
                                          ]);
                                        }
                                      }}
                                    >
                                      <div className="flex items-center gap-3">
                                        <img
                                          src={
                                            r.photoUrl || "/default-avatar.png"
                                          }
                                          alt={r.name}
                                          className="object-cover w-8 h-8 rounded-full"
                                        />
                                        <div className="flex flex-col">
                                          <span className="font-medium text-white_v2-100">
                                            {r.name}
                                          </span>
                                          <span className="text-xs text-white_v2-50">
                                            {r.emailAddress}
                                          </span>
                                        </div>
                                      </div>
                                      {selected && (
                                        <span className="ml-auto text-xs text-white_v2-72">
                                          Selected
                                        </span>
                                      )}
                                    </CommandItem>
                                  );
                                })}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </div>

                  {/* Selected Recipients Badges */}
                  {(field.value || []).length > 0 && (
                    <div className="flex flex-wrap justify-end gap-2 mt-2 max-w-[330px]">
                      {(field.value || []).map((id) => {
                        const recipient = selectedRecipientsMap.get(id);
                        return (
                          <span
                            key={id}
                            className="px-2 py-1 rounded-full bg-white_v2-8 text-white_v2-100 ty-subtext flex items-center gap-1"
                          >
                            {recipient?.photoUrl ? (
                              <Image
                                src={recipient?.photoUrl}
                                alt={recipient?.name || id}
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
                            {shortenText(recipient?.name || id, 17)}

                            <button
                              type="button"
                              onClick={() =>
                                field.onChange(
                                  (field.value || []).filter((x) => x !== id),
                                )
                              }
                              title="Remove recipient"
                            >
                              <CancelIcon />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end w-full gap-2 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={isPending}
                className="flex items-center gap-2 "
              >
                <CancelIcon /> Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-gold_v2-100"
              >
                {isPending ? (
                  <div className="w-4 h-4 border-2 border-gold_v2-100 rounded-full border-t-transparent animate-spin" />
                ) : (
                  <DoneIcon />
                )}
                {isPending ? "Saving..." : "Done"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
