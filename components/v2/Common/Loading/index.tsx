import { ConfigProvider, Spin } from 'antd';
import { FC, ReactNode } from 'react';

interface LoadingProps {
  loading: boolean;
  loadingText?: string;
  children: ReactNode;
}

const Loading: FC<LoadingProps> = ({
  loading,
  children,
  loadingText = 'loading...'
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ffd850'
        }
      }}
    >
      <Spin size="large" tip={loadingText} spinning={loading}>
        {children}
      </Spin>
    </ConfigProvider>
  );
};

export default Loading;
