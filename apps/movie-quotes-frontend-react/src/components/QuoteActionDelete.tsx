interface Props {
  id: string
}

function confirmDelete({ event }) {
  event.preventDefault()
  if (confirm('Are you sure want to delete this quote?')) {
    event.currentTarget.submit()
  }
}

export default ({ id }: Props) => {
  return (
    <form
      method="POST"
      action={`/delete/${id}`}
      className="form-delete-quote m-0"
    >
      <button
        onClick={confirmDelete}
        type="submit"
        className="flex items-center text-gray-400 hover:text-red-700 underline decoration-red-700 decoration-2 underline-offset-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 mr-1"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clipRule="evenodd"
          />
        </svg>
        <span>Delete</span>
      </button>
    </form>
  )
}
