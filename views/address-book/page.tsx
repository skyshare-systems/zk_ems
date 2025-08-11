"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { geist } from "@/public/fonts";
import { useAddressBook } from "@/store/address-book-tab";
import React, { useState } from "react";
import AddRecipient from "./add-recipient";
import CreateGroup from "./create-group";
import UserTable from "./recipient-table";
import SearchbarIcon from "@/components/icons/searchbar";
import { Input } from "@/components/ui/input";
import GroupTable from "./group-table";
import { useDebounce } from "react-use";
import { Prisma } from "@prisma/client";




const AddressBookSection = () => {
  const tabs = ["recipients", "groups"];

  const { tab, setTab } = useAddressBook((state) => state);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [, cancel] = useDebounce(
    () => {
      setDebouncedSearch(search);
    },
    1500,
    [search],
  );

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
          <div className="flex flex-wrap items-center gap-3">
            <div
              className={cn(
                "flex items-center gap-2 py-3 px-4 border border-white_v2-16 bg-white_v2-4 rounded-lg self-stretch",
              )}
            >
              <SearchbarIcon />
              <input
                className={cn(
                  geist.className,
                  "outline-0 bg-transparent ty-descriptions placeholder:text-white_v2-32",
                )}
                placeholder="Search"
              />
            </div>
            <AddRecipient />

            <CreateGroup />
          </div>
        </div>
        {/* table */}

        {tab === "recipients" && (
          <UserTable limit={limit} page={page} search={debouncedSearch} />
        )}
        {tab === "groups" && <GroupTable />}
      </div>
    </div>
  );
};

export default AddressBookSection;
