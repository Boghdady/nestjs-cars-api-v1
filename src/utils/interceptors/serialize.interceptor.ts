import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from 'src/users/dtos/user-response.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // 1- Run something before a request is handled by the request handler
    console.log("1- I'm running before the handler");

    return next.handle().pipe(
      map((data: any) => {
        // 2- Run something before the response is sent out
        console.log("3- I'm running before the response is sent out", data);

        return plainToClass(UserResponseDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}