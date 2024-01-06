import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import Select from '@/components/Common/Select';
import React, { useEffect, useState } from 'react';
import { employmentTypeList, monthList, yearList } from './data';
import Checkbox from '@/components/Common/Checkbox';
import TextArea from '@/components/Common/TextArea';
import { deepClone } from '@/helper/utils';
import webApi from '@/service';
import { message } from 'antd';
import { BurialPoint } from '@/helper/burialPoint';

interface EditAddProp {
  onCancel: VoidFunction;
  onRefresh: VoidFunction;
  editType: 'add' | 'edit';
  editEx: any;
}

const Span: React.FC<{ text: string }> = ({ text }) => {
  return (
    <span className="text-[21px] text-[#8c8c8c] h-[25px] block">{text}</span>
  );
};

const EditAdd: React.FC<EditAddProp> = ({
  onCancel,
  onRefresh,
  editType,
  editEx
}) => {
  const [loading, setLoading] = useState(false);
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
    isCurrentWork: {
      value: false,
      status: 'default',
      errorMessage: ''
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
  //对比开始结束时间 结束时间比大于开始时间
  const compareDate = (newFormData: any) => {
    if (newFormData.endMonth.value && newFormData.endYear.value) {
      const start = [newFormData.startMonth.value, newFormData.startYear.value];
      const end = [newFormData.endMonth.value, newFormData.endYear.value];
      const startIndex = [
        monthList.findIndex((v) => v.value === start[0]),
        yearList.findIndex((v) => v.value === start[1])
      ];
      const endIndex = [
        monthList.findIndex((v) => v.value === end[0]),
        yearList.findIndex((v) => v.value === end[1])
      ];
      if (
        startIndex[1] < endIndex[1] ||
        (startIndex[1] === endIndex[1] && startIndex[0] > endIndex[0])
      ) {
        newFormData.endMonth.status = 'error';
        newFormData.endMonth.errorMessage = `The end date must be longer than the start date`;
        newFormData.endYear.status = 'error';
        newFormData.endYear.errorMessage = `The end date must be longer than the start date`;
        setFormData({ ...newFormData });
        return false;
      } else {
        newFormData.endMonth.status = 'default';
        newFormData.endMonth.errorMessage = '';
        newFormData.endYear.status = 'default';
        newFormData.endYear.errorMessage = '';
        setFormData({ ...newFormData });
        return true;
      }
    } else {
      newFormData.endMonth.status = 'default';
      newFormData.endMonth.errorMessage = '';
      newFormData.endYear.status = 'default';
      newFormData.endYear.errorMessage = '';
      setFormData({ ...newFormData });
      return true;
    }
  };
  const handleSubmit = () => {
    BurialPoint.track('user-profile Experenice Modal Save按钮点击');
    let isValidate = true;
    let newFormData = deepClone(formData);
    for (let key in formData) {
      if (
        !~['isCurrentWork', 'endMonth', 'endYear'].indexOf(key) &&
        !newFormData[key].value
      ) {
        newFormData[key].status = 'error';
        newFormData[key].errorMessage = `${key} cannot be empty`;
        isValidate = false;
      }
      if (
        (newFormData.endMonth.value && !newFormData.endYear.value) ||
        (!newFormData.endMonth.value && newFormData.endYear.value)
      ) {
        if (!newFormData[key].value) {
          newFormData[key].status = 'error';
          newFormData[key].errorMessage = `${key} cannot be empty`;
          isValidate = false;
        }
      }
    }
    if (isValidate && !compareDate(newFormData)) return;
    if (!isValidate) {
      setFormData(newFormData);
      return;
    }
    handleAddEdit();
  };

  const handleAddEdit = () => {
    const newFormData = {} as any;
    for (let key in formData) {
      if (!~['startMonth', 'startYear', 'endMonth', 'endYear'].indexOf(key)) {
        newFormData[key] = formData[key].value;
      }
    }
    newFormData.startDate = `${formData.startMonth.value} ${formData.startYear.value}`;
    formData.endMonth.value &&
      (newFormData.endDate = `${formData.endMonth.value} ${formData.endYear.value}`);
    setLoading(true);
    if (editType === 'add') {
      webApi.userApi
        .addExperience(newFormData)
        .then(() => {
          message.success('success');
          onRefresh();
          onCancel();
        })
        .catch((err) => {
          message.error(err.msg);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      webApi.userApi
        .editExperience(editEx.id, newFormData)
        .then(() => {
          message.success('success');
          onRefresh();
          onCancel();
        })
        .catch((err) => {
          message.error(err.msg);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (editEx.id) {
      const newFormData = {} as any;
      for (let key in formData) {
        newFormData[key] = {
          value: editEx[key],
          status: 'default',
          errorMessage: ''
        };
      }
      newFormData.startMonth.value = editEx.startDate.split(' ')[0];
      newFormData.startYear.value = editEx.startDate.split(' ')[1];
      if (editEx.endDate) {
        newFormData.endMonth.value = editEx.endDate.split(' ')[0];
        newFormData.endYear.value = editEx.endDate.split(' ')[1];
      }
      setFormData(newFormData);
    }
  }, [editEx]);

  return (
    <div className="">
      <div className="mb-[20px] flex flex-col gap-[20px] max-h-[60vh] overflow-auto">
        <Input
          name={'title'}
          label={<Span text={'Title*'} />}
          maxLength={50}
          type="text"
          placeholder="EX: Software Engineer"
          className="border-[#8c8c8c] text-[21px] caret-[#0b0b0b]"
          state={formData.title.status as any}
          errorMessage={formData.title.errorMessage}
          defaultValue={editEx.title}
          onChange={(e) => {
            setFormData({
              ...formData,
              title: {
                ...formData.title,
                value: e.target.value,
                status: 'default'
              }
            });
          }}
        ></Input>
        <div className="flex justify-between">
          <div className="w-[460px]">
            <Input
              name={'companyName'}
              label={<Span text={'Company Name*'} />}
              maxLength={100}
              type="text"
              placeholder="EX: Apple"
              className="border-[#8c8c8c] text-[21px] caret-[#0b0b0b]"
              state={formData.companyName.status as any}
              errorMessage={formData.companyName.errorMessage}
              defaultValue={editEx.companyName}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  companyName: {
                    ...formData.companyName,
                    value: e.target.value,
                    status: 'default'
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
              placeholder="Please select"
              state={formData.employmentType.status as any}
              errorMessage={formData.employmentType.errorMessage}
              options={employmentTypeList}
              defaultValue={editEx.employmentType}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  employmentType: {
                    ...formData.employmentType,
                    value: value,
                    status: 'default'
                  }
                });
              }}
            ></Select>
          </div>
        </div>
        <Input
          name={'location'}
          label={<Span text={'Location*'} />}
          maxLength={255}
          type="text"
          placeholder="EX: New York, United States"
          className="border-[#8c8c8c] text-[21px] caret-[#0b0b0b]"
          state={formData.location.status as any}
          errorMessage={formData.location.errorMessage}
          defaultValue={editEx.location}
          onChange={(e) => {
            setFormData({
              ...formData,
              location: {
                ...formData.location,
                value: e.target.value,
                status: 'default'
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
                isCurrentWork: {
                  value: !formData.isCurrentWork.value
                }
              });
            }}
          >
            <Checkbox checked={formData.isCurrentWork.value}></Checkbox>
            <span>I’m currently working in this role</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-[460px]">
            <Select
              name={'startMonth'}
              label={<Span text={'Start Date*'} />}
              className="border-[#8c8c8c] text-[21px]"
              placeholder="Please select"
              state={formData.startMonth.status as any}
              errorMessage={formData.startMonth.errorMessage}
              options={monthList}
              defaultValue={editEx.startDate?.split(' ')?.[0]}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  startMonth: {
                    ...formData.startMonth,
                    value: value,
                    status: 'default'
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
              placeholder="Please select"
              state={formData.startYear.status as any}
              errorMessage={formData.startYear.errorMessage}
              options={yearList}
              defaultValue={editEx.startDate?.split(' ')?.[1]}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  startYear: {
                    ...formData.startYear,
                    value: value,
                    status: 'default'
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
              label={<Span text={'End Date'} />}
              className="border-[#8c8c8c] text-[21px]"
              placeholder="Please select"
              state={formData.endMonth.status as any}
              errorMessage={formData.endMonth.errorMessage}
              options={monthList}
              defaultValue={editEx.endDate?.split(' ')?.[0]}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  endMonth: {
                    ...formData.endMonth,
                    value: value,
                    status: 'default',
                    errorMessage: ''
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
              placeholder="Please select"
              state={formData.endYear.status as any}
              errorMessage={formData.endYear.errorMessage}
              options={yearList}
              defaultValue={editEx.endDate?.split(' ')?.[1]}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  endYear: {
                    ...formData.endYear,
                    value: value,
                    status: 'default',
                    errorMessage: ''
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
          defaultValue={editEx.description}
          onChange={(e) => {
            setFormData({
              ...formData,
              description: {
                ...formData.description,
                value: e.target.value,
                status: 'default'
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
          loading={loading}
          className="w-[265px] h-[44px] bg-yellow-primary    text-[16px]"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditAdd;
