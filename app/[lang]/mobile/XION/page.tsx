import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

function RedirectPage({ children }: { children: ReactNode }) {
  redirect('/mobile/ecosystem-explore/11be7446-5ed5-810c-ba5f-dfed6fa879e7');
}

export default RedirectPage;
