interface HeaderItemProps {
  text?: string;
}

const HeaderItem = ({ text }: HeaderItemProps) => {
  return (
    <div
      className={`sticky
      top-0
      z-10
      row-start-[1]
      border-b
      bg-clip-padding
      py-2
      text-sm font-medium
      `}
    >
      {text || ''}
    </div>
  );
};

export default HeaderItem;
