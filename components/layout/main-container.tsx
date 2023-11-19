export default function MainContainer({ children }: { children: React.ReactNode }) {
  return <main className='mx-auto max-w-[1920px] p-2 md:p-6'>{children}</main>;
}
