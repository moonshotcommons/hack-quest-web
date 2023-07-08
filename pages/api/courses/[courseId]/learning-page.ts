// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CourseDetailType, CourseResponse } from '@/service/webApi/course/type';
import type { NextApiRequest, NextApiResponse } from 'next';
import { courseDetail } from './data';
type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getMethodHandler(req, res);
    case 'POST':
      return postMethodHandler(req, res);
    default:
      return res.status(200).json({ name: 'John Doe' });
  }
}

const getMethodHandler = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { id, include } = req.query;
  console.log(req.query);

  res.status(200).json({
    id: 'cde65f94-9417-4e2c-b722-e041f078b1c4',
    name: 'Contract',
    style: 'A',
    content: [
      {
        id: '5bb01cc6-4be8-42ad-8a06-db5eff859e3c',
        type: 'heading_1',
        object: 'block',
        parent: {
          type: 'page_id',
          page_id: 'f3bd501f-0178-497c-a0e9-468e87c79c70'
        },
        archived: false,
        children: [
          {
            id: '0bc5c2b0-c79c-4d57-9545-01397f9220e3',
            type: 'heading_3',
            object: 'block',
            archived: false,
            children: [
              {
                id: 'f3a06592-c796-45ae-8f13-85cdb74047b2',
                type: 'paragraph',
                object: 'block',
                archived: false,
                paragraph: {
                  color: 'default',
                  rich_text: [
                    {
                      href: null,
                      text: {
                        link: null,
                        content:
                          'In this section, we will introduce the new concept of '
                      },
                      type: 'text',
                      plain_text:
                        'In this section, we will introduce the new concept of ',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: 'Contracts'
                      },
                      type: 'text',
                      plain_text: 'Contracts',
                      annotations: {
                        bold: false,
                        code: true,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: ' in Solidity.'
                      },
                      type: 'text',
                      plain_text: ' in Solidity.',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    }
                  ]
                },
                created_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                created_time: '2023-07-04T18:35:00.000Z',
                has_children: false,
                last_edited_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                parent_block_id: '0bc5c2b0-c79c-4d57-9545-01397f9220e3',
                last_edited_time: '2023-07-04T18:35:00.000Z'
              },
              {
                id: 'dbd76550-76d0-4fd6-b9f6-18c4f5d9dad0',
                type: 'paragraph',
                object: 'block',
                archived: false,
                paragraph: {
                  color: 'default',
                  rich_text: [
                    {
                      href: null,
                      text: {
                        link: null,
                        content:
                          'Think of it like a recipe for a cake. The recipe tells you what ingredients to use and how to mix them to create the cake. '
                      },
                      type: 'text',
                      plain_text:
                        'Think of it like a recipe for a cake. The recipe tells you what ingredients to use and how to mix them to create the cake. ',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    }
                  ]
                },
                created_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                created_time: '2023-07-04T18:35:00.000Z',
                has_children: false,
                last_edited_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                parent_block_id: '0bc5c2b0-c79c-4d57-9545-01397f9220e3',
                last_edited_time: '2023-07-04T18:35:00.000Z'
              },
              {
                id: '77cd4bfd-c4e9-4545-837b-1f64421fdf3c',
                type: 'paragraph',
                object: 'block',
                archived: false,
                paragraph: {
                  color: 'default',
                  rich_text: [
                    {
                      href: null,
                      text: {
                        link: null,
                        content: 'Similarly, a '
                      },
                      type: 'text',
                      plain_text: 'Similarly, a ',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: 'contract'
                      },
                      type: 'text',
                      plain_text: 'contract',
                      annotations: {
                        bold: false,
                        code: true,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: ' tells you what data (called '
                      },
                      type: 'text',
                      plain_text: ' tells you what data (called ',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: 'variables'
                      },
                      type: 'text',
                      plain_text: 'variables',
                      annotations: {
                        bold: false,
                        code: true,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: ') you need and what actions (called '
                      },
                      type: 'text',
                      plain_text: ') you need and what actions (called ',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: 'functions'
                      },
                      type: 'text',
                      plain_text: 'functions',
                      annotations: {
                        bold: false,
                        code: true,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: ') you could do on these '
                      },
                      type: 'text',
                      plain_text: ') you could do on these ',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: 'variables'
                      },
                      type: 'text',
                      plain_text: 'variables',
                      annotations: {
                        bold: false,
                        code: true,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: '.'
                      },
                      type: 'text',
                      plain_text: '.',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    }
                  ]
                },
                created_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                created_time: '2023-07-04T18:35:00.000Z',
                has_children: false,
                last_edited_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                parent_block_id: '0bc5c2b0-c79c-4d57-9545-01397f9220e3',
                last_edited_time: '2023-07-04T18:35:00.000Z'
              },
              {
                id: '6519d595-cb57-4664-bca9-f87029dc2f8b',
                type: 'paragraph',
                object: 'block',
                archived: false,
                paragraph: {
                  color: 'default',
                  rich_text: [
                    {
                      href: null,
                      text: {
                        link: null,
                        content: 'Contracts'
                      },
                      type: 'text',
                      plain_text: 'Contracts',
                      annotations: {
                        bold: false,
                        code: true,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: ' in Solidity are similar to '
                      },
                      type: 'text',
                      plain_text: ' in Solidity are similar to ',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: 'classes'
                      },
                      type: 'text',
                      plain_text: 'classes',
                      annotations: {
                        bold: true,
                        code: true,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: ' in '
                      },
                      type: 'text',
                      plain_text: ' in ',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: 'object-oriented languages'
                      },
                      type: 'text',
                      plain_text: 'object-oriented languages',
                      annotations: {
                        bold: true,
                        code: true,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: ', with each '
                      },
                      type: 'text',
                      plain_text: ', with each ',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: 'contract'
                      },
                      type: 'text',
                      plain_text: 'contract',
                      annotations: {
                        bold: false,
                        code: true,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: ' containing declarations of '
                      },
                      type: 'text',
                      plain_text: ' containing declarations of ',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: 'state variables'
                      },
                      type: 'text',
                      plain_text: 'state variables',
                      annotations: {
                        bold: false,
                        code: true,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: ', '
                      },
                      type: 'text',
                      plain_text: ', ',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: 'functions'
                      },
                      type: 'text',
                      plain_text: 'functions',
                      annotations: {
                        bold: false,
                        code: true,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: ', and more.'
                      },
                      type: 'text',
                      plain_text: ', and more.',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    }
                  ]
                },
                created_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                created_time: '2023-07-04T18:35:00.000Z',
                has_children: false,
                last_edited_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                parent_block_id: '0bc5c2b0-c79c-4d57-9545-01397f9220e3',
                last_edited_time: '2023-07-04T18:35:00.000Z'
              },
              {
                id: '822bafab-b245-4ad7-8fbc-3444d9153200',
                type: 'paragraph',
                object: 'block',
                archived: false,
                paragraph: {
                  color: 'default',
                  rich_text: [
                    {
                      href: null,
                      text: {
                        link: null,
                        content: 'In Solidity, a '
                      },
                      type: 'text',
                      plain_text: 'In Solidity, a ',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: '.sol'
                      },
                      type: 'text',
                      plain_text: '.sol',
                      annotations: {
                        bold: false,
                        code: true,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content:
                          ' file, which is the extension for Solidity source code files, could contain one or more '
                      },
                      type: 'text',
                      plain_text:
                        ' file, which is the extension for Solidity source code files, could contain one or more ',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: 'contracts'
                      },
                      type: 'text',
                      plain_text: 'contracts',
                      annotations: {
                        bold: false,
                        code: true,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    },
                    {
                      href: null,
                      text: {
                        link: null,
                        content: '. '
                      },
                      type: 'text',
                      plain_text: '. ',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    }
                  ]
                },
                created_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                created_time: '2023-07-04T18:35:00.000Z',
                has_children: false,
                last_edited_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                parent_block_id: '0bc5c2b0-c79c-4d57-9545-01397f9220e3',
                last_edited_time: '2023-07-04T18:35:00.000Z'
              }
            ],
            heading_3: {
              color: 'default',
              rich_text: [
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'Concept'
                  },
                  type: 'text',
                  plain_text: 'Concept',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                }
              ],
              is_toggleable: true
            },
            created_by: {
              id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
              object: 'user'
            },
            created_time: '2023-07-04T18:35:00.000Z',
            has_children: true,
            last_edited_by: {
              id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
              object: 'user'
            },
            parent_block_id: '5bb01cc6-4be8-42ad-8a06-db5eff859e3c',
            last_edited_time: '2023-07-04T18:35:00.000Z'
          },
          {
            id: '8f6456b4-961d-4369-98be-dc4b26616a92',
            type: 'heading_3',
            object: 'block',
            archived: false,
            children: [
              {
                id: '552ddf50-3e91-4c9d-8929-7c8ff4cf3e23',
                type: 'bulleted_list_item',
                object: 'block',
                archived: false,
                children: [
                  {
                    id: '8a182133-76b8-481b-a516-85ef548c757d',
                    type: 'paragraph',
                    object: 'block',
                    archived: false,
                    paragraph: {
                      color: 'default',
                      rich_text: [
                        {
                          href: null,
                          text: {
                            link: null,
                            content: 'To define a '
                          },
                          type: 'text',
                          plain_text: 'To define a ',
                          annotations: {
                            bold: false,
                            code: false,
                            color: 'default',
                            italic: false,
                            underline: false,
                            strikethrough: false
                          }
                        },
                        {
                          href: null,
                          text: {
                            link: null,
                            content: 'contract'
                          },
                          type: 'text',
                          plain_text: 'contract',
                          annotations: {
                            bold: false,
                            code: true,
                            color: 'default',
                            italic: false,
                            underline: false,
                            strikethrough: false
                          }
                        },
                        {
                          href: null,
                          text: {
                            link: null,
                            content: ', we use the keyword '
                          },
                          type: 'text',
                          plain_text: ', we use the keyword ',
                          annotations: {
                            bold: false,
                            code: false,
                            color: 'default',
                            italic: false,
                            underline: false,
                            strikethrough: false
                          }
                        },
                        {
                          href: null,
                          text: {
                            link: null,
                            content: 'contract'
                          },
                          type: 'text',
                          plain_text: 'contract',
                          annotations: {
                            bold: true,
                            code: true,
                            color: 'yellow',
                            italic: false,
                            underline: false,
                            strikethrough: false
                          }
                        },
                        {
                          href: null,
                          text: {
                            link: null,
                            content: ' followed by the name of the '
                          },
                          type: 'text',
                          plain_text: ' followed by the name of the ',
                          annotations: {
                            bold: false,
                            code: false,
                            color: 'default',
                            italic: false,
                            underline: false,
                            strikethrough: false
                          }
                        },
                        {
                          href: null,
                          text: {
                            link: null,
                            content: 'contract'
                          },
                          type: 'text',
                          plain_text: 'contract',
                          annotations: {
                            bold: false,
                            code: true,
                            color: 'default',
                            italic: false,
                            underline: false,
                            strikethrough: false
                          }
                        },
                        {
                          href: null,
                          text: {
                            link: null,
                            content: '.'
                          },
                          type: 'text',
                          plain_text: '.',
                          annotations: {
                            bold: false,
                            code: false,
                            color: 'default',
                            italic: false,
                            underline: false,
                            strikethrough: false
                          }
                        }
                      ]
                    },
                    created_by: {
                      id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                      object: 'user'
                    },
                    created_time: '2023-07-04T18:35:00.000Z',
                    has_children: false,
                    last_edited_by: {
                      id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                      object: 'user'
                    },
                    parent_block_id: '552ddf50-3e91-4c9d-8929-7c8ff4cf3e23',
                    last_edited_time: '2023-07-04T18:35:00.000Z'
                  },
                  {
                    id: '33df39ee-5ea9-4bdc-a80e-5717bb676285',
                    code: {
                      caption: [],
                      language: 'solidity',
                      rich_text: [
                        {
                          href: null,
                          text: {
                            link: null,
                            content: 'contract Name{ }'
                          },
                          type: 'text',
                          plain_text: 'contract Name{ }',
                          annotations: {
                            bold: false,
                            code: false,
                            color: 'default',
                            italic: false,
                            underline: false,
                            strikethrough: false
                          }
                        }
                      ]
                    },
                    type: 'code',
                    object: 'block',
                    archived: false,
                    created_by: {
                      id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                      object: 'user'
                    },
                    created_time: '2023-07-04T18:35:00.000Z',
                    has_children: false,
                    last_edited_by: {
                      id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                      object: 'user'
                    },
                    parent_block_id: '552ddf50-3e91-4c9d-8929-7c8ff4cf3e23',
                    last_edited_time: '2023-07-04T18:35:00.000Z'
                  }
                ],
                created_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                created_time: '2023-07-04T18:35:00.000Z',
                has_children: true,
                last_edited_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                parent_block_id: '8f6456b4-961d-4369-98be-dc4b26616a92',
                last_edited_time: '2023-07-04T18:35:00.000Z',
                bulleted_list_item: {
                  color: 'default',
                  rich_text: [
                    {
                      href: null,
                      text: {
                        link: null,
                        content: 'Definition '
                      },
                      type: 'text',
                      plain_text: 'Definition ',
                      annotations: {
                        bold: true,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    }
                  ]
                }
              }
            ],
            heading_3: {
              color: 'default',
              rich_text: [
                {
                  href: null,
                  text: {
                    link: null,
                    content: ' Documentation'
                  },
                  type: 'text',
                  plain_text: ' Documentation',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                }
              ],
              is_toggleable: true
            },
            created_by: {
              id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
              object: 'user'
            },
            created_time: '2023-07-04T18:35:00.000Z',
            has_children: true,
            last_edited_by: {
              id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
              object: 'user'
            },
            parent_block_id: '5bb01cc6-4be8-42ad-8a06-db5eff859e3c',
            last_edited_time: '2023-07-04T18:35:00.000Z'
          },
          {
            id: '6a6d47ce-efe0-416b-a1a1-c8c3e3aa78cb',
            type: 'heading_3',
            object: 'block',
            archived: false,
            children: [
              {
                id: '7b58a898-d5f6-411d-a602-a93f6c6f0cce',
                code: {
                  caption: [],
                  language: 'solidity',
                  rich_text: [
                    {
                      href: null,
                      text: {
                        link: null,
                        content:
                          'pragma solidity ^0.8.7;\n//the contract named "Book"\ncontract Book{\n\n\t//this is an empty contract\n\t\n}'
                      },
                      type: 'text',
                      plain_text:
                        'pragma solidity ^0.8.7;\n//the contract named "Book"\ncontract Book{\n\n\t//this is an empty contract\n\t\n}',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    }
                  ]
                },
                type: 'code',
                object: 'block',
                archived: false,
                created_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                created_time: '2023-07-04T18:35:00.000Z',
                has_children: false,
                last_edited_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                parent_block_id: '6a6d47ce-efe0-416b-a1a1-c8c3e3aa78cb',
                last_edited_time: '2023-07-04T18:35:00.000Z'
              }
            ],
            heading_3: {
              color: 'default',
              rich_text: [
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'Example'
                  },
                  type: 'text',
                  plain_text: 'Example',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                }
              ],
              is_toggleable: true
            },
            created_by: {
              id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
              object: 'user'
            },
            created_time: '2023-07-04T18:35:00.000Z',
            has_children: true,
            last_edited_by: {
              id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
              object: 'user'
            },
            parent_block_id: '5bb01cc6-4be8-42ad-8a06-db5eff859e3c',
            last_edited_time: '2023-07-04T18:35:00.000Z'
          }
        ],
        heading_1: {
          color: 'default',
          rich_text: [
            {
              href: null,
              text: {
                link: null,
                content: 'L'
              },
              type: 'text',
              plain_text: 'L',
              annotations: {
                bold: false,
                code: false,
                color: 'default',
                italic: false,
                underline: false,
                strikethrough: false
              }
            }
          ],
          is_toggleable: true
        },
        created_by: {
          id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
          object: 'user'
        },
        created_time: '2023-07-04T18:35:00.000Z',
        has_children: true,
        last_edited_by: {
          id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
          object: 'user'
        },
        last_edited_time: '2023-07-04T18:35:00.000Z'
      },
      {
        id: '6142098c-17e1-4a49-9531-7f557495d6da',
        type: 'heading_1',
        object: 'block',
        parent: {
          type: 'page_id',
          page_id: 'f3bd501f-0178-497c-a0e9-468e87c79c70'
        },
        archived: false,
        children: [
          {
            id: '8c0f03e0-4b02-4c24-bac1-54dcfa91e4e6',
            type: 'bulleted_list_item',
            object: 'block',
            archived: false,
            children: [
              {
                id: '330648b4-5093-416d-8535-f153cf88637b',
                code: {
                  caption: [],
                  language: 'solidity',
                  rich_text: [
                    {
                      href: null,
                      text: {
                        link: null,
                        content:
                          '//code starts here\ncontract Example { }\n//code ends here\n//regex starts here\n^contract\\s+Example\\s*\\{\\s*\\}\\s*$\n//regex ends here'
                      },
                      type: 'text',
                      plain_text:
                        '//code starts here\ncontract Example { }\n//code ends here\n//regex starts here\n^contract\\s+Example\\s*\\{\\s*\\}\\s*$\n//regex ends here',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    }
                  ]
                },
                type: 'code',
                object: 'block',
                archived: false,
                created_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                created_time: '2023-07-04T18:35:00.000Z',
                has_children: false,
                last_edited_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                parent_block_id: '8c0f03e0-4b02-4c24-bac1-54dcfa91e4e6',
                last_edited_time: '2023-07-04T18:35:00.000Z'
              }
            ],
            created_by: {
              id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
              object: 'user'
            },
            created_time: '2023-07-04T18:35:00.000Z',
            has_children: true,
            last_edited_by: {
              id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
              object: 'user'
            },
            parent_block_id: '6142098c-17e1-4a49-9531-7f557495d6da',
            last_edited_time: '2023-07-04T18:35:00.000Z',
            bulleted_list_item: {
              color: 'default',
              rich_text: [
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'Define a '
                  },
                  type: 'text',
                  plain_text: 'Define a ',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'contract'
                  },
                  type: 'text',
                  plain_text: 'contract',
                  annotations: {
                    bold: false,
                    code: true,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: ' named '
                  },
                  type: 'text',
                  plain_text: ' named ',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'Example'
                  },
                  type: 'text',
                  plain_text: 'Example',
                  annotations: {
                    bold: true,
                    code: false,
                    color: 'blue',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: ' with curly braces.'
                  },
                  type: 'text',
                  plain_text: ' with curly braces.',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                }
              ]
            }
          },
          {
            id: '2415ade6-c1ad-45f0-8c8f-1cbf207a1881',
            type: 'bulleted_list_item',
            object: 'block',
            archived: false,
            children: [
              {
                id: '2b98e1fb-baf9-4677-ad06-46ee3a1b5cf3',
                code: {
                  caption: [],
                  language: 'solidity',
                  rich_text: [
                    {
                      href: null,
                      text: {
                        link: null,
                        content:
                          '//code starts here\ncontract Test { }\n//code ends here\n//regex starts here\n^contract\\s+Test\\s*\\{\\s*\\}\\s*$\n//regex ends here'
                      },
                      type: 'text',
                      plain_text:
                        '//code starts here\ncontract Test { }\n//code ends here\n//regex starts here\n^contract\\s+Test\\s*\\{\\s*\\}\\s*$\n//regex ends here',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    }
                  ]
                },
                type: 'code',
                object: 'block',
                archived: false,
                created_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                created_time: '2023-07-04T18:35:00.000Z',
                has_children: false,
                last_edited_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                parent_block_id: '2415ade6-c1ad-45f0-8c8f-1cbf207a1881',
                last_edited_time: '2023-07-04T18:35:00.000Z'
              }
            ],
            created_by: {
              id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
              object: 'user'
            },
            created_time: '2023-07-04T18:35:00.000Z',
            has_children: true,
            last_edited_by: {
              id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
              object: 'user'
            },
            parent_block_id: '6142098c-17e1-4a49-9531-7f557495d6da',
            last_edited_time: '2023-07-04T18:35:00.000Z',
            bulleted_list_item: {
              color: 'default',
              rich_text: [
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'Define a '
                  },
                  type: 'text',
                  plain_text: 'Define a ',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'contract'
                  },
                  type: 'text',
                  plain_text: 'contract',
                  annotations: {
                    bold: false,
                    code: true,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: ' named '
                  },
                  type: 'text',
                  plain_text: ' named ',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'Test'
                  },
                  type: 'text',
                  plain_text: 'Test',
                  annotations: {
                    bold: true,
                    code: false,
                    color: 'blue',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: ' with curly braces.'
                  },
                  type: 'text',
                  plain_text: ' with curly braces.',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                }
              ]
            }
          },
          {
            id: '625e56a5-842b-4515-a293-60aff38a84a2',
            type: 'bulleted_list_item',
            object: 'block',
            archived: false,
            children: [
              {
                id: '93e775e7-769d-424d-a70e-7e01dccca72a',
                code: {
                  caption: [],
                  language: 'solidity',
                  rich_text: [
                    {
                      href: null,
                      text: {
                        link: null,
                        content:
                          '//code starts here\ntrue\n//code ends here\n//regex starts here\n^true\\s*$\n//regex ends here'
                      },
                      type: 'text',
                      plain_text:
                        '//code starts here\ntrue\n//code ends here\n//regex starts here\n^true\\s*$\n//regex ends here',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    }
                  ]
                },
                type: 'code',
                object: 'block',
                archived: false,
                created_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                created_time: '2023-07-04T18:35:00.000Z',
                has_children: false,
                last_edited_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                parent_block_id: '625e56a5-842b-4515-a293-60aff38a84a2',
                last_edited_time: '2023-07-04T18:35:00.000Z'
              }
            ],
            created_by: {
              id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
              object: 'user'
            },
            created_time: '2023-07-04T18:35:00.000Z',
            has_children: true,
            last_edited_by: {
              id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
              object: 'user'
            },
            parent_block_id: '6142098c-17e1-4a49-9531-7f557495d6da',
            last_edited_time: '2023-07-04T18:35:00.000Z',
            bulleted_list_item: {
              color: 'default',
              rich_text: [
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'Answer the statement with '
                  },
                  type: 'text',
                  plain_text: 'Answer the statement with ',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'true'
                  },
                  type: 'text',
                  plain_text: 'true',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'blue',
                    italic: true,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: ' '
                  },
                  type: 'text',
                  plain_text: ' ',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'yellow',
                    italic: true,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'or '
                  },
                  type: 'text',
                  plain_text: 'or ',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'false. '
                  },
                  type: 'text',
                  plain_text: 'false. ',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'blue',
                    italic: true,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'A solidity file can contain one or more '
                  },
                  type: 'text',
                  plain_text: 'A solidity file can contain one or more ',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'contracts'
                  },
                  type: 'text',
                  plain_text: 'contracts',
                  annotations: {
                    bold: false,
                    code: true,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: '.'
                  },
                  type: 'text',
                  plain_text: '.',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                }
              ]
            }
          },
          {
            id: '5a2e61c8-d6ac-4cec-8de3-de2b19e878ca',
            type: 'bulleted_list_item',
            object: 'block',
            archived: false,
            children: [
              {
                id: 'b236a46f-e1b9-4f39-80f1-fbbcb8261a36',
                code: {
                  caption: [],
                  language: 'solidity',
                  rich_text: [
                    {
                      href: null,
                      text: {
                        link: null,
                        content:
                          '//code starts here\ncontract FirstContract { }\n//code ends here\n//regex starts here\n^contract\\s+FirstContract\\s*\\{\\s*}\\s*$\n//regex ends here\n'
                      },
                      type: 'text',
                      plain_text:
                        '//code starts here\ncontract FirstContract { }\n//code ends here\n//regex starts here\n^contract\\s+FirstContract\\s*\\{\\s*}\\s*$\n//regex ends here\n',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    }
                  ]
                },
                type: 'code',
                object: 'block',
                archived: false,
                created_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                created_time: '2023-07-04T18:35:00.000Z',
                has_children: false,
                last_edited_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                parent_block_id: '5a2e61c8-d6ac-4cec-8de3-de2b19e878ca',
                last_edited_time: '2023-07-04T18:35:00.000Z'
              }
            ],
            created_by: {
              id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
              object: 'user'
            },
            created_time: '2023-07-04T18:35:00.000Z',
            has_children: true,
            last_edited_by: {
              id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
              object: 'user'
            },
            parent_block_id: '6142098c-17e1-4a49-9531-7f557495d6da',
            last_edited_time: '2023-07-04T18:35:00.000Z',
            bulleted_list_item: {
              color: 'default',
              rich_text: [
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'Complete the given code below. Write a '
                  },
                  type: 'text',
                  plain_text: 'Complete the given code below. Write a ',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'contract'
                  },
                  type: 'text',
                  plain_text: 'contract',
                  annotations: {
                    bold: false,
                    code: true,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: ' named '
                  },
                  type: 'text',
                  plain_text: ' named ',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'FirstContract'
                  },
                  type: 'text',
                  plain_text: 'FirstContract',
                  annotations: {
                    bold: true,
                    code: false,
                    color: 'blue',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                }
              ]
            }
          },
          {
            id: 'b1d580f4-5359-40bb-ae29-9592b6bfe24f',
            type: 'bulleted_list_item',
            object: 'block',
            archived: false,
            children: [
              {
                id: 'afc431cf-612c-4686-a057-749e4777516c',
                code: {
                  caption: [],
                  language: 'solidity',
                  rich_text: [
                    {
                      href: null,
                      text: {
                        link: null,
                        content:
                          'contract FirstContract {\n    //some code here\n}\n\n//code starts here\ncontract SecondContract { }\n//code ends here\n//regex starts here\n^contract\\s+SecondContract\\s*\\{\\s*\\}\\s*$\n//regex ends here'
                      },
                      type: 'text',
                      plain_text:
                        'contract FirstContract {\n    //some code here\n}\n\n//code starts here\ncontract SecondContract { }\n//code ends here\n//regex starts here\n^contract\\s+SecondContract\\s*\\{\\s*\\}\\s*$\n//regex ends here',
                      annotations: {
                        bold: false,
                        code: false,
                        color: 'default',
                        italic: false,
                        underline: false,
                        strikethrough: false
                      }
                    }
                  ]
                },
                type: 'code',
                object: 'block',
                archived: false,
                created_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                created_time: '2023-07-04T18:35:00.000Z',
                has_children: false,
                last_edited_by: {
                  id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
                  object: 'user'
                },
                parent_block_id: 'b1d580f4-5359-40bb-ae29-9592b6bfe24f',
                last_edited_time: '2023-07-04T18:35:00.000Z'
              }
            ],
            created_by: {
              id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
              object: 'user'
            },
            created_time: '2023-07-04T18:35:00.000Z',
            has_children: true,
            last_edited_by: {
              id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
              object: 'user'
            },
            parent_block_id: '6142098c-17e1-4a49-9531-7f557495d6da',
            last_edited_time: '2023-07-04T18:35:00.000Z',
            bulleted_list_item: {
              color: 'default',
              rich_text: [
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'Complete the given code below. Write a new '
                  },
                  type: 'text',
                  plain_text: 'Complete the given code below. Write a new ',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'contract'
                  },
                  type: 'text',
                  plain_text: 'contract',
                  annotations: {
                    bold: false,
                    code: true,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: ' named '
                  },
                  type: 'text',
                  plain_text: ' named ',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'SecondContract'
                  },
                  type: 'text',
                  plain_text: 'SecondContract',
                  annotations: {
                    bold: true,
                    code: false,
                    color: 'blue',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: ' '
                  },
                  type: 'text',
                  plain_text: ' ',
                  annotations: {
                    bold: true,
                    code: false,
                    color: 'blue',
                    italic: true,
                    underline: false,
                    strikethrough: false
                  }
                },
                {
                  href: null,
                  text: {
                    link: null,
                    content: 'with curly braces'
                  },
                  type: 'text',
                  plain_text: 'with curly braces',
                  annotations: {
                    bold: false,
                    code: false,
                    color: 'default',
                    italic: false,
                    underline: false,
                    strikethrough: false
                  }
                }
              ]
            }
          }
        ],
        heading_1: {
          color: 'default',
          rich_text: [
            {
              href: null,
              text: {
                link: null,
                content: 'Quizzes'
              },
              type: 'text',
              plain_text: 'Quizzes',
              annotations: {
                bold: false,
                code: false,
                color: 'default',
                italic: false,
                underline: false,
                strikethrough: false
              }
            }
          ],
          is_toggleable: true
        },
        created_by: {
          id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
          object: 'user'
        },
        created_time: '2023-07-04T18:35:00.000Z',
        has_children: true,
        last_edited_by: {
          id: 'c1cb59ba-1f25-42c5-8f23-6e25ec008148',
          object: 'user'
        },
        last_edited_time: '2023-07-04T18:35:00.000Z'
      }
    ],
    sequence: 1,
    createdAt: '2023-07-06T08:58:26.008Z',
    updatedAt: '2023-07-06T08:58:26.008Z',
    unitId: 'd7dae2c5-99bd-49b5-b395-3833989958b4',
    courseId: '2e2f1305-a5a2-4f24-8ae7-d6b46228824a'
  });
};

const postMethodHandler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' });
};
