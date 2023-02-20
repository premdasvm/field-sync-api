import { registerAs } from "@nestjs/config";
import * as Joi from "joi";

export const app = registerAs("app", () => ({
	port: process.env.APP_PORT,
	prefix: process.env.APP_PREFIX,
	name: process.env.APP_NAME,
	allowedHosts: process.env.ALLOWED_HOSTS,
	swaggerUser: process.env.SWAGGER_USER,
	swaggerPass: process.env.SWAGGER_PASSWORD,
}));

export const appConfigValidationSchema = {
	NODE_ENV: Joi.string().valid("dev", "prod", "stage", "test").required(),
	APP_PORT: Joi.number().required(),
	APP_PREFIX: Joi.string().required(),
	APP_NAME: Joi.string().required(),
	ALLOWED_HOSTS: Joi.string().required(),
	SWAGGER_USER: Joi.string().required(),
	SWAGGER_PASSWORD: Joi.string().required(),
};
