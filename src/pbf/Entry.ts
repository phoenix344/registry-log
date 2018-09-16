import Pbf from "pbf";

export interface EntrySchema {
    key: Uint8Array;
    sig: Uint8Array;
    created: number;
    updated: number;
    removed: boolean;
    name: string;
    target: string;
}

export const Entry = {
    decode(buf: Buffer | Uint8Array): EntrySchema {
        const pbf = new Pbf(buf);
        return pbf.readFields<EntrySchema>((tag: number, obj?: EntrySchema, pbf?: Pbf) => {
            if (tag === 1 && obj && pbf) { obj.key = pbf.readBytes(); }
            else if (tag === 2 && obj && pbf) { obj.sig = pbf.readBytes(); }
            else if (tag === 3 && obj && pbf) { obj.created = pbf.readVarint(); }
            else if (tag === 4 && obj && pbf) { obj.updated = pbf.readVarint(); }
            else if (tag === 5 && obj && pbf) { obj.removed = pbf.readBoolean(); }
            else if (tag === 6 && obj && pbf) { obj.name = pbf.readString(); }
            else if (tag === 6 && obj && pbf) { obj.target = pbf.readString(); }
        }, { key: new Uint8Array(0), sig: new Uint8Array(0), created: 0, updated: 0, removed: false, name: "", target: "" });
    },

    encode(obj: EntrySchema): Uint8Array {
        const pbf = new Pbf();
        if (obj.key) { pbf.writeBytesField(1, obj.key); }
        if (obj.sig) { pbf.writeBytesField(2, obj.sig); }
        if (obj.created) { pbf.writeVarintField(3, obj.created); }
        if (obj.updated) { pbf.writeVarintField(4, obj.updated); }
        if (obj.removed) { pbf.writeBooleanField(5, obj.removed); }
        if (obj.name) { pbf.writeStringField(6, obj.name); }
        if (obj.target) { pbf.writeStringField(6, obj.target); }
        const buffer = pbf.finish();
        return Buffer.from(buffer);
    }
};