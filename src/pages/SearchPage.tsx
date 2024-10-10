import Icon from "@/components/Icon";
import { useState } from "react";
import { DatePickerWithRange } from "@/components/ui/rangedatepicker";
import { Input } from "@/components/ui/input";
import { CategorySearch } from "@/components/ui/categorysearch";
import ErrandCard from "@/components/ErrandCard";
import getCategoryList from "../../sample-data/getCategoryList.json";
import getAllErrands from "../../sample-data/getAllErrands.json";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  let allErrands = getAllErrands;
  const handleSearch = () => {
    //call search API
    setSearch(search);
  };
  const categoryList = getCategoryList;
  return (
    <div>
      <div className="fixed top-10 left-0 z-10 bg-background py-10 pl-5 md:pl-[100px] pr-8 w-full grid grid-cols-1 md:grid-cols-1 lg:grid-flow-col gap-3 justify-between mb-10">
        <div>
          <span className="text-2xl text-foreground">Search </span>
          <span className="text-2xl text-primary">Errands</span>
        </div>
        <div className="grid grid-cols-1 md:grid-flow-col md:auto-cols-min gap-3">
          <div className="flex gap-3">
            <button className="flex-center bg-accent hover:bg-accent/50 p-2 rounded-lg gap-1">
              <Icon name="Plus" size={20} className="text-foreground" />
            </button>

            <div
              className="flex relative w-80
             items-center"
            >
              <Input
                type="text"
                placeholder="Search"
                className="font-koulen "
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                onClick={handleSearch}
                className={
                  "absolute right-0 px-3 py-2 rounded-lg " +
                  (search === "" ? "bg-transparent" : "bg-primary")
                }
                {...(search === "" ? { disabled: true } : {})}
              >
                <Icon
                  name="Search"
                  className={
                    "w-5 h-5 " +
                    (search === ""
                      ? "text-foreground opacity-50"
                      : "text-primary-foreground")
                  }
                />
              </button>
            </div>
          </div>
          <DatePickerWithRange />
          <CategorySearch categoryList={categoryList} />
        </div>
      </div>

      <div className="mt-80 lg:mt-40 md:mt-60 w-full h-fit grid grid-cols-1 md:grid-cols-4 gap-y-3 md:gap-y-5 gap-x-3">
        {allErrands.map((errandItem, index) => (
          <ErrandCard key={index} dataItem={errandItem} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
