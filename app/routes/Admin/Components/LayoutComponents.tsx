import { FaBox, FaChartPie, FaCog, FaHome, FaShoppingCart,FaClipboardList, FaUser, FaUserCog, FaUsers, FaBoxOpen, FaTags } from 'react-icons/fa'
import { Link, NavLink, useLocation } from 'react-router'
import navigationData from '../navigation.json'

export function Header({ user }: { user: string }) {

  const path = useLocation().pathname

  let title = 'Bienvenido de nuevo,  ' + user
  let subtitle: React.ReactNode = 'Revise el balance que tenemos preparado para ti'

  if(path !== '/dashboard'){

    title = navigationData.find(item => item.link === path)?.text || 'Dashboard'
    subtitle = (
      <div className='flex gap-2 font-semibold text-sm'>
        <Link to={'/dashboard'} className='text-gray-400'>Dashboard</Link>
        <span>/</span>
        <span>{title}</span>
      </div>
    )
  }

  return (
    <header className="header flex justify-between items-start pt-7">
      <div>
        <h1 className="text-3xl font-bold capitalize">{title}</h1>
        <span className="">{subtitle}</span>
      </div>
      <div className="pr-8 flex items-center gap-4">
        <input type="text" className="bg-secondary text-foreground h-10 rounded-2xl px-4 border-1 border-foreground/10" placeholder="Buscar" />
        <FaCog className="text-2xl text-primary-1 cursor-pointer hover:rotate-180 transition-transform" />
        <div className='cursor-pointer hover:bg-secondary p-2 rounded-xl text-primary-1 flex items-center gap-2'>
          <FaUser className="text-2xl text-primary-1" />
          <p className="m-0 leading-none font-semibold">Cerrar Sesión</p>
        </div>
      </div>
    </header>
  )
}

const icons = {
  home: <FaHome />,
  FaUser: <FaUser />,
  FaUserCog: <FaUserCog />,
  FaShoppingCart: <FaShoppingCart  />,
  FaBox: <FaBox  />,
  FaChartPie: <FaChartPie  />,
  FaCog: <FaCog  />,
  FaUsers: <FaUsers  />,
  FaClipboardList: <FaClipboardList  />,
  FaBoxOpen: <FaBoxOpen  />,
  FaTags: <FaTags />,
}

type IconKeys = keyof typeof icons;

interface ButtonProps {
    link: string;
    icon: React.ReactNode;
    text: string;
    active: boolean;
}

export function Button({ link, icon, text }: Omit<ButtonProps, 'active'>) {
  const navButtonBase = 'w-full h-16 cursor-pointer text-foreground p-2 rounded-xl flex items-center gap-3 font-semibold drop-shadow-xs transition-colors'
  const navButtonActive = 'bg-secondary duration-300'
  const navButtonInactive = 'hover:bg-secondary duration-200'
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `${navButtonBase} ${isActive ? navButtonActive : navButtonInactive}`
      }
      end
    >
      {({ isActive }) => (
        <>
          <div className={`transition-colors duration-300 h-9 w-9 flex items-center justify-center rounded-xl ${isActive ? 'bg-primary-1 text-secondary' : 'bg-secondary text-primary-1'}`}>
            {icon}
          </div>
          <p className={`transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-gray-400'}`}>
            {text}
          </p>
        </>
      )}
    </NavLink>
  )
}

export function Navbar() {
  return (
    <nav className="w-fit h-full px-6 nav sticky top-0 max-h-screen">
      <div className='flex items-center gap-3 my-6 px-4'>
        <img src="/images/Logo.webp" alt="Logo" width={200}  height={70}/>
      </div>
      <div className='h-0.5 bg-gradient-to-r from-primary-1/25 via-primary-1 to-primary-1/25 w-full mb-6 rounded-4xl'>
      </div>
      <div className='flex flex-col gap-2'>
        {navigationData.map((item, index) => (
          <Button key={index} link={item.link} icon={icons[item.icon as IconKeys]} text={item.text} />
        ))}
        <div className='h-0.5 bg-gradient-to-r from-primary-1/25 via-primary-1 to-primary-1/25 w-full rounded-4xl'></div>

      </div>
    </nav>
  )
}