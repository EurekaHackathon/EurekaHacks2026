import crypto from "crypto";

export function encryptAES(secretKey: string, data: string): string {
    if (!secretKey) throw new Error("Missing encryption key");

    const keyBuffer = Buffer.from(secretKey, "base64").subarray(0, 16);
    const iv = crypto.randomBytes(8);
    const cipher = crypto.createCipheriv("aes-128-gcm", keyBuffer, iv);
    const encrypted = Buffer.concat([cipher.update(data, "utf-8"), cipher.final()]);
    const authTag = cipher.getAuthTag().subarray(0, 8);
    return Buffer.concat([iv, encrypted, authTag]).toString("base64");
}


export function decryptAES(secretKey: string, encryptedData: string): string {
    if (!secretKey) throw new Error("Missing encryption key");

    const keyBuffer = Buffer.from(secretKey, "base64").subarray(0, 16);
    const encryptedBuffer = Buffer.from(encryptedData, "base64");
    const iv = encryptedBuffer.subarray(0, 8);
    const authTag = encryptedBuffer.subarray(encryptedBuffer.length - 8);
    const encrypted = encryptedBuffer.subarray(8, encryptedBuffer.length - 8);
    const decipher = crypto.createDecipheriv("aes-128-gcm", keyBuffer, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString("utf-8");
}
