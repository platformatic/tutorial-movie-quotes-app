interface Props {
  id: string
  likes: number
}

// const likes = ref(props.likes)

// async function likeQuote () {
//   const { data } = await quotesApi.mutation(gql`
//     mutation($id: ID!) {
//       likeQuote(id: $id)
//     }
//   `, { id: props.id })
//   if (data?.likeQuote) {
//     likes.value = data.likeQuote
//   }
// }

export default ({ likes }: Props) => {
  return (
    <span 
      className={cn`
        like-quote cursor-pointer mr-5 flex items-center',
        ${likes === 0 && 'cursor-pointer'},
        ${likes > 0 && 'likes'}
      `}>
      <svg 
        className="like-icon w-6 h-6 mr-2 text-red-600"
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        <span className="likes-count w-8">{likes}</span>
    </span>
  )
}

function cn (fragments, ...values) {
  let attrValue = ''
  for (const fragment of fragments) {
    attrValue += fragment
    if (values.length > 0 && values[0]) {
      attrValue += values.shift()
    }
  }
  return attrValue
}

