import { ConfigProvider, Spin, SpinProps } from 'antd';
import { FC, ReactNode } from 'react';

interface LoadingProps {
  loading: boolean;
  loadingText?: string;
  children?: ReactNode;
}

const Loading: FC<LoadingProps & SpinProps> = ({
  loading,
  children,
  loadingText = 'loading...',
  ...rest
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ffd850'
        }
      }}
    >
      <Spin size="large" tip={loadingText} spinning={loading} {...rest}>
        {children}
      </Spin>
    </ConfigProvider>
  );
};

export default Loading;
