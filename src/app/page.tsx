import { api, HydrateClient } from "trpc/server";
import tw from "tw-tailwind";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <Main></Main>
    </HydrateClient>
  );
}

const Main = tw.main`flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-[#2e026d] to-[#15162c] text-white`;
