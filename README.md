# 🎨 Modelado 3D - Visualizador Interactivo

Un proyecto de visualización interactiva de modelos 3D construido con **Next.js 15**, **React Three Fiber**, y **Three.js**. Este proyecto permite cargar y manipular modelos 3D en formato GLB con animaciones, controles interactivos y una interfaz GUI para experimentar con diferentes estados y expresiones.

## 🌟 Características

- ✨ **Renderizado 3D en tiempo real** utilizando WebGL
- 🤖 **Múltiples modelos 3D**: Robot expresivo, Mecha cibernético, y modelo de "Like"
- 🎭 **Animaciones suaves** con transiciones entre estados
- 🎮 **Controles de cámara orbital** (rotar, zoom, pan)
- 🎚️ **GUI interactiva** para controlar animaciones y expresiones faciales (morph targets)
- 📱 **Diseño responsivo** que se adapta a diferentes tamaños de pantalla
- ⚡ **Rendimiento optimizado** con Next.js 15 y Turbopack

## 🚀 Tecnologías Utilizadas

### Core

- **[Next.js 15.5.6](https://nextjs.org)** - Framework de React para aplicaciones web
- **[React 19.1.0](https://react.dev)** - Biblioteca de interfaz de usuario
- **[TypeScript 5](https://www.typescriptlang.org)** - Tipado estático para JavaScript

### 3D & Gráficos

- **[Three.js 0.180.0](https://threejs.org)** - Biblioteca JavaScript para gráficos 3D
- **[@react-three/fiber 9.4.0](https://docs.pmnd.rs/react-three-fiber)** - Renderizador React para Three.js
- **[@react-three/drei 10.7.6](https://github.com/pmndrs/drei)** - Utilidades y helpers para React Three Fiber
- **[lil-gui 0.21.0](https://lil-gui.georgealways.com)** - Interfaz gráfica para controles interactivos

### Estilos

- **[Tailwind CSS 4](https://tailwindcss.com)** - Framework de CSS utility-first

### Desarrollo

- **[ESLint 9](https://eslint.org)** - Linter para código JavaScript/TypeScript
- **Turbopack** - Bundler de alta velocidad de Next.js

## 📁 Estructura del Proyecto

```
modelado-3d/
├── public/                      # Archivos estáticos
│   ├── RobotExpressive.glb     # Modelo 3D del robot expresivo
│   ├── cyber_mecha.glb         # Modelo 3D del mecha cibernético
│   └── like.glb                # Modelo 3D del icono "like"
├── src/
│   ├── app/                    # Rutas de la aplicación (App Router)
│   │   ├── page.tsx           # Página principal
│   │   ├── layout.tsx         # Layout raíz
│   │   └── globals.css        # Estilos globales
│   └── components/            # Componentes 3D reutilizables
│       ├── robot.tsx          # Componente del robot con animaciones
│       ├── mecha.tsx          # Componente del mecha cibernético
│       └── like.tsx           # Componente del modelo "like"
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 🎯 Componentes Principales

### 1. **Robot Expresivo** (`robot.tsx`)

Renderiza un robot 3D totalmente animado con:

- **Estados**: Idle, Walking, Running, Dance, Death, Sitting, Standing
- **Emociones**: Jump, Yes, No, Wave, Punch, ThumbsUp
- **Expresiones faciales**: Controles de morph targets para expresiones
- **GUI completa**: Panel de control para cambiar estados y emociones en tiempo real

### 2. **Mecha Cibernético** (`mecha.tsx`)

Modelo de un mecha futurista con:

- Soporte para animaciones incluidas en el modelo GLB
- Control de expresiones mediante morph targets
- Iluminación personalizada con efectos cibernéticos
- Escala y posicionamiento optimizado

### 3. **Modelo Like** (`like.tsx`)

Visualizador simple de un modelo 3D de "like" con:

- Controles de cámara orbital
- Iluminación dual con efectos de color
- Configuración minimalista para carga rápida

## 🛠️ Instalación

### Requisitos Previos

- **Node.js** 20.x o superior
- **npm**, **yarn**, **pnpm** o **bun**

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd modelado-3d
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Ejecutar el servidor de desarrollo**

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. **Abrir en el navegador**
   Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📝 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo con Turbopack
npm run build    # Construye la aplicación para producción
npm run start    # Inicia el servidor de producción
npm run lint     # Ejecuta el linter ESLint
```

## 🎨 Uso

### Cambiar el Modelo Mostrado

En `src/app/page.tsx`, puedes cambiar qué componente se renderiza:

```typescript
export default function Home() {
  return (
    <main style={{ width: "100vw", height: "100vh", background: "#cfe8fa" }}>
      {/* Elige uno de los siguientes componentes */}
      <LikeViewer /> {/* Modelo Like */}
      {/* <CuberMechaScene /> */} {/* Mecha Cibernético */}
      {/* <ThreeJSCharacter /> */} {/* Robot Expresivo */}
    </main>
  );
}
```

### Añadir Nuevos Modelos 3D

1. **Coloca tu archivo `.glb` en la carpeta `public/`**

```bash
public/mi-modelo.glb
```

2. **Crea un nuevo componente en `src/components/`**

```typescript
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function MiModelo() {
  const { scene } = useGLTF("/mi-modelo.glb");
  return <primitive object={scene} scale={1.0} />;
}

export default function MiVisualizador() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <MiModelo />
      <OrbitControls />
    </Canvas>
  );
}
```

3. **Importa y usa el componente en `page.tsx`**

## 🎮 Controles Interactivos

### Controles de Cámara (OrbitControls)

- **Click izquierdo + arrastrar**: Rotar la cámara
- **Click derecho + arrastrar**: Desplazar (pan)
- **Rueda del mouse**: Zoom in/out
- **Touch (móvil)**: Soporte táctil completo

### GUI del Robot Expresivo

- **Panel "States"**: Cambia entre diferentes estados de animación
- **Panel "Emotes"**: Ejecuta animaciones de emociones
- **Panel "Expressions"**: Ajusta expresiones faciales con sliders

## 🌈 Personalización

### Cambiar Colores de Fondo

En `page.tsx`:

```typescript
<main style={{ width: '100vw', height: '100vh', background: '#tu-color' }}>
```

### Ajustar Iluminación

Modifica los componentes de luz en cada visualizador:

```typescript
<ambientLight intensity={0.5} color="#ffffff" />
<directionalLight position={[5, 5, 5]} intensity={2} color="#ff80bf" />
```

### Modificar Escala del Modelo

```typescript
<primitive object={scene} scale={2.0} /> // Duplica el tamaño
```

## 🚀 Despliegue

### Vercel (Recomendado)

La forma más fácil de desplegar esta aplicación es usando [Vercel](https://vercel.com):

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente Next.js
3. El despliegue se realizará automáticamente

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js)

### Otras Plataformas

- **Netlify**: Requiere configurar el comando de build a `npm run build`
- **Railway**: Compatible con Next.js out-of-the-box
- **Docker**: Puedes crear un Dockerfile para containerización

## 📚 Recursos de Aprendizaje

### Next.js

- [Documentación de Next.js](https://nextjs.org/docs)
- [Tutorial Interactivo](https://nextjs.org/learn)

### Three.js & React Three Fiber

- [Documentación de Three.js](https://threejs.org/docs/)
- [Documentación de React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Ejemplos de drei](https://github.com/pmndrs/drei#readme)

### Modelos 3D

- [Sketchfab](https://sketchfab.com) - Repositorio de modelos 3D gratuitos
- [Poly Haven](https://polyhaven.com) - Assets 3D de código abierto
- [Blender](https://www.blender.org) - Software gratuito para crear modelos 3D

## 🐛 Solución de Problemas

### El modelo no se carga

- Verifica que el archivo `.glb` esté en la carpeta `public/`
- Asegúrate de que la ruta en `useGLTF()` sea correcta (comienza con `/`)
- Revisa la consola del navegador para errores

### Rendimiento lento

- Reduce la complejidad del modelo 3D
- Optimiza las texturas y polígonos
- Ajusta el `pixelRatio` del renderizador

### Errores de TypeScript

- Ejecuta `npm install` para asegurar que todas las dependencias estén instaladas
- Verifica que `@types/react` y `@types/node` estén actualizados

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Proyecto desarrollado como demostración de capacidades de visualización 3D con React y Three.js.

## 🙏 Agradecimientos

- [Three.js](https://threejs.org) - Por la increíble biblioteca de gráficos 3D
- [Pmndrs](https://github.com/pmndrs) - Por React Three Fiber y drei
- [Next.js Team](https://nextjs.org) - Por el excelente framework
- Comunidad de desarrolladores 3D por los modelos de ejemplo

---

⭐ Si este proyecto te resulta útil, ¡considera darle una estrella en GitHub!
