import { BaseRepository } from "@common/database";
import { HelperService } from "@common/helpers";
import { User } from "@entities";
import { InjectRepository } from "@mikro-orm/nestjs";
import { TokenService } from "@modules/token/token.service";
import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { omit } from "helper-fns";
import { UserLoginDto } from "./dto/user-login.dto";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private userRepository: BaseRepository<User>,
		private readonly tokenService: TokenService,
	) {}

	async login(dto: UserLoginDto) {
		const user = await this.validateUser(dto.mobileNumber, dto.password);

		if (!user) {
			throw new ForbiddenException(`Invalid Credentials`);
		}

		const accessToken = this.tokenService.generateAccessToken(user);

		return accessToken;
	}

	async validateUser(mobileNumber: string, pass: string) {
		const user = await this.userRepository.findOne({ mobileNumber });

		if (!user) {
			throw new ForbiddenException(`User does not exist.`);
		}

		if (!user.isActive) {
			throw new ForbiddenException(`You account is inactive, please contact administrator!`);
		}

		const isPasswordValid = HelperService.verifyHash(user.password, pass);

		if (!isPasswordValid) {
			throw new BadRequestException(`Credential didn't match!`);
		}

		return omit(user, ["password"]);
	}
}
