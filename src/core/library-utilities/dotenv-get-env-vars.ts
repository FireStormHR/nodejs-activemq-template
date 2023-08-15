import dotenv from 'dotenv';
import { safeWhere } from '#core/object-validation/safe-where.js';
import { Spec } from '#core/types.js';
import { isNumber, isString } from '#core/type-guards/primitives-guards.js';
import { toNumber } from '../type-transformations/primitive-transforms.js';

// IMPORTANT NOTE: Modules always get cached by npm, therefor multiple imports point to the same module-instance.
// It is often not advised to exploit this behaviour as a form of state-management.
// In this case however, the result will always be the same, meaning it is not vital that the result always gets extracted from the cache.

type WFAPP_ENV = 'dev' | 'prd';

type EnvVars = {
  WFAPP_ENV: WFAPP_ENV;
  WFAPP_amqp_connection_host_default: string;
  WFAPP_amqp_connection_port_default: number;
  WFAPP_amqp_receiver_adress_default: string;
};

/**
 * All environment variables in the form of an `{ [key: string]: string }` object
 */
const maybeRawEnvVars = dotenv.config({ path: `build/.env` }).parsed;

// TODO: validate result
const rawEnvVars = maybeRawEnvVars!;

export const envVars: EnvVars = {
  WFAPP_ENV: rawEnvVars.WFAPP_ENV as any,
  WFAPP_amqp_connection_host_default: rawEnvVars.WFAPP_amqp_connection_host_default,
  WFAPP_amqp_connection_port_default: toNumber(rawEnvVars.WFAPP_amqp_connection_port_default)!,
  WFAPP_amqp_receiver_adress_default: rawEnvVars.WFAPP_amqp_receiver_adress_default,
};
