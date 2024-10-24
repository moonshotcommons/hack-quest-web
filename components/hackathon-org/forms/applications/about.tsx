import * as React from 'react';
import { useToggle } from '@/hooks/utils/use-toggle';
import { SelectableCard } from '../../common/selectable-card';
import { AddFieldButton } from '../../common/add-field-button';
import { useApplicationState } from './state';
import { EditCustomFieldModal } from '../../modals/edit-custom-field-modal';
import { validateCustomField } from '../../constants/utils';

export function About() {
  const [initialValues, setInitialValues] = React.useState<any>(undefined);
  const { aboutState, setAboutState } = useApplicationState();
  const [open, toggle] = useToggle(false);

  const onCheckedChange = (id: string, checked: boolean) => {
    const newValues = [...aboutState];
    const index = newValues.findIndex((i) => i.id === id);
    if (index !== -1) {
      newValues[index].selected = checked;
    }
    setAboutState(newValues);
  };

  const onOptionalChange = (id: string, checked: boolean) => {
    const newValues = [...aboutState];
    const index = newValues.findIndex((i) => i.id === id);
    if (index !== -1) {
      newValues[index].optional = checked;
    }
    setAboutState(newValues);
  };

  function onConfirm(data: any) {
    const newValues = [...aboutState];
    const index = aboutState.findIndex((i) => i.id === data.id);
    if (index !== -1) {
      newValues[index] = data;
      setAboutState(newValues);
    } else {
      setAboutState([...aboutState, data]);
    }
  }

  return (
    <div className="w-full">
      <label className="body-m text-neutral-off-black">About</label>
      <div className="mt-1 grid w-full grid-cols-3 gap-3">
        {aboutState.map((item, index) => (
          <SelectableCard
            itemId={item.id}
            key={index}
            label={validateCustomField(item) ? item.property.label : item.title}
            disabled={item?.required}
            required={item?.required}
            isEditable={validateCustomField(item)}
            checked={item?.selected}
            onCheckedChange={(checked) => onCheckedChange(item.id, checked)}
            optional={item.optional}
            onOptionalChange={(checked) => onOptionalChange(item.id, checked)}
            onEdit={(id) => {
              toggle(true);
              const formState = aboutState.find((i) => i.id === id);
              if (formState) {
                setInitialValues(formState);
              }
            }}
            onRemove={(id) => {
              setAboutState(aboutState.filter((i) => i.id !== id));
            }}
          />
        ))}
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
