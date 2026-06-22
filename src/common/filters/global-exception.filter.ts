import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : { message: 'Something went wrong. Please try again later.' };

        let message = 'An error occurred';
        let errors: string[] | undefined;

        if (typeof exceptionResponse === 'string') {
            message = exceptionResponse;
        } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
            const resObj = exceptionResponse as any;

        // if (Array.isArray(resObj.message)) {
        //     errors = resObj.message;
        //     message = resObj.message || 'Validation failed';
        // } else {
        //     message = resObj.message || 'An error occurred';
        // }
        if (Array.isArray(resObj.message)) {
            errors = resObj.message;
            message = 'Validation failed'; // ✅ نص ثابت
        } else {
            message = resObj.message || 'An error occurred';
        }
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      error: HttpStatus[status] || 'Error',
      message: message,
      ...(errors && { errors: errors }),
      timestamp: new Date().toISOString()
    });
    
    }
}