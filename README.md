# PrecioYa — Comparador de precios en tiempo real

## Instalacion local

```bash
npm install
npm run dev
```

## Deploy en Vercel (paso a paso)

### Paso 1 — Sube el proyecto a GitHub

1. Ve a github.com → New repository → ponle nombre "precioya"
2. En tu computadora abre la terminal dentro de la carpeta precioya:

```bash
git init
git add .
git commit -m "primer commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/precioya.git
git push -u origin main
```

### Paso 2 — Conecta con Vercel

1. Ve a vercel.com e inicia sesion con GitHub
2. Clic en "Add New Project"
3. Selecciona el repositorio "precioya"
4. En "Framework Preset" selecciona "Vite"
5. Antes de hacer deploy, ve a "Environment Variables" y agrega:

```
SERPAPI_KEY = 77a78233a99219347758ddb466fca33a012977d56a57bfa36cc0fe3a6249409b
```

6. Clic en "Deploy"
7. En 2 minutos tienes tu URL: precioya.vercel.app

## APIs utilizadas

- SerpApi — Google Shopping (busqueda de precios)
- ipapi.co — Deteccion de pais por IP (gratis, sin key)
- open.er-api.com — Tipos de cambio (gratis, sin key)
- restcountries.com — Datos de paises (gratis, sin key)
