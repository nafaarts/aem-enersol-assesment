import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PouchdbService } from "../database/pouchdb.service";
import hashPassword from "src/app/shared/utils/password-hash";

export interface UserDoc {
    _id: string;
    _rev?: string;
    email: string;
    passwordHash: string;
    token: string;
    lastLoginAt: number;
}

@Injectable({ providedIn: 'root' })
export class AuthRepository {
    constructor(private db: PouchdbService) { }

    async saveUser(email: string, password: string, token: string) {
        const id = `auth:${email}`;
        const passwordHash = await hashPassword(password, environment.offlineAuthSalt);

        try {
            const existing = await this.db.get(id);
            return this.db.put({
                ...existing,
                passwordHash,
                token,
                lastLoginAt: Date.now()
            });

        } catch (err: any) {
            if (err.status === 404) {
                return this.db.put({
                    _id: id,
                    email,
                    passwordHash,
                    token,
                    lastLoginAt: Date.now()
                });
            }

            throw err;
        }
    }

    async getUser(email: string) {
        return this.db.get(`auth:${email}`);
    }
}
