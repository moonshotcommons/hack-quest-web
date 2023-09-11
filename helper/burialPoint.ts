import va from '@vercel/analytics';

type AuthBurialPointType =
  | 'login-登录邮箱验证失败'
  | 'login-登录next按钮'
  | 'login-忘记密码'
  | 'login-忘记密码发送邮件'
  | 'login-保存登录状态'
  | 'login-登录成功'
  | 'login-登录失败'
  | 'login-登录返回'
  | 'login-忘记密码重置成功'
  | 'login-忘记密码重置失败'
  | 'signup-注册邮箱验证失败'
  | 'signup-注册next按钮'
  | 'signup-发送注册邮件'
  | 'signup-修改注册邮件'
  | 'signup-注册成功'
  | 'signup-注册失败';

type LandingBurialPointType =
  | 'landing-页面留存时间'
  | 'landing-learning track卡片点击'
  | 'landing-View Syllabus按钮点击'
  | 'landing-Enroll按钮点击'
  | 'landing-内容浏览'
  | 'landing-上方Explore Learning Tracks按钮点击'
  | 'landing-上方Explore Selective Courses按钮点击'
  | 'landing-下方Explore Learning Tracks按钮点击'
  | 'landing-下方Explore Selective Courses按钮点击'
  | 'landing-推特按钮点击'
  | 'landing-discord按钮点击'
  | 'landing-instagram按钮点击';

type HomeBurialPointType = 'home-页面留存时间' | 'home-featured course浏览';

type CourseDetailBurialPointType =
  | 'courseDetail-页面留存时间'
  | 'courseDetail-页面上方按钮'
  | 'courseDetail-unit按钮'
  | 'courseDetail-页面下方start按钮';

type LearningTrackDetailBurialPointType =
  | 'learningTrackDetail-页面留存时间'
  | 'learningTrackDetail-页面上方按钮'
  | 'learningTrackDetail-unit按钮'
  | 'learningTrackDetail-页面下方start按钮'
  | 'Expand All 按钮点击'
  | 'section展开按钮'
  | '课程点击';

type BurialPointType =
  | AuthBurialPointType
  | LandingBurialPointType
  | HomeBurialPointType;

class BurialPoint {
  static track(
    name: BurialPointType,
    properties?: Record<string, string | number | boolean | null> | undefined
  ) {
    va.track(name, properties);
  }
}

// BurialPoint.track('');
