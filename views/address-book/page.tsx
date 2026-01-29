"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { geist } from "@/public/fonts";
import { useAddressBook } from "@/store/address-book-tab";
import React, { useState, useEffect, useCallback } from "react";
import AddRecipient from "./add-recipient";
import CreateGroup from "./create-group";
import UserTable from "./recipient-table";
import SearchbarIcon from "@/components/icons/searchbar";
import GroupTable from "./group-table";
import { useDebounce } from "react-use";
import { useQuery } from "@tanstack/react-query";
import { getAddressBookGroup } from "@/lib/query/address-book-groups";
import { useCompanyStore } from "@/store/company";
import { MultiSelect } from "@/components/multi-select-v2";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddressBookSection = () => {
  const tabs = ["recipients", "groups"];

  const { tab, setTab } = useAddressBook((state) => state);
  const { company } = useCompanyStore();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedGroupId, setSelectedGroupId] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Groups pagination state
  const [groupPage, setGroupPage] = useState(1);
  const [groupLimit, setGroupLimit] = useState(10);
  const [groupTotalPages, setGroupTotalPages] = useState(1);

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

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleMetaChange = useCallback((meta: { totalPage: number; total: number }) => {
    setTotalPages(meta.totalPage);
  }, []);

  const handleLimitChange = (value: string) => {
    setLimit(parseInt(value));
    setPage(1);
  };

  // Groups pagination handlers
  const handleGroupPageChange = useCallback((newPage: number) => {
    setGroupPage(newPage);
  }, []);

  const handleGroupMetaChange = useCallback((meta: { totalPage: number; total: number }) => {
    setGroupTotalPages(meta.totalPage);
  }, []);

  const handleGroupLimitChange = (value: string) => {
    setGroupLimit(parseInt(value));
    setGroupPage(1);
  };

  // Generate page numbers for groups pagination
  const getGroupPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (groupTotalPages <= maxVisible) {
      for (let i = 1; i <= groupTotalPages; i++) {
        pages.push(i);
      }
    } else {
      if (groupPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(groupTotalPages);
      } else if (groupPage >= groupTotalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = groupTotalPages - 3; i <= groupTotalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("ellipsis");
        pages.push(groupPage - 1);
        pages.push(groupPage);
        pages.push(groupPage + 1);
        pages.push("ellipsis");
        pages.push(groupTotalPages);
      }
    }

    return pages;
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("ellipsis");
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center p-8 pb-24">
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
                    label: `@${group?.tag}`,
                    style: { color: group?.color },
                  }))}
                  value={selectedGroupId}
                  onValueChange={handleGroupFilterChange}
                  placeholder="Filter by groups..."
                  className="self-stretch"
                />
              </div>
            )}

            <div className="flex items-center gap-2 h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background">
              <SearchbarIcon className="h-4 w-4 text-muted-foreground" />
              <input
                value={search}
                onChange={handleSearchChange}
                className={cn(
                  geist.className,
                  "flex-1 min-w-[200px] bg-transparent outline-none placeholder:text-muted-foreground",
                )}
                placeholder={`Search ${tab}...`}
              />
              {search && (
                <button
                  onClick={clearSearch}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  type="button"
                >
                  <svg
                    width="14"
                    height="14"
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
          <>
            <UserTable
              limit={limit}
              page={page}
              search={debouncedSearch}
              groupFilter={selectedGroupId}
              onPageChange={handlePageChange}
              onMetaChange={handleMetaChange}
            />

            {/* Pagination - Always show for rows per page selector */}
            <div className="flex items-center justify-between w-full mt-4">
              <div className="flex items-center gap-2">
                <span className={cn(geist.className, "text-white_v2-50 ty-descriptions")}>
                  Rows per page:
                </span>
                <Select value={limit.toString()} onValueChange={handleLimitChange}>
                  <SelectTrigger className="w-[70px] bg-white_v2-4 border-white_v2-16">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {totalPages > 1 ? (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className={page === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                      />
                    </PaginationItem>

                    {getPageNumbers().map((pageNum, idx) =>
                      pageNum === "ellipsis" ? (
                        <PaginationItem key={`ellipsis-${idx}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => handlePageChange(pageNum)}
                            isActive={page === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className={page === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              ) : (
                <div /> /* Empty spacer when no pagination needed */
              )}

              <span className={cn(geist.className, "text-white_v2-50 ty-descriptions")}>
                Page {page} of {totalPages}
              </span>
            </div>
          </>
        )}
        {tab === "groups" && (
          <>
            <GroupTable
              limit={groupLimit}
              page={groupPage}
              search={debouncedSearch}
              onPageChange={handleGroupPageChange}
              onMetaChange={handleGroupMetaChange}
            />

            {/* Groups Pagination */}
            <div className="flex items-center justify-between w-full mt-4">
              <div className="flex items-center gap-2">
                <span className={cn(geist.className, "text-white_v2-50 ty-descriptions")}>
                  Rows per page:
                </span>
                <Select value={groupLimit.toString()} onValueChange={handleGroupLimitChange}>
                  <SelectTrigger className="w-[70px] bg-white_v2-4 border-white_v2-16">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {groupTotalPages > 1 ? (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handleGroupPageChange(Math.max(1, groupPage - 1))}
                        disabled={groupPage === 1}
                        className={groupPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                      />
                    </PaginationItem>

                    {getGroupPageNumbers().map((pageNum, idx) =>
                      pageNum === "ellipsis" ? (
                        <PaginationItem key={`group-ellipsis-${idx}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={`group-${pageNum}`}>
                          <PaginationLink
                            onClick={() => handleGroupPageChange(pageNum)}
                            isActive={groupPage === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handleGroupPageChange(Math.min(groupTotalPages, groupPage + 1))}
                        disabled={groupPage === groupTotalPages}
                        className={groupPage === groupTotalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              ) : (
                <div />
              )}

              <span className={cn(geist.className, "text-white_v2-50 ty-descriptions")}>
                Page {groupPage} of {groupTotalPages}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddressBookSection;
