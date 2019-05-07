import { JsonRpc, Api } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import * as fetch from "isomorphic-fetch";
import { TextEncoder, TextDecoder } from 'util';
import * as dotenv from "dotenv"

dotenv.config();

if (!process.env.DSP_ENDPOINT) throw new Error("[DSP_ENDPOINT] is required in .env");
if (!process.env.PRIVATE_KEY) throw new Error("[PRIVATE_KEY] is required in .env");

export const DSP_ENDPOINT: string = process.env.DSP_ENDPOINT;
export const PRIVATE_KEY: string = process.env.PRIVATE_KEY;

if (PRIVATE_KEY.includes("PRIVATE")) throw new Error("[PRIVATE_KEY] invalid key")

// EOSIO API & RPC
export const rpc = new JsonRpc(DSP_ENDPOINT, { fetch });
const signatureProvider = new JsSignatureProvider([PRIVATE_KEY]);
export const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
