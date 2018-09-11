# \<smooth-opentok\>

Opentok&#39;s API wrapped as a Polymer element for sane humans.

## Install prerequisites

```bash
$ npm install & npm install -g polymer-cli
```

## Trust the local SSL certificate

You can find the certificate in `/local-https`. You need this because opentok.js
(esp. screen-sharing) only work properly on `https://` schemes. You can find
a guide on how to trust self-signed certificates for MacOS [here][trust-self-signed-ssl-macos].

## Load the unpacked screen-sharing extensions

You can find extensions for each browser in the `/extensions` directory. For
now it's just Chrome, since the latest versions of Firefox support
screen-sharing without extensions.

## Start a credentials server

There's a [NodeJS][node-js] credentials server which serves OpenTok credentials
using the [OpenTok Server SDK's][opentok-server-sdks].

You can start it with:

```bash
# You need a TokBox account in order to retrieve an actual API key and secret.
$ npm run credentials-server -- --opentok-api-key="your-api-key" --opentok-api-secret="your-api-token"
```

**Important:** When running the tests, this server is automatically started so
make sure you shut down any running instances of it before running the tests.

## Run the element

```bash
$ polymer serve -P https/1.1 --key local-https/server.key --cert local-https/server.crt --hostname localhost --port 3000
```

and visit: https://localhost:3000/components/smooth-opentok.


**Important:** You will be asked to visit https://127.0.0.1:3000/components/smooth-opentok.
Ignore this and visit https://localhost:3000/components/smooth-opentok instead,
since the SSL certificates are specifically made for `localhost`.

## Running Tests

Ensure any running credentials server instances are shut down, then:

```
$ npm install -g mocha
$ npm test -- --opentok-api-key="your-api-key" --opentok-api-secret="your-api-token"
```

## Authors

- Nicholas Kyriakides, [@nicholaswmin][nicholaswmin]
- [TheProfs][the-profs] (Owners)

[trust-self-signed-ssl-macos]: https://tosbourn.com/getting-os-x-to-trust-self-signed-ssl-certificates/
[opentok-server-sdks]: https://tokbox.com/developer/sdks/server/
[nicholaswmin]: https://github.com/nicholaswmin
[the-profs]: https://github.com/TheProfs
[node-js]: https://nodejs.org/en/
