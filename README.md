# DAPP Oracle examples

### Examples

Fetch the USD value of EOS using bancor.network API endpoint.

**Javascript**

```ts
(async () => {
    // Optional paramaters
    const toCurrencyCode = "EOS";
    const fromCurrencyCodes = "USD";

    // DSP URI request
    const endpoint = `api.bancor.network/0.1/currencies/rate?toCurrencyCode=${toCurrencyCode}&fromCurrencyCodes=${fromCurrencyCodes}`;
    const uri = `https+json://data.${fromCurrencyCodes}/${endpoint}`

    // EOSIO action
    const action: Action = {
        account: "oraclenation", // [oracle-dapp-service/oracleconsumer] smart contract
        name: "testrnd", // test oracle action
        authorization: [
            {actor: "oraclenation", permission: "ops"}
        ],
        data: {
            // uri is converted into bytes (Buffer)
            uri: Buffer.from(uri, 'utf8'),
        }
    }
    // Push transaction
    await transact([action]).catch(e => console.error(e));

})().catch(e => console.error(e));
```

**ConsumerOracle.cpp**

```cpp
#include "../dappservices/oracle.hpp"

#define DAPPSERVICES_ACTIONS() \
  XSIGNAL_DAPPSERVICE_ACTION \
  ORACLE_DAPPSERVICE_ACTIONS
#define DAPPSERVICE_ACTIONS_COMMANDS() \
  ORACLE_SVC_COMMANDS()

#define CONTRACT_NAME() oracleconsumer

CONTRACT_START()
 [[eosio::action]] void testget(std::vector<char>  uri, std::vector<char> expectedfield) {
    eosio::check(getURI(uri, [&]( auto& results ) {
      return results[0].result;
    }) == expectedfield, "wrong data");
  }

  [[eosio::action]] void testrnd(std::vector<char> uri) {
    getURI(uri, [&]( auto& results ) {
      return results[0].result;
    });
  }
CONTRACT_END((testget)(testrnd))
```

**JSON Response**

```json
{
   "current_provider": "eosnationdsp",
   "data": "342e383437313933323332363536353139373630383938313832313631303839383738333135393730323039333637353632",
   "package": "oracle1",
   "size": 50,
   "uri": "4935383d3a2f2f2d313537343538393337393a2f2f68747470732b6a736f6e3a2f2f646174612e5553442f6170692e62616e636f722e6e6574776f726b2f302e312f63757272656e636965732f726174653f746f43757272656e6379436f64653d454f532666726f6d43757272656e6379436f6465733d555344"
}
```

**Parse JSON**

```ts
> Buffer.from("342e383437313933323332363536353139373630383938313832313631303839383738333135393730323039333637353632","hex").toString()
'4.847193232656519760898182161089878315970209367562'
```