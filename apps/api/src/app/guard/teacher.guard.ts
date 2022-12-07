import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "../modules/user/user.service";
import { GUARD_TYPE } from "../decorator/guard-type.decorator";
import { QuizService } from "../modules/quiz/quiz.service";
import { OrganizationService } from "../modules/organization/organization.service";

@Injectable()
export class TeacherGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private reflector: Reflector,
        private quizService: QuizService,
        private orgService: OrganizationService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const guards = this.reflector.get<GUARD_TYPE[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest()

        const userId = request?.user?._id
        const orgId = request.params.orgId

        const [user, organization] = await Promise.all([this.userService.findById(userId), this.orgService.findById(orgId)])

        if (!user) throw new HttpException({ error: 'Unauthorize' }, HttpStatus.UNAUTHORIZED)
        if (!organization) throw new HttpException({ error: 'Organization not found' }, HttpStatus.NOT_FOUND)

        // const user  = this.userService.findById(userId)
        // const organization = await this.orgService.findById(orgId)


        if (guards.includes('TEACHER')) {
            const status = organization.teachers.includes(userId) || (user.my_organization === organization.id)
            if (!status) return false
        }

        if (guards.includes('QUIZ_OWNER')) {
            const quizData = await this.quizService.findById(request.params.quizId).populate('organization')
            if (!quizData) throw new HttpException({ error: 'No quiz found' }, HttpStatus.NOT_FOUND)
            const isOrganizationOwner = quizData.organization.created_by === userId
            const status = quizData.created_by === userId || isOrganizationOwner
            if (!status) return false
        }

        return true
    }

}