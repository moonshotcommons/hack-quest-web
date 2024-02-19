import { FC, ReactNode } from 'react';

interface CreateByTagProps {
  icon?: ReactNode;
  label?: ReactNode;
  value?: string;
  valueNode?: ReactNode;
}

const defaultIcon = <span></span>;

const CreateByTag: FC<CreateByTagProps> = ({
  icon,
  label,
  valueNode,
  value,
  ...rest
}) => {
  return (
    <div className="flex items-center gap-3" {...rest}>
      {icon ? icon : defaultIcon}
      <div className="flex flex-col">
        {!!label && label}
        {!label && (
          <span className="body-xs text-neutral-medium-gray">Created by</span>
        )}
        {!!valueNode && valueNode}
        {!valueNode && value}
      </div>
    </div>
  );
};

export default CreateByTag;
