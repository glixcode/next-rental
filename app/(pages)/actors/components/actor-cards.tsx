"use client"
interface ActorCardsProps {
    label: string;
    value: string;
    change: string;
    icon: React.ElementType;
    color: string;
}

const colorMap: Record<string, { bg: string; icon: string; text: string }> = {
    emerald: { bg: "bg-emerald-500/10", icon: "text-emerald-400", text: "text-emerald-400" },
    blue: { bg: "bg-blue-500/10", icon: "text-blue-400", text: "text-blue-400" },
    amber: { bg: "bg-amber-500/10", icon: "text-amber-400", text: "text-amber-400" },
    purple: { bg: "bg-purple-500/10", icon: "text-purple-400", text: "text-purple-400" },
}

const ActorCards = (card: ActorCardsProps) => {

  const colors = colorMap[card.color]
  return (
      <div
          className="group rounded-xl border border-[#222] bg-[#242424] p-5 transition-all duration-200 hover:border-[#333] hover:bg-[#2a2a2a] hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
              <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${colors.bg} ${colors.icon} transition-colors duration-200`}>
                  <card.icon className="h-5 w-5" />
              </div>
              <span className={`text-xs font-medium ${colors.text} ${colors.bg} px-2 py-0.5 rounded-full`}>
                  {card.change}
              </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[#ededed]">{card.value}</p>
          <p className="text-sm text-[#8c8c8c]">{card.label}</p>
      </div>
  )
}

export default ActorCards