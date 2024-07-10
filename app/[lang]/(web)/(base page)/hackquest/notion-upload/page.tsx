import webApi from '@/service';
import { LoginResponse, UserRole } from '@/service/webApi/user/type';
import { FC } from 'react';
import UploadForm from './components/UploadForm';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import NotionUploadProvider from './components/NotionUploadProvider';

interface NotionUploadPageProps {}

const NotionUploadPage: FC<NotionUploadPageProps> = async (props) => {
  let userInfo: Partial<LoginResponse> | null = null;
  try {
    userInfo = await webApi.userApi.getUserInfo();
  } catch (err: any) {
    if (err.code === 401) {
      return <div className="body-xl-bold py-10 text-center">没有登录，请登录访问</div>;
    }
    return <div className="body-xl-bold py-10 text-center">{err.msg || err.message}</div>;
  }

  if (![UserRole.ADMIN, UserRole.CONTENT].includes(userInfo.role!)) {
    return <p className="body-xl-bold py-10 text-center">没有权限访问</p>;
  }

  const notionLogs = await webApi.commonApi.getNotionLogs({ sort: '-updatedAt', limit: 3 });

  return (
    <NotionUploadProvider>
      <div className="container flex flex-col">
        <UploadForm />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[12.5rem]">Notion URL</TableHead>
              <TableHead className="w-[6.25rem]">Type</TableHead>
              <TableHead className="w-[7.5rem]">Status</TableHead>
              <TableHead>Error Message</TableHead>
              <TableHead className="w-[7.5rem]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notionLogs.data.map((log) => (
              <TableRow key={log.id}>
                {/* <TableCell className="font-medium">{log.notionId}</TableCell> */}
                <TableCell>{log.url}</TableCell>
                <TableCell>{log.modelType}</TableCell>
                <TableCell>{log.status}</TableCell>
                <TableCell className="text-right">{log.errorMsg}</TableCell>
                <TableCell className="body-l text-right underline">
                  {/* <UploadButton notionUrl={log.url}>重新上传</UploadButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </NotionUploadProvider>
  );
};

export default NotionUploadPage;
