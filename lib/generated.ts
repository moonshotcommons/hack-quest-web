import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent
} from 'wagmi/codegen';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Airdrop
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const airdropAbi = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner'
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'OwnershipTransferred'
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_root', internalType: 'bytes32', type: 'bytes32' },
      { name: '_startTime', internalType: 'uint256', type: 'uint256' },
      { name: '_endTime', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'addTokenAirDrop',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tokenAddress', internalType: 'address', type: 'address' },
      { name: 'proof', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'claim',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'isClaimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'tokenOfInfo',
    outputs: [
      { name: 'root', internalType: 'bytes32', type: 'bytes32' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' }
    ]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_root', internalType: 'bytes32', type: 'bytes32' },
      { name: '_startTime', internalType: 'uint256', type: 'uint256' },
      { name: '_endTime', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'update',
    outputs: []
  }
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CertificateNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const certificateNftAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' }
    ]
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' }
    ],
    name: 'ERC721IncorrectOwner'
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC721InsufficientApproval'
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover'
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator'
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner'
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver'
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender'
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken'
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner'
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false }
    ],
    name: 'ApprovalForAll'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'BatchMetadataUpdate'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'MetadataUpdate'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'OwnershipTransferred'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'Transfer'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'certificate',
        internalType: 'struct CertificateNFT.Certificate',
        type: 'tuple',
        components: [
          { name: 'userId', internalType: 'string', type: 'string' },
          { name: 'chaidId', internalType: 'string', type: 'string' },
          { name: 'classId', internalType: 'string', type: 'string' },
          { name: 'certificateId', internalType: 'string', type: 'string' },
          { name: 'leveID', internalType: 'string', type: 'string' },
          { name: 'standby_one', internalType: 'string', type: 'string' }
        ],
        indexed: false
      }
    ],
    name: 'mintEvent'
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'baseURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'certificates',
    outputs: [
      { name: 'userId', internalType: 'string', type: 'string' },
      { name: 'chaidId', internalType: 'string', type: 'string' },
      { name: 'classId', internalType: 'string', type: 'string' },
      { name: 'certificateId', internalType: 'string', type: 'string' },
      { name: 'leveID', internalType: 'string', type: 'string' },
      { name: 'standby_one', internalType: 'string', type: 'string' }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [{ name: '_messageHash', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getEthSignedMessageHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'userId', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'string', type: 'string' },
      { name: 'classId', internalType: 'string', type: 'string' },
      { name: 'certificateId', internalType: 'string', type: 'string' },
      { name: 'levelId', internalType: 'string', type: 'string' },
      { name: 'standby_one', internalType: 'string', type: 'string' }
    ],
    name: 'getMessageHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' }
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: 'userId', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'string', type: 'string' },
      { name: 'classId', internalType: 'string', type: 'string' },
      { name: 'certificateId', internalType: 'string', type: 'string' },
      { name: 'levelId', internalType: 'string', type: 'string' },
      { name: 'standby_one', internalType: 'string', type: 'string' },
      { name: '_signature', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'safeTransferFrom',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'safeTransferFrom',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' }
    ],
    name: 'setApprovalForAll',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'signer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'tokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenIsMint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_newBaseURI', internalType: 'string', type: 'string' }],
    name: 'updateBaseURI',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'certificate',
        internalType: 'struct CertificateNFT.Certificate',
        type: 'tuple',
        components: [
          { name: 'userId', internalType: 'string', type: 'string' },
          { name: 'chaidId', internalType: 'string', type: 'string' },
          { name: 'classId', internalType: 'string', type: 'string' },
          { name: 'certificateId', internalType: 'string', type: 'string' },
          { name: 'leveID', internalType: 'string', type: 'string' },
          { name: 'standby_one', internalType: 'string', type: 'string' }
        ]
      }
    ],
    name: 'updateCertificate',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_signer', internalType: 'address', type: 'address' }],
    name: 'updateSigner',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_msgHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_signature', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'verify',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  }
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LaunchapToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const launchapTokenAbi = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientAllowance'
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientBalance'
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover'
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver'
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender'
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Transfer'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'mint',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  }
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Launchpad
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const launchpadAbi = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance'
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'launchpadId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'launchedAddress',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'chainID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      { name: '_name', internalType: 'string', type: 'string', indexed: false }
    ],
    name: 'AddLaunchpad'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'launchpadId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'points',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: false
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'chainID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Claimed'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'launchpadId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: false
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'chainID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Staked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'launchpadId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: false
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'chainID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'UnStaked'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'UserChecks',
    outputs: [
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'staked', internalType: 'uint256', type: 'uint256' }
    ]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_stakeToken', internalType: 'contract ERC20', type: 'address' },
      {
        name: '_launchedToken',
        internalType: 'contract ERC20',
        type: 'address'
      },
      { name: '_startTime', internalType: 'uint32', type: 'uint32' },
      { name: '_endTime', internalType: 'uint32', type: 'uint32' },
      { name: '_chainID', internalType: 'uint256', type: 'uint256' },
      { name: '_stakingAddress', internalType: 'address', type: 'address' },
      { name: '_launchedAddress', internalType: 'address', type: 'address' },
      { name: '_LowStakingAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_totalAllocation', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'addLaunchpad',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_whiltAddress', internalType: 'address', type: 'address' }],
    name: 'addWhiltAddress',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_launchpadId', internalType: 'uint256', type: 'uint256' },
      { name: '_name', internalType: 'string', type: 'string' }
    ],
    name: 'changeLaunchpadName',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_launchpadId', internalType: 'uint256', type: 'uint256' },
      { name: '_status', internalType: 'bool', type: 'bool' }
    ],
    name: 'changeLaunchpadStatus',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_launchpadId', internalType: 'uint256', type: 'uint256' },
      { name: '_pointsAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'proof', internalType: 'bytes32[]', type: 'bytes32[]' }
    ],
    name: 'claimOfSameChain',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'exchangeAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getExchangeAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'isExchanged',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'launchpadOfWhiltaddress',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'launchpads',
    outputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'startTime', internalType: 'uint32', type: 'uint32' },
      { name: 'endTime', internalType: 'uint32', type: 'uint32' },
      { name: 'LowStakingTime', internalType: 'uint32', type: 'uint32' },
      { name: 'chainID', internalType: 'uint256', type: 'uint256' },
      { name: 'LowStakingAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'stakingAddress', internalType: 'address', type: 'address' },
      { name: 'launchedAddress', internalType: 'address', type: 'address' },
      { name: 'totalAllocation', internalType: 'uint256', type: 'uint256' }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'merkleRoot',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_whiltAddress', internalType: 'address', type: 'address' }],
    name: 'removeWhiltAddress',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_launchpadId', internalType: 'uint256', type: 'uint256' },
      { name: '_administrator', internalType: 'address[]', type: 'address[]' }
    ],
    name: 'setLaunchpadAdministrator',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_launchpadId', internalType: 'uint256', type: 'uint256' },
      { name: '_launchedAddress', internalType: 'address', type: 'address' }
    ],
    name: 'setLaunchpadLaunchedAddress',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_launchpadId', internalType: 'uint256', type: 'uint256' },
      { name: '_LowStakingTime', internalType: 'uint32', type: 'uint32' }
    ],
    name: 'setLaunchpadLowStakingTime',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_launchpadId', internalType: 'uint256', type: 'uint256' },
      { name: '_totalPoints', internalType: 'uint256', type: 'uint256' },
      { name: '_root', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'setLaunchpadRoot',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_launchpadId', internalType: 'uint256', type: 'uint256' },
      { name: '_stakingAddress', internalType: 'address', type: 'address' }
    ],
    name: 'setLaunchpadStakingAddress',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_launchpadId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'stake',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'totalPoints',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'trackCheckpoints',
    outputs: [
      { name: 'stakeToken', internalType: 'contract ERC20', type: 'address' },
      {
        name: 'launchedToken',
        internalType: 'contract ERC20',
        type: 'address'
      },
      { name: 'allowsWithdraw', internalType: 'bool', type: 'bool' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'totalStaked', internalType: 'uint256', type: 'uint256' },
      { name: 'status', internalType: 'bool', type: 'bool' }
    ]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_launchpadId', internalType: 'uint256', type: 'uint256' },
      { name: '_index', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'unstake',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_launchpadId', internalType: 'uint256', type: 'uint256' },
      { name: '_status', internalType: 'bool', type: 'bool' }
    ],
    name: 'updateAllowsWithdraw',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_launchpadId', internalType: 'uint256', type: 'uint256' },
      { name: '_status', internalType: 'bool', type: 'bool' }
    ],
    name: 'updateLaunchpadStatus',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'userCheckpointCounts',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: 'root', internalType: 'bytes32', type: 'bytes32' },
      { name: 'proof', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'verify',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'whiltAddress',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  }
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SBTManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sbtManagerAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_admin', internalType: 'address', type: 'address' }]
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner'
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'admin',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'ChangeAdmin'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'OwnershipTransferred'
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_admin', internalType: 'address', type: 'address' }],
    name: 'changeAdmin',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'lessonId', internalType: 'uint256', type: 'uint256' },
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
      { name: 'baseURI_', internalType: 'string', type: 'string' }
    ],
    name: 'createSBT',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'lessonId', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'safeMint',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: []
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: 'hashResult', internalType: 'bytes32', type: 'bytes32' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'verifyHash',
    outputs: [{ name: 'signer', internalType: 'address', type: 'address' }]
  }
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StakingToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stakingTokenAbi = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientAllowance'
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientBalance'
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover'
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver'
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender'
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Transfer'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'mint',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  }
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__
 */
export const useReadAirdrop = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"isClaimed"`
 */
export const useReadAirdropIsClaimed = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'isClaimed'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"owner"`
 */
export const useReadAirdropOwner = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'owner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"tokenOfInfo"`
 */
export const useReadAirdropTokenOfInfo = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'tokenOfInfo'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__
 */
export const useWriteAirdrop = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"addTokenAirDrop"`
 */
export const useWriteAirdropAddTokenAirDrop = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'addTokenAirDrop'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"claim"`
 */
export const useWriteAirdropClaim = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'claim'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteAirdropRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'renounceOwnership'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteAirdropTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'transferOwnership'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"update"`
 */
export const useWriteAirdropUpdate = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'update'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__
 */
export const useSimulateAirdrop = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"addTokenAirDrop"`
 */
export const useSimulateAirdropAddTokenAirDrop = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'addTokenAirDrop'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"claim"`
 */
export const useSimulateAirdropClaim = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'claim'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateAirdropRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'renounceOwnership'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateAirdropTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'transferOwnership'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"update"`
 */
export const useSimulateAirdropUpdate = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'update'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link airdropAbi}__
 */
export const useWatchAirdropEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: airdropAbi
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link airdropAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchAirdropOwnershipTransferredEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: airdropAbi,
  eventName: 'OwnershipTransferred'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__
 */
export const useReadCertificateNft = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadCertificateNftBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"baseURI"`
 */
export const useReadCertificateNftBaseUri = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'baseURI'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"certificates"`
 */
export const useReadCertificateNftCertificates = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'certificates'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadCertificateNftGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'getApproved'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"getEthSignedMessageHash"`
 */
export const useReadCertificateNftGetEthSignedMessageHash = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'getEthSignedMessageHash'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"getMessageHash"`
 */
export const useReadCertificateNftGetMessageHash = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'getMessageHash'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadCertificateNftIsApprovedForAll = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'isApprovedForAll'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"name"`
 */
export const useReadCertificateNftName = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'name'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"owner"`
 */
export const useReadCertificateNftOwner = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'owner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadCertificateNftOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'ownerOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"signer"`
 */
export const useReadCertificateNftSigner = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'signer'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadCertificateNftSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'supportsInterface'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadCertificateNftSymbol = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'symbol'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"tokenId"`
 */
export const useReadCertificateNftTokenId = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'tokenId'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"tokenIsMint"`
 */
export const useReadCertificateNftTokenIsMint = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'tokenIsMint'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadCertificateNftTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'tokenURI'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"verify"`
 */
export const useReadCertificateNftVerify = /*#__PURE__*/ createUseReadContract({
  abi: certificateNftAbi,
  functionName: 'verify'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link certificateNftAbi}__
 */
export const useWriteCertificateNft = /*#__PURE__*/ createUseWriteContract({
  abi: certificateNftAbi
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteCertificateNftApprove = /*#__PURE__*/ createUseWriteContract({
  abi: certificateNftAbi,
  functionName: 'approve'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteCertificateNftMint = /*#__PURE__*/ createUseWriteContract({
  abi: certificateNftAbi,
  functionName: 'mint'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteCertificateNftRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: certificateNftAbi,
  functionName: 'renounceOwnership'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteCertificateNftSafeTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: certificateNftAbi,
  functionName: 'safeTransferFrom'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteCertificateNftSetApprovalForAll = /*#__PURE__*/ createUseWriteContract({
  abi: certificateNftAbi,
  functionName: 'setApprovalForAll'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteCertificateNftTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: certificateNftAbi,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteCertificateNftTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: certificateNftAbi,
  functionName: 'transferOwnership'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"updateBaseURI"`
 */
export const useWriteCertificateNftUpdateBaseUri = /*#__PURE__*/ createUseWriteContract({
  abi: certificateNftAbi,
  functionName: 'updateBaseURI'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"updateCertificate"`
 */
export const useWriteCertificateNftUpdateCertificate = /*#__PURE__*/ createUseWriteContract({
  abi: certificateNftAbi,
  functionName: 'updateCertificate'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"updateSigner"`
 */
export const useWriteCertificateNftUpdateSigner = /*#__PURE__*/ createUseWriteContract({
  abi: certificateNftAbi,
  functionName: 'updateSigner'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link certificateNftAbi}__
 */
export const useSimulateCertificateNft = /*#__PURE__*/ createUseSimulateContract({ abi: certificateNftAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateCertificateNftApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: certificateNftAbi,
  functionName: 'approve'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateCertificateNftMint = /*#__PURE__*/ createUseSimulateContract({
  abi: certificateNftAbi,
  functionName: 'mint'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateCertificateNftRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: certificateNftAbi,
  functionName: 'renounceOwnership'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateCertificateNftSafeTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: certificateNftAbi,
  functionName: 'safeTransferFrom'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateCertificateNftSetApprovalForAll = /*#__PURE__*/ createUseSimulateContract({
  abi: certificateNftAbi,
  functionName: 'setApprovalForAll'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateCertificateNftTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: certificateNftAbi,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateCertificateNftTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: certificateNftAbi,
  functionName: 'transferOwnership'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"updateBaseURI"`
 */
export const useSimulateCertificateNftUpdateBaseUri = /*#__PURE__*/ createUseSimulateContract({
  abi: certificateNftAbi,
  functionName: 'updateBaseURI'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"updateCertificate"`
 */
export const useSimulateCertificateNftUpdateCertificate = /*#__PURE__*/ createUseSimulateContract({
  abi: certificateNftAbi,
  functionName: 'updateCertificate'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link certificateNftAbi}__ and `functionName` set to `"updateSigner"`
 */
export const useSimulateCertificateNftUpdateSigner = /*#__PURE__*/ createUseSimulateContract({
  abi: certificateNftAbi,
  functionName: 'updateSigner'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link certificateNftAbi}__
 */
export const useWatchCertificateNftEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: certificateNftAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link certificateNftAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchCertificateNftApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: certificateNftAbi,
  eventName: 'Approval'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link certificateNftAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchCertificateNftApprovalForAllEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: certificateNftAbi,
  eventName: 'ApprovalForAll'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link certificateNftAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const useWatchCertificateNftBatchMetadataUpdateEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: certificateNftAbi,
  eventName: 'BatchMetadataUpdate'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link certificateNftAbi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const useWatchCertificateNftMetadataUpdateEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: certificateNftAbi,
  eventName: 'MetadataUpdate'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link certificateNftAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchCertificateNftOwnershipTransferredEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: certificateNftAbi,
  eventName: 'OwnershipTransferred'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link certificateNftAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchCertificateNftTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: certificateNftAbi,
  eventName: 'Transfer'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link certificateNftAbi}__ and `eventName` set to `"mintEvent"`
 */
export const useWatchCertificateNftMintEventEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: certificateNftAbi,
  eventName: 'mintEvent'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchapTokenAbi}__
 */
export const useReadLaunchapToken = /*#__PURE__*/ createUseReadContract({
  abi: launchapTokenAbi
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchapTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadLaunchapTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: launchapTokenAbi,
  functionName: 'allowance'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchapTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadLaunchapTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: launchapTokenAbi,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchapTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadLaunchapTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: launchapTokenAbi,
  functionName: 'decimals'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchapTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadLaunchapTokenName = /*#__PURE__*/ createUseReadContract({
  abi: launchapTokenAbi,
  functionName: 'name'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchapTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadLaunchapTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: launchapTokenAbi,
  functionName: 'symbol'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchapTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadLaunchapTokenTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: launchapTokenAbi,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchapTokenAbi}__
 */
export const useWriteLaunchapToken = /*#__PURE__*/ createUseWriteContract({
  abi: launchapTokenAbi
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchapTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteLaunchapTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: launchapTokenAbi,
  functionName: 'approve'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchapTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteLaunchapTokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: launchapTokenAbi,
  functionName: 'mint'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchapTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteLaunchapTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: launchapTokenAbi,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchapTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteLaunchapTokenTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: launchapTokenAbi,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchapTokenAbi}__
 */
export const useSimulateLaunchapToken = /*#__PURE__*/ createUseSimulateContract({ abi: launchapTokenAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchapTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateLaunchapTokenApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: launchapTokenAbi,
  functionName: 'approve'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchapTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateLaunchapTokenMint = /*#__PURE__*/ createUseSimulateContract({
  abi: launchapTokenAbi,
  functionName: 'mint'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchapTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateLaunchapTokenTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: launchapTokenAbi,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchapTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateLaunchapTokenTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: launchapTokenAbi,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link launchapTokenAbi}__
 */
export const useWatchLaunchapTokenEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: launchapTokenAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link launchapTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchLaunchapTokenApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: launchapTokenAbi,
  eventName: 'Approval'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link launchapTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchLaunchapTokenTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: launchapTokenAbi,
  eventName: 'Transfer'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchpadAbi}__
 */
export const useReadLaunchpad = /*#__PURE__*/ createUseReadContract({
  abi: launchpadAbi
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"UserChecks"`
 */
export const useReadLaunchpadUserChecks = /*#__PURE__*/ createUseReadContract({
  abi: launchpadAbi,
  functionName: 'UserChecks'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"exchangeAmount"`
 */
export const useReadLaunchpadExchangeAmount = /*#__PURE__*/ createUseReadContract({
  abi: launchpadAbi,
  functionName: 'exchangeAmount'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"getExchangeAmount"`
 */
export const useReadLaunchpadGetExchangeAmount = /*#__PURE__*/ createUseReadContract({
  abi: launchpadAbi,
  functionName: 'getExchangeAmount'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"isExchanged"`
 */
export const useReadLaunchpadIsExchanged = /*#__PURE__*/ createUseReadContract({
  abi: launchpadAbi,
  functionName: 'isExchanged'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"launchpadOfWhiltaddress"`
 */
export const useReadLaunchpadLaunchpadOfWhiltaddress = /*#__PURE__*/ createUseReadContract({
  abi: launchpadAbi,
  functionName: 'launchpadOfWhiltaddress'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"launchpads"`
 */
export const useReadLaunchpadLaunchpads = /*#__PURE__*/ createUseReadContract({
  abi: launchpadAbi,
  functionName: 'launchpads'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"merkleRoot"`
 */
export const useReadLaunchpadMerkleRoot = /*#__PURE__*/ createUseReadContract({
  abi: launchpadAbi,
  functionName: 'merkleRoot'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"totalPoints"`
 */
export const useReadLaunchpadTotalPoints = /*#__PURE__*/ createUseReadContract({
  abi: launchpadAbi,
  functionName: 'totalPoints'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"trackCheckpoints"`
 */
export const useReadLaunchpadTrackCheckpoints = /*#__PURE__*/ createUseReadContract({
  abi: launchpadAbi,
  functionName: 'trackCheckpoints'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"userCheckpointCounts"`
 */
export const useReadLaunchpadUserCheckpointCounts = /*#__PURE__*/ createUseReadContract({
  abi: launchpadAbi,
  functionName: 'userCheckpointCounts'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"verify"`
 */
export const useReadLaunchpadVerify = /*#__PURE__*/ createUseReadContract({
  abi: launchpadAbi,
  functionName: 'verify'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"whiltAddress"`
 */
export const useReadLaunchpadWhiltAddress = /*#__PURE__*/ createUseReadContract({
  abi: launchpadAbi,
  functionName: 'whiltAddress'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchpadAbi}__
 */
export const useWriteLaunchpad = /*#__PURE__*/ createUseWriteContract({
  abi: launchpadAbi
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"addLaunchpad"`
 */
export const useWriteLaunchpadAddLaunchpad = /*#__PURE__*/ createUseWriteContract({
  abi: launchpadAbi,
  functionName: 'addLaunchpad'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"addWhiltAddress"`
 */
export const useWriteLaunchpadAddWhiltAddress = /*#__PURE__*/ createUseWriteContract({
  abi: launchpadAbi,
  functionName: 'addWhiltAddress'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"changeLaunchpadName"`
 */
export const useWriteLaunchpadChangeLaunchpadName = /*#__PURE__*/ createUseWriteContract({
  abi: launchpadAbi,
  functionName: 'changeLaunchpadName'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"changeLaunchpadStatus"`
 */
export const useWriteLaunchpadChangeLaunchpadStatus = /*#__PURE__*/ createUseWriteContract({
  abi: launchpadAbi,
  functionName: 'changeLaunchpadStatus'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"claimOfSameChain"`
 */
export const useWriteLaunchpadClaimOfSameChain = /*#__PURE__*/ createUseWriteContract({
  abi: launchpadAbi,
  functionName: 'claimOfSameChain'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"removeWhiltAddress"`
 */
export const useWriteLaunchpadRemoveWhiltAddress = /*#__PURE__*/ createUseWriteContract({
  abi: launchpadAbi,
  functionName: 'removeWhiltAddress'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"setLaunchpadAdministrator"`
 */
export const useWriteLaunchpadSetLaunchpadAdministrator = /*#__PURE__*/ createUseWriteContract({
  abi: launchpadAbi,
  functionName: 'setLaunchpadAdministrator'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"setLaunchpadLaunchedAddress"`
 */
export const useWriteLaunchpadSetLaunchpadLaunchedAddress = /*#__PURE__*/ createUseWriteContract({
  abi: launchpadAbi,
  functionName: 'setLaunchpadLaunchedAddress'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"setLaunchpadLowStakingTime"`
 */
export const useWriteLaunchpadSetLaunchpadLowStakingTime = /*#__PURE__*/ createUseWriteContract({
  abi: launchpadAbi,
  functionName: 'setLaunchpadLowStakingTime'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"setLaunchpadRoot"`
 */
export const useWriteLaunchpadSetLaunchpadRoot = /*#__PURE__*/ createUseWriteContract({
  abi: launchpadAbi,
  functionName: 'setLaunchpadRoot'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"setLaunchpadStakingAddress"`
 */
export const useWriteLaunchpadSetLaunchpadStakingAddress = /*#__PURE__*/ createUseWriteContract({
  abi: launchpadAbi,
  functionName: 'setLaunchpadStakingAddress'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"stake"`
 */
export const useWriteLaunchpadStake = /*#__PURE__*/ createUseWriteContract({
  abi: launchpadAbi,
  functionName: 'stake'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"unstake"`
 */
export const useWriteLaunchpadUnstake = /*#__PURE__*/ createUseWriteContract({
  abi: launchpadAbi,
  functionName: 'unstake'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"updateAllowsWithdraw"`
 */
export const useWriteLaunchpadUpdateAllowsWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: launchpadAbi,
  functionName: 'updateAllowsWithdraw'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"updateLaunchpadStatus"`
 */
export const useWriteLaunchpadUpdateLaunchpadStatus = /*#__PURE__*/ createUseWriteContract({
  abi: launchpadAbi,
  functionName: 'updateLaunchpadStatus'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchpadAbi}__
 */
export const useSimulateLaunchpad = /*#__PURE__*/ createUseSimulateContract({
  abi: launchpadAbi
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"addLaunchpad"`
 */
export const useSimulateLaunchpadAddLaunchpad = /*#__PURE__*/ createUseSimulateContract({
  abi: launchpadAbi,
  functionName: 'addLaunchpad'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"addWhiltAddress"`
 */
export const useSimulateLaunchpadAddWhiltAddress = /*#__PURE__*/ createUseSimulateContract({
  abi: launchpadAbi,
  functionName: 'addWhiltAddress'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"changeLaunchpadName"`
 */
export const useSimulateLaunchpadChangeLaunchpadName = /*#__PURE__*/ createUseSimulateContract({
  abi: launchpadAbi,
  functionName: 'changeLaunchpadName'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"changeLaunchpadStatus"`
 */
export const useSimulateLaunchpadChangeLaunchpadStatus = /*#__PURE__*/ createUseSimulateContract({
  abi: launchpadAbi,
  functionName: 'changeLaunchpadStatus'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"claimOfSameChain"`
 */
export const useSimulateLaunchpadClaimOfSameChain = /*#__PURE__*/ createUseSimulateContract({
  abi: launchpadAbi,
  functionName: 'claimOfSameChain'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"removeWhiltAddress"`
 */
export const useSimulateLaunchpadRemoveWhiltAddress = /*#__PURE__*/ createUseSimulateContract({
  abi: launchpadAbi,
  functionName: 'removeWhiltAddress'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"setLaunchpadAdministrator"`
 */
export const useSimulateLaunchpadSetLaunchpadAdministrator = /*#__PURE__*/ createUseSimulateContract({
  abi: launchpadAbi,
  functionName: 'setLaunchpadAdministrator'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"setLaunchpadLaunchedAddress"`
 */
export const useSimulateLaunchpadSetLaunchpadLaunchedAddress = /*#__PURE__*/ createUseSimulateContract({
  abi: launchpadAbi,
  functionName: 'setLaunchpadLaunchedAddress'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"setLaunchpadLowStakingTime"`
 */
export const useSimulateLaunchpadSetLaunchpadLowStakingTime = /*#__PURE__*/ createUseSimulateContract({
  abi: launchpadAbi,
  functionName: 'setLaunchpadLowStakingTime'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"setLaunchpadRoot"`
 */
export const useSimulateLaunchpadSetLaunchpadRoot = /*#__PURE__*/ createUseSimulateContract({
  abi: launchpadAbi,
  functionName: 'setLaunchpadRoot'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"setLaunchpadStakingAddress"`
 */
export const useSimulateLaunchpadSetLaunchpadStakingAddress = /*#__PURE__*/ createUseSimulateContract({
  abi: launchpadAbi,
  functionName: 'setLaunchpadStakingAddress'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"stake"`
 */
export const useSimulateLaunchpadStake = /*#__PURE__*/ createUseSimulateContract({
  abi: launchpadAbi,
  functionName: 'stake'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"unstake"`
 */
export const useSimulateLaunchpadUnstake = /*#__PURE__*/ createUseSimulateContract({
  abi: launchpadAbi,
  functionName: 'unstake'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"updateAllowsWithdraw"`
 */
export const useSimulateLaunchpadUpdateAllowsWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: launchpadAbi,
  functionName: 'updateAllowsWithdraw'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link launchpadAbi}__ and `functionName` set to `"updateLaunchpadStatus"`
 */
export const useSimulateLaunchpadUpdateLaunchpadStatus = /*#__PURE__*/ createUseSimulateContract({
  abi: launchpadAbi,
  functionName: 'updateLaunchpadStatus'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link launchpadAbi}__
 */
export const useWatchLaunchpadEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: launchpadAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link launchpadAbi}__ and `eventName` set to `"AddLaunchpad"`
 */
export const useWatchLaunchpadAddLaunchpadEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: launchpadAbi,
  eventName: 'AddLaunchpad'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link launchpadAbi}__ and `eventName` set to `"Claimed"`
 */
export const useWatchLaunchpadClaimedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: launchpadAbi,
  eventName: 'Claimed'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link launchpadAbi}__ and `eventName` set to `"Staked"`
 */
export const useWatchLaunchpadStakedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: launchpadAbi,
  eventName: 'Staked'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link launchpadAbi}__ and `eventName` set to `"UnStaked"`
 */
export const useWatchLaunchpadUnStakedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: launchpadAbi,
  eventName: 'UnStaked'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sbtManagerAbi}__
 */
export const useReadSbtManager = /*#__PURE__*/ createUseReadContract({
  abi: sbtManagerAbi
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sbtManagerAbi}__ and `functionName` set to `"owner"`
 */
export const useReadSbtManagerOwner = /*#__PURE__*/ createUseReadContract({
  abi: sbtManagerAbi,
  functionName: 'owner'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sbtManagerAbi}__ and `functionName` set to `"verifyHash"`
 */
export const useReadSbtManagerVerifyHash = /*#__PURE__*/ createUseReadContract({
  abi: sbtManagerAbi,
  functionName: 'verifyHash'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sbtManagerAbi}__
 */
export const useWriteSbtManager = /*#__PURE__*/ createUseWriteContract({
  abi: sbtManagerAbi
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sbtManagerAbi}__ and `functionName` set to `"changeAdmin"`
 */
export const useWriteSbtManagerChangeAdmin = /*#__PURE__*/ createUseWriteContract({
  abi: sbtManagerAbi,
  functionName: 'changeAdmin'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sbtManagerAbi}__ and `functionName` set to `"createSBT"`
 */
export const useWriteSbtManagerCreateSbt = /*#__PURE__*/ createUseWriteContract({
  abi: sbtManagerAbi,
  functionName: 'createSBT'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sbtManagerAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteSbtManagerRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: sbtManagerAbi,
  functionName: 'renounceOwnership'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sbtManagerAbi}__ and `functionName` set to `"safeMint"`
 */
export const useWriteSbtManagerSafeMint = /*#__PURE__*/ createUseWriteContract({
  abi: sbtManagerAbi,
  functionName: 'safeMint'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sbtManagerAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteSbtManagerTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: sbtManagerAbi,
  functionName: 'transferOwnership'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sbtManagerAbi}__
 */
export const useSimulateSbtManager = /*#__PURE__*/ createUseSimulateContract({
  abi: sbtManagerAbi
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sbtManagerAbi}__ and `functionName` set to `"changeAdmin"`
 */
export const useSimulateSbtManagerChangeAdmin = /*#__PURE__*/ createUseSimulateContract({
  abi: sbtManagerAbi,
  functionName: 'changeAdmin'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sbtManagerAbi}__ and `functionName` set to `"createSBT"`
 */
export const useSimulateSbtManagerCreateSbt = /*#__PURE__*/ createUseSimulateContract({
  abi: sbtManagerAbi,
  functionName: 'createSBT'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sbtManagerAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateSbtManagerRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: sbtManagerAbi,
  functionName: 'renounceOwnership'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sbtManagerAbi}__ and `functionName` set to `"safeMint"`
 */
export const useSimulateSbtManagerSafeMint = /*#__PURE__*/ createUseSimulateContract({
  abi: sbtManagerAbi,
  functionName: 'safeMint'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sbtManagerAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateSbtManagerTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: sbtManagerAbi,
  functionName: 'transferOwnership'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sbtManagerAbi}__
 */
export const useWatchSbtManagerEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: sbtManagerAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sbtManagerAbi}__ and `eventName` set to `"ChangeAdmin"`
 */
export const useWatchSbtManagerChangeAdminEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sbtManagerAbi,
  eventName: 'ChangeAdmin'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sbtManagerAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchSbtManagerOwnershipTransferredEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sbtManagerAbi,
  eventName: 'OwnershipTransferred'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingTokenAbi}__
 */
export const useReadStakingToken = /*#__PURE__*/ createUseReadContract({
  abi: stakingTokenAbi
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadStakingTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: stakingTokenAbi,
  functionName: 'allowance'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadStakingTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: stakingTokenAbi,
  functionName: 'balanceOf'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadStakingTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: stakingTokenAbi,
  functionName: 'decimals'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadStakingTokenName = /*#__PURE__*/ createUseReadContract({
  abi: stakingTokenAbi,
  functionName: 'name'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadStakingTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: stakingTokenAbi,
  functionName: 'symbol'
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadStakingTokenTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: stakingTokenAbi,
  functionName: 'totalSupply'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingTokenAbi}__
 */
export const useWriteStakingToken = /*#__PURE__*/ createUseWriteContract({
  abi: stakingTokenAbi
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteStakingTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: stakingTokenAbi,
  functionName: 'approve'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteStakingTokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: stakingTokenAbi,
  functionName: 'mint'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteStakingTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: stakingTokenAbi,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteStakingTokenTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: stakingTokenAbi,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingTokenAbi}__
 */
export const useSimulateStakingToken = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingTokenAbi
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateStakingTokenApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingTokenAbi,
  functionName: 'approve'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateStakingTokenMint = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingTokenAbi,
  functionName: 'mint'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateStakingTokenTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingTokenAbi,
  functionName: 'transfer'
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateStakingTokenTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingTokenAbi,
  functionName: 'transferFrom'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingTokenAbi}__
 */
export const useWatchStakingTokenEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: stakingTokenAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchStakingTokenApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakingTokenAbi,
  eventName: 'Approval'
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchStakingTokenTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakingTokenAbi,
  eventName: 'Transfer'
});
