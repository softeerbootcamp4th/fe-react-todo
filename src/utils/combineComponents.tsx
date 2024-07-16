import { ComponentType, ReactNode } from 'react';

type Component=ComponentType<{ children: ReactNode }>

export default function CombinedComponents(
  components: Component[],
): Component {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => function Combined({ children }) {
      return (
        <AccumulatedComponents>
          <CurrentComponent>{children}</CurrentComponent>
        </AccumulatedComponents>
      );
    },
    ({ children }) => children,
  );
}
