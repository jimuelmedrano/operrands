import { useState } from "react";
import Icon from "../components/Icon";
import BentoMetrics from "../components/home/BentoMetrics";
import HomeErrandList from "../components/home/HomeErrandList2";
import getHomeErrands from "../../sample-data/getHomeErrands.json";

const HomePage = () => {
  const [search, setSearch] = useState("");

  const errandsHomeData = getHomeErrands;

  // useEffect(() => {
  //   // This code will run after everytime the provided variable changes

  //   // You can perform other actions here, such as an API call
  //   // Example: makeApiCall(searchTerm);
  // }, [search]);

  return (
    <div className="h-full flex flex-col">
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
            <div
              className="flex relative grow max-w-80
             items-center"
            >
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="font-koulen text-sm dark:text-white grow px-3 py-2 bg-secondary dark:bg-secondaryDark rounded-lg border-none focus:ring-0"
              />
              <Icon
                name="Search"
                size={20}
                className="absolute right-3 opacity-50"
              />
            </div>
            <button className="flex-center bg-secondary dark:bg-secondaryDark p-2 rounded-lg gap-1">
              <Icon name="Plus" size={20} />
            </button>
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
