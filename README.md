# Sistema de Ressarcimento

[![License][license-badge]][license-url]
[![Material UI][mui-badge]][mui-url]
[![Node][node-badge]][node-url]
[![React][react-bagde]][react-url]
[![Redux][redux-badge]][redux-url]
[![Typescript][typescript-badge]][typescript-url]

**Main features:**
- 

## Prerequisites
- [Node 12.0.0+](https://nodejs.org/en/download/)
- [ReactJS 16.9.9+](https://pt-br.reactjs.org/)

---

## Set the environment variables
Application settings are defined by environment variables.. To define the settings, make a copy of the `.env.example` file, naming for `.env`. After that, open and edit the settings as needed. The following environments variables are available:

| VARIABLE | DESCRIPTION  | DEFAULT |
|-----|-----|-----|
| `REACT_APP_ENV` | Defines the environment in which the application runs. You can set: `test` (in this environment the logs are disabled for better visualization of the test output)_, `development` _(in this environment, all log levels are enabled)_ and `production` _(in this environment, only the warning and error logs are enabled)_. | `development` |
| `PORT_HTTP` | Port used to listen for HTTP requests. Any request received on this port is redirected to the HTTPS port. | `80` |
| `PORT_HTTPS` | Port used to listen for HTTPS requests. Do not forget to provide the private key and the SSL/TLS certificate. See the topic [generate certificates](#generate-certificates). | `443` |
| `SSL_KEY_PATH` | SSL/TLS certificate private key. | `.certs/server_key.pem` |
| `SSL_CERT_PATH` | SSL/TLS certificate. | `.certs/server_crt.pem` |
| `REACT_APP_LS_SECRET_KEY` | Encryption key used to encrypt data stored in localStorage. | `s3cr3tk3y` |
| `REACT_APP_API_GATEWAY` | URI used to connect to the API GATEWAY public API. | `https://localhost:8081` |
| `REACT_APP_WEB_APP_HOST` | Host and port used by the Web App to listen for HTTP request. | `http://localhost:80` |

## Generate Certificates
For development and testing environments the easiest and fastest way is to generate your own self-signed certificates. These certificates can be used to encrypt data as well as certificates signed by a CA, but users will receive a warning that the certificate is not trusted for their computer or browser. Therefore, self-signed certificates should only be used in non-production environments, that is, development and testing environments. To do this, run the `create-self-signed-certs.sh` script in the root of the repository.

```sh
chmod +x ./create-self-signed-certs.sh
```

```sh
./create-self-signed-certs.sh
```
The following files will be created: `server_crt.pem` and `server_key.pem`.

In production environments its highly recommended to always use valid certificates and provided by a certificate authority (CA). A good option is [Let's Encrypt](https://letsencrypt.org)  which is a CA that provides  free certificates. The service is provided by the Internet Security Research Group (ISRG). The process to obtain the certificate is extremely simple, as it is only required to provide a valid domain and prove control over it. With Let's Encrypt, you do this by using [software](https://certbot.eff.org/) that uses the ACME protocol, which typically runs on your host. If you prefer, you can use the service provided by the [SSL For Free](https://www.sslforfree.com/)  website and follow the walkthrough. The service is free because the certificates are provided by Let's Encrypt, and it makes the process of obtaining the certificates less painful.


## Installation and Execution
#### 1. Install dependencies  
```sh  
npm install    
```
 
#### 2. Build  
Build the project. The build artifacts will be stored in the `build` directory.  
```sh  
npm run build    
```

#### 3. Run Server in Development Mode
```sh  
npm start:dev
```
Build the project and initialize the application. **Useful for production/deployment.**  
```sh  
npm run build && npm start:prod
```

## Running the tests
```sh  
npm run test
```

[//]: # (These are reference links used in the body of this note.)
[license-badge]: https://shields.io/badge/-Apache2-E93824?style=plastic&logo=apache
[license-url]: https://github.com/smtc-sefaz-pb/web-app/blob/main/LICENSE
[node-badge]: https://shields.io/badge/-Node-gray?style=plastic&logo=node.js
[node-url]: https://nodejs.org
[typescript-badge]: https://shields.io/badge/-Typescript-lightblue?style=plastic&logo=typescript
[typescript-url]: https://www.typescriptlang.org/
[react-bagde]: https://shields.io/badge/-React-20232A?style=plastic&logo=react
[react-url]: https://pt-br.reactjs.org/
[redux-badge]: https://shields.io/badge/-Redux-purple?style=plastic&logo=redux
[redux-url]: https://redux.js.org/
[mui-badge]:https://shields.io/badge/-MaterialUI-blue?style=plastic&logo=material-ui
[mui-url]: https://material-ui.com/pt/
