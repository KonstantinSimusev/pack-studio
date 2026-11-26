import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EmployeeProductRepository } from './employee-product.repository';
import { ISuccess } from '../../shared/interfaces/api.interface';
import { EActionCode } from '../../shared/enums/enums';

@Injectable()
export class EmployeeProductService {
  constructor(
    private readonly employeeProductRepository: EmployeeProductRepository,
  ) {}

  async hasEmployeeProductDuplicate(
    actionCode: string,
    heatNumber: number,
    partyNumber: number,
    productNumber: number,
  ): Promise<void> {
    // Переупаковку можно сохранять сколько угодно раз — проверка не нужна
    if (actionCode === EActionCode.REPACK) {
      return;
    }

    const products = await this.employeeProductRepository.findAllByNumbers(
      heatNumber,
      partyNumber,
      productNumber,
    );

    // Блокируем только повтор того же самого действия
    const hasDuplicate = products.some(
      (product) => product.actionType.actionCode === actionCode,
    );

    if (hasDuplicate) {
      throw new ConflictException(`Рулон уже сохранён`);
    }
  }

  // 4. CRUD: Delete
  async deleteEmployeeProduct(id: string): Promise<ISuccess> {
    const result = await this.employeeProductRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException('Запись продукции не найдена');
    }

    return { message: 'Смена сотрудника успешно удалена' };
  }
}
