import { PropsWithChildren } from 'react';

interface DropdownProps {
  isOpen: boolean;
}

function Dropdown({ children, isOpen }: PropsWithChildren<DropdownProps>) {
  const openCondition = isOpen ? 'opacity-1' : 'opacity-0 h-0';

  return (
    <div
      className={`${openCondition} overflow-hidden transition-all absolute bg-white z-10 w-[280px] flex flex-col gap-1 px-1 py-2 drop-shadow-lg`}
    >
      {children}
    </div>
  );
}
export default Dropdown;
