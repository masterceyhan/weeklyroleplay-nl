import { FaBox, FaSmile, FaCheck, FaCreditCard } from "react-icons/fa"

const items = [
  {
    icon: <FaBox size={15} />,
    label: "Nieuwe Producten",
  },
  {
    icon: <FaSmile size={15} />,
    label: "Direct Ontvangen",
  },
  {
    icon: <FaCheck size={15} />,
    label: "KVK Ingeschreven",
  },
  {
    icon: <FaCreditCard size={15} />,
    label: "Betalen via Tebex",
  },
]

export default function Announcement() {
  return (
    <div className="flex flex-col font-medium text-center text-sm justify-center">
      <span className="bg-orange-600 py-2 text-white">
        🎄 35% KERST KORTING OP ALLE PRODUCTEN! OOK GELDIG OP DE STAFF-RANKS 🎄 | GROOTSTE KORTING
        OOIT 🎉 | CODE: KERST35
      </span>
      <div className="bg-blue-500 py-2 hidden sm:flex md:text-sm gap-4 md:gap-8 items-center justify-center text-white">
        {items.map((item, index) => (
          <span key={index} className="flex gap-2 items-center text-nowrap w-fit">
            {item.icon}
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}
