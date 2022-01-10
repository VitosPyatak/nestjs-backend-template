import { Body, Controller, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Query, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { SampleDto } from './app.dto';
import { AppService } from './app.service';
import { SampleApiProvider } from './http-request/providers/sample/sample.provider';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly sampleApi: SampleApiProvider) {}

  @Get()
  getByIds(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]) {
    return ids;
  }

  @Post()
  samplePost(@Body() sampleBody: SampleDto) {
    return sampleBody;
  }

  @Post('/bulk')
  samplePostBulk(@Body(new ParseArrayPipe({ items: SampleDto })) sampleBody: SampleDto[]) {
    return sampleBody;
  }

  @Get('post/:id')
  findPost(@Param('id', ParseIntPipe) postId: number) {
    return this.sampleApi.getPost(postId);
  }

  @Get('render')
  @Render('index')
  getIndexTemplate() {
    return { message: 'Hey there!' };
  }

  @Get('render2')
  getDynamicTemplate(@Res() response: Response) {
    return response.render('index', { message: 'Hey there!' });
  }
}
