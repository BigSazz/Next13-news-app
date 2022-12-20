"use Client"

import { categories } from "../constants"
import { usePathname } from "next/navigation"
import NavLink from "./NavLink"

function NavLinks() {
	const pathname = usePathname();
	const isActive = (category: string) => {
		return pathname?.split("/").pop() === category.toLowerCase();
	}

	return (
		<nav className="grid grid-cols-4 md:grid-cols-7 text-xs md:text-sm gap-4 pb-10 max-w-6xl mx-auto border-b border-orange-400">
			{categories.map((category) => (
				<NavLink
					key={category}
					category={category}
					isActive={isActive(category)} />
			))}
		</nav>
	)
}

export default NavLinks