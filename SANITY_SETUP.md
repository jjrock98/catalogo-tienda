# Configuración de Sanity CMS para URBANO Catálogo

## Información Importante

Tu aplicación está completamente integrada con **Sanity CMS**. Aquí tienes toda la información para configurarlo:

### Datos Iniciales

- **Project ID**: `hwujeebe`
- **Dataset**: `production`
- **Managed Origins**: 
  - https://catalogo-ropa-ten.vercel.app
  - https://tienda-ropa-javier.sanity.studio

## Pasos para Configurar Sanity

### 1. Acceder a Sanity Studio

Ve a tu Sanity Studio en: **https://tienda-ropa-javier.sanity.studio**

### 2. Estructura de Contenido

El proyecto incluye dos tipos de documentos principales:

#### **Categorías** (`category`)
- Nombre de la categoría (ej: Camperas, Pantalones)
- Slug (generado automáticamente)
- Descripción

#### **Productos** (`product`)
Con los siguientes campos:

**Información Básica:**
- Nombre del producto
- Slug (generado automáticamente)
- Descripción
- Categoría (referencia)

**Detalles de Venta:**
- Precio (en ARS)
- En Stock (verdadero/falso)
- Talles Disponibles (XS, S, M, L, XL, XXL)
- Colores Disponibles (con código hex)

**Especificaciones:**
- Material (Algodón, Poliéster, etc.)
- País de Origen
- Colección

**Medios:**
- Imágenes (con hotspot para recorte, altamente recomendado)

**Marketing:**
- Calificación (0-5 estrellas)
- Etiquetas
- Destacado (para mostrar en sección de destacados)
- SEO (meta descripción y palabras clave)

### 3. Crear Categorías

1. Ve a **Categorías** en tu Sanity Studio
2. Haz clic en **"Crear"**
3. Ingresa:
   - Título: "Camperas"
   - Slug: "camperas" (autogenerado)
   - Descripción: Opcional
4. Publica y repite para "Pantalones"

### 4. Crear Productos

1. Ve a **Productos** en tu Sanity Studio
2. Haz clic en **"Crear"**
3. Completa todos los campos:
   - **Nombre**: Ej: "Campera Bomber Negra"
   - **Categoría**: Selecciona una categoría creada
   - **Imágenes**: Sube al menos 1 imagen (puedes subir varias)
   - **En Stock**: Marca como verdadero/falso
   - **Precio**: Opcional, pero recomendado
   - Otros campos opcionales pero recomendados
4. Publica el producto

### 5. Configurar CORS en Supabase (si usas storage)

Ya no usamos Supabase, pero si lo necesitas en el futuro:

1. Ve a https://app.supabase.com
2. Selecciona tu proyecto
3. Settings → API
4. Agrega estos orígenes a **Allowed Origins**:
   - https://catalogo-ropa-ten.vercel.app
   - https://tienda-ropa-javier.sanity.studio

## Variables de Entorno (.env)

```
VITE_SANITY_PROJECT_ID=hwujeebe
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

## Personalización del Número de WhatsApp

En `src/App.tsx`, línea 7, reemplaza:

```typescript
const WHATSAPP_NUMBER = '5491100000000';
```

Con tu número en formato internacional:
- Argentina: `5491155551234`
- España: `34612345678`
- México: `525512345678`

## Estructura de Carpetas Sanity

```
sanity/
├── sanity.config.ts          # Configuración principal
├── schemas/
│   ├── index.ts              # Índice de schemas
│   ├── product.ts            # Schema de productos
│   └── category.ts           # Schema de categorías
└── structure/
    └── index.ts              # Estructura del Studio
```

## Uso en la Aplicación

Los productos se obtienen automáticamente de Sanity usando GROQ queries:

- **Todos los productos**: `getProducts()`
- **Por categoría**: `getProductsByCategory('camperas')`
- **Destacados**: `getFeaturedProducts()`
- **Por slug**: `getProductBySlug('campera-bomber')`

La aplicación se actualiza automáticamente cuando publicas cambios en Sanity Studio.

## Consejos

1. **Imágenes**: Siempre sube al menos 1 imagen por producto
2. **Talles**: Especifica los talles disponibles para mejor UX
3. **Colores**: Agrega los colores reales con códigos hex
4. **Destacados**: Marca algunos productos como "Destacado" para promoción
5. **SEO**: Completa los campos de meta descripción para mejor posicionamiento

## Soporte

Para documentación de Sanity:
- https://www.sanity.io/docs
- https://www.sanity.io/docs/the-studio

¡Tu catálogo está listo para usar!
