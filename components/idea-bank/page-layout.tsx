import Image from 'next/image';
import { MoveRightIcon, SearchIcon } from 'lucide-react';

function SearchForm() {
  return (
    <form className="flex w-full items-center gap-3 rounded-full bg-neutral-white px-3 py-2 sm:mt-16 sm:gap-5 sm:border sm:border-neutral-light-gray sm:px-5 sm:py-4">
      <label htmlFor="search">
        <SearchIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search for keywords, topics, etc..."
        className="w-full flex-1 text-sm leading-[160%] outline-none placeholder:text-neutral-medium-gray sm:text-lg"
      />
    </form>
  );
}

export default function Page() {
  return (
    <div className="container mx-auto pt-5 sm:pt-8">
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="w-full px-5 sm:mt-7 sm:max-w-[50rem] sm:px-0">
          <h1 className="font-next-book-bold text-[1.375rem] font-bold text-neutral-black sm:text-[2.5rem]">
            Idea Bank
          </h1>
          <p className="my-5 hidden text-lg leading-[160%] text-neutral-rich-gray sm:block">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida mollis mattis. Morbi eget
            tempor augue. Aenean lacus nisl, volutpat sed nunc et, ornare egestas augue.{' '}
          </p>
          <button className="relative inline-flex items-center justify-center gap-2 text-neutral-black outline-none after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-yellow-dark after:content-['']">
            <span className="text-sm leading-[160%] sm:text-base">Submit An Idea</span>
            <MoveRightIcon size={16} />
          </button>
          <SearchForm />
        </div>
        <div className="relative h-32 w-[13.625rem] sm:h-[20.625rem] sm:w-[25.625rem]">
          <Image src="/images/idea-bank/idea-bank-cover.png" alt="idea bank" fill />
        </div>
      </div>
    </div>
  );
}
