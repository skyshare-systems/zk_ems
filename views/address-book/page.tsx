import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { geist } from "@/public/fonts";
import { useAddressBook } from "@/store/address-book-tab";
import React from "react";
import AddRecipient from "./add-recipient";
import CreateGroup from "./create-group";
import UserTable from "./recipient-table";

const AddressBookSection = () => {
  const tabs = ["recipients", "groups"];

  const { tab, setTab } = useAddressBook((state) => state);

  return (
    <div className="flex justify-center items-center p-8">
      <div className="flex flex-col gap-6 items-start justify-start w-full">
        <h4 className={cn(geist.className, "ty-subheading text-white-100")}>
          Address Book
        </h4>
        <div className="flex flex-row justify-between items-center gap-3 w-full">
          <div className="flex flex-row  items-start justify-start">
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
            <AddRecipient />
            <CreateGroup />
          </div>
        </div>
        {/* table */}

        <UserTable />
      </div>
    </div>
  );
};

export default AddressBookSection;
