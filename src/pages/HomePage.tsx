import Icon from "../components/Icon";
import BentoMetrics from "../components/home/BentoMetrics";
import { useState } from "react";

const HomePage = () => {
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   // This code will run after everytime the provided variable changes

  //   // You can perform other actions here, such as an API call
  //   // Example: makeApiCall(searchTerm);
  // }, [search]);

  return (
    <div>
      <div className="flex mb-10">
        <div className="flex flex-col justify-between h-40 basis-full md:basis-1/2">
          <div>
            <span className="text-2xl">Hello, </span>
            <span className="text-2xl text-primary dark:text-primaryDark">
              Jimuel Medrano
            </span>
            <br />
            <span className="text-sm">
              Level up your day by clearing your errands
            </span>
          </div>
          <div className="flex gap-3">
            <div className="flex relative w-80 items-center">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="font-koulen text-sm dark:text-white w-full px-3 py-2 bg-secondary dark:bg-secondaryDark rounded-lg border-none focus:ring-0"
              />
              <Icon
                name="Search"
                size={20}
                className="absolute right-3 opacity-50"
              />
            </div>
            <button className="flex-center bg-secondary dark:bg-primary p-2 rounded-lg gap-1">
              <Icon name="Plus" size={20} />
            </button>
          </div>
        </div>
        <div className="basis-0 md:basis-1/2 hidden md:flex items-center justify-end">
          <BentoMetrics todayCount={3} overdueCount={0} allCount={320} />
        </div>
      </div>

      <div className="flex gap-3 h-dvh">
        <HomeErrands />
        <HomeErrands />
        <HomeErrands />
        <HomeErrands />
      </div>
    </div>
  );
};

function HomeErrands() {
  return (
    <div className="basis-1/4 h-full bg-secondary dark:bg-secondaryDark rounded-xl py-4 px-5">
      <span>Daily Errands</span>
      <div className="flex flex-col gap-3 mt-5">
        <div className="flex items-center w-full h-16 bg-primary dark:bg-primaryDark rounded-xl px-3 gap-3">
          <div>
            <input
              type="checkbox"
              className="text-primary dark:text-primaryDark bg-secondary w-8 h-8 rounded-lg border-none focus:ring-0 focus:ring-offset-0"
            />
          </div>
          <div>
            <span className="text-white dark:text-black text-sm">errands</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
