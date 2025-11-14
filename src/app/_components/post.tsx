'use client'

import { useState } from 'react'
import { api } from 'trpc/react'
import tw from 'tw-tailwind'

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery()

  const utils = api.useUtils()
  const [name, setName] = useState('')
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate()
      setName('')
    },
  })

  return (
    <Container>
      {latestPost ? (
        <PostText>Your most recent post: {latestPost.name}</PostText>
      ) : (
        <NoPostText>You have no posts yet.</NoPostText>
      )}
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault()
          createPost.mutate({ name })
        }}
      >
        <StyledInput
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledButton type="submit" disabled={createPost.isPending}>
          {createPost.isPending ? 'Submitting...' : 'Submit'}
        </StyledButton>
      </StyledForm>
    </Container>
  )
}

const Container = tw.div`w-full max-w-xs`
const PostText = tw.p`truncate`
const NoPostText = tw.p``
const StyledForm = tw.form`flex flex-col gap-2`
const StyledInput = tw.input`w-full rounded-full bg-white/10 px-4 py-2 text-white`
const StyledButton = tw.button`rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 cursor-pointer`
