import { omit } from 'lodash-es';
import { useEffect, useState } from 'react';

const omitFields = [
  'created_by',
  'created_time',
  'last_edited_by',
  'last_edited_time',
  'object'
  // 'type'
  // 'has_children'
];

const parseContent = (item: any) => {
  if (item.children?.length) {
    return omit(
      {
        ...item,
        content: item[item.type],
        children: item.children.map((child: any) => parseContent(child))
      },
      [...omitFields, item.type]
    );
  } else {
    return omit(
      {
        ...item,
        content: item[item.type]
      },
      [...omitFields, item.type]
    );
  }
};

export const useParseLessonBSection = (content: any) => {
  const [sections, setSections] = useState([]);
  useEffect(() => {
    if (content) {
      const sections = content.map((item: any) => parseContent(item));
      setSections(sections);
    }
  }, [content]);
  return sections;
};

// 是否可展开 is_toggleable
// 颜色 trailColor

// 有序列表;
// numbered_list_item;
