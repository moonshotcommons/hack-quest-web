import * as React from 'react';
import { useToggle } from '@/hooks/utils/use-toggle';
import { SelectableCard } from '../../common/selectable-card';
import { AddFieldButton } from '../../common/add-field-button';
import { useApplicationState } from './state';
import { EditCustomFieldModal } from '../../modals/edit-custom-field-modal';
import { validateCustomField } from '../../constants/utils';

export function OnlineProfile() {
  const [initialValues, setInitialValues] = React.useState<any>(undefined);
  const { onlineProfileState, setOnlineProfileState } = useApplicationState();
  const [open, toggle] = useToggle(false);

  const onCheckedChange = (id: string, checked: boolean) => {
    const newValues = [...onlineProfileState];
    const index = newValues.findIndex((i) => i.id === id);
    if (index !== -1) {
      newValues[index].selected = checked;
    }
    setOnlineProfileState(newValues);
  };

  const onOptionalChange = (id: string, checked: boolean) => {
    const newValues = [...onlineProfileState];
    const index = newValues.findIndex((i) => i.id === id);
    if (index !== -1) {
      newValues[index].optional = checked;
    }
    setOnlineProfileState(newValues);
  };

  function onConfirm(data: any) {
    const newValues = [...onlineProfileState];
    const index = onlineProfileState.findIndex((i) => i.id === data.id);
    if (index !== -1) {
      newValues[index] = data;
      setOnlineProfileState(newValues);
    } else {
      setOnlineProfileState([...onlineProfileState, data]);
    }
  }

  return (
    <div className="w-full">
      <label className="body-m text-neutral-off-black">Online Profiles</label>
      <div className="mt-1 grid w-full grid-cols-3 gap-3">
        {onlineProfileState.map((item, index) => {
          return (
            <SelectableCard
              itemId={item.id}
              key={index}
              label={validateCustomField(item) ? item.property.label : item.title}
              disabled={item?.required && !item.setOptional}
              isEditable={validateCustomField(item)}
              checked={item?.selected}
              required={item.required}
              onCheckedChange={(checked) => {
                if (item.required) return;
                onCheckedChange(item.id, checked);
              }}
              optional={item.optional}
              onOptionalChange={(checked) => onOptionalChange(item.id, checked)}
              onEdit={(id) => {
                toggle(true);
                const formState = onlineProfileState.find((i) => i.id === id);
                if (formState) {
                  setInitialValues(formState);
                }
              }}
              onRemove={(id) => {
                setOnlineProfileState(onlineProfileState.filter((i) => i.id !== id));
              }}
            />
          );
        })}
        <AddFieldButton iconOnly onClick={() => toggle(true)} />
      </div>
      <EditCustomFieldModal
        open={open}
        initialValues={initialValues}
        onConfirm={onConfirm}
        onClose={() => {
          toggle(false);
          setInitialValues(undefined);
        }}
      />
    </div>
  );
}
