import { clsx as cx } from 'clsx';

import type React from 'react';

type Props = React.ComponentPropsWithoutRef<'aside'>;

const Sidebar = ({ className, ...props }: Props) => (
  <aside {...props} className={cx(className, 'hidden gap-5 xl:flex xl:flex-col')} />
);

export default Sidebar;
