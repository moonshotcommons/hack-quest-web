import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDocumentation } from '@/store/zustand/documentationStore';
import webApi from '@/service';

const ID = 'cbbeb991-55bb-4b95-9d63-94aa7883cc14';

export function DocumentationContent() {
  const { data, open } = useDocumentation();

  const query = useQuery({
    queryKey: ['documentation', ID],
    enabled: open,
    staleTime: Infinity,
    queryFn: () => webApi.courseApi.getDocumentationTreeById(ID)
  });

  console.log(query.data);

  return (
    <div>
      <h1>hello world</h1>
    </div>
  );
}
