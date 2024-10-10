'use client';

import useEmailStore from '@/store/zustand/emailStore';
import { Container, Heading, Hr, Link, Tailwind, Text } from '@react-email/components';
import { useShallow } from 'zustand/react/shallow';

type HTMLElementType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined;

export interface CustomSlateElement {
  type?: string;
  text?: string;
  url?: string;
  children: CustomSlateElement[];
}

const RenderContent = (content: CustomSlateElement[]) => {
  // 处理嵌套link
  const handleLink = (content: CustomSlateElement) => {
    return content.children.map((child, childIndex) => {
      if (child.type === 'link') {
        return (
          <Link key={childIndex} href={child.url}>
            {child.children.map((linkChild, linkChildIndex) => linkChild.text).join('')}
          </Link>
        );
      }
      return child.text;
    });
  };

  return (
    <>
      {content.map((item, index) => {
        if (item.type === 'paragraph') {
          return <Text key={index}>{handleLink(item)}</Text>;
        }

        if (item.type?.includes('header')) {
          const head = 'h' + item.type.slice(-1);

          return (
            <Heading as={head as HTMLElementType} key={index}>
              {handleLink(item)}
            </Heading>
          );
        }

        if (item.type === 'divider') {
          return <Hr key={index} />;
        }

        return null; // 如果不匹配任何类型，返回 null
      })}
    </>
  );
};

const EmailRender = () => {
  const { contentObj } = useEmailStore(
    useShallow((state) => ({
      contentObj: state.contentObj
    }))
  );

  return (
    <Tailwind>
      <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
        {RenderContent(contentObj)}
      </Container>
    </Tailwind>
  );
};

export default EmailRender;
