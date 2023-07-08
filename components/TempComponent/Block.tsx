import * as React from 'react';
import { NotionBlock } from './NotionBlock';
import TextRenderer from './TextRenderer';

// const typeMap = {
//   'toggle': (block) => <ul id={block.id} className='toggle'>
//     <li>
//       <details open>
//         <summary>
//           <TextRenderer richTextArr={block.toggle.rich_text} />
//         </summary>
//         {block.has_children && block.children.map((child : any)=> <Block block={child} key={child.id} darkMode={darkMode}/>) }
//       </details>
//     </li>
//   </ul>,
// }

export const Block: React.FC<any> = ({
  block,
  darkMode = true,
  renderChildren = false
}: any) => {
  // // debugger;
  const type = block?.type; // 标签类型
  if (!type) return <div></div>;
  // 2023.5.11 添加，针对`teaser`业务新增 type=`column_list` 做业务处理
  // if (type === `column_list`) {
  //   console.log(`here column_list: `,);
  // }

  // 针对 `syntax` heading_3 展开内容逻辑
  if (type !== 'toggle' && !block[type].is_toggleable) {
    // // debugger;
    return (
      <>
        <NotionBlock
          block={block}
          isCodeHighlighter={true}
          darkMode={darkMode}
        />
        {block.has_children &&
          renderChildren &&
          block.children.map((child: any) => (
            <Block block={child} key={child.id} darkMode={darkMode} />
          ))}
      </>
    );
  }

  if (type === 'toggle') {
    // debugger;
    return (
      <ul id={block.id} className={`toggle`} type={`${type}`}>
        <li>
          <details open>
            <summary>
              <TextRenderer richTextArr={block.toggle.rich_text} />
            </summary>
            {block.has_children &&
              block.children.map((child: any) => (
                <Block block={child} key={child.id} darkMode={darkMode} />
              ))}
          </details>
        </li>
      </ul>
    );
  }

  const HeadingTag = ('h' +
    block.type.slice(-1)) as keyof JSX.IntrinsicElements;
  // debugger;
  return (
    <details
      open
      type={`${type}`}
      is_toggleable={`${block[type].is_toggleable}`}
    >
      <summary>
        <HeadingTag className="toggle-heading">
          <TextRenderer richTextArr={block[block.type].rich_text} />{' '}
        </HeadingTag>
      </summary>
      <div className="indented">
        {block.has_children &&
          block.children.map((child: any) => (
            <Block block={child} key={child.id} darkMode={darkMode} />
          ))}
      </div>
    </details>
  );

  // if (!isToggle) {
  //   // debugger;
  //   return (
  //     <>
  //       <NotionBlock
  //         block={block}
  //         isCodeHighlighter={true}
  //         darkMode={darkMode}
  //       />
  //       {(block.has_children && renderChildren) && block.children.map((child : any)=> <Block block={child} key={child.id} darkMode={darkMode}/>) }
  //     </>
  //   );
  // } else if (block.type === 'toggle') {
  //   // debugger;
  //   return (
  //     <ul id={block.id} className='toggle'>
  //       <li>
  //         <details open>
  //           <summary>
  //             <TextRenderer richTextArr={block.toggle.rich_text} />
  //           </summary>
  //           {block.has_children && block.children.map((child : any)=> <Block block={child} key={child.id} darkMode={darkMode}/>) }
  //         </details>
  //       </li>
  //     </ul>
  //   )
  // }
  // // togglable headings
  // const HeadingTag = 'h' + block.type.slice(-1) as keyof JSX.IntrinsicElements;
  // // debugger;
  // return (
  //   <details open>
  //     <summary>
  //       <HeadingTag className='toggle-heading'> <TextRenderer richTextArr={block[block.type].rich_text} /> </HeadingTag>
  //     </summary>
  //     <div className='indented'>
  //       {block.has_children && block.children.map((child : any)=> <Block block={child} key={child.id} darkMode={darkMode}/>) }
  //     </div>
  //   </details>
  // )
};
