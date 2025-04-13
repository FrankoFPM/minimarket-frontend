import { useState, useEffect } from 'react'
import { AiFillMoon } from 'react-icons/ai'
import { MdSunny } from 'react-icons/md'

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Leer el tema de la cookie al cargar
    const savedTheme = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme='))
      ?.split('=')[1]

    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light'
    setIsDarkMode(!isDarkMode)

    // Guardar el tema en una cookie
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000` // 1 año
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <div className="relative flex items-center justify-center" onClick={toggleTheme}>
      <AiFillMoon
        size={60}
        className={`absolute text-white hover:rotate-45 duration-700 transition-transform ${
          isDarkMode ? '' : 'scale-0'
        }`}
      />
      <MdSunny
        size={60}
        className={`absolute text-yellow-400 hover:rotate-90 duration-700 transition-transform ${
          isDarkMode ? 'scale-0' : ''
        }`}
      />
    </div>
  )
}