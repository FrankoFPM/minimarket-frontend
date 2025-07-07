import { Link } from 'react-router'
import { FaHome, FaChevronRight } from 'react-icons/fa'

interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6 px-4 lg:px-0">
      <Link
        to="/"
        className="flex items-center gap-1 text-foreground/70 hover:text-primary-1 transition-colors"
      >
        <FaHome size={14} />
        Inicio
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <FaChevronRight size={12} className="text-foreground/40" />
          {item.href && !item.active ? (
            <Link
              to={item.href}
              className="text-foreground/70 hover:text-primary-1 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={item.active ? 'text-primary-1 font-medium' : 'text-foreground/70'}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
