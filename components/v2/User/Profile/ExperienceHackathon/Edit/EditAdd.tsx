import Button from '@/components/v2/Common/Button';
import Input from '@/components/v2/Common/Input';
import Select from '@/components/v2/Common/Select';
import React, { useState } from 'react';
import { employmentTypeList, monthList, yearList } from './data';
import Checkbox from '@/components/v2/Common/Checkbox';
import TextArea from '@/components/v2/Common/TextArea';

interface EditAddProp {
  onCancel: VoidFunction;
  onRefresh: VoidFunction;
}

const Span: React.FC<{ text: string }> = ({ text }) => {
  return (
    <span className="text-[21px] text-[#8c8c8c] h-[25px] block">{text}</span>
  );
};

const EditAdd: React.FC<EditAddProp> = ({ onCancel, onRefresh }) => {
  const [formData, setFormData] = useState<any>({
    title: {
      value: '',
      status: 'default',
      errorMessage: ''
    },
    companyName: {
      value: '',
      status: 'default',
      errorMessage: ''
    },
    employmentType: {
      value: '',
      status: 'default',
      errorMessage: ''
    },
    location: {
      value: '',
      status: 'default',
      errorMessage: ''
    },
    isWork: {
      value: false
    },
    startMonth: {
      value: '',
      status: 'default',
      errorMessage: ''
    },
    startYear: {
      value: '',
      status: 'default',
      errorMessage: ''
    },
    endMonth: {
      value: '',
      status: 'default',
      errorMessage: ''
    },
    endYear: {
      value: '',
      status: 'default',
      errorMessage: ''
    },
    description: {
      value: '',
      status: 'default',
      errorMessage: ''
    }
  });
  const handleSubmit = () => {
    console.info(formData);
  };
  return (
    <div className="">
      <div className="mb-[20px] flex flex-col gap-[20px] max-h-[60vh] overflow-auto">
        <Input
          name={'title'}
          label={<Span text={'Title*'} />}
          type="text"
          className="border-[#8c8c8c] text-[21px] caret-[#0b0b0b]"
          state={formData.title.status as any}
          errorMessage={formData.title.errorMessage}
          onChange={(e) => {
            setFormData({
              ...formData,
              title: {
                ...formData.title,
                value: e.target.value
              }
            });
          }}
        ></Input>
        <div className="flex justify-between">
          <div className="w-[460px]">
            <Input
              name={'companyName'}
              label={<Span text={'Company Name*'} />}
              type="text"
              className="border-[#8c8c8c] text-[21px] caret-[#0b0b0b]"
              state={formData.companyName.status as any}
              errorMessage={formData.companyName.errorMessage}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  companyName: {
                    ...formData.location,
                    value: e.target.value
                  }
                });
              }}
            ></Input>
          </div>
          <div className="w-[460px]">
            <Select
              name={'employmentType'}
              label={<Span text={'Employment Type*'} />}
              className="border-[#8c8c8c] text-[21px] "
              state={formData.employmentType.status as any}
              errorMessage={formData.employmentType.errorMessage}
              options={employmentTypeList}
              defaultValue={'Full-time'}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  employmentType: {
                    ...formData.location,
                    value: value
                  }
                });
              }}
            ></Select>
          </div>
        </div>
        <Input
          name={'location'}
          label={<Span text={'Location*'} />}
          type="text"
          className="border-[#8c8c8c] text-[21px] caret-[#0b0b0b]"
          state={formData.location.status as any}
          errorMessage={formData.location.errorMessage}
          onChange={(e) => {
            setFormData({
              ...formData,
              location: {
                ...formData.location,
                value: e.target.value
              }
            });
          }}
        ></Input>
        <div>
          <div
            className="flex-row-center gap-[10px] cursor-pointer"
            onClick={() => {
              setFormData({
                ...formData,
                isWork: {
                  value: !formData.isWork.value
                }
              });
            }}
          >
            <Checkbox checked={formData.isWork.value}></Checkbox>
            <span>I’m currently working in this role</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-[460px]">
            <Select
              name={'startMonth'}
              label={<Span text={'Start Date*'} />}
              className="border-[#8c8c8c] text-[21px]"
              state={formData.startMonth.status as any}
              errorMessage={formData.startMonth.errorMessage}
              options={monthList}
              defaultValue={''}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  startMonth: {
                    ...formData.startMonth,
                    value: value
                  }
                });
              }}
            />
          </div>
          <div className="w-[460px]">
            <Select
              name={'startYear'}
              label={<Span text={' '} />}
              className="border-[#8c8c8c] text-[21px]"
              state={formData.startMonth.status as any}
              errorMessage={formData.startMonth.errorMessage}
              options={yearList}
              defaultValue={''}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  startYear: {
                    ...formData.startYear,
                    value: value
                  }
                });
              }}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-[460px]">
            <Select
              name={'endMonth'}
              label={<Span text={'End Date*'} />}
              className="border-[#8c8c8c] text-[21px]"
              state={formData.endMonth.status as any}
              errorMessage={formData.endMonth.errorMessage}
              options={monthList}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  endMonth: {
                    ...formData.endMonth,
                    value: value
                  }
                });
              }}
            />
          </div>
          <div className="w-[460px]">
            <Select
              name={'endYear'}
              label={<Span text={' '} />}
              className="border-[#8c8c8c] text-[21px]"
              state={formData.endMonth.status as any}
              errorMessage={formData.endMonth.errorMessage}
              options={yearList}
              defaultValue={''}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  endYear: {
                    ...formData.endYear,
                    value: value
                  }
                });
              }}
            />
          </div>
        </div>
        <TextArea
          name={'description'}
          label={<Span text={'Description*'} />}
          className="border-[#8c8c8c] text-[21px]"
          state={formData.description.status as any}
          errorMessage={formData.description.errorMessage}
          onChange={(e) => {
            setFormData({
              ...formData,
              description: {
                ...formData.description,
                value: e.target.value
              }
            });
          }}
        ></TextArea>
      </div>
      <div className="flex justify-center gap-[15px]">
        <Button
          onClick={onCancel}
          className="w-[265px] h-[44px] border border-[#0b0b0b]  text-[#0b0b0b] text-[16px]"
        >
          Cancel
        </Button>
        <Button
          className="w-[265px] h-[44px] bg-[#ffd850]    text-[16px]"
          onClick={handleSubmit}
        >
          Add to Experience
        </Button>
      </div>
    </div>
  );
};

export default EditAdd;
