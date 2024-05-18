import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from './auth/auth.module';
import { RecordModule } from './record/record.module';
import { ParticipantModule } from './participant/participant.module';
import { SituationTableModule } from './situation-table/situation-table.module';
import { RecognitionTextModule } from './recognition-text/recognition-text.module';
import { ErrorModule } from './error/error.module';

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get("DB_HOST"),
                port: configService.get("DB_PORT"),
                username: configService.get("DB_USERNAME"),
                password: configService.get("DB_PASSWORD"),
                database: configService.get("DB_NAME"),
                synchronize: true,
                entities: [__dirname + "/**/*.entity{.js, .ts}"]
            }),
            inject: [ConfigService]
        }),
        AuthModule,
        RecordModule,
        ParticipantModule,
        SituationTableModule,
        RecognitionTextModule,
        ErrorModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
