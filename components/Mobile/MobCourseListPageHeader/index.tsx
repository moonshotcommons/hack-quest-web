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

const MobCourseListPageHeader: FC<CourseListPageHeaderProps> = ({
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
    <div className="pb-[5.625rem] min-h-[18rem] px-[1.25rem] bg-yellow-primary">
      <div className="pt-[7.5rem]">
        <h2 className="text-h1-mob text-neutral-black uppercase">{title}</h2>
        <div className="py-2 px-3 border mt-[1.25rem] w-full rounded-[3.5rem] border-neutral-light-gray bg-neutral-white flex gap-3 items-center">
          <span>
            <FiSearch size={20} />
          </span>
          <input
            placeholder="Search for keywords, topics, etc..."
            className="outline-none body-s text-neutral-medium-gray w-full truncate"
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
              <GoX size={22}></GoX>
            </span>
          )}
        </div>
      </div>
      <div className="absolute top-0 right-0">
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

export default MobCourseListPageHeader;
