import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../decorators/allowUnauthorized.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/role.enum';

@Controller('treatment')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Roles(Role.Admin)
  @Post('')
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
  create(
    @Body() createTreatmentDto: CreateTreatmentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(createTreatmentDto);
    console.log(file);
    return this.treatmentsService.create(createTreatmentDto, file);
  }

  @Public()
  @Get('')
  findAll() {
    console.log('Getting All Treatments');
    return this.treatmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treatmentsService.findOne(id);
  }

  @Roles(Role.Admin)
  @Delete('')
  deleteAll() {
    return this.treatmentsService.deleteAll();
  }

  @Roles(Role.Admin)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.treatmentsService.deleteById(id);
  }
}
