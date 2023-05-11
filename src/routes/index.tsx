import { Routes, Route } from 'react-router-dom';

import { Header } from 'app/shared';
import { Home, Error, Investment } from 'app/ui';

const Router = () => (
  <>
    <Header />
    <Routes>
      <Route index element={<Home />} />
      <Route path="/investment/:id" element={<Investment />} />
      <Route path="/erro" element={<Error />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </>
);

export default Router;
