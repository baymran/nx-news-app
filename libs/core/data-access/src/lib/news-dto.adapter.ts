import {NewsEntity, NewsItemDTO} from "@core/data-access";

type NewsDtoAdapter = {
  DTOtoEntity(dto: NewsItemDTO): NewsEntity,
  entityToDTO(entity: NewsEntity): NewsItemDTO
}

export const newsDTOAdapter: NewsDtoAdapter = {
  DTOtoEntity(dto: NewsItemDTO): NewsEntity {
    const {fullUrl, ...otherFields} = dto
    return {
      ...otherFields
    }
  },
  entityToDTO(entity: NewsEntity): NewsItemDTO {
    return {
      ...entity,
      fullUrl: ''
    }
  }
}
