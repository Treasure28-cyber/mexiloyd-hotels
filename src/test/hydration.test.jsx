import fs from 'node:fs';
import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import App from '../App.jsx';

// Check generated production markup when a build exists.
describe.skipIf(!fs.existsSync('dist/rooms/index.html'))('prerender hydration',()=>{
  for(const page of ['','rooms','facilities','gallery','about','contact']) {
    it(`hydrates /${page} without replacing the page or reporting mismatches`,async()=>{
      window.history.replaceState({},'',`/${page}`);
      const html=fs.readFileSync(page?`dist/${page}/index.html`:'dist/index.html','utf8');
      const parsed=new DOMParser().parseFromString(html,'text/html');
      const container=document.createElement('div');
      container.innerHTML=parsed.querySelector('#root').innerHTML;
      document.body.append(container);
      const heading=container.querySelector('h1'), errors=[];
      const consoleError=vi.spyOn(console,'error').mockImplementation((...args)=>errors.push(args.join(' ')));
      let root;
      await act(async()=>{ root=hydrateRoot(container,<BrowserRouter><App /></BrowserRouter>,{onRecoverableError:error=>errors.push(String(error))}); });
      await waitFor(()=>expect(container.querySelector('h1')).toBe(heading));
      expect(errors.filter(error=>/hydration|didn't match|did not match|server rendered/i.test(error))).toEqual([]);
      await act(async()=>root.unmount());container.remove();consoleError.mockRestore();
    });
  }
});
