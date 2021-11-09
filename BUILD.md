![Simplicit&eacute; Software](https://www.simplicite.io/resources/logos/logo250-grey.png)
* * *

Prepare
=======

Look for updates:

```bash
npm run ncu
```

Install dependencies:

```bash
npm install
```

Copy CommonJS module from the [Simplicit&eacute;&reg; node.js&reg; &amp; browser JavaScript API](https://github.com/simplicitesoftware/nodejs-api).

```bash
cp -f ../nodejs-api/dist/cjs/simplicite.js .
```

Check syntax and rules:

```bash
npm run lint
```

Publish
=======

Check package to be published:

```bash
npm pack
tar tvfz node-red-contrib-simplicite-x.y.z.tgz
rm node-red-contrib-simplicite-x.y.z.tgz
```

Publish to npm repository:

```bash
npm publish
```

Deprecate previous version:

```bash
npm deprecate node-red-contrib-simplicite@x.y.z-1 'Deprecated'
```

Update version on the [Node RED nodes registry](https://flows.nodered.org/node/node-red-contrib-simplicite).
