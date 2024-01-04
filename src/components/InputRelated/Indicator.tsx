interface Props {
  className?: string;
  message: string;
}

export default function Indicator({ className, message }: Props) {
  return (
    <>
      <p className={className}>{message}</p>
    </>
  );
}
