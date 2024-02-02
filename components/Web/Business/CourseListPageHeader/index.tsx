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
  coverImgClassName?: string;
  buttonNode?: ReactNode;
  // onSearchInput:
}

const CourseListPageHeader: FC<CourseListPageHeaderProps> = ({
  title,
  description,
  coverImage,
  coverImageUrl,
  coverWidth,
  coverHeight,
  onSearch,
  coverImgClassName = '',
  buttonNode
}) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="flex min-h-[360px] justify-between gap-[36px] pb-[90px]">
      <div className="w-[800px] max-w-[800px] pt-[60px]">
        <h2 className="text-h2 text-neutral-black">{title}</h2>
        <p className="body-l mt-[20px] text-neutral-rich-gray">{description}</p>
        {buttonNode && <div className="mb-[60px] mt-[20px]">{buttonNode}</div>}
        <div className="mt-[60px] flex w-full items-center gap-5 rounded-[56px] border border-neutral-light-gray bg-neutral-white px-5 py-4">
          <span>
            <FiSearch size={20} />
          </span>
          <input
            placeholder="Search for keywords, topics, etc..."
            className="body-l w-full truncate text-neutral-medium-gray outline-none"
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
      <div className={coverImgClassName}>
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
