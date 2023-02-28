import { BaseRepository } from "@common/database";
import { IJwtPayload } from "@common/types";
import { User } from "@entities";
import { IConfig } from "@lib/config/config.interface";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		config: ConfigService<IConfig, true>,
		@InjectRepository(User) private userRepo: BaseRepository<User>,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get("jwt.secret", { infer: true }),
			ignoreExpiration: false,
		});
	}

	async validate(payload: IJwtPayload) {
		const { sub: id } = payload;

		return await this.userRepo.findOne({ id });
	}
}
