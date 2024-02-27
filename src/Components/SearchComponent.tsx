import { CiSearch } from "react-icons/ci";

const SearchComponent = ({
  setSearchValue
}: {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full h-[100px] flex flex-row justify-center items-center">
      <div className="relative md:w-[90%] flex flex-row gap-3 w-full px-5 md:px-0">
        <div className="absolute h-full grid items-center px-3">
          <CiSearch size={22} color="#97a2b2" />
        </div>
        <input
          onChange={(event) => setSearchValue(event)}
          type="text"
          className="pl-11 w-full relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)]  dark:focus:border-primary"
          placeholder="Search Trevia"
        />
      </div>
    </div>
  );
};

export default SearchComponent;
