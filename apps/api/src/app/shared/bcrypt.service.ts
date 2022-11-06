import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptService {

  async hashPassword(password: string) {
    return bcrypt.hashSync(password, 12)
  }
  async matchPassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword)
  }
}
