import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { AlarmClock, AudioWaveform, ChartColumn, CircleCheckBig, ClipboardPen } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip"
import { TooltipProvider } from "./ui/tooltip"
import { LogoBlackBall } from "@/assets/logo-aurora"
import Link from "next/link"

const itens = [
  {
    title: "Dashboard",
    icon: ChartColumn,
    url: "/"
  },
  {
    title: "Tarefas",
    icon: CircleCheckBig,
    url: "/tarefas"
  },
  {
    title: "Atividades",
    icon: ClipboardPen,
    url: "/atividades"
  },
  {
    title: "Música",
    icon: AudioWaveform,
    url: "/musica"
  },
  {
    title: "Alarmes",
    icon: AlarmClock,
    url: "/alarmes"
  }
]
export function AppSidebar() {
  return (
    <Sidebar className="flex flex-col items-center justify-between overflow-hidden">
      <SidebarHeader className="items-center mt-5">
        <LogoBlackBall className="w-10 h-10" aria-label="logo" role="img"/>
      </SidebarHeader>
      <SidebarContent className="mt-5">
        <SidebarMenu className="flex items-center gap-5">
          {
            itens.map((item) => (
              <SidebarMenuItem key={item.title}>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={item.url}>
                        <Button variant='ghost' className="w-10 h-10 cursor-pointer" aria-label={item.title}>
                          <item.icon className="!w-6 !h-6" strokeWidth={1.5} />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-background rounded-sm p-1 pl-2 pr-2 shadow-md"
                      sideOffset={5}
                    >
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
            ))
          }
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}