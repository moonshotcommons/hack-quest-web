import { SearchIcon } from 'lucide-react';

export function SearchForm() {
  return (
    <form className="mb-10 mt-5 flex w-full items-center gap-3 rounded-full bg-neutral-white px-3 py-2 sm:mb-0 sm:mt-16 sm:gap-5 sm:border sm:border-neutral-light-gray sm:px-5 sm:py-4">
      <label htmlFor="search">
        <SearchIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search for keywords, topics, etc..."
        className="body-s sm:body-l w-full flex-1 outline-none placeholder:text-neutral-medium-gray"
      />
    </form>
  );
}
