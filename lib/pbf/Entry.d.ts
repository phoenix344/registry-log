/// <reference types="@types/node" />
export interface EntrySchema {
    key: Uint8Array;
    sig: Uint8Array;
    time: number;
    name: string;
    target: string;
}
export declare const Entry: {
    decode(buf: Uint8Array | Buffer): EntrySchema;
    encode(obj: EntrySchema): Uint8Array;
};
//# sourceMappingURL=Entry.d.ts.map