import React, { useEffect, useRef, useState } from 'react';
import { HackathonType, ProjectType } from '@/service/webApi/resourceStation/type';
import Videos from './Videos';

import { sectionData } from '../../constants';
import { OffsetTopsType } from '../../../../../constants/type';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useRequest } from 'ahooks';
import { RcFile, UploadFile } from 'antd/es/upload';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { formSchema } from './constants';
import Info from './Info';
import Others from './Others';
import Wallet from './Wallet';

interface ContentProp {
  setOffsetTop: (tops: OffsetTopsType[]) => void;
  project: ProjectType;
  hackathon: HackathonType;
}

const Content: React.FC<ContentProp> = ({ setOffsetTop, project, hackathon }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const getOffsetTops = () => {
    const offsetTops = [];
    const childNodes = boxRef.current?.childNodes || [];
    for (let i = 0; i < childNodes?.length; i++) {
      const offsetTop = (childNodes[i] as HTMLDivElement).offsetTop || 0;
      offsetTops.push({
        title: `${sectionData[i]}`,
        offsetTop: offsetTop
      });
    }
    setOffsetTop(offsetTops);
  };
  const [logo, setLogo] = useState<UploadFile | null>(null);

  useEffect(() => {
    getOffsetTops();
  }, [project]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectLogo: project.thumbnail,
      projectName: project.name,
      intro: project.introduction,
      location: '',
      prizeTrack: project.prizeTrack,
      detailedIntro: project.description,
      track: project.tracks.join('')
    }
  });

  const { run: onSubmit, loading } = useRequest(
    async (values: z.infer<typeof formSchema>) => {
      const formData = new FormData();
      const { projectName, track, detailedIntro, intro, prizeTrack, location } = values;
      formData.append('name', projectName);
      formData.append('prizeTrack', prizeTrack);
      track.split(',').forEach((t) => {
        formData.append('tracks[]', t);
      });
      formData.append('location', location);
      formData.append('description', detailedIntro);
      formData.append('introduction', intro);
      formData.append('hackathonId', hackathon.id);
      logo && formData.append('thumbnail', logo?.originFileObj as RcFile);
      const res = await webApi.resourceStationApi.submitProject(formData, project.id);
      return {
        res,
        newInfo: {
          ...values
        }
      };
    },
    {
      manual: true,
      onSuccess({ res, newInfo }) {},
      onError(err) {
        errorMessage(err);
      }
    }
  );
  return (
    <div className="flex flex-1 flex-shrink-0 flex-col gap-[60px] pb-[84px] text-neutral-off-black" ref={boxRef}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-[60px]">
          <Info form={form} setLogo={setLogo} hackathon={hackathon} />
          <Videos project={project} />
          <Others form={form} />
          <Wallet project={project} />
        </form>
      </Form>
    </div>
  );
};

export default Content;
