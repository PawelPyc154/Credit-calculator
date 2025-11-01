import Link from "next/link";
import tw from "tw-tailwind";

import { LatestPost } from "app/_components/post";
import { api, HydrateClient } from "trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <Main>
        <Container>
          <Title>
            Create <Highlight>T3</Highlight> App
          </Title>
          <Grid>
            <StyledLink
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <LinkTitle>First Steps →</LinkTitle>
              <LinkDescription>
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </LinkDescription>
            </StyledLink>
            <StyledLink
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <LinkTitle>Documentation →</LinkTitle>
              <LinkDescription>
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </LinkDescription>
            </StyledLink>
          </Grid>
          <InfoSection>
            <InfoText>
              {hello ? hello.greeting : "Loading tRPC query..."}
            </InfoText>
          </InfoSection>

          <LatestPost />
        </Container>
      </Main>
    </HydrateClient>
  );
}

// Styled components using tw-tailwind
const Main = tw.main`flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-[#2e026d] to-[#15162c] text-white`;
const Container = tw.div`container flex flex-col items-center justify-center gap-12 px-4 py-16`;
const Title = tw.h1`font-extrabold text-5xl tracking-tight sm:text-[5rem]`;
const Highlight = tw.span`text-[hsl(280,100%,70%)]`;
const Grid = tw.div`grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8`;
const StyledLink = tw(
  Link
)`flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20`;
const LinkTitle = tw.h3`font-bold text-2xl`;
const LinkDescription = tw.div`text-lg`;
const InfoSection = tw.div`flex flex-col items-center gap-2`;
const InfoText = tw.p`text-2xl text-white`;
