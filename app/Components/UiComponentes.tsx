import { useState, useEffect } from 'react'
import { AiFillMoon } from 'react-icons/ai'
import { MdSunny } from 'react-icons/md'

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Recuperar el estado inicial desde localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      return savedTheme === 'dark'
    }
    return false // Valor por defecto si no hay tema guardado
  })

  useEffect(() => {
    // Aplicar la clase 'dark' al cargar el componente
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    // Guardar el estado en localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newTheme)
  }

  return (
    <>
      <div className='relative flex items-center justify-center' onClick={toggleTheme}>
        <AiFillMoon size={60} className={`absolute text-white hover:rotate-45 duration-700 transition-transform ${isDarkMode ? '': 'scale-0'}`} />
        <MdSunny size={60} className={`absolute text-yellow-400 hover:rotate-90 duration-700 transition-transform ${isDarkMode ? 'scale-0' : ''}`} />
      </div>
    </>
  )
}