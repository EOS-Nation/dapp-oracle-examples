import { transact } from "../src/utils";
import { Action } from "../src/interfaces";

(async () => {
    // Optional paramaters
    const from = "EOS";
    const to = "USD";

    // DSP URI request
    const endpoint = `api.bancor.network/0.1/currencies/rate?toCurrencyCode=${from}&fromCurrencyCodes=${to}`;
    const uri = `https+json://data.${to}/${endpoint}`

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