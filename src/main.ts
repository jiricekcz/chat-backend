import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"


async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const config = new DocumentBuilder().setTitle("HAKLR Chat API")
        .setDescription("API for the haklr chat application")
        .setVersion("1.0.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("/docs", app, document);
    await app.listen(3000, "0.0.0.0");
}
bootstrap();
