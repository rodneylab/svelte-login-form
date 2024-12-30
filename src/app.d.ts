import { PrismaClient } from '@prisma/client';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	let __db: PrismaClient | undefined;

	namespace App {
		// interface Error {}
		interface Locals {
			db: PrismaClient;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
