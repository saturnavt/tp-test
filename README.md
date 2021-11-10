# TP-TEST

TP-TEST una red social.

## Instalación

Descarga nodejs [nodejs] (https://nodejs.org/es/).

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

# Si da algun error de react app intentar instalar el siguiente paquete y volver a correr la app
npm install create-react-app
```

## La base de datos que se usa es sqlite


Si quieres ver la base de datos te recomiendo descargar la siquiete app
(https://sqlitestudio.pl/)

Al descargar la app y ejecutarla podras darle en cargar archivo y podrias encontrar el archivo de sqlite dentro de la carpeta /back/src/prisma
el archivo se llama dev.db



## Contribuyendo

Las solicitudes de extracción son bienvenidas. Para cambios importantes, abra un problema primero para discutir qué le gustaría cambiar.

Asegúrese de actualizar las pruebas según corresponda.

## License
[MIT](https://choosealicense.com/licenses/mit/)