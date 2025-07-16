import { phoneValidation } from '~/utils/phoneValidation'

/**
 * Componente para probar la validación de teléfono
 */
export const PhoneValidationTest = () => {
  const testCases = [
    '123',         // Muy corto
    '1234567',     // Justo el mínimo
    '123456789',   // Válido
    '+51123456789', // Válido internacional
    'abc123',      // Con letras
    '12345678901234567', // Muy largo
    '+51 123 456 789',   // Válido con espacios
    '(01) 123-4567',     // Con paréntesis
  ]

  const testPhone = (phone: string) => {
    console.log(`\n=== Testing: "${phone}" ===`)

    // Test pattern
    const patternResult = phoneValidation.pattern.value.test(phone)
    console.log(`Pattern test: ${patternResult ? '✅' : '❌'}`)

    // Test validate function
    const validateResult = phoneValidation.validate(phone)
    console.log(`Validate result: ${validateResult === true ? '✅' : `❌ ${validateResult}`}`)

    return validateResult === true && patternResult
  }

  console.log('=== PHONE VALIDATION TESTS ===')
  testCases.forEach(testPhone)

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold">Phone Validation Test</h3>
      <p>Check console for results</p>
      <div className="mt-2">
        <pre className="text-xs">
          {testCases.map(phone => (
            <div key={phone}>
              {phone}: {testPhone(phone) ? '✅' : '❌'}
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

// Función para probar manualmente
export const debugPhoneValidation = (phone: string) => {
  console.log(`\n=== DEBUG: "${phone}" ===`)

  const pattern = phoneValidation.pattern.value
  const patternTest = pattern.test(phone)
  console.log(`Pattern ${pattern}: ${patternTest ? '✅' : '❌'}`)

  const validateResult = phoneValidation.validate(phone)
  console.log(`Validate: ${validateResult === true ? '✅' : `❌ ${validateResult}`}`)

  // Análisis del número
  const digitsOnly = phone.replace(/[^\d+]/g, '')
  const numberPart = digitsOnly.replace(/^\+/, '')
  console.log(`Original: "${phone}"`)
  console.log(`Digits only: "${digitsOnly}"`)
  console.log(`Number part: "${numberPart}"`)
  console.log(`Length: ${numberPart.length}`)

  return {
    pattern: patternTest,
    validate: validateResult,
    digitsOnly,
    numberPart,
    length: numberPart.length
  }
}
