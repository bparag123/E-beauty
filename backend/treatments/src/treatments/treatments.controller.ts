import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';

@Controller()
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @MessagePattern('createTreatment')
  create(@Payload() createTreatmentDto: CreateTreatmentDto) {
    return this.treatmentsService.create(createTreatmentDto);
  }

  @MessagePattern('findAllTreatments')
  findAll() {
    return this.treatmentsService.findAll();
  }

  @MessagePattern('findOneTreatment')
  findOne(@Payload() id: number) {
    return this.treatmentsService.findOne(id);
  }

  @MessagePattern('updateTreatment')
  update(@Payload() updateTreatmentDto: UpdateTreatmentDto) {
    return this.treatmentsService.update(
      updateTreatmentDto.id,
      updateTreatmentDto,
    );
  }

  @MessagePattern('removeTreatment')
  remove(@Payload() id: number) {
    return this.treatmentsService.remove(id);
  }
}
