import { useState, useEffect } from "react";
import Icon from "../components/Icon";
import BentoMetrics from "../components/operrands-app/BentoMetrics";
import HomeErrandList from "../components/operrands-app/HomeErrandList";
import getHomeErrands from "../../sample-data/getHomeErrands.json";

import AddErrandButton from "@/components/operrands-app/ErrandItemCrud/AddErrandButton";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const HomePage = () => {
  const [search, setSearch] = useState("");

  const errandsHomeData = getHomeErrands;
  useEffect(() => {
    setTimeout(() => {
      toast("Note: This website is currently a work in progress.", {
        position: "top-center",
        className: "justify-center font-koulen",
      });
    }, 100);
  }, []);

  return (
    <div className="mt-20 h-full flex flex-col">
      <div className="flex mb-10">
        <div className="flex flex-col justify-between h-32 md:h-full basis-full md:basis-1/2">
          <div>
            <span className="text-2xl text-foreground">Hello, </span>
            <span className="text-2xl text-primary">Jimuel Medrano</span>
            <br />
            <span className="text-sm text-foreground">
              Level up your day by clearing your errands
            </span>
          </div>
          <div className="flex gap-3">
            <div
              className="flex relative w-full max-w-96
             items-center"
            >
              <Input
                type="text"
                placeholder="Search"
                className="font-koulen"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
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
            <AddErrandButton />
          </div>
        </div>
        <div className="basis-0 md:basis-1/2 hidden md:flex items-center justify-end">
          <BentoMetrics todayCount={3} overdueCount={0} allCount={320} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 grow">
        {errandsHomeData.map((errandCategory, index) => (
          <HomeErrandList key={index} data={errandCategory} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
