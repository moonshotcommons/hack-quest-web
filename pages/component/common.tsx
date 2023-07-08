import Button from '@/components/Common/Button';
import Dropdown, { ChildrenDropDown } from '@/components/Common/DropDown';
import { render } from '@testing-library/react';
import { NextPage } from 'next';

const currentKey = '22';

const testData = [
  {
    key: '1',
    title: 'Unit 1 Title'
  },
  {
    key: '2',
    title: 'Unit 2 Title',
    children: [
      {
        key: '22',
        title: 'Definition of Balances Mapping',
        render(item: any) {
          if (item.key === currentKey) {
            return <div>{item.title + '选中了'}</div>;
          }
          return <div>{item.title}</div>;
        }
      },
      {
        key: '23',
        title: 'Define totalSupply as an integer',
        render(item: any) {
          if (item.key === currentKey) {
            return <div>{item.title + '选中了'}</div>;
          }
          return <div>{item.title}</div>;
        }
      },
      {
        key: '24',
        title: 'Definition 1/4 - Creating a Contract',
        render(item: any) {
          if (item.key === currentKey) {
            return <div>{item.title + '选中了'}</div>;
          }
          return <div>{item.title}</div>;
        }
      },
      {
        key: '24',
        title: 'Define owner address',
        render(item: any) {
          if (item.key === currentKey) {
            return <div>{item.title + '选中了'}</div>;
          }
          return <div>{item.title}</div>;
        }
      }
    ],

    render(data: any) {
      return (
        <>
          {data.children?.length ? (
            <ChildrenDropDown childrenData={data.children}></ChildrenDropDown>
          ) : (
            data.title
          )}
        </>
      );
    }
  },
  {
    key: '3',
    title: 'Unit 3 Title'
  },
  {
    key: '4',
    title: 'Unit 4 Title'
  },
  {
    key: '5',
    title: 'Unit 5 Title'
  }
];
interface HomeProps {
  children: React.ReactNode;
}

const Home: NextPage<HomeProps> = (props) => {
  return <div>{/* <Dropdown dropData={testData}></Dropdown> */}</div>;
};

export default Home;
