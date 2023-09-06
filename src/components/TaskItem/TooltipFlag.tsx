import { cn } from '@/lib/utils'
import { Flag } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'

const priorities = {
  URGENT: {
    text: 'Urgente',
    color: 'text-red-500'
  },
  HIGH: {
    text: 'Alta',
    color: 'text-yellow-500'
  },
  NORMAL: {
    text: 'Normal',
    color: 'text-cyan-600 dark:text-cyan-400'
  },
  LOW: {
    text: 'Baixa',
    color: 'text-gray-500 dark:text-gray-200'
  }
}

interface TooltipFlagProps {
  priority: keyof typeof priorities
}

export function TooltipFlag({ priority }: TooltipFlagProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Flag className={cn('mr-2 h-4 w-4', priorities[priority].color)} />
        </TooltipTrigger>

        <TooltipContent>{priorities[priority].text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
