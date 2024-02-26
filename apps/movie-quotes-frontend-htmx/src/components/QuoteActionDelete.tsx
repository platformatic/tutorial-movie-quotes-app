import Html from '@kitajs/html'

export interface Props extends Html.PropsWithChildren {
  id: number
}

export default ({ id }: Props) => {
  return (
    <button
      hx-post={`/delete/${id}`}
      hx-target="closest .quote"
      hx-swap="outerHTML"
      hx-confirm="Are you sure want to delete this quote?"
      type="button"
      class="flex items-center text-gray-400 hover:text-red-700 underline decoration-red-700 decoration-2 underline-offset-4"
    >
      <svg
        role="img"
        aria-label="Delete"
        class="w-6 h-6 mr-1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
          clip-rule="evenodd"
        />
      </svg>
      <span>Delete</span>
    </button>
  )
}
