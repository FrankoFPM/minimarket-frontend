/**
 * Utilidades para validación de números de teléfono
 */

export const phoneValidation = {
  required: 'El teléfono es requerido',
  pattern: {
    value: /^[+]?[0-9\s\-()]+$/,
    message: 'El teléfono solo puede contener números, +, espacios, guiones y paréntesis'
  },
  validate: (value: string) => {
    // Remover espacios, guiones y paréntesis para contar solo dígitos
    const digitsOnly = value.replace(/[^\d+]/g, '')

    // Verificar que tenga al menos 7 dígitos (sin contar el +)
    const numberPart = digitsOnly.replace(/^\+/, '')
    if (numberPart.length < 7) {
      return 'El teléfono debe tener al menos 7 dígitos'
    }

    // Verificar que no tenga más de 15 dígitos
    if (numberPart.length > 15) {
      return 'El teléfono no puede tener más de 15 dígitos'
    }

    return true
  }
}

/**
 * Formatea un número de teléfono para mostrar
 * @param phone - Número de teléfono sin formatear
 * @returns Número formateado
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remover caracteres no numéricos excepto +
  const cleaned = phone.replace(/[^\d+]/g, '')

  // Si empieza con +, formatear internacional
  if (cleaned.startsWith('+')) {
    const countryCode = cleaned.substring(1, 4)
    const number = cleaned.substring(4)

    // Formatear según longitud
    if (number.length <= 3) {
      return `+${countryCode} ${number}`
    } else if (number.length <= 6) {
      return `+${countryCode} ${number.substring(0, 3)} ${number.substring(3)}`
    } else {
      return `+${countryCode} ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`
    }
  }

  // Formatear número nacional
  if (cleaned.length <= 3) {
    return cleaned
  } else if (cleaned.length <= 6) {
    return `${cleaned.substring(0, 3)} ${cleaned.substring(3)}`
  } else {
    return `${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`
  }
}

/**
 * Valida si un número de teléfono es válido
 * @param phone - Número de teléfono a validar
 * @returns true si es válido, false si no
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const validation = phoneValidation.validate(phone)
  return validation === true
}

/**
 * Limpia un número de teléfono dejando solo números y +
 * @param phone - Número de teléfono a limpiar
 * @returns Número limpio
 */
export const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/[^\d+]/g, '')
}

/**
 * Ejemplos de números de teléfono válidos para mostrar al usuario
 */
export const phoneExamples = [
  '+51 123 456 789',
  '+1 (555) 123-4567',
  '123 456 789',
  '+52 55 1234 5678'
]
