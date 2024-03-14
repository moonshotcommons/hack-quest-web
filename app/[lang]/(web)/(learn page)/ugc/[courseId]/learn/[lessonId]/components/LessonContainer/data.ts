export const quiz = {
  id: '477ce072-ec5c-4cda-90b1-106a823f9194',
  type: 'Quiz',
  title: 'TODO',
  content: {
    color: 'default',
    rich_text: [
      {
        href: null,
        text: {
          link: null,
          content: 'Quiz/TODO'
        },
        type: 'text',
        plain_text: 'Quiz/TODO',
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
  children: [
    {
      id: '21eaca84-b907-489a-879b-1de5213d770a',
      type: 'QuizA',
      lines: [
        {
          id: 'ddd59611-6687-4591-bb78-d4c6202047de',
          type: 'default',
          content: 'pragma solidity ^0.8.17;',
          lineNumber: 1
        },
        {
          id: '5a05306b-8a27-4c54-80b6-80354c8a902a',
          type: 'default',
          content: '',
          lineNumber: 2
        },
        {
          id: '870a981b-f6cc-4924-8948-981b30e5e717',
          type: 'default',
          content: 'contract MyNFT {',
          lineNumber: 3
        },
        {
          id: 'b5184f0a-9b99-434f-ae58-d5d98ac64806',
          type: 'annotation',
          content: '  // Define a Token struct to store NFT information',
          lineNumber: 4
        },
        {
          id: '1b2a5348-65e9-4320-9b36-bc231c007131',
          type: 'default',
          content: '  struct Token {',
          lineNumber: 5
        },
        {
          id: 'c678493a-7afa-4ad5-b126-de10da797807',
          type: 'default',
          content: '    string name; // NFT name',
          lineNumber: 6
        },
        {
          id: '7307f643-b34f-490e-a409-32e272ae2fd1',
          type: 'default',
          content: '    string description; // NFT description',
          lineNumber: 7
        },
        {
          id: '78ac11f3-aef2-4e0f-9ad2-6b36dc35c51e',
          type: 'default',
          content: '    address owner; // NFT owner address',
          lineNumber: 8
        },
        {
          id: 'feb62431-a278-4ae3-9a4c-5b7976b66708',
          type: 'default',
          content: '  }',
          lineNumber: 9
        },
        {
          id: '7a274202-123e-4082-a4c8-7aa36f6a8f1f',
          type: 'default',
          content: '',
          lineNumber: 10
        },
        {
          id: '43e82ef1-ed67-4e10-b652-e08e226dc802',
          type: 'annotation',
          content: '  // Use mapping to store the information of each NFT',
          lineNumber: 11
        },
        {
          id: '372d079b-5824-4e3d-9b6b-8df2c2109921',
          type: 'default',
          content: '  mapping(uint256 => Token) private tokens;',
          lineNumber: 12
        },
        {
          id: '50889de4-0a03-43f1-a672-19585e8477e4',
          type: 'default',
          content: '',
          lineNumber: 13
        },
        {
          id: 'd33fba4b-0bc4-4cd0-80ed-fa4451ca8c68',
          type: 'annotation',
          content: '  // Record the next available NFT ID.',
          lineNumber: 14
        },
        {
          id: '4fc9a1cf-1f6f-455c-9ff7-a4a49a4307b5',
          type: 'default',
          content: '  uint256 nextTokenId = 1;',
          lineNumber: 15
        },
        {
          id: 'a1a8eb15-946d-4827-aeb3-764bf257dacf',
          type: 'default',
          content: '',
          lineNumber: 16
        },
        {
          id: '093826f0-7be0-43b7-bffa-b52e1b5c9e4d',
          type: 'annotation',
          content:
            '  // Create an NFT function to create a new NFT and assign it to the caller.',
          lineNumber: 17
        },
        {
          id: 'c91dfdaf-0a5b-4de1-95ed-3d2904d72588',
          type: 'default',
          content:
            '  function mint(string memory _name, string memory _description)',
          lineNumber: 18
        },
        {
          id: '054a3cb1-f656-4ea0-980a-8195f8c57208',
          type: 'default',
          content: '    public',
          lineNumber: 19
        },
        {
          id: '78cee3a5-4925-42d6-acaf-51847f6a5234',
          type: 'default',
          content: '    returns (uint256)',
          lineNumber: 20
        },
        {
          id: '365fa91a-c4e6-4b09-be6a-59f46e7665ae',
          type: 'default',
          content: '  {',
          lineNumber: 21
        },
        {
          id: '07b1c569-917f-467f-a4cc-87014276ce58',
          type: 'default',
          content:
            '    Token memory newNFT = Token(_name, _description, msg.sender);',
          lineNumber: 22
        },
        {
          id: 'ef6c6f93-165b-440c-8bfc-157e8e5220c6',
          type: 'default',
          content: '    tokens[nextTokenId] = newNFT;',
          lineNumber: 23
        },
        {
          id: '13322fea-9bd4-451d-a751-ad774c3c2415',
          type: 'default',
          content: '    ownerTokens[msg.sender].push(nextTokenId);',
          lineNumber: 24
        },
        {
          id: '75239a97-06e5-40b1-ab5f-400d584ee800',
          type: 'default',
          content: '    nextTokenId++;',
          lineNumber: 25
        },
        {
          id: '7657ddcf-e60d-485d-8b53-ccfb1e528f05',
          type: 'default',
          content: '    return nextTokenId - 1;',
          lineNumber: 26
        },
        {
          id: '764a1bb4-3780-4e5d-a333-5a1b1e9361cf',
          type: 'default',
          content: '  }',
          lineNumber: 27
        },
        {
          id: '83ad4434-1acc-4b8f-aac0-d5126dcd0ede',
          type: 'default',
          content: '',
          lineNumber: 28
        },
        {
          id: 'b81a730e-8ee0-480b-abf4-872577f08ce5',
          type: 'annotation',
          content:
            '  //Create a function to get information on a specified NFT',
          lineNumber: 29
        },
        {
          id: '0c6ec3d3-d656-4b28-8ae1-4ccb29332a44',
          type: 'input',
          regex:
            '^function\\s+getNFT\\s*\\(\\s*uint256\\s+\\_tokenId\\s*\\)\\s*public\\s+view\\s+returns\\s*\\(\\s*string\\s+memory\\s+name\\s*,\\s*string\\s+memory\\s+description\\s*,\\s*address\\s+owner\\s*\\)\\s*\\{\\s*\\}\\s*$',
          content:
            '  function getNFT(uint256 _tokenId) public view returns (string memory name, string memory description, address owner) {}',
          lineNumber: 30,
          sourceLines: [
            {
              id: 'e79656e9-570d-4254-a01d-ef7692c07737',
              type: 'default',
              content:
                '  function getNFT(uint256 _tokenId) public view returns (string memory name, string memory description, address owner) {}',
              lineNumber: 0
            }
          ]
        },
        {
          id: '87f8c677-1558-45e6-bb37-74d6b599dd55',
          type: 'default',
          content: '',
          lineNumber: 31
        },
        {
          id: '6ec9e7b4-1d1c-457a-a49f-5045ea9a9660',
          type: 'default',
          content: '}',
          lineNumber: 32
        }
      ],
      title: '',
      content: {
        color: 'default',
        rich_text: [
          {
            href: null,
            text: {
              link: null,
              content: 'QuizA'
            },
            type: 'text',
            plain_text: 'QuizA',
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
      children: [
        {
          id: 'a78002ae-d69c-4458-a4e2-286178f013c6',
          type: 'numbered_list_item',
          content: {
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
                  content: 'public'
                },
                type: 'text',
                plain_text: 'public',
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
                  content: ' '
                },
                type: 'text',
                plain_text: ' ',
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
                  content: 'function '
                },
                type: 'text',
                plain_text: 'function ',
                annotations: {
                  bold: false,
                  code: false,
                  color: 'default',
                  italic: true,
                  underline: false,
                  strikethrough: false
                }
              },
              {
                href: null,
                text: {
                  link: null,
                  content: 'named '
                },
                type: 'text',
                plain_text: 'named ',
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
                  content: 'getNFT'
                },
                type: 'text',
                plain_text: 'getNFT',
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
                  content: ' '
                },
                type: 'text',
                plain_text: ' ',
                annotations: {
                  bold: false,
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
                  content: 'with '
                },
                type: 'text',
                plain_text: 'with ',
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
                  content: 'state mutability'
                },
                type: 'text',
                plain_text: 'state mutability',
                annotations: {
                  bold: false,
                  code: false,
                  color: 'default',
                  italic: true,
                  underline: false,
                  strikethrough: false
                }
              },
              {
                href: null,
                text: {
                  link: null,
                  content: ' set to '
                },
                type: 'text',
                plain_text: ' set to ',
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
                  content: 'view'
                },
                type: 'text',
                plain_text: 'view',
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
                  content: '. The '
                },
                type: 'text',
                plain_text: '. The ',
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
                  content: 'function '
                },
                type: 'text',
                plain_text: 'function ',
                annotations: {
                  bold: false,
                  code: false,
                  color: 'default',
                  italic: true,
                  underline: false,
                  strikethrough: false
                }
              },
              {
                href: null,
                text: {
                  link: null,
                  content: 'should have an input '
                },
                type: 'text',
                plain_text: 'should have an input ',
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
                  content: 'parameter '
                },
                type: 'text',
                plain_text: 'parameter ',
                annotations: {
                  bold: false,
                  code: false,
                  color: 'default',
                  italic: true,
                  underline: false,
                  strikethrough: false
                }
              },
              {
                href: null,
                text: {
                  link: null,
                  content: 'of type '
                },
                type: 'text',
                plain_text: 'of type ',
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
                  content: 'uint256'
                },
                type: 'text',
                plain_text: 'uint256',
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
                  content: '_tokenId'
                },
                type: 'text',
                plain_text: '_tokenId',
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
                  content: '.'
                },
                type: 'text',
                plain_text: '.',
                annotations: {
                  bold: false,
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
                  content: ' The '
                },
                type: 'text',
                plain_text: ' The ',
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
                  content: 'function '
                },
                type: 'text',
                plain_text: 'function ',
                annotations: {
                  bold: false,
                  code: false,
                  color: 'default',
                  italic: true,
                  underline: false,
                  strikethrough: false
                }
              },
              {
                href: null,
                text: {
                  link: null,
                  content: 'should have three '
                },
                type: 'text',
                plain_text: 'should have three ',
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
                  content: 'return'
                },
                type: 'text',
                plain_text: 'return',
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
                  content: ' values: '
                },
                type: 'text',
                plain_text: ' values: ',
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
                  content: 'string'
                },
                type: 'text',
                plain_text: 'string',
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
                  content: ' '
                },
                type: 'text',
                plain_text: ' ',
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
                  content: 'memory'
                },
                type: 'text',
                plain_text: 'memory',
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
                  content: ' '
                },
                type: 'text',
                plain_text: ' ',
                annotations: {
                  bold: false,
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
                  content: 'name'
                },
                type: 'text',
                plain_text: 'name',
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
                  content: 'string'
                },
                type: 'text',
                plain_text: 'string',
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
                  content: ' '
                },
                type: 'text',
                plain_text: ' ',
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
                  content: 'memory'
                },
                type: 'text',
                plain_text: 'memory',
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
                  content: ' '
                },
                type: 'text',
                plain_text: ' ',
                annotations: {
                  bold: false,
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
                  content: 'description'
                },
                type: 'text',
                plain_text: 'description',
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
                  content: ', and '
                },
                type: 'text',
                plain_text: ', and ',
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
                  content: 'address'
                },
                type: 'text',
                plain_text: 'address',
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
                  content: ' '
                },
                type: 'text',
                plain_text: ' ',
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
                  content: 'owner'
                },
                type: 'text',
                plain_text: 'owner',
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
          isToggle: false,
          isCustomType: false
        }
      ],
      isToggle: true,
      notionType: 'heading_1',
      answerRegex: [
        '^function\\s+getNFT\\s*\\(\\s*uint256\\s+\\_tokenId\\s*\\)\\s*public\\s+view\\s+returns\\s*\\(\\s*string\\s+memory\\s+name\\s*,\\s*string\\s+memory\\s+description\\s*,\\s*address\\s+owner\\s*\\)\\s*\\{\\s*\\}\\s*$'
      ],
      isCustomType: true,
      sourceEditorCode: {
        id: 'c6057677-d818-4ca0-991f-3270abd0259f',
        type: 'code',
        content: {
          caption: [],
          language: 'solidity',
          rich_text: [
            {
              href: null,
              text: {
                link: null,
                content:
                  'pragma solidity ^0.8.17;\n\ncontract MyNFT {\n  // Define a Token struct to store NFT information\n  struct Token {\n    string name; // NFT name\n    string description; // NFT description\n    address owner; // NFT owner address\n  }\n\n  // Use mapping to store the information of each NFT\n  mapping(uint256 => Token) private tokens;\n\n  // Record the next available NFT ID.\n  uint256 nextTokenId = 1;\n\n  // Create an NFT function to create a new NFT and assign it to the caller.\n  function mint(string memory _name, string memory _description)\n    public\n    returns (uint256)\n  {\n    Token memory newNFT = Token(_name, _description, msg.sender);\n    tokens[nextTokenId] = newNFT;\n    ownerTokens[msg.sender].push(nextTokenId);\n    nextTokenId++;\n    return nextTokenId - 1;\n  }\n\n  //Create a function to get information on a specified NFT\n  @@@\n  function getNFT(uint256 _tokenId) public view returns (string memory name, string memory description, address owner) {}\n  ###\n  //regex starts here\n  ^function\\s+getNFT\\s*\\(\\s*uint256\\s+\\_tokenId\\s*\\)\\s*public\\s+view\\s+returns\\s*\\(\\s*string\\s+memory\\s+name\\s*,\\s*string\\s+memory\\s+description\\s*,\\s*address\\s+owner\\s*\\)\\s*\\{\\s*\\}\\s*$\n  //regex ends here\n}'
              },
              type: 'text',
              plain_text:
                'pragma solidity ^0.8.17;\n\ncontract MyNFT {\n  // Define a Token struct to store NFT information\n  struct Token {\n    string name; // NFT name\n    string description; // NFT description\n    address owner; // NFT owner address\n  }\n\n  // Use mapping to store the information of each NFT\n  mapping(uint256 => Token) private tokens;\n\n  // Record the next available NFT ID.\n  uint256 nextTokenId = 1;\n\n  // Create an NFT function to create a new NFT and assign it to the caller.\n  function mint(string memory _name, string memory _description)\n    public\n    returns (uint256)\n  {\n    Token memory newNFT = Token(_name, _description, msg.sender);\n    tokens[nextTokenId] = newNFT;\n    ownerTokens[msg.sender].push(nextTokenId);\n    nextTokenId++;\n    return nextTokenId - 1;\n  }\n\n  //Create a function to get information on a specified NFT\n  @@@\n  function getNFT(uint256 _tokenId) public view returns (string memory name, string memory description, address owner) {}\n  ###\n  //regex starts here\n  ^function\\s+getNFT\\s*\\(\\s*uint256\\s+\\_tokenId\\s*\\)\\s*public\\s+view\\s+returns\\s*\\(\\s*string\\s+memory\\s+name\\s*,\\s*string\\s+memory\\s+description\\s*,\\s*address\\s+owner\\s*\\)\\s*\\{\\s*\\}\\s*$\n  //regex ends here\n}',
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
        isToggle: false,
        isCustomType: false
      }
    }
  ],
  isToggle: true,
  notionType: 'heading_1',
  isCustomType: true
};
