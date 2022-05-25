import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { TreatmentDocument } from 'src/schemas/treatment.schema';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';

@Injectable()
export class TreatmentsService {
  constructor(
    @InjectModel('Treatment') private Treatment: Model<TreatmentDocument>,
    private cloudinary: CloudinaryService,
  ) {}
  async create(
    createTreatmentDto: CreateTreatmentDto,
    file: Express.Multer.File,
  ) {
    const result = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    const dbEntry = await this.Treatment.create(createTreatmentDto);
    dbEntry.images.push(result.secure_url);
    await dbEntry.save();
    return dbEntry;
  }

  async findAll() {
    console.log('Find all runs');
    return await this.Treatment.find();
  }

  async deleteAll() {
    return await this.Treatment.deleteMany();
  }

  async deleteById(id: string) {
    return await this.Treatment.deleteOne({ _id: id });
  }

  async findOne(id: string) {
    return await this.Treatment.find({ _id: id });
  }

  update(id: number, updateTreatmentDto: UpdateTreatmentDto) {
    return `This action updates a #${id} treatment`;
  }

  remove(id: number) {
    return `This action removes a #${id} treatment`;
  }
}
