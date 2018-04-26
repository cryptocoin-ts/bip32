declare module "bs58" {
    export function encode(data: Buffer): string;
    export function decode(data: string): Buffer;
}

declare module "bs58check" {
    export function encode(data: Buffer | string): string;
    export function decode(data: string): Buffer;
}
