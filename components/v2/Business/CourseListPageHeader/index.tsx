import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { FC, ReactNode, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { GoX } from 'react-icons/go';
interface CourseListPageHeaderProps {
  title: string;
  description: string;
  coverImage?: ReactNode;
  coverImageUrl?: string | StaticImport;
  coverWidth?: number;
  coverHeight?: number;
  onSearch: (value: string) => void;
  // onSearchInput:
}

const CourseListPageHeader: FC<CourseListPageHeaderProps> = ({
  title,
  description,
  coverImage,
  coverImageUrl,
  coverWidth,
  coverHeight,
  onSearch
}) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="pb-[90px] min-h-[360px] flex justify-between gap-[36px]">
      <div className="w-[800px] max-w-[800px] pt-[60px]">
        <h2 className="text-h1 text-neutral-black uppercase">{title}</h2>
        <p className="mt-[20px] text-neutral-rich-gray body-l">{description}</p>
        <div className="py-4 px-5 border mt-[60px] w-full rounded-[56px] border-[#DADADA] bg-white flex gap-5 items-center">
          <span>
            <FiSearch size={20} />
          </span>
          <input
            placeholder="Search for keywords, topics, etc..."
            className="outline-none body-l text-neutral-medium-gray w-full truncate"
            value={searchValue}
            onKeyUp={(e) => {
              if (e.code === 'Enter') {
                const value = (e.target as HTMLInputElement).value;
                setSearchValue(value);
                onSearch(value);
              }
            }}
            onChange={(e) => {
              setSearchValue(e.target.value);
              if (!e.target.value) onSearch(e.target.value);
            }}
            onBlur={(e) => {
              setSearchValue(e.target.value);
              onSearch(e.target.value);
            }}
          ></input>
          {!!searchValue && (
            <span
              className="cursor-pointer"
              onClick={() => {
                setSearchValue('');
                onSearch('');
              }}
            >
              <GoX size={28}></GoX>
            </span>
          )}
        </div>
      </div>
      <div>
        {coverImage}
        {!coverImage && coverImageUrl && (
          <Image
            src={coverImageUrl}
            alt={`${title} cover`}
            width={coverWidth}
            height={coverHeight}
          ></Image>
        )}
      </div>
    </div>
  );
};

export default CourseListPageHeader;
