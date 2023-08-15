import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import BannerBg from '@/public/images/event/hackathon/banner_bg.jpg';
import Link from 'next/link';

const originator: { name: string; status: string }[] = new Array(14).fill({
  name: 'Jim Rogers',
  status: 'International Investor and Author'
});
const investor: { name: string; status: string }[] = new Array(12).fill({
  name: 'Jim Rogers',
  status: 'International Investor and Author'
});

interface HackathonPageProps {
  sponsor: { url: string }[];
  hackathonPartners: { url: string }[];
  partners: { url: string }[];
  mediaPartners: { url: string }[];
  communityPartners: { url: string }[];
  mentors: { name: string; description: string; url: string }[];
}

const HackathonPage: NextPage<HackathonPageProps> = (props) => {
  return (
    <div className="w-full bg-[#1F1920] flex flex-col justify-center items-center">
      <div className="relative w-full left-0 -top-[calc((78/1728)*100vw)]">
        <Image
          src={BannerBg}
          alt="hackathon"
          className="
          w-full object-cover z-0 absolute top-0 left-0
          "
        ></Image>
        <div
          className={`
        absolute z-[5] m-auto top-[calc((224/1728)*100vw)] text-[calc((318.408/1728)*100vw)]  overflow-hidden w-full
        text-[#cd9df24c] text-center font-Chaney leading-[120%]
        `}
        >
          2023
        </div>
        <div
          className={`
          absolute w-full z-[5] m-auto top-[calc((246/1728)*100vw)]  flex-col justify-center
          text-white text-center font-Chaney text-[calc((111.36/1728)*100vw)] leading-[97%]
          uppercase
          `}
        >
          <p>SevenX</p>
          <p className="flex items-center justify-center gap-[calc((56/1728)*100vw)]">
            <span
              // style={{ fontSize: `${formatSize(36)}` }}
              className="text-[calc((36/1728)*100vw)]"
            >
              8.25
            </span>
            <span>{`->`}</span>
            <span
              // style={{ fontSize: `${formatSize(36)}` }}
              className="text-[calc((36/1728)*100vw)]"
            >
              9.12
            </span>
          </p>
          <p>*Nitro*</p>
          <p>{`[hackathon]`}</p>
        </div>
        <div className="absolute w-full font-Chaney text-center top-[calc((773/1728)*100vw)] text-[calc((36/1728)*100vw)] leading-[100%] text-white">
          2023.8.25-2023.9.12
        </div>
        <div
          className="
          absolute top-[calc((1054/1728)*100vw)] left-[50%] -translate-x-[50%] gap-[calc((67/1728)*100vw)] flex flex-col  justify-center items-center
         text-white text-[calc((40/1728)*100vw)] font-MiSans leading-[calc((30/1728)*100vw)] font-semibold"
        >
          <Link href={'https://xsxo494365r.typeform.com/to/I3vuAbEx'}>
            <button className="flex hover:bg-[#CD9DF2] hover:text-white transition-all duration-300 border-white w-[calc((431/1728)*100vw)] p-[calc((18/1728)*100vw)] border-[calc((3/1728)*100vw)] rounded-[calc((50/1728)*100vw)] gap-[calc((8/1728)*100vw)]">
              <span>{`->`}</span>
              <span>Register Now</span>
            </button>
          </Link>
          <Link href={'https://xsxo494365r.typeform.com/to/I3vuAbEx'}>
            <button className="flex hover:bg-[#CD9DF2] hover:text-white transition-all duration-300 w-[calc((431/1728)*100vw)] p-[calc((18/1728)*100vw)] border-[calc((3/1728)*100vw)] rounded-[calc((50/1728)*100vw)] gap-[calc((8/1728)*100vw)] border-white">
              <span>{`->`}</span>
              <span>Partner With Us</span>
            </button>
          </Link>
          <p
            // style={{
            //   fontSize: `${formatSize(27.5264)}`,
            //   lineHeight: `${formatSize(20.3696)}`
            // }}
            className="font-[MiSans] text-[calc((27.5264/1728)*100vw)] leading-[calc((20.3696/1728)*100vw)]"
          >
            Registration DDL：2023.8.25
          </p>
        </div>
      </div>
      <div className="relative flex flex-col items-center mt-[calc((1840/1728)*100vw)] w-[calc((1298/1728)*100vw)] justify-center font-MiSans">
        <div className="flex flex-col items-center w-[calc((1146/1728)*100vw)] justify- overflow-hidden">
          <div className="text-[calc((39.394/1728)*100vw)] text-[#AA83C8] relative font-semibold w-full pb-[calc((33/1728)*100vw)] text-center bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="rotate-90">{`>>`}</div>
          </div>
          <div className="w-full text-center pt-[calc((50/1728)*100vw)] pb-[calc((60/1728)*100vw)] flex flex-col gap-[calc((30/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="w-full flex flex-col justify-center items-center">
              <p className="text-[calc((18/1728)*100vw)] text-[#87689E] text-center font-Chaney">
                ABOUT HACKATHON
              </p>
              <p className="text-[calc((40/1728)*100vw)] font-MiSans-Heavy font-bold leading-[120%] text-white text-center">
                Hackathon Themes
              </p>
            </div>
            <ul className="text-white text-center text-[calc((28/1728)*100vw)] leading-[164.643%] font-Chaney">
              <li className="">1. Fully On-Chain Game</li>
              <li className="">2. Web3+AI Applications</li>
            </ul>
            {/* <div
              className="
              px-[calc((36/1728)*100vw)] py-1 w-fit flex justify-center items-center self-center
              text-[calc((20/1728)*100vw)]  text-white
              border-[calc((3/1728)*100vw)] rounded-full
            "
            >
              奖金：20000 USD
            </div> */}
          </div>
          <div className="w-full text-center pt-[calc((60/1728)*100vw)] pb-[calc((50/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="flex flex-col gap-[calc((7.34/1728)*100vw)]">
              <div className="text-[#cd9df299] text-[calc((18/1728)*100vw)] leading-[120%] font-Chaney">{`nitro`}</div>
              <div className="text-white text-[calc((40/1728)*100vw)] font-bold leading-[120%]">
                Host
              </div>
            </div>
            <div className="text-left max-w-[119calc((2/1728)*100vw)] text-[calc((26/1728)*100vw)] flex self-center justify-center relative flex-wrap gap-x-[calc((24/1728)*100vw)] gap-y-[calc((24/1728)*100vw)]">
              {props.sponsor?.map((item, index) => {
                if (![0].includes(index)) return null;
                return (
                  <div
                    key={index}
                    className="flex w-[calc((206/1728)*100vw)] h-[calc((90/1728)*100vw)] border rounded-[calc((110/1728)*100vw)] relative items-center justify-center"
                  >
                    <img
                      src={`${item.url}/${index + 1}.png`}
                      alt={index + ''}
                      className="inline-block object-contain  h-[calc((68/1728)*100vw)]"
                    ></img>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-[calc((7.34/1728)*100vw)]">
              <div className="text-[#cd9df299] text-[calc((18/1728)*100vw)] leading-[120%] font-Chaney">{`nitro`}</div>
              <div className="text-white text-[calc((40/1728)*100vw)] font-bold leading-[120%]">
                Co-Hosts
              </div>
            </div>
            <div className="text-left max-w-[119calc((2/1728)*100vw)] text-[calc((26/1728)*100vw)] flex self-center justify-center relative flex-wrap gap-x-[calc((24/1728)*100vw)] gap-y-[calc((24/1728)*100vw)]">
              {props.sponsor?.map((item, index) => {
                if (![3, 4].includes(index)) return null;
                return (
                  <div
                    key={index}
                    className="flex w-[calc((206/1728)*100vw)] h-[calc((90/1728)*100vw)] border rounded-[calc((110/1728)*100vw)] relative items-center justify-center"
                  >
                    <img
                      src={`${item.url}/${index + 1}.png`}
                      alt={index + ''}
                      className="inline-block object-contain  h-[calc((68/1728)*100vw)]"
                    ></img>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-[calc((7.34/1728)*100vw)]">
              <div className="text-[#cd9df299] text-[calc((18/1728)*100vw)] leading-[120%] font-Chaney">{`nitro`}</div>
              <div className="text-white text-[calc((40/1728)*100vw)] font-bold leading-[120%]">
                Organizer
              </div>
            </div>
            <div className="text-left max-w-[119calc((2/1728)*100vw)] text-[calc((26/1728)*100vw)] flex self-center justify-center relative flex-wrap gap-x-[calc((24/1728)*100vw)] gap-y-[calc((24/1728)*100vw)]">
              {props.sponsor?.map((item, index) => {
                if (![1, 2].includes(index)) return null;
                return (
                  <div
                    key={index}
                    className="flex w-[calc((206/1728)*100vw)] h-[calc((90/1728)*100vw)] border rounded-[calc((110/1728)*100vw)] relative items-center justify-center"
                  >
                    <img
                      src={`${item.url}/${index + 1}.png`}
                      alt={index + ''}
                      className="inline-block object-contain  h-[calc((68/1728)*100vw)]"
                    ></img>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-[calc((20/1728)*100vw)]">
              <div className="text-[#cd9df299] text-[calc((18/1728)*100vw)] leading-[120%] font-Chaney">{`nitro`}</div>
              <div className="text-white text-[calc((40/1728)*100vw)] font-bold leading-[120%]">
                Hackathon Partners
              </div>
            </div>
            <div className="text-left max-w-[119calc((2/1728)*100vw)] text-[calc((26/1728)*100vw)] flex self-center justify-center relative flex-wrap gap-x-[calc((24/1728)*100vw)] gap-y-[calc((24/1728)*100vw)]">
              {props.hackathonPartners?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex w-[calc((206/1728)*100vw)] h-[calc((90/1728)*100vw)] border rounded-[calc((110/1728)*100vw)] relative items-center justify-center"
                  >
                    <img
                      src={`${item.url}/${index + 1}.png`}
                      alt={index + ''}
                      className="inline-block object-contain  h-[calc((68/1728)*100vw)]"
                    ></img>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full text-center pt-[calc((60/1728)*100vw)] pb-[calc((60/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="text-white text-[calc((40/1728)*100vw)] font-MiSans-Heavy font-bold leading-[120%]">
              Hackathon Schedule
            </div>
            <div className="text-white text-[calc((28/1728)*100vw)] font-black leading-[215%]">
              <p>Registration Starts 8.11 (Fri.)</p>
              <p>Registration Opens 8.11 - 8.25 (2 weeks)</p>
              <p>Hackathon 8.25 - 9.8 (2 weeks)</p>
              <p>Final Review 9.9 - 9.12 (4 days)</p>
              <p>Nitro Day 9.12</p>
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[calc((60/1728)*100vw)] pb-[calc((60/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div
              // style={{ color: '#cd9df299' }}
              className="text-[calc((40/1728)*100vw)] font-MiSans-Heavy font-bold  leading-[120%]"
            >
              WHO CAN APPLY
            </div>
            <div className="text-left max-w-[calc((1064/1728)*100vw)] text-[calc((26/1728)*100vw)] flex flex-col gap-[calc((16/1728)*100vw)] self-center leading-[200%]">
              <p className="text-[#CD9DF2]">{`There's a first time for everything.`}</p>
              <p>
                Nitro Hackathon 2023 is open to all hackers interested in
                On-chain gaming or AI+Web3. We welcome applications from teams
                at any stage. Perhaps you only have an idea, perhaps you just
                begin doing some market research with a team, or perhaps you are
                already an experienced start-up founder.
              </p>
              <p>
                The only thing that matters is you bring your passion and are
                ready to iterate through MVPs to create an exciting product in 2
                weeks time.
              </p>
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[calc((60/1728)*100vw)] pb-[calc((60/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="text-[calc((40/1728)*100vw)] font-bold leading-[120%]">
              Hackathon Themes
            </div>
            <div className="text-left max-w-[calc((1051/1728)*100vw)] text-[calc((26/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] self-center leading-[181.5%]">
              <div className="text-[calc((20/1728)*100vw)] font-black text-center border px-[calc((28.67/1728)*100vw)] w-fit self-center rounded-full leading-[182%]">
                Theme1: FULLY ON-CHAIN GAME
              </div>
              <div className="text-left max-w-[calc((1064/1728)*100vw)] text-[calc((26/1728)*100vw)] flex flex-col gap-[calc((16/1728)*100vw)] self-center leading-[200%]">
                <p>
                  Web3 and blockchain has sparked a wave of innovation in the
                  gaming industry. Developers are continuously exploring the
                  potential of integrating NFTs, tokenomics, and decentralized
                  tech stack into traditional games, introducing players to
                  on-chain asset ownership and the open economy it enables. This
                  has paved the way for high-quality Web3 RPGs, SLGs, FPSs, and
                  other genres to thrive.
                </p>
                <p>
                  Simultaneously, we envision a new breed of games that fully
                  embrace Web3 concepts like programmability, decentralization,
                  and permissionlessness. These games have the power to put
                  assets, user data, game logic, governance, and more on-chain,
                  creating the highly-anticipated fully on-chain gaming
                  experience that surpasses our imagination. We believe that
                  fully on-chain games will carve out an independent growth path
                  and redefine the landscape of Web3 gaming.
                </p>
                <p>
                  We are optimistic about three crucial aspects of fully on
                  chain games:
                </p>

                <p>
                  1.{' '}
                  <span className="text-[#CD9DF2] font-MiSans-Heavy">
                    Infrastructure:
                  </span>{' '}
                  the development of robust engines, protocols, middleware, and
                  function modules will lay the foundation for fully on-chain
                  games.
                </p>
                <p>
                  2.{' '}
                  <span className="text-[#CD9DF2] font-MiSans-Heavy">
                    Content:
                  </span>{' '}
                  the availability of diverse and captivating gaming content of
                  various genres.
                </p>
                <p>
                  3.{' '}
                  <span className="text-[#CD9DF2] font-MiSans-Heavy">
                    Distribution:
                  </span>{' '}
                  distribution methods will undergo a revolution through
                  decentralization, composability, and innovative tokenomic
                  models, ushering in a new era of game distribution.
                </p>
              </div>
            </div>
            <div className="text-left max-w-[calc((1051/1728)*100vw)] text-[calc((26/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] mt-[calc((50/1728)*100vw)] self-center leading-[253%]">
              <div className="text-[calc((20/1728)*100vw)] font-black text-center border px-[calc((28.67/1728)*100vw)] w-fit self-center rounded-full leading-[182%]">
                Theme2：Web3+AI APPLICATION
              </div>
              <div className="text-left max-w-[calc((1064/1728)*100vw)] text-[calc((26/1728)*100vw)] flex flex-col gap-[calc((16/1728)*100vw)] self-center leading-[200%]">
                <p>
                  Like blockchain technology, AI is also a frontier technology
                  that top-notch entrepreneurs have been exploring in recent
                  years. With the rapid breakthroughs in infrastructure,
                  middleware, and tokenomics achieved by blockchain technology,
                  and the continuous iteration of large language models in AI,
                  the two fields are experiencing an unstoppable fusion,
                  entering into the sight of developers and the general public.
                </p>
                <p>
                  In the theme of Web3+AI, in addition to innovation in
                  infrastructure such as ZKML that we have already seen, we
                  believe that Web3+AI can also bring endless imagination to the
                  consumer end, with a brand new way of building, interaction
                  logic, and incentive model. It can disrupt traditional mobile
                  internet products, and bring new vitality to the consumer
                  market which is already experiencing a lack of innovation and
                  exhausted traffic in mobile internet.
                </p>
                <p>
                  We are optimistic about any possibilities of Web3+AI
                  APPLICATIONS, including various vertical tracks such as:
                  finance, NFT, social, gaming, and so on.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[calc((60/1728)*100vw)] pb-[calc((60/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div
              // style={{ color: '#cd9df299' }}
              className="text-[calc((40/1728)*100vw)] font-bold leading-[120%]"
            >
              About SevenX & Nitro
            </div>
            <div className="text-left max-w-[calc((1064/1728)*100vw)] text-[calc((26/1728)*100vw)] flex flex-col gap-[calc((16/1728)*100vw)] self-center leading-[200%]">
              <p>
                Founded in 2020, SevenX Venture is a Web3 fund based both in
                Asia and the United States. Currently, we manage three direct
                investment funds and one FoF fund, with a total AUM of nearly
                300 million USD. Over the last three years, SevenX Ventures has
                invested in over 100 early-stage projects in the crypto space.
              </p>
              <p>
                {`Nitro is a Hackathon/Hacker House brand initiated by SevenX
                Ventures. Leveraging SevenX Ventures' extensive resources,
                profound industry expertise, and well-established ecosystems,
                Its purpose is to provide a platform for the best Web3 buidlers
                to build and grow.`}
              </p>
              <p>
                The Nitro series of Hackathon/Hacker House will host two events
                each year, focusing on emerging trends and narratives in the
                current market, aiming to promote the frontier innovation of
                Web3 through this brand, and become a discoverer of new species
                in Web3 space.
              </p>
              <p>
                In each Nitro series Hackathon/Hacker House event, SevenX
                Ventures will invite the most influential partners in the space
                to participate and promote the thesis.
              </p>
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[calc((60/1728)*100vw)] pb-[calc((60/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div
              // style={{ color: '#cd9df299' }}
              className="text-[calc((40/1728)*100vw)] font-bold leading-[120%]"
            >
              Co-Host Introduction
            </div>
            <div className="text-left max-w-[calc((1064/1728)*100vw)] text-[calc((26/1728)*100vw)] flex flex-col self-center leading-[200%]">
              <p className="font-black font-MiSans-Heavy">1. MUD</p>
              <p className="text-[calc((19/1728)*100vw)]">
                MUD is an advanced framework developed for crafting
                sophisticated Ethereum applications. By integrating a
                comprehensive software stack, MUD streamlines the construction
                of EVM applications.
              </p>
              <p className="font-black font-MiSans-Heavy">2. Dojo</p>
              <p className="text-[calc((19/1728)*100vw)]">
                Dojo is a provable game engine with an integrated toolchain,
                designed for creating onchain games and autonomous worlds using
                Cairo 1.0. It employs an entity component system and a diamond
                pattern, facilitating a modular, scalable world. Worlds grow via
                the addition of Components (state) and Systems (logic).
              </p>
              <p className="font-black font-MiSans-Heavy">
                3. Moonshot Commons
              </p>
              <p className="text-[calc((19/1728)*100vw)] font-extralight">
                {`Moonshot Commons is a Web3 builder & developer community based in HK, SG, and NYC. Moonshot was founded in 2021 when a group of technologists gathered in a basement and decided to build. In three days, they created "Moonshot" projects - from Brain Computer Interfaces to rocket engines - while forming a vibrant community of engineers.
                `}
                <br></br>
                {`Today, Moonshot Commons has
                emerged as a global community with over 8,000 members. Among
                them, more than 40 founders have seen their ideas go from 0 to
                venture-backed, with many more launching soon.`}
              </p>
              <p className="font-black font-MiSans-Heavy">4. HackQuest</p>
              <p className="text-[calc((19/1728)*100vw)] font-extralight">
                {`HackQuest is a comprehensive, one-stop coding education platform developed by Moonshot team. We believe that improving Web3 developer education is key to driving mass adoption. `}
              </p>
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[calc((60/1728)*100vw)] pb-[calc((60/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="flex flex-col gap-[calc((7.34/1728)*100vw)]">
              <div className="text-[#cd9df299] text-[calc((18/1728)*100vw)] leading-[120%] font-Chaney">{`hackathon ->`}</div>
              <div
                // style={{ color: '#cd9df299' }}
                className="text-[calc((40/1728)*100vw)] font-MiSans-Heavy font-bold leading-[120%] text-[#CD9DF2]"
              >
                Mentors & Guests
              </div>
            </div>

            <div className="text-left max-w-[calc((1064/1728)*100vw)] pl-[calc((21/1728)*100vw)] text-[calc((26/1728)*100vw)] flex self-center flex-wrap gap-x-[calc((70.25/1728)*100vw)] gap-y-[calc((21/1728)*100vw)]">
              {props.mentors?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-[calc((8.5/1728)*100vw)] "
                  >
                    <div className="w-[calc((104/1728)*100vw)] relative h-[calc((104/1728)*100vw)] rounded-full border-[calc((2/1728)*100vw)] border-[#CD9DF2]">
                      {item.url && (
                        <Image
                          src={`${item.url}/${item.name}.png`}
                          alt={item.name}
                          fill
                          className="object-cover scale-105"
                        ></Image>
                      )}
                    </div>
                    <div className="flex flex-col max-w-[calc((180/1728)*100vw)] gap-[calc((8.5/1728)*100vw)]">
                      <span className="text-[calc((21/1728)*100vw)] font-semibold leading-[140%]">
                        {item.name}
                      </span>
                      <span className="text-[calc((15/1728)*100vw)] w-[calc((182/1728)*100vw)] font-semibold text-[#CD9DF2] leading-[125%]">
                        {item.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full text-center text-white  pt-[calc((60/1728)*100vw)] pb-[calc((60/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="text-[calc((14.67/1728)*100vw)] font-bold leading-[120%] pb-[calc((28/1728)*100vw)]">{`/*Building a more democratic internet*/`}</div>
            <div className="flex flex-col gap-[calc((20/1728)*100vw)]">
              <div className="text-[#cd9df299] text-[calc((18/1728)*100vw)] leading-[120%] font-Chaney">{`NITRO`}</div>
              <div
                // style={{ color: '#cd9df299' }}
                className="text-[calc((40/1728)*100vw)] font-MiSans-Heavy font-bold leading-[120%] text-white"
              >
                Media Partners
              </div>
            </div>
            <div className="text-left max-w-[119calc((2/1728)*100vw)] text-[calc((26/1728)*100vw)] flex self-center relative flex-wrap gap-x-[calc((24/1728)*100vw)] gap-y-[calc((24/1728)*100vw)]">
              {props.mediaPartners?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex w-[calc((206/1728)*100vw)] h-[calc((90/1728)*100vw)] border rounded-[calc((110/1728)*100vw)] relative items-center justify-center"
                  >
                    <img
                      src={`${item.url}/${index + 1}.png`}
                      alt={index + ''}
                      className="inline-block object-contain  h-[calc((71/1728)*100vw)]"
                    ></img>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[calc((60/1728)*100vw)] pb-[calc((60/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="flex flex-col gap-[calc((20/1728)*100vw)]">
              <div className="text-[#cd9df299] text-[calc((18/1728)*100vw)] leading-[120%] font-Chaney">{`NITRO`}</div>
              <div
                // style={{ color: '#cd9df299' }}
                className="text-[calc((40/1728)*100vw)] font-MiSans-Heavy font-bold leading-[120%] text-white"
              >
                Community Partners
              </div>
            </div>
            <div className="text-left max-w-[119calc((2/1728)*100vw)] text-[calc((26/1728)*100vw)] flex self-center relative flex-wrap gap-x-[calc((24/1728)*100vw)] gap-y-[calc((24/1728)*100vw)]">
              {props.communityPartners?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex w-[calc((206/1728)*100vw)] h-[calc((90/1728)*100vw)] border rounded-[calc((110/1728)*100vw)] relative items-center justify-center"
                  >
                    <img
                      src={`${item.url}/${index + 1}.png`}
                      alt={index + ''}
                      className="inline-block object-contain  h-[calc((71/1728)*100vw)]"
                    ></img>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[calc((60/1728)*100vw)] pb-[calc((60/1728)*100vw)] flex flex-col gap-[calc((60/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div
              // style={{ color: '#cd9df299' }}
              className="text-[calc((40/1728)*100vw)] font-bold leading-[120%]"
            >
              Message
            </div>
            <div className="text-left max-w-[calc((1064/1728)*100vw)] text-[calc((26/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] self-center leading-[200%]">
              <p>{`Here, we sincerely invite you to join our Nitro Hackathon. Together, let's challenge the unknown. We look forward to witnessing your talent and innovation on this stage. The Next Big Thing is Here!`}</p>
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[calc((60/1728)*100vw)] flex flex-col gap-[calc((56/1728)*100vw)] justify-center items-center self-center">
            <div
              // style={{ color: '#cd9df299' }}
              className="text-[calc((80/1728)*100vw)] font-bold mt-[calc((50/1728)*100vw)] py-[calc((36/1728)*100vw)] font-Chaney-Extended leading-normal text-center"
            >
              SEE YOU IN FALL !
            </div>
            <div className="text-left text-[calc((32.52/1728)*100vw)] font-MiSans-Heavy flex h-fit self-center leading-[calc((24.067/1728)*100vw)] gap-[calc((65/1728)*100vw)] text-[#CD9DF2]">
              <Link href={'https://xsxo494365r.typeform.com/to/I3vuAbEx'}>
                <button className="flex hover:bg-[#CD9DF2] hover:text-white transition-all duration-300 border-[#CD9DF2] px-[calc((36/1728)*100vw)] py-[calc((15/1728)*100vw)] border-[calc((2/1728)*100vw)] gap-[calc((8/1728)*100vw)] rounded-[calc((50/1728)*100vw)] ">
                  <span>{`->`}</span>
                  <span>Register Now</span>
                </button>
              </Link>
              <Link href={'https://xsxo494365r.typeform.com/to/I3vuAbEx'}>
                <button className="flex hover:bg-[#CD9DF2] hover:text-white transition-all duration-300  px-[calc((36/1728)*100vw)] py-[calc((15/1728)*100vw)] border-[calc((2/1728)*100vw)] rounded-[calc((50/1728)*100vw)] gap-[calc((8/1728)*100vw)]  border-[#CD9DF2]">
                  <span>{`->`}</span>
                  <span>Partner With Us</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HackathonPage.displayName = 'HackathonPage';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      nitro: [],
      sponsor: new Array(5).fill({ url: '/images/event/hackathon/sponsor/' }),
      hackathonPartners: new Array(12).fill({
        url: '/images/event/hackathon/hackathon_parthers/'
      }),
      mentors: [
        {
          name: 'Aiko',
          description: 'Gamification Alchemist at Folius Ventures',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Bowen Wang',
          description: 'Partner at Smrti Lab',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Chris Zhu',
          description: 'Co-founder and CEO at Mirror World',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Evans Huangfu',
          description: 'CIO & Partner at Arcane Group',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Frost Lam',
          description: 'Investor at Qiming Venture Partners',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'GM',
          description: 'Partner at Dragonfly',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Guiltygyoza',
          description: 'Founder at Topology   ',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Jenny Cheng',
          description: 'Vice President at Animoca Ventures',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Junbo',
          description: 'Investor at HashKey Capital',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Komorabi',
          description: `Creator of Komorabi's AW Hacker House`,
          url: '/images/event/hackathon/avatar'
        },
        {
          name: '空岛',
          description: `Investor at Parallel ventures`,
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Louis Song',
          description: 'Partner at SevenX Ventures',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Matt',
          description: 'Founder and CEO of Caldera',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Mike Liou',
          description: 'contributor at AGLD DAO',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Pengyu Wang',
          description: 'Co-founder and CEO at Particle Network',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Scissors',
          description: 'Founder at Funblocks',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Sinka Gao',
          description: 'Founder and CEO at Delphinus Labs',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Tianran Zhang',
          description: 'Ecosystem Head at MaskNetwork',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Victor J',
          description: 'Co-founder and CEO at Manta Network',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Will Robinson',
          description: 'Core Contributor at Alliance DAO',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Yijia Chen',
          description: 'Co-founder and CEO at Curio',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Yuetian Chen',
          description: 'Founding Partner at Initiate Capital',
          url: '/images/event/hackathon/avatar'
        }
      ],
      partners: new Array(11).fill({
        url: '/images/event/hackathon/partners'
      }),
      mediaPartners: new Array(7).fill({
        url: '/images/event/hackathon/media_partners'
      }),
      communityPartners: new Array(13).fill({
        url: '/images/event/hackathon/community_partners'
      })
    }
  };
};
export default HackathonPage;
