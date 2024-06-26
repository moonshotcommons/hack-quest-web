import { FC } from 'react';
import { IGNORE_FIELDS } from './constants';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export enum ApplicationSectionType {
  ApplicationType = 'ApplicationType',
  About = 'About',
  OnlineProfiles = 'OnlineProfiles',
  Contact = 'Contact'
}

export enum SubmissionSectionType {
  BasicInfo = 'BasicInfo',
  ProjectDetail = 'ProjectDetail',
  Additions = 'Additions'
}

export enum FormCustomComponent {
  QA,
  Selection
}

export interface PresetComponentConfig<T = {}, P = {}> {
  id: string;
  type: string;
  optional: boolean;
  component: FC<T>;
  settingComponent?: FC<any> | null | undefined;
  required?: boolean;
  property: (T extends { form: any } ? Omit<T, 'form' | 'config'> : T) & P;
  validate: (values: any, form: UseFormReturn<FieldValues, any, undefined>, config: PresetComponentConfig) => boolean[];
}

type PropertyType = {
  input: {
    placeholder: string;
    label: string;
    name?: string;
  };
  select: { name?: string };
  radio: {
    placeholder: string;
    label: string;
    multiple?: boolean;
    options: (string | number | boolean)[];
    name?: string;
  };
  textarea: {
    name?: string;
    placeholder: string;
    label: string;
    max: number;
    min: number;
  };
};

type GenerateCustomComponentConfig<T extends keyof PropertyType> = {
  id: string;
  type: T;
  optional: boolean;
  property: PropertyType[T];
  validate?: (values: any, form: UseFormReturn<FieldValues, any, undefined>, fieldId: string) => boolean[];
};

export type CustomComponentConfig =
  | GenerateCustomComponentConfig<'input'>
  | GenerateCustomComponentConfig<'select'>
  | GenerateCustomComponentConfig<'radio'>
  | GenerateCustomComponentConfig<'textarea'>;

export type IgnoreFields = (typeof IGNORE_FIELDS)[number];
