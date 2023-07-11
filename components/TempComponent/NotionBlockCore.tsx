import { FC } from 'react';
import CodeRenderer from './CodeRenderer';
import ImageRenderer from './ImageRenderer';
import TextRenderer from './TextRenderer';
import { useContext } from 'react';
import { PACKAGE_NAME } from '@/constants';
import { Context } from '@/helper/block';
import VideoRenderer from './VideoRenderer';
// import {BlockProps} from "@/types/props";
import TableOfContentsRenderer from './TableOfContentsRenderer';

const NotionBlockCore: React.FC<any> = ({
  block,
  blocks,
  darkMode,
  children
}) => {
  const { prefix, blockPrefix } = useContext(Context);
  // // debugger;
  switch (block.type) {
    case 'paragraph':
      if (block[block.type].rich_text.length > 0) {
        // this color is the background color class
        // const color = block[block.type].color;
        return (
          <div className={`${prefix}-${blockPrefix}-p`}>
            <p>
              <TextRenderer richTextArr={block[block.type].rich_text} />
            </p>
          </div>
        );
      }
      return (
        <div className={`${prefix}-${blockPrefix}-p`}>
          <p>
            <br />
          </p>
        </div>
      );
    case 'heading_1':
      return (
        <div id={`${block.id}`} className={`${prefix}-${blockPrefix}-h1`}>
          <h1>
            <TextRenderer richTextArr={block[block.type].rich_text} />
          </h1>
        </div>
      );
    case 'heading_2':
      return (
        <div id={`${block.id}`} className={`${prefix}-${blockPrefix}-h2`}>
          <h2>
            <TextRenderer richTextArr={block[block.type].rich_text} />
          </h2>
        </div>
      );
    case 'heading_3':
      return (
        <div id={`${block.id}`} className={`${prefix}-${blockPrefix}-h3`}>
          <h3>
            <TextRenderer richTextArr={block[block.type].rich_text} />
          </h3>
        </div>
      );
    case 'table_of_contents':
      return (
        <div
          id={`${block.id}`}
          className={`${prefix}-${blockPrefix}-table_of_contents`}
        >
          {blocks && <TableOfContentsRenderer blocks={blocks} />}
        </div>
      );
    case 'bulleted_list_item':
      return (
        <li className={`${prefix}-${blockPrefix}-bulleted_list_item`}>
          <TextRenderer richTextArr={block[block.type].rich_text} />
        </li>
      );
    case 'numbered_list_item':
      // // debugger;
      // {
      //   block?.has_children && block?.children?.map((item, i) => {
      //     return (
      //       <div key={item.id} data={JSON.stringify(item)} >
      //         {i}
      //       </div>
      //     )
      //   })
      // }

      // data={JSON.stringify(block)}
      return (
        <li className={`${prefix}-${blockPrefix}-numbered_list_item`}>
          <TextRenderer richTextArr={block[block.type].rich_text} />
          {/*{*/}
          {/*  block?.children?.map(item => {*/}
          {/*    return (*/}
          {/*      <div className="" key={item.id}>*/}
          {/*        {item[item.type]?.quote?.rich_text?.[0]}*/}
          {/*      </div>*/}
          {/*    )*/}
          {/*  })*/}
          {/*}*/}
          {block?.has_children &&
            block?.children?.map((items: any, i: number) => {
              return (
                <div className={`mt-[.2rem] pl-[.2rem]`} key={items.id}>
                  <NotionBlockCore block={items} darkMode={darkMode} />
                  {items?.children
                    ? items?.children?.map((item: any) => {
                        return (
                          <div key={item.id}>
                            <NotionBlockCore block={item} darkMode={darkMode} />
                          </div>
                        );
                      })
                    : ''}
                </div>
              );
            })}
        </li>
      );
    case 'quote':
      return (
        <div className={`${prefix}-${blockPrefix}-quote`}>
          <div>
            <TextRenderer richTextArr={block[block.type].rich_text} />
          </div>
        </div>
      );
    case 'callout':
      return (
        <div className={`${prefix}-${blockPrefix}-callout`}>
          <div className={`${prefix}-icon`}>{block[block.type].icon.emoji}</div>
          <div className={`${prefix}-callout`}>
            <TextRenderer richTextArr={block[block.type].rich_text} />
          </div>
        </div>
      );
    case 'code':
      // debugger;
      return (
        <div className={`${prefix}-${blockPrefix}-code`}>
          <CodeRenderer
            lang={block[block.type].language}
            richTextArr={block[block.type].rich_text}
            darkMode={darkMode}
          />
          <div className={`${prefix}-caption`}>
            <TextRenderer richTextArr={block[block.type].caption} />
          </div>
        </div>
      );
    case 'image':
      return (
        <div className={`${prefix}-${blockPrefix}-image`}>
          <div className={`${prefix}-image`}>
            <ImageRenderer block={block[block.type]} />
          </div>
          <div className={`${prefix}-caption`}>
            <TextRenderer richTextArr={block[block.type].caption} />
          </div>
        </div>
      );
    case 'video':
      return (
        <div className={`${prefix}-${blockPrefix}-video`}>
          <div className={`${prefix}-video`}>
            <VideoRenderer block={block[block.type]} />
          </div>
          <div className={`${prefix}-caption`}>
            <TextRenderer richTextArr={block[block.type].caption} />
          </div>
        </div>
      );
    case 'divider':
      return <hr />;
    case 'unsupported':
      return <div></div>;

      // case "column":
      //   // console.log(`blocks: `, blocks);
      //   // console.log(`block: `, block);
      //   console.log(`column: `);
      //   // debugger;
      //   return (
      //     <div className="column">
      //       {/*11*/}
      //     </div>
      //   );
      // case "column_list":
      //   // todo list
      //   console.log(`column_list: `);
      //   // console.log(`blocks: `, blocks);
      //   // console.log(`block: `, block);
      //   // // debugger;
      //   return (
      //     <div className={`flex flex-row-reverse column_list`} id={`${block.id}`} data-block={`${JSON.stringify(block)}`}>
      //       {/*我是 「column_list」*/}
      //       {block && block?.children?.map((column) => {
      //         return (
      //           <div className={`flex-col flex`} key={column.id} id={`${column.id}`} data-block={`${JSON.stringify(column)}`}>
      //             {/*column type: {column.type}*/}
      //             {
      //               column.type === 'column' ? (
      //                 column?.children?.map((items, i) => {
      //                   return (
      //                     // ${i === 0 ? 'ml-[.4rem]': ''}
      //                     // data-block={`${JSON.stringify(items)}`}
      //                     <div className={` `} key={items.id} id={`${items.id}`} >
      //                       {/*items type: {items.type}*/}
      //                       {
      //                         items.type === 'image' ? (
      //                           <div className={`w-[320px] ${prefix}-${blockPrefix}-image`}>
      //                             <div className={`${prefix}-image`}>
      //                               <ImageRenderer block={items[items.type]}/>
      //                             </div>
      //                             <div className={`${prefix}-caption`}>
      //                               <TextRenderer richTextArr={items[items.type].caption}/>
      //                             </div>
      //                           </div>
      //                         ) : (items.type === 'toggle' && items?.toggle?.rich_text?.[0].plain_text === 'Procedure') ? (
      //                           // type: "toggle" toggle.rich_text[0].plain_text === 'Procedure'
      //                           // 的时候
      //                           <div className="mt-[.1rem]">
      //                             {/*nothing items type: {items.type}*/}
      //                             {
      //                               items?.children?.map((item) => {
      //                                 return (
      //                                   // data-block={`${JSON.stringify(item)}`}
      //                                   <div className="indent-0.5" key={item.id} id={`${item.id}`} >
      //                                     {/*item type: {item.type}*/}
      //                                     <NotionBlockCore block={item} darkMode={darkMode} />
      //                                   </div>
      //                                 )
      //                               })
      //                             }
      //                           </div>
      //                         ) : (
      //                           <NotionBlockCore block={items} darkMode={darkMode} />
      //                         )
      //                       }
      //                       {/*{*/}
      //                       {/*  items?.children?.map((item) => {*/}
      //                       {/*    return (*/}
      {
        /*                      /!*      // data-block={`${JSON.stringify(item)}`}*!/*/
      }
    //                       {/*      <div className="indent-0.5" key={item.id} id={`${item.id}`} >*/}
    //                       {/*        /!*item type: {item.type}*!/*/}
    //                       {/*        <NotionBlockCore block={item} darkMode={darkMode} />*/}
    //                       {/*      </div>*/}
    //                       {/*    )*/}
    //                       {/*  })*/}
    //                       {/*}*/}
    //                     </div>
    //                   )
    //                 })
    //               ) : column.type === 'image' ? (
    //                 <div>
    //                   imgage
    //                 </div>
    //                 // <div className={`${prefix}-${blockPrefix}-image`}>
    //                 //   <div className={`${prefix}-image`}>
    //                 //     <ImageRenderer block={block[block.type]}/>
    //                 //   </div>
    //                 //   <div className={`${prefix}-caption`}>
    //                 //     <TextRenderer richTextArr={block[block.type].caption}/>
    //                 //   </div>
    //                 // </div>
    //               ) : (
    //                 <div>
    //                   nothing
    //                 </div>
    //               )
    //             }
    //             {/*{*/}
    //             {/*  column?.children?.map((items, i) => {*/}
    //             {/*    return (*/}
    //             {/*      <div className="indent-0.5" key={items.id} id={`${items.id}`} data-block={`${JSON.stringify(items)}`}>*/}
    //             {/*        items type: {items.type}*/}
    //             {/*        {*/}
    //             {/*          items?.children?.map((item) => {*/}
    //             {/*            return (*/}
    //             {/*              <div className="indent-0.5" key={item.id} id={`${item.id}`} data-block={`${JSON.stringify(item)}`}>*/}
    //             {/*                item type: {item.type}*/}
    //             {/*                /!*<NotionBlockCore block={item} darkMode={darkMode} />*!/*/}
    //             {/*              </div>*/}
    //             {/*            )*/}
    //             {/*          })*/}
    //             {/*        }*/}
    //             {/*      </div>*/}
    //             {/*    )*/}
    //             {/*  })*/}
    //             {/*}*/}
    //           </div>
    //         )
    //       })}
    //     </div>
    //   );
    default:
      // console.log(block);
      console.log(
        `This block type ${block.type} not yet configured in ${PACKAGE_NAME}`
      );
  }
  return <div>{children}</div>;
};
export default NotionBlockCore;
