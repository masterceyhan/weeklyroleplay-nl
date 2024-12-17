import { FaUsers } from "react-icons/fa"

export default async function UserCount() {
  const response = await fetch("https://servers-frontend.fivem.net/api/servers/single/meojrd", {
    next: {
      revalidate: 60,
    },
  })

  const data = await response.json()
  const maxClientCount = data.Data.sv_maxclients
  const clientCount = data.Data.clients

  return (
    <div className="mx-auto xl:ml-0 font-semibold py-1 px-2 bg-neutral-500 rounded-lg w-max border border-neutral-400 flex gap-2 items-center">
      <FaUsers size={15} />
      <span>
        {clientCount}/{maxClientCount}
      </span>
    </div>
  )
}
