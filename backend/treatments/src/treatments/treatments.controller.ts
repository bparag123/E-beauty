import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('treatment')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  // @UseGuards(AuthGuard)
  // @Get()
  // private(@Req() req) {
  //   console.log(req.user);
  //   return `'You are Authenticated with email ${req.user.email}'`;
  // }

  // @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        const extention = file.originalname.split('.')[1];
        if (extention !== 'png' && extention !== 'jpg') {
          cb(new Error('Please Upload file in JPG/PNG format'), false);
        }
        if (file.size >= 1000 * 1000) {
          cb(new Error('Please Upload file in JPG/PNG format'), false);
        }
        cb(null, true);
      },
    }),
  )
  // @MessagePattern('createTreatment')
  create(
    @Body() createTreatmentDto: CreateTreatmentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(createTreatmentDto);
    console.log(file);
    return this.treatmentsService.create(createTreatmentDto, file);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.treatmentsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treatmentsService.findOne(id);
  }
}
