import { SetMetadata } from '@nestjs/common';


export type GUARD_TYPE = 'TEACHER' | 'QUIZ_OWNER'

export const GuardType = (...roles: GUARD_TYPE[]) => SetMetadata('roles', roles);