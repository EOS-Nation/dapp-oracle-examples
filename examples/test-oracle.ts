import { transact } from "../src/utils";
import { Action } from "../src/interfaces";

(async () => {
    const action: Action = {
        account: "oraclenation",
        name: "testrnd",
        authorization: [
            {actor: "oraclenation", permission: "ops"}
        ],
        data: {
            uri: Buffer.from('https://api.bancor.network/0.1/currencies/rate?toCurrencyCode=BNT&fromCurrencyCodes=USD', 'utf8'),
        }
    }
    await transact([action]).catch(e => console.error(e));

})().catch(e => console.error(e));
