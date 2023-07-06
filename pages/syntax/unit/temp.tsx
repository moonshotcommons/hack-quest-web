import { NextPage } from 'next';

interface HomeProps {
  children: React.ReactNode;
}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <div>
      <div className="relative bg-black w-full h-full px-[4.25rem] py-[4.5rem] flex items-center justify-center text-white gap-3 transition-colors ease-linear">
        <>
          <div className="left-box w-full animate__animated animate__fadeIn">
            <div className={'lesson-content notion-render-block ' + 'dark'}>
              {lessonContent &&
                lessonContent?.map((block) => (
                  <Block block={block} key={block.id} darkMode={true} />
                ))}
            </div>
          </div>
          <div className="right-box animate__animated animate__fadeIn">
            <div className="header-box">
              <div className="darkmode-switch">
                {/* <div
              className="switch-btn"
              onClick={switchDarkMode}
              style={{ justifyContent: darkMode ? 'right' : 'left', background: styleFunc('bg_color_5') }}
            >
              <div className="btn-round" style={{ background: styleFunc('bg_color_4') }} />
            </div> */}
                {/* <p className="btn-state">{darkMode ? 'Dark Mode' : 'Light Mode'}</p> */}
              </div>
            </div>
            <div className={'question-content notion-render-block ' + 'dark'}>
              <h3 className="quetion-title">Quest</h3>
              <Quest
                source={`syntax`}
                lessonID={unitId}
                isLastUnit={false}
                content={[]}
                onPass={() => console.log('object')}
                darkMode={true}
                setIsProgressing={setIsProgressing}
              />
              {/* { lessonQuizes.length ? <Block block={lessonQuizes[activeQuizNum]} /> : '' }
          <CMEditor setCodeText={setCodeText} codeText={codeText}/> */}
            </div>
          </div>
        </>

        {/*{completed && (*/}
        {/*  <div className="popover">*/}
        {/*    <div*/}
        {/*      className="popover-close"*/}
        {/*      onClick={closeCompleted}*/}
        {/*    >*/}
        {/*      <img src={closeSvg} alt=""/>*/}
        {/*    </div>*/}
        {/*    <div className='popover-content'>*/}
        {/*      <div className='emoji'>🎉</div>*/}
        {/*      <div className='congrats'>Congrats! You have made it.</div>*/}
        {/*      <div className='text-info'>*/}
        {/*        在这一节中，我们从零开始自己写了一个代币，并完成了初始铸造，转账，查询余额，代币的增发操作。*/}
        {/*        <br/>*/}
        {/*        <br/>*/}
        {/*        你现在应该明白价值是怎么样在区块链上流通的了！*/}
        {/*      </div>*/}
        {/*      <div className='btns'>*/}
        {/*        <Button click={gotoCoursesList}>See more Courses</Button>*/}
        {/*        <Button click={gotoDashboard}>Back to Dashboard</Button>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </div>
  );
};

export default Home;
