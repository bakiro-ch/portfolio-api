import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "../dtos/login.dto";
import { LoginService } from "../services/login.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Login')
@Controller('auth')
export class LoginController{

    constructor(public readonly loginService: LoginService){};

    @Post('login')
    @ApiOperation({ summary: "Login to get token"})
    @ApiBody({ type: LoginDto })
    public adminLogin(@Body() user: LoginDto){
        return this.loginService.login(user);
    }
}