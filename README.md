[![npm version](https://badge.fury.io/js/imobis.svg)](https://badge.fury.io/js/imobis)
[![Dependency Status](https://david-dm.org/mike1pol/imobis.svg)](https://david-dm.org/mike1pol/imobis)
# Imobis sms package for http://imobis.ru

### Dependencies
* axios
* bluebird

### Dev dependencies
* jsdoc-to-markdown
* pre-commit

# Installation
`$ npm i imobis`

# Usage
```
const config = {
    user: 'user',
    password: 'password',
    sender: 'sender'
};
const Imobis = require('imobis');
const imobis = new Imobis(config);
imobis.send(id, [phone, phone], 'message')
    .then(sms => {
        console.log('SMS');
        console.log(sms);
        return imobis.status(sms.map(v => v.id));
    })
    .then(status => {
        console.log('Status');
        console.log(status);
        return imobis.balance();
    })
    .then(d => console.log('Balance:', d))
    .catch(err => console.error(err));
```

# (API)[https://github.com/mike1pol/ipgeobase/blob/master/API.md]


# License

The MIT License (MIT)

Copyright (c) 2016 Mikhail Poluboyarinov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
