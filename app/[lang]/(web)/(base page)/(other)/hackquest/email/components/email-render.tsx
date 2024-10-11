'use client';

import useEmailStore from '@/store/zustand/emailStore';
import { Container, Heading, Link, Tailwind, Text, Img } from '@react-email/components';
import { omit } from 'lodash-es';

import { useShallow } from 'zustand/react/shallow';

type HTMLElementType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined;

export interface CustomSlateElement {
  textAlign?: 'left' | 'center' | 'right';
  type?: string;
  text?: string;
  url?: string;
  href?: string;
  src?: string;
  alt?: string;
  style?: any;
  ordered?: boolean;
  children: CustomSlateElement[];
}

const RenderContent = (content: CustomSlateElement[]) => {
  // 处理嵌套link
  const handleLink = (content: CustomSlateElement) => {
    return content.children.map((child, childIndex) => {
      if (child.type === 'link') {
        return (
          <Link key={childIndex} href={child.url}>
            {child.children.map((linkChild) => linkChild.text).join('')}
          </Link>
        );
      }

      if (child.type === 'image') {
        return (
          <Img
            key={childIndex}
            style={child.style}
            alt={child.alt}
            src={child.src}
            className="inline max-w-[465px]"
          ></Img>
        );
      }
      return child.text;
    });
  };

  // 处理list-item类型
  const handleListItem = (content: CustomSlateElement[], ordered: boolean) => {
    return content.reduce((renderContent, item, index) => {
      if (item.type === 'list-item' && item.ordered === ordered) {
        renderContent.push(<li key={index}>{handleLink(item)}</li>);
      } else {
        return renderContent; // Stop processing further items
      }
      return renderContent;
    }, [] as JSX.Element[]);
  };

  const renderers: {
    [key: string]: (item: CustomSlateElement, index: number) => JSX.Element | null;
  } = {
    paragraph: (item, index) => {
      const style = omit(item, ['type', 'text', 'url', 'children']);
      return (
        <Text key={index} style={style}>
          {handleLink(item)}
        </Text>
      );
    },
    header: (item, index) => {
      const head = `h${item?.type?.slice(-1)}`;
      return (
        <Heading as={head as HTMLElementType} key={index}>
          {handleLink(item)}
        </Heading>
      );
    },
    'list-item': (item, index) => {
      const isOrdered = !!item.ordered;
      const isFirstItem = index === 0;
      const shouldWrapInList =
        isFirstItem || content[index - 1].type !== 'list-item' || content[index - 1].ordered !== isOrdered;

      if (shouldWrapInList) {
        const ListTag = isOrdered ? 'ol' : 'ul';
        return <ListTag key={index}>{handleListItem(content.slice(index), isOrdered)}</ListTag>;
      }
      return null;
    }
  };

  return (
    <>
      {content.map((item, index) => {
        const type = item.type?.startsWith('header') ? 'header' : item.type;

        const renderer = renderers[type as keyof typeof renderers] || renderers.header; // default to header for unknown types
        return renderer(item, index) || null;
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
