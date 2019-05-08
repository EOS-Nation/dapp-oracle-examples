# DAPP Oracle examples

**Example**

Fetch the USD value of EOS using bancor.network API endpoint.

```ts
(async () => {
    const action: Action = {
        account: "oraclenation",
        name: "testrnd",
        authorization: [
            {actor: "oraclenation", permission: "ops"}
        ],
        data: {
            uri: Buffer.from('https+json://data.USD/api.bancor.network/0.1/currencies/rate?toCurrencyCode=EOS&fromCurrencyCodes=USD', 'utf8'),
        }
    }
    await transact([action]).catch(e => console.error(e));

})().catch(e => console.error(e));
```
