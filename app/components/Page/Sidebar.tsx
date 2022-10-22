import React from 'react';

import cx from 'classnames';

type Props = React.ComponentPropsWithoutRef<'aside'>;

const Sidebar = ({ className, ...props }: Props) => (
  <aside {...props} className={cx(className, 'hidden gap-5 xl:flex xl:flex-col')} />
);

export default Sidebar;
