import va from '@vercel/analytics';

type BaseBurialPointType =
  | '使用navbar跳转'
  | '头像加载失败'
  | 'settings'
  | '登出';

type SettingsBurialPointType =
  | '头像上传'
  | '头像上传失败'
  | '头像上传成功'
  | '想要修改用户名'
  | '想要修改邮箱'
  | 'settings修改密码'
  | 'settings修改密码成功'
  | 'settings修改密码失败'
  | 'settings取消修改密码'
  | 'settings修改密码成功Got it按钮点击';

type AuthBurialPointType =
  | 'login-登录邮箱验证失败'
  | 'login-登录next按钮'
  | 'login-登录邮箱验证停留时间'
  | 'login-登录邮箱验证失败'
  | 'login-登录邮箱验证成功'
  | 'login-保存登录状态'
  | 'login-登录按钮点击'
  | 'login-登录输入密码停留时间'
  | 'login-登录成功'
  | 'login-登录失败'
  | 'login-登录返回'
  | 'login-忘记密码'
  | 'login-忘记密码发送邮件'
  | 'login-忘记密码发送邮件成功'
  | 'login-忘记密码发送邮件失败'
  | 'login-忘记密码重置成功'
  | 'login-忘记密码重置失败'
  | 'login-redirect跳转'
  | 'signup-注册邮箱验证停留时间'
  | 'signup-注册邮件发送成功'
  | 'signup-注册邮件发送失败'
  | 'signup-注册邮箱token验证'
  | 'signup-注册邮箱token验证失败'
  | 'signup-注册邮箱token验证成功'
  | 'signup-Google三方登录code验证'
  | 'signup-Google三方登录code验证成功'
  | 'signup-Google三方登录code验证失败'
  | 'signup-Github三方登录code验证'
  | 'signup-Github三方登录code验证成功'
  | 'signup-Github三方登录code验证失败'
  | 'signup-没有同意隐私策略'
  | 'signup-注册next按钮'
  | 'signup-注册邮箱验证失败'
  | 'signup-注册邮箱验证成功'
  | 'signup-注册按钮点击'
  | 'signup-注册返回'
  | 'signup-发送注册邮件'
  | 'signup-验证邀请码按钮点击'
  | 'signup-Google三方登录输入邀请码登录成功';
// | 'signup-修改注册邮件';

type LandingBurialPointType =
  | 'landing-页面留存时间'
  | 'landing-learning track卡片点击'
  | 'landing-learning track Enroll按钮点击'
  | 'landing-top Explore Learning Tracks按钮点击'
  | 'landing-top Explore Selective Courses按钮点击'
  | 'landing-bottom Explore Learning Tracks按钮点击'
  | 'landing-bottom Explore Selective Courses按钮点击'
  | 'landing-推特按钮点击'
  | 'landing-discord按钮点击'
  | 'landing-instagram按钮点击';

type HomeBurialPointType =
  | 'home-页面留存时间'
  | 'home-featured course浏览'
  | 'home-featured course滚动-左'
  | 'home-featured course滚动-右'
  | 'home-course卡片点击'
  | 'home-course卡片resume按钮点击'
  | 'home-course卡片View Syllabus按钮点击'
  | 'home-learning track卡片View Syllabus按钮点击'
  | 'home-learning track卡片Enroll按钮点击'
  | 'home-learning track卡片resume按钮点击'
  | 'home-view all点击';

type CourseDetailBurialPointType =
  | 'courseDetail-页面留存时间'
  | 'courseDetail-页面上方按钮点击'
  | 'courseDetail-unit按钮'
  | 'courseDetail-页面下方按钮点击';

type LearningTrackDetailBurialPointType =
  | 'learningTrackDetail-页面留存时间'
  | 'learningTrackDetail-页面上方Enroll按钮'
  | 'learningTrackDetail-course学习按钮'
  | 'learningTrackDetail-页面下方Enroll按钮'
  | 'learningTrackDetail-Expand All 按钮点击'
  | 'learningTrackDetail-section展开按钮'
  | 'learningTrackDetail-课程名点击';

type LessonDetailBurialPointType =
  | 'lesson-页面留存时间'
  | 'lesson-content展开'
  | 'lesson-start quiz按钮点击'
  | 'lesson-单个quiz提交'
  | 'lesson-单个quiz提交通过'
  | 'lesson-单个quiz提交未通过'
  | 'lesson-show answer次数'
  | 'lesson-底部next按钮亮起到点击所消耗的时间'
  | 'lesson-底部next按钮点击'
  | 'lesson-completed course'
  | 'lesson-lesson dropdown点击'
  | 'lesson-使用lesson dropdown跳转lesson'
  | 'lesson-code复制'
  | 'lesson-quiz dropdown点击'
  | 'lesson-quiz切换'
  | 'lesson-quiz 收起'
  | 'lesson-example 收起'
  | 'lesson-课程完成';

type BurialPointType =
  | AuthBurialPointType
  | LandingBurialPointType
  | HomeBurialPointType
  | CourseDetailBurialPointType
  | LearningTrackDetailBurialPointType
  | LessonDetailBurialPointType
  | BaseBurialPointType
  | SettingsBurialPointType;

export class BurialPoint {
  static track(
    name: BurialPointType,
    properties?: Record<string, string | number | boolean | null> | undefined
  ) {
    va.track(name, properties);
  }
}
