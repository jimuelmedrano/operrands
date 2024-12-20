import ErrandCard from "./ErrandItemCrud/ErrandCard";
import { useState } from "react";
import Icon from "../Icon";

interface ErrandListProps {
  categoryTitle: string;
  errands: {
    id: number;
    title: string;
    notes: string;
    status: string;
    category: string;
    startDate: string;
    repeat: string;
    repeatDayOfWeek: string[];
    repeatDayOfMonth: number[];
    dueDate?: string;
  }[];
}

function HomeErrandList(data: { data: ErrandListProps }) {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="h-fit md:h-full bg-accent rounded-xl p-4">
      <div className="flex-between w-full">
        <span className="text-foreground text-xl">
          {data.data.categoryTitle}
        </span>

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
          {data.data.errands.map((errandItem, index) => (
            <ErrandCard key={index} dataItem={errandItem} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeErrandList;
