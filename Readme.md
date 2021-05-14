<h1 align="center">
  <img alt="Logo" src="https://res.cloudinary.com/eliasgcf/image/upload/v1588625369/GoBarber/logo_iw1v9f.svg" width="200px">
</h1>

<h3 align="center">
  Express Application for GoBarber project
</h3>

<p align="center">The best way to schedule your service!</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/guribeiro/gobarber-api?color=3498db&style=for-the-badge">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/guribeiro/gobarber-api?color=3498db&style=for-the-badge">

  <a href="https://github.com/guribeiro/gobarber-api/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/guribeiro/gobarber-api?color=3498db&style=for-the-badge">
  </a>

  <a href="https://github.com/guribeiro/gobarber-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/guribeiro/gobarber-api?color=3498db&style=for-the-badge">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/guribeiro/gobarber-api?color=3498db&style=for-the-badge">
</p>

<p align="center">
  <a href="#%EF%B8%8F-about-the-project">About the project</a>&nbsp; &nbsp; &nbsp; |&nbsp; &nbsp; &nbsp;
  <a href="#-technologies">Technologies</a>&nbsp; &nbsp; &nbsp; |&nbsp; &nbsp; &nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp; &nbsp; &nbsp; |&nbsp; &nbsp; &nbsp;
  <a href="#-how-to-contribute">How to contribute</a>&nbsp; &nbsp; &nbsp; |&nbsp; &nbsp; &nbsp;
  <a href="#-license">License</a>
</p>

<p id="insomniaButton" align="center">
  <a href="https://insomnia.rest/run/?label=GoBarber%20-%20guribeiro&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fguribeiro%2Fgobarber-api%2Fmaster%2FInsomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

## 💇🏻‍♂️ About the project

This api provides everything needed to organize appointments between the barbers and customers.

Customers can choose the best time available to them.

Providers can see all their appointments, manage the times, also see if one client canceled the schedule.

<!-- To see the **web client**, click here: [GoBarber Web](https://github.com/guribeiro/gobarber-web)<br /> -->
<!-- To see the **mobile client**, click here: [GoBarber Mobile](https://github.com/guribeiro/gobarber-mobile) -->

## 🚀 Technologies

Technologies that I used to develop this api

* [Node.js](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [Express](https://expressjs.com/pt-br/)
* [Multer](https://github.com/expressjs/multer)
* [TypeORM](https://typeorm.io/#/)
* [JWT-token](https://jwt.io/)
* [uuid v4](https://github.com/thenativeweb/uuidv4/)
* [PostgreSQL](https://www.postgresql.org/)
* [Date-fns](https://date-fns.org/)
* [Jest](https://jestjs.io/)
* [Eslint](https://eslint.org/)
* [Prettier](https://prettier.io/)
* [EditorConfig](https://editorconfig.org/)

## 💻 Getting started

Import the `Insomnia.json` on Insomnia App or click on [Run in Insomnia](#insomniaButton) button

### Requirements

* [Node.js](https://nodejs.org/en/)
* [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
* An Instance of [PostgreSQL](https://www.postgresql.org/)

> Obs.: I recommend you to use docker 🐳
* [Docker](https://www.docker.com/)

## **Clone the project and access the folder**

``` bash
$ git clone https://github.com/guribeiro/gobarber-api.git && cd gobarber-api
```

### **Follow the steps below**

<div>
  <p>Install the dependencies</p>
</div>

``` bash
$ yarn
```
or
``` bash
$ yarn install
```

<div>
  <p>Make a copy of '.env.example' to '.env'</p>
  <p>and set with YOUR environment variables.</p>
  <p>The aws variables do not need to be filled for dev environment</p>
</div>

``` bash
$ cp .env.example .env
```
<div>
  <p>Create the instance of postgreSQL using docker</p>
  <p>I'm using port 5433, you can see it in the ormconfig.json file, feel free to use any port you prefer</p>
  <p>I recommend you to use the same port as i'm using, if you just don't remember to change it in the command below</p>
  <p>Remember to change the port in the ormconfig.json file if you don't want to get any errors</p>
</div>

``` bash
$ docker run --name softwrap-postgres -e POSTGRES_USER=docker \
              -e POSTGRES_DB=softwrap -e POSTGRES_PASSWORD=docker \
              -p 5433:5432 -d postgres
```
<div>
  <p>Create the instance of mongoDB using docker</p>
</div>

``` bash
$ docker run --name gobarber-mongodb -p 27017:27017 -d -t mongo
```

<div>
  <p>Create the instance of redis using docker</p>
</div>

``` bash
$ docker run --name gobarber-redis -p 6379:6379 -d -t redis:alpine
```

<div>
  <p>Once the services are running, run the migrations</p>
</div>

``` bash
$ yarn typeorm migration:run
```
<div>
  <p>To finish, run the api service</p>
</div>

``` bash
$ yarn dev:server
```
 <p>Well done, project is started!</p>

<hr/>

## 🤔 How to contribute

### **Make a fork of this repository**

<div>
  <p>Fork using GitHub official command line</p>
  <p>If you don't have the GitHub CLI, use the web site to do that.</p>
</div>

``` bash
$ gh repo fork guribeiro/gobarber-api
```

**Follow the steps below**

<div>
  <p>Clone your fork</p>
</div>

```bash
$ git clone your-fork-url && cd gobarber-api
```
<div>
  <p>Create a branch with your feature</p>
</div>

```bash
$ git checkout -b my-feature
```
<div>
  <p>Make the commit with your changes</p>
</div>

```bash
$ git commit -m 'feat: My new feature'
```
<div>
  <p>Send the code to your remote branch</p>
</div>

``` bash
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with 💜 &nbsp; by Gustavo Henrique 👋 &nbsp; [See my linkedin](https://www.linkedin.com/in/gustavohribeiro/)
