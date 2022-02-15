import React, { useContext } from 'react';

import { Container, interfaces } from 'inversify';
import { useMemoOne } from 'use-memo-one';

const InversifyContext = React.createContext<{ container: Container | null }>({ container: null });

type Properties = {
  container: Container;
};

const IoCProvider: React.FC<Properties> = (properties) => {
  return (
    <InversifyContext.Provider value={{ container: properties.container }}>
      {properties.children}
    </InversifyContext.Provider>
  );
};

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>): T {
  const { container } = useContext(InversifyContext);

  if (!container) {
    throw new Error();
  }

  return useMemoOne(() => container.get<T>(identifier), [container, identifier]);
}

export default IoCProvider;
