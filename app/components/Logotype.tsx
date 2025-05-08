import { clsx } from 'clsx';

import logotype from 'public/images/logotype.png?url';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'img'>;

const Logotype = (props: Props) => (
  <img
    {...props}
    className={clsx(props.className, 'object-contain')}
    src={logotype}
  />
);

export default Logotype;
