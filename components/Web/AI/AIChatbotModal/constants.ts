import { HelperType } from '@/service/webApi/helper/type';

/** 根据类型获取mock的内容 */
export const getContentByHelperType = (type: HelperType) => {
  let content = '';
  switch (type) {
    case HelperType.ExpandContent:
      content = 'Expand Knowledge';
      break;
    case HelperType.ExplainExample:
      content = 'Explain Example';
      break;
    case HelperType.RelatedContent:
      content = 'Related Concept';
      break;
    case HelperType.ExplainQuiz:
      content = 'Explain Quiz';
      break;
    case HelperType.SummarizeContent:
      content = 'Summarize the section';
      break;
  }
  return content;
};
