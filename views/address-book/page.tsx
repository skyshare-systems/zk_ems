"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { geist } from "@/public/fonts";
import { useAddressBook } from "@/store/address-book-tab";
import React, { useState, useEffect } from "react";
import AddRecipient from "./add-recipient";
import CreateGroup from "./create-group";
import UserTable from "./recipient-table";
import SearchbarIcon from "@/components/icons/searchbar";
import GroupTable from "./group-table";
import { useDebounce } from "react-use";
import { useQuery } from "@tanstack/react-query";
import { getAddressBookGroup } from "@/lib/query/address-book-groups";
import { useCompanyStore } from "@/store/company";
import { MultiSelect } from "@/components/multi-select";

const AddressBookSection = () => {
  const tabs = ["recipients", "groups"];

  const { tab, setTab } = useAddressBook((state) => state);
  const { company } = useCompanyStore();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedGroupId, setSelectedGroupId] = useState<string[]>([]);

  const { data: groupsResp } = useQuery({
    queryKey: ["address-book-groups", company?.id],
    queryFn: () =>
      getAddressBookGroup({
        params: `companyId=${company?.id}&limit=1000`,
      }),
    enabled: !!company?.id && tab === "recipients",
  });

  const allGroups = groupsResp?.data ?? [];

  const [, cancel] = useDebounce(
    () => {
      setDebouncedSearch(search);
      setPage(1);
    },
    1500,
    [search],
  );

  useEffect(() => {
    setSearch("");
    setDebouncedSearch("");
    setSelectedGroupId([]);
    setPage(1);
  }, [tab]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedGroupId([]);
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
  };

  const handleGroupFilterChange = (values: string[]) => {
    setSelectedGroupId(values);
    setPage(1);
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-start justify-start w-full gap-6">
        <h4 className={cn(geist.className, "ty-subheading text-white-100")}>
          Address Book
        </h4>
        <div className="flex flex-row items-center justify-between w-full gap-3">
          <div className="flex flex-row items-start justify-start">
            {tabs.map((data, index) => {
              return (
                <button
                  onClick={() => setTab(data)}
                  key={index}
                  className={cn(
                    geist.className,
                    "px-4 py-2 border-b capitalize ease-out duration-300 ty-descriptions",
                    `${tab === data ? " text-gold_v2-100 border-b-gold_v2-100 " : " text-white border-transparent hover:border-b-gold_v2-100 hover:text-gold_v2-100 hover:font-bold "}`,
                  )}
                >
                  {data}
                </button>
              );
            })}
          </div>
          <div className="flex flex-row items-center gap-3">
            {tab === "recipients" && (
              <div className="">
                <MultiSelect
                  options={allGroups.map((group: any) => ({
                    value: group.id,
                    label: `@${group.name}`,
                  }))}
                  value={selectedGroupId}
                  onValueChange={handleGroupFilterChange}
                  placeholder="Filter by groups..."
                />
              </div>
            )}

            <div
              className={cn(
                "flex items-center gap-2 py-3 px-4 border border-white_v2-16 bg-white_v2-4 rounded-lg self-stretch relative",
              )}
            >
              <SearchbarIcon />
              <input
                value={search}
                onChange={handleSearchChange}
                className={cn(
                  geist.className,
                  "outline-0 bg-transparent ty-descriptions placeholder:text-white_v2-32 flex-1 min-w-[200px]",
                )}
                placeholder={`Search ${tab}...`}
              />
              {search && (
                <button
                  onClick={clearSearch}
                  className="text-white_v2-32 hover:text-white_v2-100 transition-colors"
                  type="button"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            <AddRecipient />
            <CreateGroup />
          </div>
        </div>

        {(debouncedSearch || selectedGroupId.length > 0) && (
          <div
            className={cn(
              geist.className,
              "text-white_v2-50 ty-descriptions flex items-center gap-2",
            )}
          >
            <span>
              {search !== debouncedSearch && debouncedSearch ? (
                `Searching for "${search}"...`
              ) : (
                <>
                  Showing results
                  {debouncedSearch && ` for "${debouncedSearch}"`}
                  {selectedGroupId.length > 0 && (
                    <>
                      {" "}
                      in {selectedGroupId.length} group
                      {selectedGroupId.length > 1 ? "s" : ""}:{" "}
                      {selectedGroupId
                        .map((id) => {
                          const group = allGroups.find((g: any) => g.id === id);
                          return group ? `@${group.name}` : "";
                        })
                        .filter(Boolean)
                        .join(", ")}
                    </>
                  )}
                  {tab === "recipients" ? " in recipients" : " in groups"}
                </>
              )}
            </span>
            <button
              onClick={clearFilters}
              className="text-gold_v2-100 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {tab === "recipients" && (
          <UserTable
            limit={limit}
            page={page}
            search={debouncedSearch}
            groupFilter={selectedGroupId}
          />
        )}
        {tab === "groups" && (
          <GroupTable limit={limit} page={page} search={debouncedSearch} />
        )}
      </div>
    </div>
  );
};

export default AddressBookSection;
