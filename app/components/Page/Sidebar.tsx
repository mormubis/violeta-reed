import { clsx as cx } from 'clsx';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'aside'>;

const Sidebar = ({ className, ...props }: Props) => (
  <aside
    {...props}
    className={cx(className, 'hidden gap-5 xl:flex xl:flex-col')}
  />
);

export default Sidebar;
