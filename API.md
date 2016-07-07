<a name="Imobis"></a>

## Imobis
Imobis api class

**Kind**: global class  

* [Imobis](#Imobis)
    * [new Imobis(config)](#new_Imobis_new)
    * [.getPath(method)](#Imobis+getPath) ⇒ <code>String</code>
    * [.getUrl(method, params)](#Imobis+getUrl) ⇒ <code>String</code>
    * [.getMessageByCode(code, type)](#Imobis+getMessageByCode) ⇒ <code>String</code>
    * [.getStatusMessage(code)](#Imobis+getStatusMessage) ⇒ <code>String</code>
    * [.send(id, phones, text, sender)](#Imobis+send) ⇒ <code>Array.&lt;Object&gt;</code> &#124; <code>Number</code> &#124; <code>Number</code> &#124; <code>Number</code> &#124; <code>String</code>
    * [.status(ids)](#Imobis+status) ⇒ <code>Array.&lt;Object&gt;</code> &#124; <code>Number</code> &#124; <code>Number</code> &#124; <code>String</code> &#124; <code>Number</code> &#124; <code>String</code>
    * [.balance()](#Imobis+balance) ⇒ <code>Object</code> &#124; <code>Number</code> &#124; <code>Number</code> &#124; <code>String</code>

<a name="new_Imobis_new"></a>

### new Imobis(config)
API Constructor


| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | API Config |
| config.user | <code>String</code> | User |
| config.password | <code>String</code> | password |
| config.sender | <code>String</code> | Sender |

<a name="Imobis+getPath"></a>

### imobis.getPath(method) ⇒ <code>String</code>
Get api path

**Kind**: instance method of <code>[Imobis](#Imobis)</code>  
**Returns**: <code>String</code> - path Method path  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>String</code> | Method file (send, status, balance) |

<a name="Imobis+getUrl"></a>

### imobis.getUrl(method, params) ⇒ <code>String</code>
Get api url

**Kind**: instance method of <code>[Imobis](#Imobis)</code>  
**Returns**: <code>String</code> - url API url  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>String</code> | Method file (send, status, balance) |
| params | <code>Object</code> | Params |

<a name="Imobis+getMessageByCode"></a>

### imobis.getMessageByCode(code, type) ⇒ <code>String</code>
Get message by error code

**Kind**: instance method of <code>[Imobis](#Imobis)</code>  
**Returns**: <code>String</code> - message Message  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>Number</code> | Code number |
| type | <code>String</code> | Message type (send, status, balance) |

<a name="Imobis+getStatusMessage"></a>

### imobis.getStatusMessage(code) ⇒ <code>String</code>
Get status message by code

**Kind**: instance method of <code>[Imobis](#Imobis)</code>  
**Returns**: <code>String</code> - message Message  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>String</code> | Server status cod3 |

<a name="Imobis+send"></a>

### imobis.send(id, phones, text, sender) ⇒ <code>Array.&lt;Object&gt;</code> &#124; <code>Number</code> &#124; <code>Number</code> &#124; <code>Number</code> &#124; <code>String</code>
Send sms

**Kind**: instance method of <code>[Imobis](#Imobis)</code>  
**Returns**: <code>Array.&lt;Object&gt;</code> - result Promise<code>Number</code> - result[].code Status code (0 - ok, < 0 - error)<code>Number</code> - result[].id Message id<code>Number</code> - result[].phone Phone number<code>String</code> - result[].message Error message text  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | Internal id |
| phones | <code>Array</code> &#124; <code>String</code> | List of phones or single phone |
| text | <code>String</code> | Text |
| sender | <code>String</code> | Sender |

<a name="Imobis+status"></a>

### imobis.status(ids) ⇒ <code>Array.&lt;Object&gt;</code> &#124; <code>Number</code> &#124; <code>Number</code> &#124; <code>String</code> &#124; <code>Number</code> &#124; <code>String</code>
Check SMS status

**Kind**: instance method of <code>[Imobis](#Imobis)</code>  
**Returns**: <code>Array.&lt;Object&gt;</code> - result Promise<code>Number</code> - result[].code Code (0 - ok, < 0 - error)<code>Number</code> - result[].id Message id<code>String</code> - return[].status Status code<code>Number</code> - result[].phone Phone number<code>String</code> - result[].message Error message text  

| Param | Type | Description |
| --- | --- | --- |
| ids | <code>Array</code> &#124; <code>Number</code> | List of sms ids or single sms id |

<a name="Imobis+balance"></a>

### imobis.balance() ⇒ <code>Object</code> &#124; <code>Number</code> &#124; <code>Number</code> &#124; <code>String</code>
Get account balance

**Kind**: instance method of <code>[Imobis](#Imobis)</code>  
**Returns**: <code>Object</code> - result Promise<code>Number</code> - result.code Code (0 - ok, < 0 - error)<code>Number</code> - result.balance Account balance<code>String</code> - result.message Error message  
