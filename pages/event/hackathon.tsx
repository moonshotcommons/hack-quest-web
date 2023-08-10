import { GetServerSideProps, NextPage } from 'next';
import PeopleJoined from '@/components/Common/PeopleJoined';
import { getRandomPeopleAvatars } from '@/helper/random';
import RightIcon from '@/components/Common/Icon/Right';
import SkipIcon from '@/components/Common/Icon/Skip';
import Image from 'next/image';
import BannerBg from '@/public/images/event/hackathon/banner_bg.jpg';

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
  partners: { url: string }[];
  mediaPartners: { url: string }[];
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
              9.13
            </span>
          </p>
          <p>*Nitro*</p>
          <p>{`[hackathon]`}</p>
        </div>
        <div className="absolute w-full font-Chaney text-center top-[calc((773/1728)*100vw)] text-[calc((36/1728)*100vw)] leading-[100%] text-white">
          2023.8.26-2023.9.17
        </div>
        <div
          className="
          absolute top-[calc((1054/1728)*100vw)] left-[50%] -translate-x-[50%] gap-[calc((67/1728)*100vw)] flex flex-col  justify-center items-center
         text-white text-[calc((40/1728)*100vw)] font-MiSans leading-[calc((30/1728)*100vw)] font-semibold"
        >
          <button className="flex border-white w-[calc((431/1728)*100vw)] p-[calc((18/1728)*100vw)] border-[calc((3/1728)*100vw)] rounded-[calc((50/1728)*100vw)] gap-[calc((8/1728)*100vw)]">
            <span>{`->`}</span>
            <span>Register Now</span>
          </button>
          <button className="flex w-[calc((431/1728)*100vw)] p-[calc((18/1728)*100vw)] border-[calc((3/1728)*100vw)] rounded-[calc((50/1728)*100vw)] gap-[calc((8/1728)*100vw)] border-white">
            <span>{`->`}</span>
            <span>Partner With US</span>
          </button>
          <p
            // style={{
            //   fontSize: `${formatSize(27.5264)}`,
            //   lineHeight: `${formatSize(20.3696)}`
            // }}
            className="font-[MiSans] text-[calc((27.5264/1728)*100vw)] leading-[calc((20.3696/1728)*100vw)]"
          >
            报名截止：2023.8.25
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
                ABOUT HAACKATHON
              </p>
              <p className="text-[calc((40/1728)*100vw)] font-bold leading-[120%] text-white text-center">
                Hackathon&nbsp;主题:
              </p>
            </div>
            <ul className="text-white text-center text-[calc((28/1728)*100vw)] leading-[164.643%] font-Chaney">
              <li className="">1. Fully On-Chain Game</li>
              <li className="">2. Web3+AI Applications</li>
            </ul>
            <div
              className="
              px-[calc((36/1728)*100vw)] py-1 w-fit flex justify-center items-center self-center
              text-[calc((20/1728)*100vw)]  text-white
              border-[calc((3/1728)*100vw)] rounded-full
            "
            >
              奖金：20000 USD
            </div>
          </div>
          <div className="w-full text-center pt-[calc((60/1728)*100vw)] pb-[calc((50/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="flex flex-col gap-[calc((7.34/1728)*100vw)]">
              <div className="text-[#cd9df299] text-[calc((18/1728)*100vw)] leading-[120%] font-Chaney">{`co-host ->`}</div>
              <div className="text-white text-[calc((40/1728)*100vw)] font-bold leading-[120%]">
                主办方
              </div>
            </div>
            <div className="text-left max-w-[119calc((2/1728)*100vw)] text-[calc((26/1728)*100vw)] flex self-center justify-center relative flex-wrap gap-x-[calc((24/1728)*100vw)] gap-y-[calc((24/1728)*100vw)]">
              {props.sponsor?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex w-[calc((206/1728)*100vw)] h-[calc((90/1728)*100vw)] border rounded-[calc((110/1728)*100vw)] relative items-center justify-center"
                  >
                    <img
                      src={`${item.url}/${index + 1}.png`}
                      alt={index + ''}
                      className="object-contain"
                    ></img>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full text-center pt-[calc((60/1728)*100vw)] pb-[calc((60/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="text-white text-[calc((40/1728)*100vw)] font-bold leading-[120%]">
              赛程安排
            </div>
            <div className="text-white text-[calc((28/1728)*100vw)] font-black leading-[215%]">
              <p>报名通道开启 8.11 (Fri.)</p>
              <p>报名征集时间 8.11 - 8.25 (2 weeks)</p>
              <p>比赛时间 8.25 - 9.8 (2 weeks)</p>
              <p>项目终审 9.9 - 9.12 (4 days)</p>
              <p>Nitro Day 9.13 形式待定</p>
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[calc((60/1728)*100vw)] pb-[calc((60/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div
              // style={{ color: '#cd9df299' }}
              className="text-[calc((40/1728)*100vw)] font-bold leading-[120%]"
            >
              面向人群
            </div>
            <div className="text-left max-w-[calc((1064/1728)*100vw)] text-[calc((26/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] self-center leading-[253%]">
              <p>
                我们欢迎所有对 On-Chain Gaming 或 Web3+AI 技术感兴趣的 Hackers
                的参与。
              </p>
              <p>
                正在阅读这篇邀请函的你们可能已经有了一个初步的想法，可能正在探索一个新的领域，或者已经拥有了创业经验。我们珍视每一个人，每一个团队，每一个想法的潜力。在为期
                3 周的 Hackathon
                中，我们期待看到你们带来令人振奋的、可行的方案，通过不断的头脑风暴、尝试、改进和创新，最后在
                Nitro Day 向所有人展示你们的成果。
              </p>
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[calc((60/1728)*100vw)] pb-[calc((60/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="text-[calc((40/1728)*100vw)] font-bold leading-[120%]">
              Hackathon 主题
            </div>
            <div className="text-left max-w-[calc((1051/1728)*100vw)] text-[calc((26/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] self-center leading-[181.5%]">
              <div className="text-[calc((20/1728)*100vw)] font-black text-center border px-[calc((28.67/1728)*100vw)] w-fit self-center rounded-full leading-[182%]">
                Theme1: FULLY ON-CHAIN GAME
              </div>
              <p>
                我们相信基于可编程性、去中心化、无许可性等 Web3 原生理念被创建
                fully on-chain game 将会探索出一条独立的成长路径，为 Web3
                游戏带来真正的奇点。我们看好 fully on-chain game
                的三个环节，分别是基础设施（包括引擎，抽象协议、中间件及各类功能模块）、内容（包括不同genre的游戏或实验内容）和发行（通过去中心化、可组合和经济模型对发行方式的颠覆）。
              </p>
            </div>
            <div className="text-left max-w-[calc((1051/1728)*100vw)] text-[calc((26/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] mt-[calc((50/1728)*100vw)] self-center leading-[253%]">
              <div className="text-[calc((20/1728)*100vw)] font-black text-center border px-[calc((28.67/1728)*100vw)] w-fit self-center rounded-full leading-[182%]">
                Theme2：Web3+AI APPLICATION
              </div>
              <p>
                随着区块链技术在基础设施、中间件和经济模型等各个层次取得的快速突破，伴随AI技术中大语言模型的持续迭代，两个领域正在发生不可阻挡的融合，同时走入开发者和大众用户的视野。
              </p>
              <p className="mt-[calc((40/1728)*100vw)]">
                在 Web3+AI 这个主题中，除了已经看到的例如 ZKML
                等基础设施方向的创新叙事，我们认为Web3+AI 同样也可以为 C
                端带来无穷无尽的想象力，以全新的构建方式、交互逻辑和激励模型，对传统的移动互联网产品进行颠覆，在移动互利网创新乏力、流量枯竭的现状下，为
                C 端市场带来新的生机。我们看好一切Web3+AI
                APPLICATION的可能性，包括各个垂直场景，例如：金融，NFT，社交，游戏等等。
              </p>
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[calc((60/1728)*100vw)] pb-[calc((60/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div
              // style={{ color: '#cd9df299' }}
              className="text-[calc((40/1728)*100vw)] font-bold leading-[120%]"
            >
              About SevenX & Nitro
            </div>
            <div className="text-left max-w-[calc((1064/1728)*100vw)] text-[calc((26/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] self-center leading-[253%]">
              <p>
                SevenX
                Venture成立于2020年，是一只以亚洲+美国双边市场为根据地的Web3基金，目前共管理直投基金3支、FoF基金1支，总管理规模接近3亿美元。
                <br />
                Nitro 是 SevenX Ventures 创办的 Hackathon/Hacker House
                品牌，目的是通过 SevenX Ventures
                的丰富全球化资源，深刻的行业认知和成熟的赋能系统，为最优秀的
                Web3 创业团队提供展示、比拼和发展的舞台。Nitro 系列
                Hackathon/Hacker House 将于每年举办 2
                次活动，聚焦当前市场最前沿，最有潜力的叙事和主题，以求通过此品牌推动
                Web3 的前沿创新，并成为 Web3 新物种的发现者。
              </p>
              {/* <p className="mt-[calc((40/1728)*100vw)]">
                Infra：Near, Arweave, Aurora, Orb, Space&Time, Hyper Oracle, Red
                Stone, EthStorage, Particle, Kwil, Herodotus, Trusta, GoPlus,
                Footprint Defi：DODO, DAO Maker, Orderly, CowSwap, RageTrade,
                Panoptic, DeBank Wallet: Zerion, Bitkeep Gaming: YGG, Xterio,
                Caldera, Nefta, AI Arena, Azuro Protocol, Ignite Tournaments, OP
                Games, Citvatas, Space Nation, Block Lords, Matr1x Social: Mask
                Network, RSS3, Cyberconnect, ReadON, Clique, QuestN, HackMD
              </p>
              <p className="mt-[calc((40/1728)*100vw)]">
                Nitro 是 SevenX Ventures 创办的 Hackathon/Hacker House
                品牌，目的是通过 SevenX Ventures
                的丰富全球化资源，深刻的行业认知和成熟的赋能系统，为最优秀的
                Web3 创业团队提供展示、比拼和发展的舞台。Nitro 系列
                Hackathon/Hacker House 将于每年举办 2
                次活动，聚焦当前市场最前沿，最有潜力的叙事和主题，以求通过此品牌推动
                Web3 的前沿创新，并成为 Web3 新物种的发现者。
              </p> */}
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[calc((60/1728)*100vw)] pb-[calc((60/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div
              // style={{ color: '#cd9df299' }}
              className="text-[calc((40/1728)*100vw)] font-bold leading-[120%]"
            >
              Co-Host 介绍
            </div>
            <div className="text-left max-w-[calc((1064/1728)*100vw)] text-[calc((26/1728)*100vw)] flex flex-col self-center leading-[253%]">
              <p className="font-black">1. Moonshot Commons</p>
              <p className="text-[calc((25/1728)*100vw)] font-extralight">
                {`Moonshot Commons is a Web3 builder & developer
                community based in HK, SG, and NYC. Moonshot was founded in 2021
                when a group of technologists gathered in a basement and decided
                to build. In three days, they created "Moonshot" projects - from
                Brain Computer Interfaces to rocket engines - while forming a
                vibrant community of engineers.
                `}
                <br></br>
                {`Today, Moonshot Commons has
                emerged as a global community with over 8,000 members. Among
                them, more than 40 founders have seen their ideas go from 0 to
                venture-backed, with many more launching soon.`}
              </p>
              <p className="font-black">2. HackQuest</p>
              <p className="text-[calc((25/1728)*100vw)] font-extralight">
                {`HackQuest is a comprehensive, one-stop coding education platform developed by Moonshot team. We believe that improving Web3 developer education is key to driving mass adoption. `}
              </p>

              <p className="font-black">3. MUD</p>
              <p>
                MUD is an advanced framework developed for crafting
                sophisticated Ethereum applications. By integrating a
                comprehensive software stack, MUD streamlines the construction
                of EVM applications.
              </p>
              <p className="font-black">4. Dojo</p>
              <p>
                Dojo is a provable game engine with an integrated toolchain,
                designed for creating onchain games and autonomous worlds using
                Cairo 1.0. It employs an entity component system and a diamond
                pattern, facilitating a modular, scalable world. Worlds grow via
                the addition of Components (state) and Systems (logic).
              </p>
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[calc((60/1728)*100vw)] pb-[calc((60/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="flex flex-col gap-[calc((7.34/1728)*100vw)]">
              <div className="text-[#cd9df299] text-[calc((18/1728)*100vw)] leading-[120%] font-Chaney">{`hackathon ->`}</div>
              <div
                // style={{ color: '#cd9df299' }}
                className="text-[calc((40/1728)*100vw)] font-bold leading-[120%] text-[#CD9DF2]"
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
            <div className="text-[calc((14.67/1728)*100vw)] font-bold leading-[120%] pb-[calc((18/1728)*100vw)]">{`/*We choose to go to the Moon*/`}</div>
            <div className="flex flex-col gap-[calc((20/1728)*100vw)]">
              <div className="text-[#cd9df299] text-[calc((18/1728)*100vw)] leading-[120%] font-Chaney">{`OUR PARTNERS ->`}</div>
              <div
                // style={{ color: '#cd9df299' }}
                className="text-[calc((40/1728)*100vw)] font-bold leading-[120%] text-white"
              >
                黑客松合作伙伴
              </div>
            </div>

            <div className="text-left max-w-[119calc((2/1728)*100vw)] text-[calc((26/1728)*100vw)] flex self-center relative flex-wrap gap-x-[calc((24/1728)*100vw)] gap-y-[calc((24/1728)*100vw)]">
              {props.partners.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex w-[calc((206/1728)*100vw)] h-[calc((90/1728)*100vw)] border rounded-[calc((110/1728)*100vw)] relative items-center justify-center"
                  >
                    <img
                      src={`${item.url}/${index + 1}.png`}
                      alt={index + ''}
                      className="object-contain"
                    ></img>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-[calc((20/1728)*100vw)]">
              <div className="text-[#cd9df299] text-[calc((18/1728)*100vw)] leading-[120%] font-Chaney">{`Community Partners -> `}</div>
              <div
                // style={{ color: '#cd9df299' }}
                className="text-[calc((40/1728)*100vw)] font-bold leading-[120%] text-white"
              >
                合作媒体
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
                      className="object-contain"
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
            <div className="text-left max-w-[calc((1064/1728)*100vw)] text-[calc((26/1728)*100vw)] flex flex-col gap-[calc((50/1728)*100vw)] self-center leading-[253%]">
              <p>
                在此，我们诚挚地邀请你加入我们的 Nitro
                Hackathon，与我们一起挑战未知、探索可能、实现创新。期待在这个舞台上见证你的才华与创新。The
                Next Big Thing is Here!
              </p>
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[calc((60/1728)*100vw)] flex flex-col gap-[calc((56/1728)*100vw)] justify-center items-center self-center">
            <div
              // style={{ color: '#cd9df299' }}
              className="text-[calc((80/1728)*100vw)] font-bold mt-[calc((50/1728)*100vw)] py-[calc((36/1728)*100vw)] font-Chaney-Extended leading-normal text-center"
            >
              SEE YOU IN FALL !
            </div>
            <div className="text-left text-[calc((32.52/1728)*100vw)] font-MiSans-Semibold flex h-fit self-center leading-[calc((24.067/1728)*100vw)] gap-[calc((65/1728)*100vw)] text-[#CD9DF2]">
              <button className="flex border-[#CD9DF2] px-[calc((36/1728)*100vw)] py-[calc((15/1728)*100vw)] border-[calc((2/1728)*100vw)] gap-[calc((8/1728)*100vw)] rounded-[calc((50/1728)*100vw)] ">
                <span>{`->`}</span>
                <span>Register Now</span>
              </button>
              <button className="flex px-[calc((36/1728)*100vw)] py-[calc((15/1728)*100vw)] border-[calc((2/1728)*100vw)] rounded-[calc((50/1728)*100vw)] gap-[calc((8/1728)*100vw)]  border-[#CD9DF2]">
                <span>{`->`}</span>
                <span>Partner With US</span>
              </button>
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
      sponsor: new Array(5).fill({ url: '/images/event/hackathon/sponsor/' }),
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
          name: 'Jenny Cheng',
          description: 'Vice President at Animoca Ventures',
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
          url: null
        },
        {
          name: 'Pengyu Wang',
          description: 'Co-founder and CEO at Particle Network',
          url: '/images/event/hackathon/avatar'
        },
        {
          name: 'Scissors',
          description: 'Founder at Funblocks',
          url: null
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
        url: '/images/event/hackathon/community_partners'
      })
    }
  };
};
export default HackathonPage;
