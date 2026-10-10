import { lazy, Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6';
import Providers from '../components/layout/Providers';
import { ActiveRouteProvider } from '../components/context/ActiveRouteContext/ActiveRouteContext';
import { componentMap } from '../constants/Components';
import { catalog } from './catalog';

const cache = new Map();
export default function DemoFrame() {
  const { category, subcategory } = useParams();
  useEffect(() => {
    document.body.classList.add('uie-frame-body');
    return () => document.body.classList.remove('uie-frame-body');
  }, []);
  const entry = catalog.find(item => item.path === `/${category}/${subcategory}`);
  const factory = entry && componentMap[subcategory];
  if (!factory) return <p>Demo unavailable</p>;
  if (!cache.has(subcategory)) cache.set(subcategory, lazy(factory));
  const Demo = cache.get(subcategory);
  return (
    <NuqsAdapter>
      <ActiveRouteProvider>
        <Providers>
          <div className="uie-frame-content">
            <Suspense fallback={<p role="status">正在加载演示 / Loading demo…</p>}>
              <Demo />
            </Suspense>
          </div>
        </Providers>
      </ActiveRouteProvider>
    </NuqsAdapter>
  );
}
