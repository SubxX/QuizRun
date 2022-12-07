import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { OrganizationService } from "../modules/organization/organization.service";

@Injectable()
export class OrganizationGuard implements CanActivate {

    constructor(
        private orgService: OrganizationService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const orgId = request.params.id
        const userId = request?.user?._id

        const orgData = await this.orgService.findById(orgId)
        if (!orgData) throw new HttpException({ error: 'Organization not found' }, HttpStatus.NOT_FOUND)

        return orgData?.created_by === userId
    }
}