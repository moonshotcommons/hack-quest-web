import SolidityIcon from './solidity.png';
import RustIcon from './rust.png';
export const IDE_LIST = [
  {
    title: 'Solidity',
    description: 'A statically-typed, curly-braces programming language designed for developing smart contracts that run on Ethereum.',
    icon: SolidityIcon,
    link: process.env.IDE_URL || 'https://ide.dev.hackquest.io',
    iconWidth: 32,
    iconHeight: 32
  },
  {
    title: 'Rust - Solana',
    description:
      'A statically-compiled language with great tooling and a growing ecosystem. The most common language to write Solana programs with.',
    icon: RustIcon,
    iconWidth: 28,
    iconHeight: 28,
    link: process.env.RUST_IDE_URL || 'https://beta.solpg.io/'
  }
];
