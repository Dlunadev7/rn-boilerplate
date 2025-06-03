# 🚀 Expo React Native Boilerplate

Este es un **boilerplate base** para proyectos en **React Native usando Expo**. Incluye una configuración inicial sólida para desarrollo profesional con:

- ⚡️ TypeScript  
- 🎨 Tailwind CSS (via `nativewind`)  
- 🧼 ESLint y Prettier  
- 🧪 Husky y Commitlint (para convenciones de commits)  
- 📦 Modularización inicial (`components`, `helpers`, `constants`)  
- 💚 Soporte para Gluestack UI (opcional)  

---

## 📁 Estructura del proyecto

```bash
boilerplate/  
├── .expo/                     # Configuración de Expo (generada automáticamente)
├── .husky/                    # Hooks de Git para asegurar buenas prácticas
├── assets/                    # Imágenes, fuentes, etc.
├── node_modules/              # Dependencias instaladas
├── src/  
│   ├── app/                   # Pantallas principales o navegación
│   ├── components/            # Componentes reutilizables
│   ├── constants/             # Constantes globales
│   └── helpers/               # Funciones utilitarias
├── .eslintrc.js               # Configuración de ESLint
├── .gitignore                 # Archivos y carpetas ignoradas por Git
├── .npmrc                     # Configuración de NPM
├── .prettierrc / .prettierignore  # Configuración de Prettier
├── app.json                   # Configuración principal de Expo
├── babel.config.js            # Configuración de Babel
├── commitlint.config.js       # Reglas para commits válidos
├── expo-env.d.ts              # Tipado global para Expo
├── gluestack-ui.config.json   # Configuración de Gluestack UI (opcional)
├── metro.config.js            # Configuración de Metro bundler
├── nativewind-env.d.ts        # Tipado de Nativewind
├── package.json               # Dependencias y scripts
├── tailwind.config.js         # Configuración de Tailwind para Nativewind
├── tsconfig.json              # Configuración de TypeScript
└── README.md                  # Este archivo 😄
```

---

## 🧪 Commits convencionales con Commitlint

Este proyecto sigue las reglas de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), validadas automáticamente con `commitlint` y `husky`.

### ✍️ Tipos de commits soportados

| Tipo        | Descripción                                                                 |
|-------------|-----------------------------------------------------------------------------|
| `feat`      | Nueva funcionalidad                                                         |
| `fix`       | Corrección de errores                                                       |
| `docs`      | Cambios en la documentación                                                 |
| `style`     | Cambios que no afectan la lógica (formato, espacios, punto y coma, etc.)   |
| `refactor`  | Cambios en el código que no agregan funcionalidades ni corrigen errores     |
| `perf`      | Mejoras de rendimiento                                                      |
| `test`      | Añadir o modificar pruebas                                                  |
| `build`     | Cambios relacionados con la compilación o dependencias externas             |
| `ci`        | Cambios en archivos de configuración de CI (GitHub Actions, CircleCI, etc.) |
| `chore`     | Tareas menores, mantenimiento o configuración general                       |
| `revert`    | Reversión de un commit anterior                                             |
| `init`      | Inicialización del proyecto o estructura base                               |
| `wip`       | Trabajo en progreso, no finalizado                                          |
| `temp`      | Cambio temporal que será reemplazado                                        |
| `merge`     | Commits de combinación de ramas                                             |

### ✅ Ejemplos válidos

```bash
# Funcionalidad
git commit -m "feat: agregar pantalla de registro"
git commit -m "feat: permitir selección de idioma"

# Corrección de bugs
git commit -m "fix: evitar crash al iniciar sesión sin conexión"
git commit -m "fix: resolver problema con animación en iOS"

# Documentación
git commit -m "docs: añadir ejemplos en el README"
git commit -m "docs: corregir error ortográfico en CONTRIBUTING.md"

# Estilos (sin afectar lógica del código)
git commit -m "style: reordenar imports"
git commit -m "style: aplicar formato con Prettier"

# Refactorización
git commit -m "refactor: simplificar lógica de validación"
git commit -m "refactor: separar componente Header en archivos"

# Rendimiento
git commit -m "perf: reducir renderizaciones innecesarias"
git commit -m "perf: optimizar carga de imágenes"

# Tests
git commit -m "test: añadir pruebas para useAuth"
git commit -m "test: mockear respuestas de la API"

# Build / Dependencias
git commit -m "build: actualizar versión de expo"
git commit -m "build: remover dependencia no usada"

# CI/CD
git commit -m "ci: agregar workflow para deploy automático"
git commit -m "ci: actualizar versión de Node en GitHub Actions"

# Chores / mantenimiento
git commit -m "chore: limpiar carpetas temporales"
git commit -m "chore: mover funciones comunes a helpers"

# Revertir cambios
git commit -m "revert: revertir cambio en useTheme"

# Inicialización
git commit -m "init: estructura base del proyecto"

# WIP / temporal
git commit -m "wip: implementación inicial del mapa"
git commit -m "temp: solución temporal al scroll en Android"

# Merge
git commit -m "merge: combinar rama 'feature/mapa' con 'main'"
```

---

## ⚙️ Instalación

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
npm install
```