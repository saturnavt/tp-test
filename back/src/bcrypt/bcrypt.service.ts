import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
    async generateSalt(password: string): Promise<string> {
        const saltOrRounds = 10;
        const passwordHash = password;
        const hash = await bcrypt.hash(passwordHash, saltOrRounds);
        return hash;
    }

    async compareHash(password, hash): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
}
