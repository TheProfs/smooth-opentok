# \<smooth-opentok\>

Opentok&#39;s API wrapped as a Polymer element for sane humans.

## Install the Polymer-CLI

First, make sure you have the
[Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed.

## Trust the local SSL certificate

You can find the certificate in `/local-https`. You need this because opentok.js
(esp. screen-sharing) only work properly on `https://` schemes. You can find
a guide on how to trust self-signed certificates for MacOS [here][trust-self-signed-ssl-macos].

## Load the unpacked screen-sharing extensions

You can find extensions for each browser in the `/extensions` directory. For
now it's just Chrome, since the latest versions of Firefox support
screen-sharing without extensions.

## Start a credentials server

You need to setup a server that returns OpenTok/Tokbox credentials, using one
of the [OpenTok Server SDK's][opentok-server-sdks].

The element `/demo` page is configured to fetch credentials by sending a `POST`
request to https://localhost:5003/api/v1/rtc-session/[session-name], where
`[session-name]` should be replaced with the name of the session you wish to
connect to.

This URL is configurable by setting the `getRtcTokenUrl` attribute/property on
the element, for example:

```html
<smooth-opentok
  get-rtc-token-url="https://my-server.com/rtc-session/foo-session">
</smooth-opentok>
```

## Run the element.

```bash
$ polymer serve -P https/1.1 --key local-https/server.key --cert local-https/server.crt --hostname localhost --port 3000
```

and visit: https://localhost:3000/components/smooth-opentok.


**Important:** You will be asked to visit https://127.0.0.1:3000/components/smooth-opentok.
Ignore this and visit https://localhost:3000/components/smooth-opentok instead,
since the SSL certificates are specifically made for `localhost`.

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester).
Run `polymer test` to run your application's test suite locally.

[trust-self-signed-ssl-macos]: https://tosbourn.com/getting-os-x-to-trust-self-signed-ssl-certificates/
[opentok-server-sdks]: https://tokbox.com/developer/sdks/server/
