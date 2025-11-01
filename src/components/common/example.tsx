import clsx from "clsx";
import tw from "tw-tailwind";

const sizes = {
  sm: tw`text-sm`,
  base: tw`text-base`,
  lg: tw`text-lg`,
};
const colors = {
  amber: tw`bg-amber-400`,
  red: tw`bg-red-400`,
  blue: tw`bg-blue-400`,
  green: tw`bg-green-400`,
};

export type ExampleProps = {
  color: keyof typeof colors;
  size: keyof typeof sizes;
  data: string[];
  className?: string;
};

export const Example = ({ size, data, color, className }: ExampleProps) => {
  return (
    <Container className={clsx(sizes[size], colors[color], className)}>
      {data.map((item) => (
        <Item key={item}>{item}</Item>
      ))}
    </Container>
  );
};

const Container = tw.div`text-white`;
const Item = tw.div``;
