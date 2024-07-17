import { FC, ReactNode } from 'react';

type FCWithChildren = FC<{ children: ReactNode }>;

export default function CombinedComponents(components: FCWithChildren[]): FCWithChildren {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }) => (
        <AccumulatedComponents>
          <CurrentComponent>{children}</CurrentComponent>
        </AccumulatedComponents>
      );
    },
    ({ children }) => children,
  );
}
