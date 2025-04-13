import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const swaggerConfig = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('CRUD API for users and professors')
    .addServer('http://localhost:3005/')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Enhanced CORS configuration
  app.enableCors({
    origin: 'https://aigym-21b4cc4188db.herokuapp.com',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true,
  });

  // Create HTTP server
  const server = app.getHttpServer();

  // Setup Socket.IO with CORS
  const io = new socketio.Server(server, {
    cors: {
      origin: 'https://aigym-21b4cc4188db.herokuapp.com',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Use Socket.IO adapter
  app.useWebSocketAdapter(new IoAdapter(io));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
