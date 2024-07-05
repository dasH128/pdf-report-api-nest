<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



## API SERVER NEST
Es api server sera el cliente para mostrar los reportes de todo el proyecto

## Dev

1. Clonar el repositorio
2. Instalar dependencias
```bash
$ npm install
```
3. clonar `env.template` y renombrar a `env` y completar las variables
3. Levantar la base de datos:
```bash
$ docker compose up -d
```
4. Generar el Prisma client:
```bash
$ npx prisma generate
```
5. Ejecutar proyecto con:
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Jordy Rojas](https://github.com/dash128)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
