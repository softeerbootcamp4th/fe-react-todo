import { PropsWithChildren } from 'react';

interface DropdownProps {
  isOpen: boolean;
}

function Dropdown({ children, isOpen }: PropsWithChildren<DropdownProps>) {
  const openCondition = isOpen ? 'opacity-1' : 'opacity-0 h-0';

  return (
    <div
      className={`${openCondition} overflow-hidden transition-all absolute bg-white z-10 w-[150px]`}
    >
      {children}
    </div>
  );
}
export default Dropdown;
