# Admin PaCubita 🚀

Panel de administración para la plataforma PaCubita - Sistema de gestión de entregas y logística construido con Next.js 15, React 19, TypeScript y GraphQL.

## 🌟 Características Principales

- **🏢 Gestión de Socios** - Administración completa de partners y sus usuarios
- **📦 Gestión de Pedidos** - Control integral del flujo de órdenes y entregas
- **🛍️ Catálogo de Artículos** - Manejo de productos, variantes y tipos de entrega
- **📍 Sistema de Ubicaciones** - Jerarquía completa: Países → Estados → Ciudades → Municipios → Barrios
- **👥 Gestión de Usuarios** - Clientes, conductores, socios y personal administrativo
- **💰 Calculadora de Precios** - Sistema dinámico de pricing y reglas
- **📊 Analytics y Reportes** - Dashboard con métricas y estadísticas
- **🔐 Autenticación Segura** - Sistema de login con tokens JWT

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15** (App Router) - Framework React de producción
- **React 19** - Biblioteca de interfaces de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS 4** - Framework de utilidades CSS
- **shadcn/ui** - Componentes UI reutilizables
- **Framer Motion** - Animaciones fluidas

### Estado y Datos
- **Apollo Client 3** - Cliente GraphQL con cache inteligente
- **GraphQL Codegen** - Generación automática de tipos TypeScript
- **Zustand** - Gestión de estado global ligera
- **React Hook Form** - Formularios performantes

### Herramientas de Desarrollo
- **Vitest** - Framework de testing ultrarrápido
- **Testing Library** - Herramientas de testing para React
- **ESLint & Prettier** - Linting y formateo de código
- **Husky** - Git hooks para calidad de código
- **Commitizen** - Commits convencionales

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js 18+
- npm/yarn/pnpm
- Backend GraphQL corriendo

### Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/diazdell91/admin-pacubita.git
cd admin-pacubita
```

2. **Instala dependencias**
```bash
npm install
```

3. **Configura variables de entorno**
```bash
cp .env.example .env.local
```
Edita `.env.local` con tu configuración:
```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

4. **Genera tipos GraphQL**
```bash
npm run codegen
```

5. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📝 Scripts Disponibles

### Desarrollo
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
```

### Calidad de Código
```bash
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Arreglar problemas de ESLint automáticamente
npm run format       # Formatear código con Prettier
npm run type-check   # Verificar tipos TypeScript
```

### Testing
```bash
npm test            # Ejecutar tests
npm run test:watch  # Tests en modo watch
```

### GraphQL
```bash
npm run codegen           # Generar tipos desde schema GraphQL
npm run codegen:watch     # Generación automática en modo watch
```

### Commits
```bash
npm run commit      # Commit interactivo con Commitizen
```

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rutas de autenticación
│   ├── dashboard/         # Panel de administración
│   │   ├── analytics/     # Métricas y reportes
│   │   ├── articles/      # Gestión de artículos
│   │   ├── locations/     # Sistema de ubicaciones
│   │   ├── orders/        # Gestión de pedidos
│   │   ├── partners/      # Administración de socios
│   │   ├── pricing/       # Sistema de precios
│   │   └── users/         # Gestión de usuarios
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
│   ├── common/           # Componentes comunes
│   ├── layout/           # Componentes de layout
│   ├── partners/         # Componentes específicos de partners
│   └── ui/               # Componentes UI base (shadcn)
├── hooks/                # Custom React hooks
├── lib/                  # Utilidades y configuraciones
│   ├── graphql/         # Cliente y tipos GraphQL
│   ├── utils.ts         # Funciones utilitarias
│   └── validations.ts   # Esquemas de validación Zod
├── stores/              # Estado global (Zustand)
└── types/               # Definiciones de tipos TypeScript
```

## 🔧 Configuraciones

### ESLint
Configuración estricta con reglas para Next.js y TypeScript:
- Detección de problemas de código
- Mejores prácticas de React
- Reglas de accesibilidad

### Prettier
- Indentación de 2 espacios
- Comillas simples
- Punto y coma siempre
- Salto de línea LF

### Tailwind CSS
- Configuración con variables CSS
- Sistema de colores personalizado
- Breakpoints responsivos
- Plugins de forms y tipografía

## 🌐 GraphQL

### Schema Principal
El proyecto utiliza un schema GraphQL completo para:
- **Pedidos**: Delivery y wrapping con tracking de estado
- **Ubicaciones**: Jerarquía geográfica completa
- **Artículos**: Productos con variantes y pricing
- **Usuarios**: Sistema multi-rol (Cliente, Conductor, Partner, Staff)
- **Pagos**: Tarjetas y balance de partners

### Code Generation
Los tipos TypeScript se generan automáticamente desde el schema:
```bash
npm run codegen  # Genera tipos, hooks y queries
```

## 🔐 Autenticación

Sistema de autenticación JWT con:
- Login seguro con email/teléfono
- Tokens de acceso y refresh
- Middleware de protección de rutas
- Manejo automático de expiración

## 🎨 Sistema de Diseño

### Componentes UI
Basado en **shadcn/ui** con:
- Componentes accesibles por defecto
- Variantes y tamaños consistentes
- Tema oscuro/claro (preparado)
- Iconos de Lucide React

### Colores
- **Primary**: Azul corporativo
- **Secondary**: Grises neutros
- **Success**: Verde para confirmaciones
- **Warning**: Amarillo para advertencias
- **Error**: Rojo para errores

## 🚀 Deployment

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

### Docker
```bash
docker build -t admin-pacubita .
docker run -p 3000:3000 admin-pacubita
```

### Build Manual
```bash
npm run build
npm start
```

## 🧪 Testing

### Estrategia de Testing
- **Unit Tests**: Componentes y utilidades
- **Integration Tests**: Flujos de usuario
- **E2E Tests**: Casos críticos de negocio

### Herramientas
- **Vitest**: Runner de tests rápido
- **Testing Library**: Testing centrado en usuario
- **MSW**: Mock Service Worker para APIs

## 📈 Estado del Proyecto

### ✅ Completado
- ✅ Configuración base del proyecto
- ✅ Sistema de autenticación
- ✅ Gestión de usuarios básica
- ✅ Sistema de partners completo
- ✅ Migración de mock data a GraphQL
- ✅ Componentes UI base
- ✅ Configuración de desarrollo

### 🔄 En Progreso
- 🔄 Integración completa con backend GraphQL
- 🔄 Sistema de permisos granular
- 🔄 Dashboard de analytics avanzado

### 📋 Próximas Funcionalidades
- 📋 Notificaciones en tiempo real
- 📋 Sistema de reportes PDF
- 📋 Modo offline
- 📋 PWA completa

## 🤝 Contribución

### Workflow
1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`npm run commit`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones
- **Commits**: Conventional Commits con Commitizen
- **Ramas**: `feature/`, `bugfix/`, `hotfix/`
- **Código**: ESLint + Prettier + TypeScript strict
- **Tests**: Cobertura mínima del 80%

## 📝 Licencia

Este proyecto es privado y confidencial. Todos los derechos reservados.

## 🔗 Enlaces Útiles

- [Next.js Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Apollo Client](https://apollographql.com/docs/react)
- [shadcn/ui](https://ui.shadcn.com)

## 👥 Equipo

- **Dayron Díaz** - Desarrollo Frontend
- **Claude AI** - Asistente de desarrollo

---

**Admin PaCubita** - Transformando la gestión de entregas en Cuba 🇨🇺
