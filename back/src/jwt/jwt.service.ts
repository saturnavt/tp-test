import { Injectable } from '@nestjs/common';
const jwt = require('jsonwebtoken');

@Injectable()
export class JwtService {
    generateToken(username: string) {
        const tokenData = {
            username,
        };

        const token = jwt.sign(tokenData, 'secretKey', {
            expiresIn: '24h',
        });

        return token;
    }

    async validateToken(token: string) {
        const tokenVerify = await new Promise((resolve, reject) => {
            if (!token) {
                return resolve(false);
            }
            token = token.replace('Bearer ', '');
            jwt.verify(token, 'secretKey', (err) => {
                if (err) {
                    return resolve(false);
                } else {
                    return resolve(true);
                }
            });
        });
        return tokenVerify;
    }
}
