import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();
        let message = exception.message || 'Internal Server Error';
        let status = 500;
        if (exception instanceof HttpException) {
            status = exception.getStatus();
        }
        console.log('error', exception);
        response
            .status(status)
            .json({
                statusCode: status,
                message,
                timestamp: new Date().toISOString(),
                path: request.url
            });
    }
    
}