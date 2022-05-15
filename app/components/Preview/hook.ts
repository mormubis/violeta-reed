import { useContext } from 'react';

import Context from './Context';

function usePreview() {
  return useContext(Context);
}

export default usePreview;
