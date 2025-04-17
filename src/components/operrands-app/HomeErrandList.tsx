import ErrandCard from "./ErrandItemCrud/ErrandCard";
import { useState } from "react";
import Icon from "../Icon";
import { ErrandItemProps } from "@/lib/interface";

function HomeErrandList({
  data,
  category,
  categoryList,
  setNotification,
}: {
  data: ErrandItemProps[];
  category: string;
  categoryList?: string[];
  setNotification: (notifText: string, isSuccess?: boolean) => void;
}) {
  const [accordionOpen, setAccordionOpen] = useState(false);
  return (
    <div className="h-fit md:h-full bg-accent rounded-xl p-4">
      <div className="flex-between w-full">
        <span className="text-foreground text-xl">{category}</span>

        <button
          onClick={() => setAccordionOpen(!accordionOpen)}
          className="md:hidden"
        >
          {accordionOpen ? (
            <Icon name="ChevronUp" className="text-foreground" />
          ) : (
            <Icon name="ChevronDown" className="text-foreground" />
          )}
        </button>
      </div>

      <div
        className={
          "grid overflow-hidden transition-all duration-300 ease-in-out " +
          (accordionOpen
            ? "pt-5 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 md:grid-rows-1 md:opacity-100")
        }
      >
        <div className={"flex flex-col gap-3 md:mt-5 overflow-hidden"}>
          {data.map((errandItem, index) => (
            <ErrandCard
              key={index}
              dataItem={errandItem}
              categoryList={categoryList}
              setNotification={setNotification}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeErrandList;
