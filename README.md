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