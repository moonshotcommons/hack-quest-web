export const SBTManager = {
  contractName: 'SBTManager',
  abi: [
    {
      inputs: [
        {
          internalType: 'address',
          name: '_admin',
          type: 'address'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address'
        }
      ],
      name: 'OwnableInvalidOwner',
      type: 'error'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'OwnableUnauthorizedAccount',
      type: 'error'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'admin',
          type: 'address'
        }
      ],
      name: 'ChangeAdmin',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'OwnershipTransferred',
      type: 'event'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_admin',
          type: 'address'
        }
      ],
      name: 'changeAdmin',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'lessonId',
          type: 'uint256'
        },
        {
          internalType: 'string',
          name: 'name_',
          type: 'string'
        },
        {
          internalType: 'string',
          name: 'symbol_',
          type: 'string'
        },
        {
          internalType: 'string',
          name: 'baseURI_',
          type: 'string'
        }
      ],
      name: 'createSBT',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'lessonId',
          type: 'uint256'
        },
        {
          internalType: 'uint8',
          name: 'v',
          type: 'uint8'
        },
        {
          internalType: 'bytes32',
          name: 'r',
          type: 'bytes32'
        },
        {
          internalType: 'bytes32',
          name: 's',
          type: 'bytes32'
        }
      ],
      name: 'safeMint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'hashResult',
          type: 'bytes32'
        },
        {
          internalType: 'uint8',
          name: 'v',
          type: 'uint8'
        },
        {
          internalType: 'bytes32',
          name: 'r',
          type: 'bytes32'
        },
        {
          internalType: 'bytes32',
          name: 's',
          type: 'bytes32'
        }
      ],
      name: 'verifyHash',
      outputs: [
        {
          internalType: 'address',
          name: 'signer',
          type: 'address'
        }
      ],
      stateMutability: 'pure',
      type: 'function'
    }
  ]
};
