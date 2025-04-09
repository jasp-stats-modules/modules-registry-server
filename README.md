# jasp-registry

This repository contains the JASP registry server, which serves JASP modules that are available for download.
The registry is used by the JASP application to display a list of available modules and to download them.

## Setup

Create a `.env` file with the following content:

```
GITHUB_CLIENT_SECRET=*************
GITHUB_CLIENT_ID=**************
GITHUB_CALLBACK_URL=**************
JWT_SECRET=**************
JWT_EXPIRATION=****
JWT_ISSUER=*************
COOKIE_SECRET=*************
COOKIE_EXPIRATION=****
```

## Build

### Backend

```bash
make build
make install
```

### Frontend

```bash
make frontend
```

## Run

### Using Docker

Pre-requisites:

- [Docker](https://www.docker.com/)

Use the following command:

```bash
make run-docker
```

### Without Docker

Pre-requisites:

- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Node.js v22](https://nodejs.org/)

Use the following command:

```bash
make build
make run
```
