import React, { useEffect, useRef, useState } from 'react';
import { HackathonType, ProjectType } from '@/service/webApi/resourceStation/type';
import Videos from './Videos';

import { OffsetTopsType } from '../../../../../constants/type';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useRequest } from 'ahooks';
import { RcFile, UploadFile } from 'antd/es/upload';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import Info from './Info';
import Others from './Others';
import Wallet from './Wallet';
import Nav from '../Nav';

import { isEqual } from 'lodash-es';
import { useRedirect } from '@/hooks/router/useRedirect';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import Project from './Project';
import Links from './Links';
import { HackathonPartner } from '@/app/[lang]/(web)/(other)/form/hackathon/[hackathonId]/submission/[projectId]/components/constants';
import { getSectionData } from '../../constants';

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
  const boxRef = useRef<HTMLFormElement>(null);
  const sectionData = getSectionData(hackathon.id);
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

  const formSchema = z.object({
    projectLogo: z.string().url(),
    projectName: z.string().min(1, {
      message: 'Project Name must be at least 2 characters.'
    }),
    location: z.string().min(1),
    prizeTrack: z.string().min(1),
    track: z.string().min(1),
    githubLink: z.string().min(0).optional(),
    isPublic: z.boolean(),
    submitType: z.string().min(0),
    efrog: z.boolean(),
    croak: z.boolean(),
    demo: z.string().url(),
    figma: z.string().min(0).optional(),
    playstore: z.string().min(0).optional(),
    googleDrive: z.string().min(0).optional(),
    other: z.string().min(0).optional(),
    contractLink: z.string().url(),
    projectLink: z.string().url(),
    socialLink: z.string().url(),
    partnerTooling: z.string().min(1).max(360),
    tagline: z.string().min(hackathon.id === HackathonPartner.Hack4Bengal ? 1 : 0),
    technologies: z.string().min(hackathon.id === HackathonPartner.Hack4Bengal ? 1 : 0),
    solvedProblem: z.string().min(hackathon.id === HackathonPartner.Hack4Bengal ? 1 : 0),
    challenges: z.string().min(hackathon.id === HackathonPartner.Hack4Bengal ? 1 : 0),
    teamID: z.string().min(hackathon.id === HackathonPartner.Hack4Bengal ? 1 : 0),
    roomNumber: z.string().min(hackathon.id === HackathonPartner.Hack4Bengal ? 1 : 0),
    intro: z
      .string()
      .min(1, {
        message: 'Intro must be at least 2 characters.'
      })
      .max(120, {
        message: 'The intro field cannot exceed 160 characters'
      }),
    detailedIntro: z
      .string()
      .min(1, {
        message: 'detailedIntro must be at least 16 characters.'
      })
      .max(600, {
        message: 'The detailed intro field cannot exceed 600 characters'
      })
  });

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
    demo: project.demo,
    figma: links?.figma || '',
    playstore: links?.playstore || '',
    googleDrive: links?.googleDrive || '',
    other: links?.other || '',
    tagline: project.tagline,
    technologies: project.technologies,
    solvedProblem: project.solvedProblem,
    challenges: project.challenges,
    teamID: project.teamID,
    roomNumber: project.roomNumber,
    croak: project.croak,
    submitType: project.submitType,
    contractLink: links.contractLink || '',
    projectLink: links.projectLink || '',
    socialLink: links.socialLink || '',
    partnerTooling: links.partnerTooling || ''
  };

  console.log(project);

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
    (!form.getValues('intro') && hackathon.id !== HackathonPartner.Hack4Bengal) ||
    (!form.getValues('detailedIntro') && hackathon.id !== HackathonPartner.Hack4Bengal) ||
    (form.getValues('track').split(',').length < 1 && hackathon.id !== HackathonPartner.Hack4Bengal) ||
    (hackathon.id === HackathonPartner.Hack4Bengal &&
      (!form.getValues('solvedProblem') ||
        !form.getValues('tagline') ||
        !form.getValues('technologies') ||
        !form.getValues('challenges') ||
        !form.getValues('teamID') ||
        !form.getValues('roomNumber')));

  const projectDisable =
    (typeof form.getValues('efrog') !== 'boolean' ||
      typeof form.getValues('croak') !== 'boolean' ||
      !form.getValues('submitType')) &&
    hackathon.id !== HackathonPartner.Hack4Bengal;

  const linksDisable =
    (!form.getValues('contractLink') ||
      !form.getValues('projectLink') ||
      !form.getValues('socialLink') ||
      !form.getValues('partnerTooling')) &&
    hackathon.id !== HackathonPartner.Hack4Bengal;

  const demoVideoDisable = !form.getValues('demo') && hackathon.id === HackathonPartner.Hack4Bengal;

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
      const {
        projectName,
        track,
        detailedIntro,
        intro,
        prizeTrack,
        location,
        isPublic,
        githubLink,
        tagline,
        solvedProblem,
        challenges,
        technologies,
        teamID,
        roomNumber,
        contractLink,
        projectLink,
        socialLink,
        partnerTooling,
        figma,
        playstore,
        demo,
        googleDrive,
        other
      } = values;
      formData.append('name', projectName);
      formData.append('prizeTrack', prizeTrack);

      track.split(',').forEach((t) => {
        formData.append('tracks[]', t);
      });

      hackathon.id !== HackathonPartner.Hack4Bengal && formData.append('location', location);

      formData.append('description', detailedIntro);
      formData.append('introduction', intro);
      formData.append('isOpenSource', String(isPublic));
      formData.append('githubLink', githubLink || '');
      formData.append('tagline', tagline || '');
      formData.append('solvedProblem', solvedProblem || '');
      formData.append('challenges', challenges || '');
      formData.append('technologies', technologies || '');
      formData.append('teamID', teamID || '');
      formData.append('roomNumber', roomNumber || '');
      formData.append('demo', demo || '');

      const links = {
        contractLink: contractLink || '',
        projectLink: projectLink || '',
        socialLink: socialLink || '',
        partnerTooling: partnerTooling || '',
        figma: figma || '',
        playstore: playstore || '',
        googleDrive: googleDrive || '',
        other: other || ''
      };

      formData.append('links', JSON.stringify(links));

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
          sectionData={sectionData}
          curAnchorIndex={curAnchorIndex}
          offsetTops={offsetTops}
          handleClickAnchor={handleClickAnchor}
          onSava={onSubmit}
          onExit={onExit}
          submitDisable={
            isClose || infoDisable || otherFormDisable || projectDisable || linksDisable || demoVideoDisable
          }
        />
      </div>
      <div className="flex flex-1 flex-shrink-0 flex-col gap-[60px] pb-[84px] text-neutral-off-black">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-[60px]" ref={boxRef}>
            <Info form={form as any} setLogo={setLogo} hackathon={hackathon} isClose={isClose} />
            {hackathon.id === HackathonPartner.Linea && <Project form={form as any} isClose={isClose} />}
            <Videos project={project} isClose={isClose} form={form as any} />
            {hackathon.id === HackathonPartner.Linea && <Links form={form as any} isClose={isClose} />}
            <Others form={form as any} isClose={isClose} project={project} />
            {hackathon.id !== HackathonPartner.Hack4Bengal && <Wallet project={project} isClose={isClose} />}
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
