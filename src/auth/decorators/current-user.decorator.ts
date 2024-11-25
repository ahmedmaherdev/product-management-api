import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/users/user.schema";

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.user; 
    },
);