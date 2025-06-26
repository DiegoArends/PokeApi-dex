# 🚀 Despliegue en Render.com

## Pasos para desplegar en Render.com

### 1. Preparar el repositorio
- Asegúrate de que todos los cambios estén en tu repositorio de GitHub
- Verifica que el build funcione localmente: `npm run build`

### 2. Crear cuenta en Render.com
- Ve a [render.com](https://render.com)
- Regístrate con tu cuenta de GitHub

### 3. Crear nuevo servicio
1. Haz clic en "New +"
2. Selecciona "Static Site"
3. Conecta tu repositorio de GitHub

### 4. Configurar el servicio
- **Name**: `pokedex-frontend` (o el nombre que prefieras)
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`
- **Environment**: `Static Site`

### 5. Variables de entorno (opcional)
Si necesitas configurar variables de entorno:
- **REACT_APP_API_URL**: URL de tu backend (si lo tienes)

### 6. Desplegar
- Haz clic en "Create Static Site"
- Render automáticamente construirá y desplegará tu aplicación

### 7. URL personalizada (opcional)
- Ve a Settings > Custom Domains
- Agrega tu dominio personalizado si lo tienes

## 🔧 Configuración adicional

### Para React Router
Si usas React Router, el archivo `public/_redirects` ya está configurado para manejar las rutas correctamente.

### Para variables de entorno
Si tu aplicación usa variables de entorno, agrégalas en la sección "Environment Variables" de Render.

## 📱 Verificar el despliegue
Una vez desplegado, tu aplicación estará disponible en:
`https://tu-app-name.onrender.com`

## 🔄 Actualizaciones automáticas
Render automáticamente desplegará nuevas versiones cuando hagas push a tu rama principal en GitHub. 