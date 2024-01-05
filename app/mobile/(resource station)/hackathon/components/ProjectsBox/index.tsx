import SearchFilter, {
  dealFilterParam
} from '@/components/v2/Business/SearchFilter';
import { FilterDataType } from '@/components/v2/Business/SearchFilter/type';
import { deepClone } from '@/helper/utils';
import webApi from '@/service';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { useRequest } from 'ahooks';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import ProjectsList from './ProjectsList';
import { filterData, initPageInfo } from './data';
import Loading from '@/components/Common/Loading';

interface PageInfoType {
  page: number;
  limit: number;
}
interface ProjectsBoxProps {
  loadNum: number;
  setApiStatus: (status: string) => void;
  apiStatus: string;
}
const ProjectsBox: React.FC<ProjectsBoxProps> = ({
  loadNum,
  setApiStatus,
  apiStatus
}) => {
  const query = useSearchParams();
  const [searchParam, setSearchParam] = useState<FilterDataType[]>(
    deepClone(filterData)
  );
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const [inputValue, setInputValue] = useState(query.get('keyword') || '');
  const [pageInfo, setPageInfo] = useState<PageInfoType>(initPageInfo);
  const [list, setList] = useState<ProjectType[]>([]);
  const [runNum, setRunNum] = useState(0);
  const [total, setTotal] = useState(0);

  const changeParam = (newSearchParam: FilterDataType[]) => {
    setSearchParam(newSearchParam);
  };

  const initList = () => {
    getProjectList(initPageInfo).then((newList) => {
      setApiStatus('init');
      setList([...(newList as ProjectType[])]);
    });
  };

  const getProjectList = (pInfo: PageInfoType) => {
    setApiStatus('loading');
    setPageInfo({ ...pInfo });
    const newFilter = dealFilterParam(searchParam);
    return new Promise(async (resolve) => {
      const res = await webApi.resourceStationApi.getProjectsList({
        ...newFilter,
        ...pInfo,
        keyword: inputValue
      });
      setTotal(res.total);
      resolve(res.data);
    });
  };

  const {} = useRequest(async () => {
    const res = await webApi.resourceStationApi.getProjectTracksDict();
    const tracksDict = res.map((v: string) => ({
      label: v,
      value: v,
      checked: true
    }));
    const newSearchParam = deepClone(searchParam);
    newSearchParam[2].filterList =
      newSearchParam[2].filterList.concat(tracksDict);
    setSearchParam(newSearchParam);
  });

  useEffect(() => {
    initList();
  }, [searchParam]);

  useEffect(() => {
    if (timeOut.current) clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      initList();
    }, 300);
  }, [inputValue]);

  useEffect(() => {
    if (
      loadNum > runNum &&
      list.length < total &&
      total > 0 &&
      apiStatus === 'init'
    ) {
      setRunNum(loadNum);
      getProjectList({
        ...pageInfo,
        page: pageInfo.page + 1
      }).then((newList) => {
        const l = [...list, ...(newList as ProjectType[])];
        setList(l);
        if (l.length >= total) {
          setApiStatus('noMre');
        } else {
          setApiStatus('init');
        }
      });
    }
  }, [loadNum]);
  return (
    <Loading loading={apiStatus === 'loading'}>
      <div className="flex justify-between gap-10 h-full">
        <SearchFilter
          searchParam={searchParam}
          changeParam={changeParam}
          changeInputValue={(value) => setInputValue(value)}
          isShowInput={true}
          inputValue={inputValue as string}
        />
        <ProjectsList list={list} />
      </div>
    </Loading>
  );
};

export default ProjectsBox;
