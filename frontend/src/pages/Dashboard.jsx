"use client"

import '../App.css'
import { Link } from "react-router-dom"
import {
    ChevronLeft,
    Home,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Upload,
    User,
    Users,
    Users2,
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipTrigger,
// } from "@/components/ui/tooltip"
import FadeIn from "@/components/FadeIn"
import Sidebar from "@/components/Sidebar"
import UserProfileIcon from "@/components/ui/UserProfileIcon"

export function Dashboard() {


    return (
        <div className="flex min-h-screen w-full flex-col bg-[#05140D]">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 overflow-hidden scrollbar-hidden">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-gray-700 bg-[#05140D] px-4 sm:static sm:h-auto sm:bg-transparent sm:px-6">
                    <Sidebar />

                    <FadeIn direction="down" delay={0.2} fullWidth>
                        <h3 className="md:text-4xl text-2xl font-semibold text-left text-white w-full py-3 md:px-3 z-[5]">
                            Dashboard
                        </h3>
                    </FadeIn>

                    <FadeIn direction="down" delay={0.2}>
                        <div className="relative ml-auto flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-300" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full rounded-lg bg-[#05140D] text-white placeholder-gray-300 pl-8 md:w-[200px] lg:w-[336px] border border-gray-600"
                            />
                        </div>
                    </FadeIn>

                    <FadeIn direction="left" delay={0.2}>
                        <UserProfileIcon className="text-white" />
                    </FadeIn>
                </header>
                <FadeIn direction="up" delay={0.2} fullWidth>
                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
                            <Card
                                x-chunk="dashboard-01-chunk-3"
                                className="bg-[#1A3A2C] text-white border-none shadow-none w-[calc(100vw-40px)] sm:max-w-full mx-auto"
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-300">Active Projects</CardTitle>
                                    <Activity className="h-4 w-4 text-[#2FB574]" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">2</div>
                                    <p className="text-xs text-gray-400">+2 from last month</p>
                                </CardContent>
                            </Card>

                            <Card
                                x-chunk="dashboard-01-chunk-0"
                                className="bg-[#1A3A2C] text-white border-none shadow-none w-[calc(100vw-40px)] sm:max-w-full mx-auto"
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-300">Funds Raised</CardTitle>
                                    <DollarSign className="h-4 w-4 text-[#2FB574]" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">$45,231.89</div>
                                    <p className="text-xs text-gray-400">+20.1% from last month</p>
                                </CardContent>
                            </Card>

                            <Card
                                x-chunk="dashboard-01-chunk-1"
                                className="bg-[#1A3A2C] text-white border-none shadow-none w-[calc(100vw-40px)] sm:max-w-full mx-auto"
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-300">Investors</CardTitle>
                                    <Users className="h-4 w-4 text-[#2FB574]" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+230</div>
                                    <p className="text-xs text-gray-400">+10.1% from last month</p>
                                </CardContent>
                            </Card>

                            <Card
                                x-chunk="dashboard-01-chunk-2"
                                className="bg-[#1A3A2C] text-white border-none shadow-none w-[calc(100vw-40px)] sm:max-w-full mx-auto"
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-300">Posts Engagement</CardTitle>
                                    <CreditCard className="h-4 w-4 text-[#2FB574]" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+12,234</div>
                                    <p className="text-xs text-gray-400">+19% from last month</p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                            

                            <Card
                                className="xl:col-span-2 bg-[#1A3A2C] border-none shadow-none "
                                x-chunk="dashboard-01-chunk-4"
                            >
                                <CardHeader className="flex flex-row items-center">
                                    <div className="grid gap-2">
                                        <CardTitle className="text-gray-300">Transactions</CardTitle>
                                        <CardDescription className="text-gray-400">Recent transactions from your projects.</CardDescription>
                                    </div>
                                    <Button asChild size="sm" className="ml-auto gap-1 text-[#2FB574]">
                                        <Link href="#">
                                            View All
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <Table className="bg-[#1A3A2C] text-white">
                                        <TableHeader>
                                            <TableRow className="hover:bg-[#2C5440]">
                                                <TableHead className="text-gray-400">Project Name</TableHead>
                                                <TableHead className="text-gray-400">Investor Name</TableHead>
                                                <TableHead className="hidden sm:table-cell text-gray-400">Date</TableHead>
                                                <TableHead className="text-right text-gray-400">Amount</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow className="hover:bg-[#2C5440]">
                                                <TableCell>
                                                    <div className="font-medium text-white line-clamp-1">Green Energy Initiative</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium text-white">Liam Johnson</div>
                                                    <div className="hidden text-sm text-gray-500 md:inline">liam@example.com</div>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell text-white">2023-09-15</TableCell>
                                                <TableCell className="text-right font-medium">
                                                    <span className="text-[#2FB574]">+ $1,000.00</span>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow className="hover:bg-[#2C5440]">
                                                <TableCell>
                                                    <div className="font-medium text-white line-clamp-1">Tech for Schools</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium text-white">Olivia Smith</div>
                                                    <div className="hidden text-sm text-gray-500 md:inline">olivia@example.com</div>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell text-white">2023-09-14</TableCell>
                                                <TableCell className="text-right font-medium">
                                                    <span className="text-[#2FB574]">+ $500.00</span>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow className="hover:bg-[#2C5440]">
                                                <TableCell>
                                                    <div className="font-medium text-white line-clamp-1">Water Conservation Fund</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium text-white">Noah Williams</div>
                                                    <div className="hidden text-sm text-gray-500 md:inline">noah@example.com</div>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell text-white">2023-09-13</TableCell>
                                                <TableCell className="text-right font-medium">
                                                    <span className="text-[#2FB574]">+ $750.00</span>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow className="hover:bg-[#2C5440]">
                                                <TableCell>
                                                    <div className="font-medium text-white line-clamp-1">Healthcare for All</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium text-white">Emma Brown</div>
                                                    <div className="hidden text-sm text-gray-500 md:inline">emma@example.com</div>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell text-white">2023-09-12</TableCell>
                                                <TableCell className="text-right font-medium">
                                                    <span className="text-red-500">- $2,000.00</span>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                            <Card className="bg-[#1A3A2C] border-none shadow-none" x-chunk="dashboard-01-chunk-5">
                                <CardHeader>
                                    <CardTitle className="text-gray-300">Recent Projects</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-8">
                                    {/* Dummy data for recent projects */}
                                    <div className="flex items-center gap-4">
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src="/avatars/project1.png" alt="Project Avatar" />
                                            <AvatarFallback>PP</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none text-white">Project Phoenix</p>
                                            <p className="text-sm text-muted-foreground text-white">by Olivia Martin</p>
                                        </div>
                                        <div className="ml-auto font-medium text-white">+$50,000.00</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src="/avatars/project2.png" alt="Project Avatar" />
                                            <AvatarFallback>GS</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none text-white">Green Start</p>
                                            <p className="text-sm text-muted-foreground text-white">by Jackson Lee</p>
                                        </div>
                                        <div className="ml-auto font-medium text-white">+$10,000.00</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src="/avatars/project3.png" alt="Project Avatar" />
                                            <AvatarFallback>RS</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none text-white">Renewable Solutions</p>
                                            <p className="text-sm text-muted-foreground text-white">by Isabella Nguyen</p>
                                        </div>
                                        <div className="ml-auto font-medium text-white">+$25,000.00</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src="/avatars/project4.png" alt="Project Avatar" />
                                            <AvatarFallback>SE</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none text-white">Solar Energy Initiative</p>
                                            <p className="text-sm text-muted-foreground text-white">by William Kim</p>
                                        </div>
                                        <div className="ml-auto font-medium text-white">+$15,000.00</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src="/avatars/project5.png" alt="Project Avatar" />
                                            <AvatarFallback>WF</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none text-white">Water for All</p>
                                            <p className="text-sm text-muted-foreground text-white">by Sofia Davis</p>
                                        </div>
                                        <div className="ml-auto font-medium text-white">+$8,000.00</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </FadeIn>
            </div>
        </div>
    )
}
