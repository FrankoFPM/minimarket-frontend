// Ejemplo de endpoint en tu backend para manejar restablecimientos

/*
// En tu backend (Spring Boot, Express, etc.)

// Endpoint para registrar restablecimiento de contraseña
@PatchMapping("/usuario/{id}/password-reset")
public ResponseEntity<?> registerPasswordReset(@PathVariable String id, @RequestBody PasswordResetRequest request) {
    try {
        // Buscar el usuario por ID
        Usuario usuario = usuarioService.findById(id);

        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualizar timestamp de restablecimiento
        usuario.setPasswordResetAt(request.getPasswordResetAt());
        usuario.setLastPasswordResetSource(request.getSource());

        // Guardar en la base de datos
        usuarioService.save(usuario);

        return ResponseEntity.ok(new MessageResponse("Restablecimiento registrado exitosamente"));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new MessageResponse("Error al registrar restablecimiento"));
    }
}

// DTO para la solicitud
public class PasswordResetRequest {
    private String passwordResetAt;
    private String email;
    private String source;

    // getters y setters
}

// Agregar campos a tu entidad Usuario
@Entity
public class Usuario {
    // ... campos existentes ...

    @Column(name = "password_reset_at")
    private String passwordResetAt;

    @Column(name = "last_password_reset_source")
    private String lastPasswordResetSource;

    // getters y setters
}
*/

// Frontend: Uso del endpoint
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export const notifyPasswordReset = async (userId: string, email: string) => {
  try {
    await axios.patch(`${API_URL}/usuario/${userId}/password-reset`, {
      passwordResetAt: new Date().toISOString(),
      email: email,
      source: 'password_reset_link'
    })

    console.log('✅ Restablecimiento notificado al backend')
  } catch (error) {
    console.error('❌ Error notificando restablecimiento:', error)
  }
}
