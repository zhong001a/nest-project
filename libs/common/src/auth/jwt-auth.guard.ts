import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { catchError, Observable, tap, map, of } from "rxjs";
import { AUTH_SERVICE } from "../constants/services";
import { ClientProxy } from "@nestjs/microservices";
import { UserDto } from "../dtos";


@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor( @Inject(AUTH_SERVICE)  private readonly authClient: ClientProxy) {}
    canActivate(
        context: ExecutionContext,
        ): boolean | Promise<boolean> | Observable<boolean> {
            const jwt = context.switchToHttp().getRequest().cookies?.Authentication
            if(!jwt){
                return false
            }
            return this.authClient
                .send<UserDto>('authenticate', {
                    Authentication: jwt,
                })
                .pipe(
                    tap((res) =>{
                        context.switchToHttp().getRequest().user = res
                    }),
                    map(()=>true),
                    catchError(()=>of(false))
                )
        }
}
