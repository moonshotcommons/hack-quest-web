import * as React from 'react';
import { Label } from '@/components/ui/label';
import { PlusIcon, XIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipArrow, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useProfile } from '../modules/profile-provider';

export function Skills() {
  const { profile } = useProfile();
  const [skills, setSkills] = React.useState(profile?.techStack || []);
  const [inputVisible, setInputVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [editInputIndex, setEditInputIndex] = React.useState(-1);
  const [editInputValue, setEditInputValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const editInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  React.useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  function handleRemoveSkill(removedSkill: string) {
    const newSkills = skills.filter((skill) => skill !== removedSkill);
    setSkills(newSkills);
  }

  function showInput() {
    setInputVisible(true);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleInputConfirm() {
    if (inputValue && !skills.includes(inputValue)) {
      setSkills([...skills, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  }

  function handleEditInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditInputValue(e.target.value);
  }

  function handleEditInputConfirm() {
    const newSkills = [...skills];
    newSkills[editInputIndex] = editInputValue;
    setSkills(newSkills);
    setEditInputIndex(-1);
    setEditInputValue('');
  }

  return (
    <div>
      <Label className="text-base text-neutral-rich-gray">Skills</Label>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        {skills.map<React.ReactNode>((skill, index) => {
          if (editInputIndex === index) {
            return (
              <input
                ref={editInputRef}
                key={skill}
                type="text"
                className="w-16 rounded-[8px] bg-neutral-off-white px-3 py-1 outline-none"
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEditInputConfirm();
                  }
                }}
              />
            );
          }

          const isLongSkill = skill.length > 20;
          const skillElement = (
            <button
              key={skill}
              className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-neutral-off-white px-3 py-1"
            >
              <XIcon size={20} onClick={() => handleRemoveSkill(skill)} />
              <span
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    setEditInputIndex(index);
                    setEditInputValue(skill);
                    e.preventDefault();
                  }
                }}
              >
                {isLongSkill ? `${skill.slice(0, 20)}...` : skill}
              </span>
            </button>
          );

          return isLongSkill ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>{skillElement}</TooltipTrigger>
                <TooltipContent>
                  <p>{skill}</p>
                  <TooltipArrow />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            skillElement
          );
        })}
        {inputVisible ? (
          <input
            ref={inputRef}
            type="text"
            className="w-16 rounded-[8px] bg-neutral-off-white px-3 py-1 outline-none"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleInputConfirm();
              }
            }}
          />
        ) : (
          <button
            className="inline-flex h-8 items-center justify-center gap-2 rounded-[8px] border border-neutral-light-gray px-3 py-1 transition-colors duration-300 hover:border-neutral-medium-gray"
            onClick={showInput}
          >
            <PlusIcon size={20} />
            <span>Add</span>
          </button>
        )}
      </div>
    </div>
  );
}
