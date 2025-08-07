import { Circle, CircleCheckBig } from 'lucide-react'
import React from 'react'

interface CheckContentProps {
  status: boolean
  mudarStatus: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export default function CheckContent({ status, mudarStatus}: CheckContentProps) {
  return (
    <div
      onClick={mudarStatus}
      className="cursor-pointer hover:scale-110 transition-transform duration-200"
      aria-label={status ? "Desmarcar como concluída" : "Marcar como concluída"}
      aria-pressed={status}
    >
      {status ? (
        <CircleCheckBig className="text-chart-2" strokeWidth={1}/>
      ) : (
        <Circle className="opacity-30" strokeWidth={1}/>
      )}
    </div>
  )
}