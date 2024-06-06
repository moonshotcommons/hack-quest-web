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
import Nav from '../Nav';

import { isEqual } from 'lodash-es';
import { useRedirect } from '@/hooks/router/useRedirect';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import Project from './Project';
import Links from './Links';

interface ContentProp {
  setOffsetTop: (tops: OffsetTopsType[]) => void;
  project: ProjectType;
  hackathon: HackathonType;
  handleClickAnchor: (index: number) => void;
  curAnchorIndex: number;
  offsetTops: OffsetTopsType[];
  isClose: boolean;
}

const Content: React.FC<ContentProp> = ({
  setOffsetTop,
  project,
  hackathon,
  curAnchorIndex,
  offsetTops,
  handleClickAnchor,
  isClose
}) => {
  console.log(project);
  const boxRef = useRef<HTMLFormElement>(null);
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

  const { redirectToUrl } = useRedirect();

  const exitConfirmRef = useRef<ConfirmModalRef>(null);

  useEffect(() => {
    getOffsetTops();
  }, [project]);

  const links = typeof project.links === 'string' ? JSON.parse(project.links as string) : project.links;
  console.log(links);
  const defaultValues: z.infer<typeof formSchema> = {
    projectLogo: project.thumbnail,
    projectName: project.name,
    intro: project.introduction,
    location: project.location,
    prizeTrack: project.prizeTrack,
    detailedIntro: project.description,
    track: project.tracks.join(','),
    isPublic: project.isOpenSource,
    githubLink: project.githubLink,
    efrog: project.efrog,
    croak: project.croak,
    submitType: project.submitType,
    contractLink: links.contractLink || '',
    projectLink: links.projectLink || '',
    socialLink: links.socialLink || '',
    partnerTooling: links.partnerTooling || ''
  };

  console.log(defaultValues);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
    // disabled: isClose
  });

  const otherFormDisable =
    typeof form.getValues('isPublic') !== 'boolean' ||
    (form.getValues('isPublic') === true && !(form.getValues('githubLink') || '').trim());
  const infoDisable =
    !form.getValues('projectName') ||
    !form.getValues('projectLogo') ||
    !form.getValues('prizeTrack') ||
    !form.getValues('intro') ||
    !form.getValues('detailedIntro') ||
    form.getValues('track').split(',').length < 1;

  const projectDisable =
    typeof form.getValues('efrog') !== 'boolean' ||
    typeof form.getValues('croak') !== 'boolean' ||
    !form.getValues('submitType');

  const linksDisable =
    !form.getValues('contractLink') ||
    !form.getValues('projectLink') ||
    !form.getValues('socialLink') ||
    !form.getValues('partnerTooling');

  const { runAsync: onSubmitRequest, loading } = useRequest(
    async () => {
      const values = form.getValues();
      if (
        form.getValues('isPublic') === true &&
        !/^https?:\/\/(www\.)?github\.com\/[^/]+\/.*$/.test((form.getValues('githubLink') || '').trim())
      ) {
        form.setError('githubLink', {
          message: 'Invalid GitHub URL'
        });
        return;
      }

      const formData = new FormData();
      const { projectName, track, detailedIntro, intro, prizeTrack, location, isPublic, githubLink } = values;
      formData.append('name', projectName);
      formData.append('prizeTrack', prizeTrack);
      console.log(track);
      track.split(',').forEach((t) => {
        formData.append('tracks[]', t);
      });
      formData.append('location', location);
      formData.append('description', detailedIntro);
      formData.append('introduction', intro);
      formData.append('isOpenSource', String(isPublic));
      formData.append('githubLink', githubLink || '');

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
      onSuccess() {
        redirectToUrl(`/hackathon/projects/${project.id}`);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const onSubmit = () => {
    if (isEqual(defaultValues, form.getValues())) {
      redirectToUrl(`/hackathon/projects/${project.id}`);
    } else {
      onSubmitRequest();
    }
  };

  const onExit = () => {
    if (isEqual(defaultValues, form.getValues()) || isClose) {
      redirectToUrl(`/hackathon/projects/${project.id}`);
    } else {
      exitConfirmRef.current?.open({
        onConfirm: onSubmitRequest
      });
    }
  };

  return (
    <>
      <div className="relative">
        <Nav
          curAnchorIndex={curAnchorIndex}
          offsetTops={offsetTops}
          handleClickAnchor={handleClickAnchor}
          onSava={onSubmit}
          onExit={onExit}
          submitDisable={isClose || infoDisable || otherFormDisable || projectDisable || linksDisable}
        />
      </div>
      <div className="flex flex-1 flex-shrink-0 flex-col gap-[60px] pb-[84px] text-neutral-off-black">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-[60px]" ref={boxRef}>
            <Info form={form} setLogo={setLogo} hackathon={hackathon} isClose={isClose} />
            <Project form={form} isClose={isClose} />
            <Videos project={project} isClose={isClose} />
            <Links form={form} isClose={isClose} />
            <Others form={form} isClose={isClose} />
            <Wallet project={project} isClose={isClose} />
          </form>
        </Form>
        <ConfirmModal ref={exitConfirmRef} confirmText={'Save & leave'}>
          <h4 className="text-h4 text-center text-neutral-black">
            Do you want to save the submission process & leave?
          </h4>
        </ConfirmModal>
      </div>
    </>
  );
};

export default Content;
