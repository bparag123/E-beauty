import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { AuthGuard } from '../guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/role.enum';

@Controller('treatment')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
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
