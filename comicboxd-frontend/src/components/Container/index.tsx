type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <div className="mx-auto min-h-screen px-8 max-w-5xl ">{children}</div>;
}
