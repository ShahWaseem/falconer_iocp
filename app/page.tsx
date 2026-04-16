import { readFileSync } from 'fs';
import { join } from 'path';
import SiteHydrator from '@/components/SiteHydrator';

export default function HomePage() {
  // Read the processed HTML body at build/request time (SSR)
  const htmlPath = join(process.cwd(), 'site-body-processed.html');
  const bodyHTML = readFileSync(htmlPath, 'utf-8');

  return (
    <>
      <div style={{ width: '100%' }} dangerouslySetInnerHTML={{ __html: bodyHTML }} />
      <SiteHydrator />
    </>
  );
}
