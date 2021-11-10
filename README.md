# TP-TEST

TP-TEST una red social.

## Instalación

Utilice el administrador de paquetes [npm] (https://www.npmjs.com/) para instalar las dependencias.

## Primero las dependencias del back
Ingresamos a la carpeta /back y ejecutamos los siguientes comando
```prisma
# Esto instala las dependencias
npm install

# Esto genera el schema de prisma
npx prisma migrate dev --schema src/prisma/schema.prisma
npx prisma generate --schema src/prisma/schema.prisma

# Y por ultimo corremos el back
npm run start:dev
```

## Segundo las dependencias del front
Ingresamos a la carpeta /front/tp y ejecutamos los siguientes comando
```prisma
# Esto instala las dependencias
npm install

# Y por ultimo corremos el front
npm run dev
```

## Contribuyendo

Las solicitudes de extracción son bienvenidas. Para cambios importantes, abra un problema primero para discutir qué le gustaría cambiar.

Asegúrese de actualizar las pruebas según corresponda.

## License
[MIT](https://choosealicense.com/licenses/mit/)