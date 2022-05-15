import type { ProviderProps } from 'react';
import React from 'react';

import Context from './Context';

type Props = ProviderProps<boolean>;

const Provider = ({ value, ...props }: Props) => <Context.Provider {...props} value={value} />;

export default Provider;
