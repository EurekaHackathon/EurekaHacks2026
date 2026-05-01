// Minimal Web NFC API type declarations.
// Spec: https://w3c.github.io/web-nfc/

interface NDEFRecordInit {
    recordType: string;
    mediaType?: string;
    id?: string;
    encoding?: string;
    lang?: string;
    data?: string | BufferSource | NDEFMessageInit;
}

interface NDEFMessageInit {
    records: NDEFRecordInit[];
}

interface NDEFRecord {
    readonly recordType: string;
    readonly mediaType?: string;
    readonly id?: string;
    readonly encoding?: string;
    readonly lang?: string;
    readonly data?: DataView;
}

interface NDEFMessage {
    readonly records: ReadonlyArray<NDEFRecord>;
}

interface NDEFReadingEvent extends Event {
    readonly serialNumber: string;
    readonly message: NDEFMessage;
}

interface NDEFWriteOptions {
    overwrite?: boolean;
    signal?: AbortSignal;
}

interface NDEFScanOptions {
    signal?: AbortSignal;
}

interface NDEFReader extends EventTarget {
    onreading: ((this: NDEFReader, ev: NDEFReadingEvent) => void) | null;
    onreadingerror: ((this: NDEFReader, ev: Event) => void) | null;
    scan(options?: NDEFScanOptions): Promise<void>;
    write(message: string | BufferSource | NDEFMessageInit, options?: NDEFWriteOptions): Promise<void>;
}

interface NDEFReaderConstructor {
    new(): NDEFReader;
    prototype: NDEFReader;
}

declare const NDEFReader: NDEFReaderConstructor;

interface Window {
    NDEFReader?: NDEFReaderConstructor;
}
